/*
Copyright 2019 NLOG (박찬솔)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const neis = require("../neis"), month = 9;

neis.createSchool(neis.REGION.BUSAN, 'C100000394', neis.TYPE.HIGH).getDiary(month).then(list => {
	for (let day of Object.keys(list)) {
		console.log(`${month}/${day}: ${list[day].join(", ")}`);
	}
});

/*

RESULT:

9/4: 모의수능(3년), 학력평가(1,2)
9/7: 토요휴업일
9/12: 추석연휴
9/13: 추석
9/14: 토요휴업일
9/21: 토요휴업일
9/24: 영어듣기(1학년)
9/25: 영어듣기(2학년)
9/26: 영어듣기(3학년)
9/28: 토요휴업일

 */