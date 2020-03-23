/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const list = require("../types/EduURILists");
const request = require("../request/Request");
const neis = require("../neis");

const result = {};

for (let edu in list) {
	result[edu] = {};
}

const get = (school, refresh = false) => {
	return new Promise(async (resolve, reject) => {
		let edu = school.edu;
		if (!refresh && result[edu][school.code]) {
			resolve(neis.createSchoolFromJSON(result[edu][school.code]));
			return;
		}

		let response = await request("sts_sci_si00_001.ws", school.edu, {
			schulCode: school.code,
			schulCrseScCode: String(school.kind),
			schulKndScCode: "0" + school.kind
		});

		if (response.status !== 200) {
			reject("정보를 받을 수 없습니다.");
			return;
		}

		response = response.data;
		if (response !== null && response.resultSVO !== undefined && response.resultSVO.swcSciSi00M00List !== undefined) {
			let lists = response.resultSVO.swcSciSi00M00List[0];
			let sc = neis.createSchool(
					school.edu,
					school.code,
					response.resultSVO.schulCrseScCode,
					lists.kraOrgNm,
					lists.zipAdres,
					lists.fondYmd,
					lists.zipCode,
					lists.orgTelno,
					lists.orgFaxno,
					lists.homepage,
					lists.coeduScNm,
					lists.fondScNm,
					parseInt(response.resultSVO.gyowonCnList[0].tcnt)
			);
			result[edu][school.code] = sc.toJSON();
			resolve(sc);
			return;
		}
		reject("손상된 데이터입니다.");
	});
};

module.exports = get;