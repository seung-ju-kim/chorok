## [식물 케어 서비스]초록(chorok)

** 프로젝트 주제**

    나의 식물을 다른 사람들에게 자랑하고 추억을 기록하고 싶은가요? 초록을 사용해보세요! 
** 엔드유저에게 보이는 웹 서비스 타이틀 및 한 줄 소개**

    - 초록(chorok), 홈가드닝을 하는 유저를 위한 스케줄러, 병해진단 서비스, 커뮤니티등 종합적인 서비스 제공


### 1. 서비스 소개 👩‍🏫

---

**초록(chorok)**, 홈가드닝을 하는 유저를 위한 스케줄러, 병해진단 서비스, 커뮤니티등 종합적인 서비스를 제공합니다.

식물을 키우는데 서투른 초보 집사 & 홈가드닝이 취미인 유저를 대상으로 한 서비스입니다.

식물이 아픈 경우, 왜 아픈지 육안으로 병해를 구분하기 어렵기 때문에 홈가드닝을 시작하는 사람들에게 효율적인 식물 관리 서비스를 제공합니다.

병해 데이터를 기반으로하는 AI를 이용해 병해 진단을 해주고 식물에 관한 정보를 공유할 수 있는 커뮤니티를 지닌 웹 서비스입니다. 

1. **기획 의도**
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
    
2. **사용된 인공지능 알고리즘 및 모델 과 기술스택**
- 어떤 인공지능 task 및 모델을 어떻게 전처리하고 사용할 것인지
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

### 2. **기술 스택 ⛏️**

---

- **FE**
    - React
    - MUI
    - AXIOS
- **BE**
    - Express.js
    - MongoDB
    - AWS S3
    - Joi
    - Flask
- **AI**
    - pytorchlightning
    - pytorch
    - torchvision

기술문서가 따로 작성되어있습니다. 📜

(기술 스택과 트러블 슈팅등 모든 것을 기재하였으니 인공지능은 이 PDF만 봐주셔도 괜찮습니다.)

[3팀 인공지능 기술문서](file:///C:/Users/wkdwj/Desktop/ready/%EC%97%98%EB%A6%AC%EC%8A%A4/AI%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B83%ED%8C%80/3%ED%8C%80%20%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5%20%EA%B8%B0%EC%88%A0%EB%AC%B8%EC%84%9C.pdf)

### 3. 각 팀원의 역할과 기여한 부분 👨‍👩‍👦‍👦

---
| 이름 | 역할 | 담당 부분 |
| ------ | ------ | ------ |
| 장정민 | 팀장<br>백엔드<br>배포<br>발표 | 1. DB 설계 및 식물 질병 데이터 구축 <br> 2. `User` `Plant` `Schedule` `Diary` `Community` API 구현 <br> 3. AWS S3 세팅 및 파일 `Upload` 구현 <br> 4. 병해 진단서비스 `Diagnosis` 유지보수 <br> 5. API 문서화, 스토리보드 초안 작성 <br> 6. 스크럼 진행, 일정관리, 발표[중간/최종] |
| 김다현 | 인공지능<br>학습용 Data수집<br> AI자료 정리 <br>기획서 | 1. 프론트엔드 와이어프레임 제작<br>2. Community UI 제작<br>3. 프로젝트 빌드 및 Node.js 서버 배포 |
| 김승주 | 프론트엔드<br>부팀장<br>디자인 총괄<br>UI 구성 | 1. User, Account, MyGarden, Diagnosis, Community MVP 개발<br>2. 각종 UI 배치 및 스켈레톤 적용<br>3. wiki 스크럼 정리 및 업로드 |
| 최성식 | 프론트엔드<br>와이어프레임<br>스토리보드<br>발표자료 | 1. Community-Comment 구현<br>2. 와이어프레임, 스토리보드 제작<br>3. 발표자료 작성 |
| 김광재 | 프론트엔드<br>와이어프레임<br>스타일가이드<br>배포 | 1. 프론트엔드 와이어프레임 제작<br>2. Community UI 제작<br>3. 프로젝트 빌드 및 Node.js 서버 배포 |****



### 4. **프로젝트 구조도 🏘️**

---

[](url)
