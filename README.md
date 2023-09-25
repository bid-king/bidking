# 입찰왕(Bid King)

실시간 경매 라이브 플랫폼
---

## 팀 멤버

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/brewcoldblue">
        <img src="./docs/images/profile/승윤.png" width="100px;" height="100px" alt=""/><br />
        <sub><b>유승윤</b></sub><br />
        <sub>Frontend</sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/yongseong2">
        <img src="./docs/images/profile/성용.png" width="100px;" height="100px" alt=""/><br />
        <sub><b>김성용</b></sub><br />
        <sub>Frontend</sub>
      </a>
    </td><td align="center">
      <a href="https://github.com/DJ-archive">
        <img src="./docs/images/profile/다정.jpg" width="100px;" height="100px" alt=""/><br />
        <sub><b>윤다정</b></sub><br />
        <sub>Backend</sub>
      </a>
    </td><td align="center">
      <a href="https://github.com/jeong-yeji">
        <img src="./docs/images/profile/예지.png" width="100px;" height="100px" alt=""/><br />
        <sub><b>정예지</b></sub><br />
        <sub>Backend</sub>
    	</a>
    </td><td align="center">
      <a href="https://github.com/DHKIM-0511">
        <img src="./docs/images/profile/동현.png" width="100px;" height="100px" alt=""/><br />
        <sub><b>김동현</b></sub><br />
        <sub>Backend</sub>
    	</a>
    </td><td align="center">
      <a href="https://github.com/yyanoos">
        <img src="./docs/images/profile/연우.png" width="100px;" height="100px" alt=""/><br />
        <sub><b>이연우</b></sub><br />
        <sub>Backend</sub>
 	   </a>
    </td>
  </tr>
</table>

## 서비스 화면
[경매 진행 파트 유튜브 영상](https://www.youtube.com/watch?v=iyUf4gSRbaA)

- 회원 기능

  - 회원가입

    ![회원가입](./docs/images/gifs/member/signup.gif)

  - 로그인

    ![로그인](./docs/images/gifs/member/login.gif)

- 경매 CRUD

  - 경매 생성

  - 경매 수정

  - 경매 삭제

    ![경매 삭제](./docs/images/gifs/auction/auction_delete.gif)

  - 경매 목록 확인

  - 관심 경매 등록 및 삭제

    ![관심 경매](./docs/images/gifs/others/like.gif)

  - 경매 상세 확인

    - 판매자

      ![판매자 경매 상세 확인](./docs/images/gifs/auction/auction-detail-seller.gif)

    - 구매자

      ![구매자 경매 상세 확인](./docs/images/gifs/auction/auction-detail.gif)

  - 판매 내역 확인 (판매자)

    ![판매 내역 확인](./docs/images/gifs/auction/auction-detail-seller-after.gif)

  - 낙찰 내역 확인 (구매자)

    ![낙찰 내역 확인](./docs/images/gifs/auction/auction-item-buy.gif)

- 경매 라이브

  - 라이브 화면

    - 판매자

    - - live-seller-enter.gif
      - live-seller-onoff.gif
      - live-seller-notice.gif
      - live-seller-item-fail.gif
      - live-seller-leave.gif

    - 구매자
      - live-enter.gif
      - live-item-fail.gif
      - live-leave.gif

  - 입찰 컴포넌트

    ![입찰 컴포넌트](./docs/images/gifs/live/others/component.gif)

  - 슬라이딩 윈도우

    | 판매자                                                                              | 구매자                                                                       |
    | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | ![판매자 슬라이딩 윈도우](./docs/images/gifs/live/others/sliding-window-seller.gif) | ![구매자 슬라이딩 윈도우](./docs/images/gifs/live/others/sliding-window.gif) |

- 알림

  - 판매자

    ![판매자 알림](./docs/images/gifs/others/notification-seller.gif)

  - 구매자

    ![구매자 알림](./docs/images/gifs/others/notification.gif)

---

## 시스템 아키텍쳐

![시스템 아키텍쳐](./docs/images/system_architecture.png)

---

## 기술 스택

![기술 스택](./docs/images/dev_tools.png)

---

## ERD

![ERD](./docs/images/erd.png)

---

## WIREFRAME

![ERD](./docs/images/wireframe.png)

[와이어프레임 PDF 파일 보기](./docs/wireframe.pdf)

---

## Convention

1. Frontend

   Airbnb JavaScript Style Guide를 기반으로 커스텀함

1. [Backend](./docs/convention/BidkingStyle.xml)

   Google Java Style Guide를 기반으로 커스텀함

1. [Git Commit Rule](./docs/convention/git_convention.md)

1. [Git Branch Strategy](./docs/convention/git_branch.md)

---

## 포팅 매뉴얼

- [사용 버전](./docs/manual/version.md)

- [포팅 매뉴얼](./docs/manual/porting_manual.md)

---

## 발표

- [1차 발표](./docs/presentation/230714_presentation.pdf)
- [2차 발표](./docs/presentation/230728_presentation.pdf)
- [최종 발표](./docs/presentation/230818_presentation.pdf)
