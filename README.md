## [식물 케어 서비스]초록(chorok)

**1. 프로젝트 주제**

    나의 식물을 다른 사람들에게 자랑하고 추억을 기록하고 싶은가요? 초록을 사용해보세요! 
**2. 엔드유저에게 보이는 웹 서비스 타이틀 및 한 줄 소개**

    - 초록(chorok), 홈가드닝을 하는 유저를 위한 스케줄러, 병해진단 서비스, 커뮤니티등 종합적인 서비스 제공

**3. 팀 구성원의 전체 이름과 역할**

>팀원 소개

| 이름 | 역할 |
| ------ | ------ |
| 장정민 | 팀장, 백엔드, 스크럼, 스토리보드, 중간*최종발표, 배포 |
| 김다현 | 인공지능, 기획서,  학습용 Data수집, AI발표 자료 |
| 김승주 | 부팀장, 프론트엔드, 스크럼 정리, UI 구성 |
| 최성식 | 프론트엔드, 와이어프레임, 스토리보드, 발표자료 |
| 김광재 | 프론트엔드, 와이어프레임, 배포 |
| ~~김경빈~~ | s3 환경세팅 |



**4. 구현 내용**

* FRONT
  - 스케줄러
  - 커뮤니티
  - 로그인 / 로그아웃
  - 다이어리
  - 회원정보 수정
  - 진단 서비스 화면 및 로딩화면
* BACK
  - 스케줄러
  - 커뮤니티
  - 로그인 / 로그아웃
  - 다이어리
  - 회원정보 수정
  - 진단 DB 구축
* AI
  - MultiClass-classification
  - Detection & Classification
  - Image Retreival
    

### 1. 기획 의도

- 조사할 문제, 조사할 문제가 흥미로운 이유
    - 홈가드닝을 시작하려는 사람과 식물 병반 분류에 어려움을 겪는 이에게 도움을 줄 수 있음.
    - 최근 sns에서 홈가드닝을 공유하는 사람들이 많아지고 있고 시장에서도 홈가드닝의 수요가 증가하고 있는 추세임.
- 프로젝트 목적 및 필요성
    - 애정을 가지고 식물을 기르고 있는 사용자와 새로운 식물을 기르고 싶어하는 사용자 모두에게 올바른 육성 방법 및 커뮤니티에서 도움이 되는 정보를 공유할 수 있어 건강하게 오랫동안 기를 수 있도록 도움을 준다. 또한 건강한 취미생활을 가지는데 도움이 됨.
- 프로젝트가 제공하는 기대 효과와 활용 방안
    - 키우는 식물에 병반이 생겨 그에 대한 정보를 필요로 하는 사용자에게 식물 사진을 업로드하는 비교적 간단하고 정확한 방법으로 추천 솔루션을 제공받아 현 육성 방식에서 개선된 방향을 제공받을 수 있다.
    - 새로운 식물을 기르고 싶은 사용자에게 자체 커뮤니티를 통해 적합한 식물과 가드닝 팁을 제공하여 식물 육성의 어려움을 줄인다.
    - 작물을 재배하는 농민들에게 조기에 병반을 발견하여 전염을 예방하는 효과 금전적 손해를 최소화함.
    - 육안으로 구분하기 힘든 전문적인 식물 병반 예측 서비스를 제공함으로써 정보 격차를 해소

### 2. 사용된 인공지능 알고리즘 및 모델 과 기술스택

- 어떤 인공지능  task 및 모델을 어떻게 전처리하고 사용할 것인지
    - Task : MultiClass-Classification
    - Model : Resnet50(pretrained)
    - technique : (1) cross-validation
                  (2) focal-loss
                  (3) early stopping
                  (4) stratified k-fold
                  (5) Canny edge
    - 추가 기능 : image retreival (MetricLearning) 을 사용하여 검출환경 오류 분류
- 이 프로젝트의 맥락과 배경이 유사한 인공지능 기반 서비스의 활용 사례 및 참고 논문
    - 식물 식별 및 진단 어플리케이션 서비스
        - [picturethis](https://www.picturethisai.com/ko/app)
    - 식물 가드닝 스케줄 및 검색 어플리케이션 서비스
        - [groo](https://groo.pro/)
    - 식물 병해 판단 이미지 Dataset 및 병해 감지 모델
        - [Healthy vs. Diseased Leaf Image Dataset (진단명 x)](https://www.kaggle.com/datasets/amandam1/healthy-vs-diseased-leaf-image-dataset)
        - [Plant Pathology (진단명 o)](https://www.kaggle.com/datasets/jirkaborovec/plant-pathology-fgvc78-640px)
        - [DenseNet, EfficientNet을 활용한 병해 감지 모델](https://www.kaggle.com/code/tarunpaparaju/plant-pathology-2020-eda-models/notebook)
- 기술스택
    - AI
        - pytorchlightning
        - pytorch
        - torchvision
    - FE
        - React
        - MUI
        - AXIOS
    - BE
        - Express.js
        - MongoDB
        - AWS S3
        - Joi
        - Flask


### 3. 웹 서비스의 최종적인 메인 기능과 서브 기능 설명

`서브기능 포함 모든 기능은 유저 서비스, 비회원 이용 불가`

**[메인 기능]** 

1. 식물 잎 병해 진단 서비스
    - 사용자가 특정 잎을 촬영 혹은 사진을 선택하면, 식물의 잎 상태를 확인하고 병해 진단
    - 원인 및 관리법을 진단 결과 화면에 출력
2. 나의정원 & 물주기 스케줄러
    - 기르고 있는 식물 리스트 저장
    - 저장된 식물 데이터로부터 물주기 일정을 자동으로 계산하여 오늘의 스케줄을 알려줌
3. 식물 커뮤니티 (사진 첨부가 가능한 정보공유 / 자유 게시판)
    - 병해 진단 기능에서 판별이 되지 않거나 더 많은 정보를 얻고 싶은 사용자가 식물 사진과 글을 작성하고 정보를 공유 받을 수 있는 커뮤니티 기능

**[서브 기능]**

1. 로그인 / 회원가입
    - 스케줄러, 커뮤니티 기능을 이용하는 데에 필요한 회원 기능.
    - 인증에 필요한 유저정보 저장
    - 내 정보 수정 및 탈퇴 (추후 논의)
2. 다이어리(마이 가든 페이지 하위 페이지)
    - 식물에 대한 사진과 메모일기를 입력


### 4. 프로젝트 구성

**- 아키텍처**  

![image](https://user-images.githubusercontent.com/59358910/179131804-4b206ee1-d5cd-4baa-831f-c134590bec78.png)

**- 와이어프레임 (whimsical, figma 등 링크 삽입)**  

[홈 가드닝 서비스](https://www.figma.com/file/SKzPDJz4YnIaKR5Zs2MNLc/%EA%B0%80%EB%93%9C%EB%8B%9D%EC%96%B4%ED%94%8C)


**- 발표자료**   

[발표자료](https://www.canva.com/design/DAFE9vuSwhM/vd35SL43Z3m64qT0kkWFGQ/edit?utm_content=DAFE9vuSwhM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
