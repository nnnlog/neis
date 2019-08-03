# NEIS API

[![npm version](https://badgen.net/npm/v/neis)](https://www.npmjs.com/package/neis)

* 학교 정보, 학교 검색, 급식 조회 API를 제공합니다.


---
## 클래스

### 타입

#### EduLists

| 교육청 코드 |   value   |     지역명     |
|:-----------:|:---------:|:--------------:|
|    SEOUL    | sen.go.kr |      서울      |
|    BUSAN    | pen.go.kr |      부산      |
|    DAEGU    | dge.go.kr |      대구      |
|   INCHOEN   | ice.go.kr |      인천      |
|   GWANGJU   | dje.go.kr |      광주      |
|   DAEJEON   | dje.go.kr |      대전      |
|    ULSAN    | use.go.kr |      울산      |
|    SEJONG   | sje.go.kr |      세종      |
|   GYEONGGI  | goe.go.kr |      경기      |
|   GANGWON   | kwe.go.kr |      강원      |
|   CHUNGBUK  | cbe.go.kr | 충청북도(충북) |
|   CHUNKNAM  | cne.go.kr | 충청남도(충남) |
|   JEONBUK   | jbe.go.kr | 전라북도(전북) |
|   JEONNAM   | jne.go.kr | 전라남도(전남) |
|  GYEONGBUK  |   gbe.kr  | 경상북도(경북) |
|  GYEONGNAM  | gne.go.kr | 경상남도(경남) |
|     JEJU    | jje.go.kr |      제주      |

#### SchoolType

|   학교 유형  | value |
|:------------:|:-----:|
| KINDERGARTEN |   1   |
|  ELEMENTARY  |   2   |
|    MIDDLE    |   3   |
|     HIGH     |   4   |


### 학교

#### School
|      |          School 생성자         |
|------|:------------------------------:|
| edu  |      교육청 코드 ([EduLists](#edulists))      |
| code | 학교 코드 (예시: "C100000394") |
| kind |     학교 유형 ([SchoolType](#schooltype))     |
> [학교 세부정보 조회](#schoolinfo), [급식 조회](#schoolmeal)에 필요한 최소한의 학교 정보

#### SchoolSearched
|      |      SchoolSearched 생성자     |
|:----:|:------------------------------:|
|  edu |      지역 이름 (EduLists)      |
| code | 학교 코드 (예시: "C100000394") |
| kind |     학교 유형 (SchoolType)     |
| name |            학교 이름           |
| addr |            학교 주소           |
> [학교 검색](#schoolsearch)에서 반환되는 학교의 정보

#### SchoolDetail
|           |      SchoolDetail 생성자     |
|:---------:|:------------------------------:|
|    edu    |      지역 이름 (EduLists)      |
|    code   | 학교 코드 (예시: "C100000394") |
|    kind   |     학교 유형 (SchoolType)     |
|    name   |            학교 이름           |
|    addr   |            학교 주소           |
|  zipCode  |          학교 우편번호         |
|  tellNum  |          학교 전화번호         |
|   faxNum  |          학교 팩스번호         |
|  homepage |       학교 홈페이지 주소       |
> [학교 세부정보 조회](#schoolinfo)에서 반환되는 학교의 정보

### 검색

#### SchoolSearch
```js
SchoolSearch.getList(refresh = false);
```

> getList() 로 학교 목록을 받아옵니다.<br>
> 매개 변수로 true를 넣으면 다시 검색합니다.

> Promise<SchoolSearched[]> 가 반환됩니다.

### 급식

#### SchoolMeal
```js
SchoolMeal.getMeal(연도, 월);
```

> Promise<Meal[]> 이 반환됩니다.

#### Meal
|    Type   | return |
|:---------:|:------:|
|    date   |  Date  |
| breakfast |  조식  |
|   lunch   |  중식  |
|   dinner  |  석식  |
> [학교 급식](#schoolmeal) [검색](#schoolinfo)에서 반환되는 학교의 정보

### 학교 세부정보 조회

#### SchoolInfo
```js
SchoolInfo.getResult();
```

> Promise<[SchoolDetail](#schooldetail)> 가 반환됩니다.

### API
```js
const neis = require("neis");
```

#### createSchool
* 학교 객체 생성
```js
neis.createSchool(params...);
```

|           |             createSchool             |
|:---------:|:------------------------------------:|
| parameter... |            아랫 문단 참고             |
|   Return  | School, SchoolSearched, SchoolDetail |

> params 는 [School](#school), [SchoolSearched](#schoolsearched), [SchoolDetail](#schooldetail) 의 생성자와 동일합니다.<br>
> 전달된 값에 맞는 객체가 자동으로 반환됩니다.

---
* 학교 검색 객체 생성
```js
neis.createSearchInstance(검색할 문자, 교육청 코드 = ALL);
```

|     neis     |        .createSearchInstance        |
|:------------:|:-----------------------------------:|
| parameter[0] |             검색할 문자               |
| parameter[1] | 교육청 코드(모든 교육청 검색: ALL)     |
|    Return    |    [SchoolSearch](#schoolsearch)    |

> 검색은 [SchoolSearch.getList](#schoolsearch) 를 호출하세요.


---
* 학교 세부정보 조회 객체 생성
```js
neis.getSchoolInformation(검색할 문자);
```

|     neis     |        .createSearchInstance        |
|:------------:|:-----------------------------------:|
| parameter[0] |             검색할 문자              |
|    Return    |    [SchoolInfo](#SchoolInfo)        |

> 검색은 [SchoolInfo.getResult](#schoolinfo) 를 호출하세요.


---
* 학교 급식 조회 객체 생성
```js
neis.getMeal(검색할 문자);
```

|     neis     |        .createSearchInstance       |
|:------------:|:----------------------------------:|
| parameter[0] |             [School](#school)      |
|    Return    |    [SchoolInfo](#schoolinfo)       |

> 검색은 [SchoolMeal.getMeal](#schoolmeal) 를 호출하세요.