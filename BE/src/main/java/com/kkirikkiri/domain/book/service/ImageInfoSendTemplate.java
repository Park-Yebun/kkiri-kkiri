package com.kkirikkiri.domain.book.service;

import com.kkirikkiri.domain.book.dto.ImageRequest;
import com.kkirikkiri.domain.book.dto.ImageResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ImageInfoSendTemplate {

    public void sendGenerateImageRequest(ImageRequest imageRequest) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ImageRequest> requestEntity = new HttpEntity<>(imageRequest, headers);

        String fastApiEndpoint = "http://127.0.0.1:8000/generate_image";
//        http://127.0.0.1:8000/
        restTemplate.exchange(fastApiEndpoint, HttpMethod.POST, requestEntity, ImageResponse.class);
    }
}
