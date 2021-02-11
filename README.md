# NEIS API

[![npm version](https://badgen.net/npm/v/neis)](https://www.npmjs.com/package/neis) [![npm](https://badgen.net/npm/dt/neis)](https://www.npmjs.com/package/neis)  [![npm](https://badgen.net/npm/license/neis)](https://www.npmjs.com/package/neis) 

* 학교 정보, 학교 검색, 급식 조회, 학사 일정 조회 API를 제공합니다.

[![contact](https://badgen.net/badge/telegram/nnnlog/cyan?icon=telegram)](https://t.me/nnnlog) 

### How to use?
#### 설치
```
npm install neis
```

##### Required
```
node >= 12.0
```

> Private Field를 사용하므로 12.0 이후의 Node.js 버전을 요구합니다.

#### 예제 코드
```js
const neis = require("neis");
neis.createSchool(neis.REGION.BUSAN, "C100000394", neis.TYPE.HIGH).getMeal(2019, 8).then(meal => {
    //write your code...
});
```
or...
```js
const neis = require("neis");
let meal = await neis.createSchool(neis.REGION.BUSAN, "C100000394", neis.TYPE.HIGH).getMeal(2019, 8);
//write your code...
```

#### 성능 및 기능 비교

##### More feature, more fast

| Comparsion | neis    | node-school-kr |
|:------------:|:---------:|:----------------:|
| 급식       | 468ms   | 517.2ms        |
| 학사일정   | 407.8ms | 469.6ms        |
| 학교검색   | 301.8ms | 기능 없음       |
| 세부정보   | 426.8ms | 기능 없음     |

> [Bench code](https://github.com/nnnlog/neis/blob/master/tests/bench/)

* 캐시 데이터 적용
* 세부정보 조회, 학교 검색 API 지원
* Promise 를 통한 비동기 지원
* 비동기 처리를 통한 성능 향상
* 학교 정보 JSON 형태로 저장 및 불러오기 지원

#### Sample
> [급식 예제 소스](https://github.com/nnnlog/neis/blob/master/tests/test_meal.js)<br>
> [학사일정 예제 소스](https://github.com/nnnlog/neis/blob/master/tests/test_diary.js)<br>
> [세부정보 조회 예제 소스](https://github.com/nnnlog/neis/blob/master/tests/test_detail.js)<br>
> [검색 예제 소스](https://github.com/nnnlog/neis/blob/master/tests/test_search.js)<br>

---
## School Class

#### School
|      |          School 생성자         |
|------|:------------------------------:|
| edu  |      교육청 코드 ([RegionLists](#regionlists))      |
| code | 학교 코드 (예시: "C100000394") |
| kind |     학교 유형 ([SchoolType](#schooltype))     |
> [학교 세부정보 조회](#학교-세부정보-조회), [급식 조회](#급식)에 필요한 최소한의 학교 정보

#### SchoolSearched
|      |      SchoolSearched 생성자     |
|:----:|:------------------------------:|
|  edu |      지역 이름 ([RegionLists](#regionlists))      |
| code | 학교 코드 (예시: "C100000394") |
| kind |     학교 유형 ([SchoolType](#schooltype))     |
| name |            학교 이름           |
| addr |            학교 주소           |
> [학교 검색](#searchschool)에서 반환되는 학교의 정보

#### SchoolDetail
|           |      SchoolDetail 생성자     |
|:---------:|:------------------------------:|
|  fondYmd  |           학교 설립일           |
|    edu    |      지역 이름 ([RegionLists](#regionlists))      |
|    code   | 학교 코드 (예시: "C100000394") |
|    kind   |     학교 유형 ([SchoolType](#schooltype))     |
|    name   |            학교 이름           |
|    addr   |            학교 주소           |
|  zipCode  |          학교 우편번호         |
|  tellNum  |          학교 전화번호         |
|   faxNum  |          학교 팩스번호         |
|  homepage |       학교 홈페이지 주소       |
| coeduScNm |      성별(남/여/남여공학)      |
|  fondScNm |     설립 유형 (사립, 공립)     |
|  teacherCnt |          선생님 수         |
> [학교 세부정보 조회](#학교-세부정보-조회)에서 반환되는 학교의 정보


---
## API

### 검색
 * [neis.searchSchool](#searchschool)

### 급식

```js
School.getMeal(year, month, refresh = false);
```

> Promise<[Meal](#meal.js)[]> 이 반환됩니다.

##### Meal.js
|    Type   | return |
|:---------:|:------:|
|    date   |  Date  |
| breakfast |  조식  |
|   lunch   |  중식  |
|   dinner  |  석식  |

* 알러지 표시 제거
```js
neis.removeAllergy("추억의 도시락(고)1.2.5.6.9.10.");
```
```
Output: 추억의 도시락(고)
```

### 학교 세부정보 조회

```js
School.getSchoolDetail(refresh = false);
```

> Promise<[SchoolDetail](#schooldetail)> 가 반환됩니다.<br>
> 예제 코드 : [/tests/test_detail.js](https://github.com/nnnlog/neis/blob/master/tests/test_detail.js)


### 학사 일정 조회

```js
School.getDiary(month, year, refresh = false);
```

> 일정을 가져올 월을 입력해주세요.<br>
> 2021년 2월 정보를 가져오려면, 해당 학사 일정은 2020학년도에 속하므로, 2020년으로 인자를 전달해야 합니다.<br>
> [`Promise<Object>`](https://github.com/nnnlog/neis/blob/master/tests/test_diary.js#L23-L32) 가 반환됩니다.


### neis
```js
const neis = require("neis");
```

#### 교육청, 지역, 유형
* [neis.URI](#urilists) : 교육청 URL
* [neis.REGION](#regionlists) : 교육청 지역명 (코드)
* [neis.TYPE](#schooltype) : 학교 유형 (유치원, 초등학교, 중학교, 고등학교)

#### createSchool
* 학교 객체 생성
```js
neis.createSchool(...params);
```

|           |             createSchool             |
|:---------:|:------------------------------------:|
| ...parameter |            아랫 문단 참고             |
|   Return  | School, SchoolSearched, SchoolDetail |

> params 는 [School](#school), [SchoolSearched](#schoolsearched), [SchoolDetail](#schooldetail) 의 생성자와 동일합니다.<br>
> 전달된 값에 맞는 객체가 자동으로 반환됩니다.

#### createSchoolFromJSON
```js
neis.createSchoolFromJSON(data);
```

|           |             createSchool             |
|:---------:|:------------------------------------:|
| parameter... |            아랫 문단 참고             |
|   Return  | School, SchoolSearched, SchoolDetail |

> params 는 [School](#school).toJSON() 에서 반환된 데이터가 들어갑니다.<br>
> 전달된 JSON 값에 맞는 객체가 자동으로 반환됩니다.


#### searchSchool
```js
neis.searchSchool(searchString, edu = 'ALL', refresh = false);
```

|     neis     |        .createSearchInstance        |
|:------------:|:-----------------------------------:|
| searchString |             검색할 문자               |
|     edu    | 지역 코드(모든 교육청 : ```ALL```)     |
|     refresh    | 재검색 여부(기본값: ```false```)     |
|    Return    |    Promise<[SchoolSearched](#schoolsearched) []>   |


> 학교 목록을 받아옵니다.<br>

> Promise<SchoolSearched[]> 가 반환됩니다.<br>
> 예제 코드 : [/tests/test_search.js](https://github.com/nnnlog/neis/blob/master/tests/test_search.js)


### 타입

#### URILists

* 각 교육청에 대한 나이스 서비스 링크를 담고 있습니다.

```js
neis.URI
```

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

#### RegionLists

```js
neis.REGION
```

| 교육청 코드 |     지역명     |
|:-----------:|:--------------:|
|    SEOUL     |    서울      |
|    BUSAN     |     부산      |
|    DAEGU     |     대구      |
|   INCHOEN    |     인천      |
|   GWANGJU    |     광주      |
|   DAEJEON    |     대전      |
|    ULSAN     |     울산      |
|    SEJONG    |     세종      |
|   GYEONGGI   |     경기      |
|   GANGWON    |     강원      |
|   CHUNGBUK  | 충청북도(충북) |
|   CHUNKNAM  | 충청남도(충남) |
|   JEONBUK   | 전라북도(전북) |
|   JEONNAM   | 전라남도(전남) |
|  GYEONGBUK  | 경상북도(경북) |
|  GYEONGNAM  | 경상남도(경남) |
|     JEJU     |     제주      |

#### SchoolType

```js
neis.TYPE
```

|   학교 유형  | value |
|:------------:|:-----:|
| KINDERGARTEN |   1   |
|  ELEMENTARY  |   2   |
|    MIDDLE    |   3   |
|     HIGH     |   4   |


## TODO
* [ ] 학교 상세정보 조회 - 나이스에서 반환하는 모든 값 제공  
* [ ] web javascript 지원
