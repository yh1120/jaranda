<p align='middle'>
<a href='https://jaranda.netlify.app/'><img src='https://user-images.githubusercontent.com/51367622/128473643-62cedb40-2390-4356-9db4-5ddb2cfa346e.png' width="100px;" alt="LiveMD" /></a></p>
<p align='middle'><img alt="GitHub top language" src="https://img.shields.io/github/languages/top/six-sense/jaranda?color=blueviolet"> <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/six-sense/jaranda"> 
<h1 align='middle'><a href='https://jaranda.netlify.app/'>https://jaranda.netlify.app/</a></h1>

<br/>

## 📌 프로젝트 소개

### 프리온보딩 코스 Jaranda 기업 과제

> ❕ **회원가입, 로그인 / 로그아웃 기능과 다양한 메뉴를 가지고 있는 홈페이지, 관리자 페이지 구현하기**❗

<br/>

<details>
    <summary><STRONG>
       📚 과제 요구사항 보기
        <STRONG></summary>
    <div markdown="1">
<h3>1. 아래 정보를 입력받아 회원가입 페이지를 구현하고 로그인/로그아웃 기능을 구현해주세요.</h3>
- 이름<br/>
- 주소 (팝업을 이용해서 입력받음)<br/>
- 신용카드 정보 (팝업을 이용해서 입력받음)<br/>
- 나이<br/><br/>
1.1 관리자 로그인을 하면 등록한 계정 정보를 아래 방법을 이용하여 시각화 해 주세요.<br/>
- 테이블 Component 페이지 만들기<br/>
- Data Table 구현<br/>
- 페이지네이션 구현<br/>
- 검색기능 구현<br/><br/>
1.2 정보는 로컬 저장소 등 자유롭게 저장해도 됩니다.<br/><br/>
1.3 주소는 다음에서 제공하는 입력창을 사용해도 무방합니다.<br/><br/>
1.4 관리자 계정은 임의로 정의해도 됩니다.<br/><br/>
<h3>2. 다양한 메뉴를 가지고 있는 홈페이지 관리자 페이지를 구현해 주세요.</h3>
2.1 계정, 비밀번호만 입력하면 로그인이 되어야 합니다.<br/><br/>
2.2 로그인 된 계정은 자신에게 허용된 메뉴만 보여야 합니다.<br/><br/>
2.3 관리자는 계정을 임의로 생성할 수 있고 계정별로 볼 수 있는 메뉴를 설정할 수 있습니다.<br/><br/>
2.4 관리자 계정은 임의로 정의해도 됩니다.<br/><br/>
2.5 정보는 로컬 저장소 등 자유롭게 저장해도 됩니다.<br/><br/>
2.6 메뉴는 임의대로 정의해도 되며 메뉴를 선택했을 때 나오는 화면에는 메뉴명이 출력되면 됩니다.<br/><br/>
2.7 관리자 로그인을 하면 등록한 계정 정보를 아래 방법을 이용하여 시각화 해 주세요.<br/>
- 테이블 Component 페이지 만들기<br/>
- Data Table 구현<br/>
- 페이지네이션 구현<br/>
- 검색기능 구현<br/>
</div>
</details>
<br/>

## 개인적인 수정 내용

> 기존에는 체크된 데이터를 댬는 객체를 따로 만들어 이것을 통해 체크되어 있는 지 확인하고 보내주는 방법을 택했다.  
> 이를 좀 더 간단하게 체크를 누르거나 풀 때 db로부터 응답받은 data state를 갱신하여 화면에 보여주고, submit버튼을 누를 때 받아온 데이터만 전달한다.  
> 또한 db인 loalStorage에 갱신하는 작업이 화면에 보여주는 것과 섞여있어서 FE와 BE가 섞여있다는 느낌이 들었다. 그래서 개별된 함수를 만들어 db를 갱신하고, 새로 pagination을 통해 db와 화면을 동기화시킨다.  
> localStorage에 접근하는 것은 클라이언트에서 직접적으로 접근할 수 없고 서버를 통해야 하기 때문에 이를 나눠주고 싶었고, 받아온 데이터가 결국은 갱신하기 위해 보내줘야 할 데이터이기 때문에 따로 state를 만들어주지 않고 본 데이터를 가공하고 싶었다.

## 📑 구현 목록

`회원 가입`

- 아이디, 비밀번호, 이름, 나이, 주소, 신용카드 등록을 통한 회원 가입 기능
- 각 `input`(아이디, 회원가입, 카드)에 대한 Validate 설정(유효성 검사, 중복 검사, 비밀번호 확인)
- 모든 input 값이 존재할 때 회원가입 완료 (미흡 입력 존재 시 해당 인풋으로 cursor 이동)
- 주소 등록은 다음 API 활용, 카드 등록은 팝업창 구현.

`로그인`

- 아이디, 패스워드 유효성 검사
- 유효성 검사 후 존재하는 유저 인증 후 token 발급
- 발급된 token으로 admin, user 페이지 이동

`관리자`

- localStorage에 존재하는 userData 출력
- 검색기능으로 name, userId에서 키워드 검색
- localStorage에 존재하는 userId의 menuItem 수정 가능
- 관리자 혹은 유저로 계정 추가

`메뉴바`

- 관리자 페이지에서 계정별 메뉴 설정 시 해당 계정에게 선택된 메뉴만 보여짐
- 유저가 권한이 없는 페이지주소를 입력하면 페이지 접근불가, 메인페이지로 이동
- Not Found 페이지

`라우트` && `접근 권한`

- 로그인 전
  - 로그인 없이 접근 가능한 메뉴 렌더링 (로그인/회원가입 페이지)
- 로그인 후
  - 관리자 계정으로 로그인시 Admin 페이지 렌더링
  - 일반 계정으로 로그인시 게스트메뉴에서 유저별 허가된 메뉴 렌더링
  - 로그인 후에는 로그인/회원가입 페이지 접근 불가
- 로그아웃

<br/>

## 👨‍💻 실행 방법

### 설치

`npm install`

### 실행

`npm start`

### 데모 로그인

`Admin : admin1 / admin123!`

`User : user1 / user123!`

<br/>

## 📂프로젝트 구조

| 폴더 / 파일 | 설명                               |
| ----------- | ---------------------------------- |
| Assets      | jaranda 로고 및 아이콘.            |
| Components  | 각 Page에 사용되는 Component 모음. |
| Modal       | 팝업창 Modal.                      |
| Pages       | Route를 위한 Page 목록.            |
| Services    | 권한별 인가 책정.                  |
| Styles      | 기본 공통 Style.                   |
| Utils       | localStorage 접근 및 공통 함수.    |
| App.js      | public, private Route 정리.        |
| routes.js   | 계정별 페이지 권한 구분.           |

<br/>
