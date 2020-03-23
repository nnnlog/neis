/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

process.env.timeZone = "Asia/Seoul";

const neis = require("../src/neis");

const school = neis.createSchool(neis.REGION.BUSAN, "C100000394", neis.TYPE.HIGH);
school.getMeal(2019, 12).then(d => {
	d.forEach(meal => {
		console.log(meal.date.toDateString() + "\n" +
			"조식 : " + meal.breakfast + "\n" +
			"중식 : " + meal.lunch + "\n" +
			"석식 : " + meal.dinner + "\n"
		);
	});
	console.log("1일 급식 : " + "\n" +
		"조식 : " + d[1].breakfast + "\n" +
		"중식 : " + d[1].lunch + "\n" +
		"석식 : " + d[1].dinner + "\n");

});

//8월 1일 급식:
/*
조식 : 없었음
중식 : 통밀밥(고)6.
쇠고기미역국(고)5.6.16.
새우까스(고)1.2.5.6.9.
어묵조림(방울,동래고)1.5.6.13.
배추김치(동래고)9.13.
근대나물(동래고)5.6.
석식 : 없었음
 */