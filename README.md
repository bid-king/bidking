# 입찰왕(Bid King)

## 1. Commit Rule

```text
Type: subject

- body

footer
```

### Commit Type

* Feat: 새로운 기능 추가

* Refactor: 코드 리팩토링
* Test: 테스트 코드, 리팩토링 테스트 코드 추가
* Docs: 문서 수정
* Style: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
* Chore: 빌드 업무 수정, 패키지 매니저 수정



### Subject

* 제목은 50자를 넘기지 않고, 대문자로 작성하며 마침표를 붙이지 않는다.
* 과거 시제를 사용하지 않고 영문 명령어로 작성한다.
  * "Created" --> "Create"

### Body

* 선택사항이므로 모든 커밋에 본문 내용을 작성할 필요는 없다.
* 부연 설명이 필요하거나 커밋의 이유를 설명할 경우 작성한다.
* 제목과 구분되기 위해 한 칸을 띄워 작성한다.



### Footer

* 선택사항이므로 모든 커밋에 꼬릿말을 작성할 필요는 없다.
* jira issue tracker id를 작성할 때 사용한다.
  * Fix, Close, Resolve + "이슈 번호"



## 2. Branch Strategy

### Git Flow

* Frontend와 Backend 모두 Git Flow 전략을 채택하여 개발한다.

![image](https://github.com/Haley-Children/Algorithm-DataStructure/assets/58822617/f923b684-354b-40a4-b010-720dc38e8f62)

### Branch

✅ master : 제품으로 출시될 수 있는 브랜치를 의미한다.
✅ develop (dev) : 다음 출시 버전을 개발하는 브랜치이다. feature에서 리뷰완료한 브랜치를 Merge한다.
✅ feature (feat) : 기능을 개발하는 브랜치이다.
✅ hotfix : 출시 버전에서 발생한 버그를 수정하는 브랜치이다.
