/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const neis = require("../src/neis");
const SchoolType = require("../src/types/SchoolType");

neis.createSchool(neis.REGION.BUSAN, 'C100000394', neis.TYPE.HIGH).getSchoolDetail().then(school => {
	console.log("학교 명: " +
		school.name + "\n학교 코드 : " + school.code + "\n학교 설립 : " + school.fondYmd +
		"\n학교 위치 : " + school.addr + "\n학교 교육청 코드 : " + school.edu +
		"\n학교 유형 : " + SchoolType[school.kind] + "\n학교 우편 번호 : " + school.zipCode +
		"\n학교 전화 번호 : " + school.tellNum + "\n학교 팩스 번호 : " + school.faxNum +
		"\n학교 홈페이지 주소 : " + school.homepage + "\n학교 남녀 구분 : " + school.coeduScNm +
		"\n학교 설립 유형 : " + school.fondScNm + "\n학교 선생님 수 : " + school.teacherCnt
	)
});