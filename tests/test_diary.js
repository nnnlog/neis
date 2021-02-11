/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const neis = require("../src/neis");

neis.createSchool(neis.REGION.BUSAN, 'C100000394', neis.TYPE.HIGH).getDiary(2, 2020).then(list => {
	for (let day of Object.keys(list)) {
		console.log(`2/${day}: ${list[day].join(", ")}`);
	}
});

/*

RESULT:

2/1: 개학일(1,2년), 겨울방학(3년)/3
2/2: 개학일(3년)
2/6: 토요휴업일
2/10: 졸업식(3년)/3, 종업식(1,2년)/1/2
2/11: 설연휴, 학년말방학
2/12: 설연휴, 학년말방학
2/13: 토요휴업일, 학년말방학
2/14: 학년말방학
2/15: 학년말방학
2/16: 학년말방학
2/17: 학년말방학
2/18: 학년말방학
2/19: 학년말방학
2/20: 토요휴업일, 학년말방학
2/21: 학년말방학
2/22: 학년말방학
2/23: 학년말방학
2/24: 학년말방학
2/25: 학년말방학
2/26: 학년말방학
2/27: 토요휴업일, 학년말방학
2/28: 학년말방학

 */