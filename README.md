# 🌱 하루 한끼의 채식! 지구의 내일을 바꿔요!

<br/>

<img src="./public/logoshort.png" alt="logo" width="10%" />

<br/>

## 📄 개요

-   서비스명: 오채완
-   기획 기간: 2023.05.26 ~ 2023.06.01
-   개발 기간: 2023.06.01 ~ 2023.06.16
-   주제: 환경 보호
-   목표: 데이터 분석 수치를 활용해 **육류소비의 탄소배출량의 심각성 파악** 및 **유저 간 채식문화 장려 하는 서비스 제공**
-   API 문서: [바로가기](https://docs.google.com/spreadsheets/d/1t-DNUbVY4GI5NZWTBwCLrzPFFoJMj4t_p9wfY_jemhA/edit?usp=sharing)
-   테스트 페이지: [바로가기](http://kdt-ai7-team07.elicecoding.com/)

<br/>

## 🫶 팀원 소개

**민준영**

-   Back-End
-   znddiqjwjs@gmail.com
-   Github: [@minluna](https://github.com/minluna)

**정재훈**

-   Back-End
-   wjdwogns120523@gmail.com
-   Github: [@J-A-Y2](https://github.com/J-A-Y2)

**김지원**

-   Back-End
-   0o0w0d2@gmail.com
-   Github: [0o0w0d2](https://github.com/0o0w0d2)

**이영현**

-   Front-End
-   pisouz7@gmail.com
-   Github:[@yyoungl](https://github.com/yyoungl)

**최우현**

-   Front-End
-   woohyun6549@gamil.com
-   Github: [@choiwoohyun123](https://github.com/choiwoohyun123)

<br/>

## 기술 스택

### Back-End

<div>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-47A248?style=flat-square&logo=MySQL&logoColor=white"/>
</div>

<br />

### Server-Infra

<div>
<img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white"/>
<img src="https://img.shields.io/badge/pm2-2B037A?style=flat-square&logo=pm2&logoColor=white"/>
</div>
<br />

## 🗂 프로젝트 구조

### [Back-End](#)

```
📦src
 ┣ 📂controllers
 ┃ ┣ 📜commentController.js
 ┃ ┣ 📜likeController.js
 ┃ ┣ 📜postController.js
 ┃ ┣ 📜rankController.js
 ┃ ┣ 📜searchController.js
 ┃ ┗ 📜userController.js
 ┣ 📂db
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜Comment.js
 ┃ ┃ ┣ 📜Like.js
 ┃ ┃ ┣ 📜Post.js
 ┃ ┃ ┣ 📜Rank.js
 ┃ ┃ ┣ 📜Search.js
 ┃ ┃ ┗ 📜User.js
 ┃ ┗ 📜index.js
 ┣ 📂middlewares
 ┃ ┣ 📜addComment_validate.js
 ┃ ┣ 📜addPost_validate.js
 ┃ ┣ 📜commentParams_validate.js
 ┃ ┣ 📜errorMiddleware.js
 ┃ ┣ 📜getComment_validate.js
 ┃ ┣ 📜getPost_vaildate.js
 ┃ ┣ 📜login_required.js
 ┃ ┣ 📜login_validate.js
 ┃ ┣ 📜postParams_validate.js
 ┃ ┣ 📜register_validate.js
 ┃ ┣ 📜search_validate.js
 ┃ ┣ 📜setComment_validate.js
 ┃ ┣ 📜setPost_validate.js
 ┃ ┣ 📜setUser_validate.js
 ┃ ┗ 📜userParams_validate.js
 ┣ 📂routers
 ┃ ┣ 📜commentRouter.js
 ┃ ┣ 📜likeRouter.js
 ┃ ┣ 📜postRouter.js
 ┃ ┣ 📜rankRouter.js
 ┃ ┣ 📜searchRouter.js
 ┃ ┗ 📜userRouter.js
 ┣ 📂services
 ┃ ┣ 📜commentService.js
 ┃ ┣ 📜likeService.js
 ┃ ┣ 📜postService.js
 ┃ ┣ 📜rankService.js
 ┃ ┣ 📜searchService.js
 ┃ ┗ 📜userService.js
 ┣ 📂utils
 ┃ ┗ 📜statusCode.js
 ┣ 📜app.js
 ┣ 📜aws.config.js
 ┗ 📜babel.config.json
```

<br />

## 🔎 주요기능

-   **회원가입, 로그인 기능**: 사용자의 회원 가입 및 로그인 기능 제공
-   **식단 업로드 기능**: 비건, 베지테리언 식단 업로드 가능
-   **피드 댓글, 대댓글 기능**: 식단 피드에서 댓글, 대댓글을 통해 유저들과 소통 가능
-   **탄소 배출 감소량에 따른 포인트 부여**: 식단 피드 업로드하면 포인트 부여
-   **마이페이지 기능**:
    -   개인 정보, 포인트, 좋아요 등을 확인할 수 있는 마이페이지 기능 제공
    -   개인 정보, 포인트, 좋아요 등
    -   올린 식단 사진 archive
    -   좋아요한 피드 archive
-   **개인정보수정 기능**: 닉네임, 프로필사진, 자기소개 수정 가능
-   **건강 배틀 sns**: 포인트 적립 순위 리스트(랭킹) 기능
-   **Infinite Scroll**: 스크롤을 통해 오래된 피드도 볼 수 있게 하여 사용자의 몰입도를 높이기 위한 기능능
-   **게시물 검색 기능**: 검색한 내용과 일치하는 모든 피드들을 볼 수 있는 기능

## 🏁 테스트 방법

---

1. 해당 프로젝트를 clone 합니다.

    ```
    git clone https://kdt-gitlab.elice.io/ai_track/class_07/data_project/team07/vegcom_back.git
    ```

2. 프로젝트 실행에 필요한 패키지를 설치합니다.

    ```
    cd vegcom_back
    yarn install
    ```

3. 백엔드를 실행합니다.

    ```
    cd vegcom_back
    yarn start
    ```
