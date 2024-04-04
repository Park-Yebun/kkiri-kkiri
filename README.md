## 📚나만의 동화책을 만들며 재밌게 영어 공부하는 "끼리끼리"🐘

![끼리끼리](main.png)

## 😮 끼리끼리 어떤 서비스에요?
- **영어는 유용한 도구다! 🛠** <br>
  영어는 "공부"해야하는 또 하나의 부담스러운 과목이 아닌, 가지고 있으면 좋은 유용한 도구라고 저희 팀은 생각해요! 그래서 아이들이 영어 환경에 가볍게 노출될 수 있는 끼리끼리 서비스를 기획했어요.

- **아이들이 동화책을 생성하고, 영어를 학습할 수 있어요!** <br>
  끼리코 AI와 5번의 대화를 나누면서 동화책을 만들면, AI를 활용해 그 동화책에 대한 이미지 생성과 영어 번역을 해줘요. 아이들은 자신이 만든 동화책을 학습한 후에 동화책을 읽어볼 수 있어요.

- **읽기, 쓰기, 말하기, 듣기 모든 영역으로 영어에 대한 자신감 UP 🙆‍♀️** <br>
  쓰기와 말하기 학습, 원어민 발음듣기를 통해 4가지 영역을 고르게 향상시킬 수 있어요. 쓰기 학습은 원어민 발음을 듣고 빈칸이 뚫려 있는 단어를 쓰는 거에요. 말하기 학습은 쉐도잉을 통해 영어 말하기 연습을 할 수 있어요. AI가 아이의 말을 알아들어 맞았는지, 틀렸는지 판단해줘요! 쓰기, 말하기 학습에서 한 문장씩 학습할 때마다 AI가 생성한 그림이 나타나요!


## 👩‍👩‍👧‍👧 Crew
| CI/CD, 인프라 | 백엔드, 프론트, AI | 백엔드, AI | 프론트 | 프론트 | 프론트  |
|---|---|---|---|---|---|
| 류지원 | 박예분  | 이주현 | 황유경  | 조형찬 | 주홍찬 |
| [koreamarin](https://github.com/koreamarin) | [Park-Yebun](https://github.com/Park-Yebun)  | [JulieOnIsland](https://github.com/JulieOnIsland) | [suddks](https://github.com/suddks) | [HyungChany](https://github.com/HyungChany) | [RupertJoo](https://github.com/RupertJoo) |


## 💻 기술 스택
- **FE**:
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

- **BE**:
  <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white">  <img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white">  <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=MariaDB&logoColor=white">

- **INFRA**:
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"> <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white"> <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">  <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">  <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">

- **AI**: Stable Diffusion v2.1, Dreambooth, HuggingFace



## 🚀 기능
1. 회원가입 및 로그인 <br>
![끼리끼리](./exec/login.gif)
2. 끼리코의 귀여운 메인 페이지: 스토리 만들기, 내 책장, 도서관 메뉴 <br>
![끼리끼리](./exec/main.gif)
3. 끼리코랑 동화책 만들기 <br>
![끼리끼리](./exec/create.gif)
4. 내가 만든 동화책 보기 & Clova API를 활용한 듣기 학습 기능 <br>
![끼리끼리](./exec/book.gif)

5. 내가 생성한 동화를 공유하고, 다른 유저가 생성한 동화를 학습할 수 있는 도서관 서비스 <br>

6. MyScript API를 활용해 손글씨 인식 기능으로 쓰기 학습 기능


## 🐘 앞으로 끼리끼리 서비스의 미래는?
- 영어 뿐만 아니라 다른 외국어로 확장시킬 꺼에요.
- 내가 만든 책을 인정받을 수 있도록 블록체인 기술을 도입해볼 예정이에요.

## 포팅메뉴얼
[📋포팅메뉴얼 노션 링크](https://ssafy10.notion.site/69cb2bf277e6410d86da0ae443a4d87a)


## 컴포넌트 구조
### FrontEnd
📦src  
 ┣ 📂assets  
 ┃ ┣ 📂book  
 ┃ ┣ 📂bookshelf  
 ┃ ┣ 📂error  
 ┃ ┣ 📂header  
 ┃ ┣ 📂library  
 ┃ ┣ 📂main  
 ┃ ┣ 📂story  
 ┃ ┣ 📂study  
 ┃ ┣ 📂user  
 ┣ 📂components  
 ┃ ┣ 📂api  
 ┃ ┣ 📂common  
 ┃ ┣ 📂Counter  
 ┃ ┣ 📂header  
 ┃ ┣ 📂main  
 ┃ ┣ 📂Modal  
 ┃ ┗ 📂story  
 ┣ 📂pages  
 ┣ 📜App.css  
 ┣ 📜App.jsx  
 ┣ 📜index.css  
 ┣ 📜main.jsx  
 ┣ 📜ResrtictRoute.jsx  
 ┗ 📜service-worker.js  

### BackEnd
📦BE  
 ┣ 📂gradle  
 ┃ ┗ 📂wrapper  
 ┣ 📂src  
 ┃ ┣ 📂main  
 ┃ ┃ ┗ 📂java  
 ┃ ┃ ┃ ┗ 📂com  
 ┃ ┃ ┃ ┃ ┗ 📂kkirikkiri  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂config  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂domain  
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂book  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂enums  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service  
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂bookshelf  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service  
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂learning  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service  
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂member  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂enums  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository  
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂global  
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂common  
 ┃ ┗ 📂test  
 ┃ ┃ ┗ 📂java  
 ┃ ┃ ┃ ┗ 📂com  
 ┃ ┃ ┃ ┃ ┗ 📂kkirikkiri  
 ┣ 📜.gitignore  
 ┣ 📜build.gradle  
 ┣ 📜docker-compose-redis.yml  
 ┣ 📜gradlew  
 ┣ 📜gradlew.bat  
 ┗ 📜settings.gradle  
