from fastapi import FastAPI, HTTPException, Body
from diffusers import StableDiffusionPipeline
import torch
import requests
import uuid
from dotenv import load_dotenv
import os
import boto3
from botocore.exceptions import ClientError

# if torch.cuda.is_available():
#     device = torch.device("cuda")  # GPU 장치 설정
#     print("GPU를 사용합니다conda.")
# else:
device = torch.device("cpu")   # CPU 장치 설정
print("CPU를 사용합니다.")

# Load environment variables from .env file
load_dotenv()
SPRINGBOOT_ENDPOINT = os.getenv("SPRINGBOOT_ENDPOINT")

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

s3_client = boto3.client('s3',
                         aws_access_key_id=AWS_ACCESS_KEY_ID,
                         aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
app = FastAPI()

model_id = "proximasanfinetuning/luna-diffusion"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

# prompt = "fairy tale style, vivid, a scary monster appeared, but the boy bravely grabbed a cookie and chased the monster away, detailed, 8k" 
# negative_prompt = "nsfw, bad quality, bad anatomy, worst quality, low quality, low resolutions, extra fingers, blur, blurry, ugly, wrongs proportions, watermark, image artifacts, lowres, ugly, jpeg artifacts, deformed, noisy image"
        

@app.post("/api/generate")
async def generate_images(image_request: dict = Body(...)):
    
    try:
        prompt = image_request.get("prompt")
        image = pipe(prompt=prompt, height=512, width=512).images[0]
        image_filename = str(uuid.uuid4())[:5] + ".png"
        image.save(image_filename)

        # amazon s3에 image를 보내고, 그 url을 imageUrl에 저장.
        s3_key = f"images/{image_filename}"
        s3_client.upload_file(image_filename, S3_BUCKET_NAME, s3_key)
        s3_image_url = f"https://{S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/{s3_key}"
        print(s3_image_url)

        os.remove(f'{image_filename}')

        # ImageResponse dto 
        image_response = {
            "storyId": image_request["storyId"],
            "lineId": image_request["lineId"],
            "imageUrl": s3_image_url
        }
        
        # Send the image filename to Spring Boot
        response = requests.post(SPRINGBOOT_ENDPOINT, json=image_response)
        if response.status_code == 200:
            return {"message": "Image generated and filename sent successfully to Spring Boot"}
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to send image filename to Spring Boot")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")