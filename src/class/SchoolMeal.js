/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const list = require("../types/EduURILists");
const School = require("../class/school/School");
const request = require("../request/Request");
const Meal = require("./meal/Meal");

const result = {};

for (let edu in list) {
	result[edu] = {};
}


/**
 * 월간 급식을 조회합니다.
 *
 * @param {School}  school      학교
 * @param {int}     year        연도
 * @param {int}     month       월
 * @param {boolean} refresh
 *
 * @returns {Promise<Meal[]>}
 */
const getMeal = (school, year, month, refresh = false) => {
	let edu = school.edu;
	return new Promise(async (resolve, reject) => {
		if (!refresh && result[edu][school.code]) {
			let ret = [];
			for (let meal in result[edu][school.code]) {
				if (result[edu][school.code][meal] instanceof Meal) {
					ret[meal] = result[edu][school.code][meal].clone();
				} else {
					ret[meal] = result[edu][school.code][meal];
				}
			}
			resolve(ret);
			return;
		}
		let response = await request("sts_sci_md00_001.ws", school.edu, {
			ay: year,
			mm: String((month < 10 ? "0" : '') + month),
			schulCode: school.code,
			schulCrseScCode: String(school.kind)
		});

		if (response.status !== 200) {
			reject("정보를 받을 수 없습니다.");
			return;
		}
		response = response.data;

		if (response !== null && response.resultSVO !== undefined && response.resultSVO.mthDietList !== undefined) {
			let lists = response.resultSVO.mthDietList;
			let date = [];
			let day = ['sun', 'mon', 'tue', 'wed', 'the', 'fri', 'sat'];
			let i = 1, prev = -1;
			for (let list of lists) {
				for (let d of day) {
					if (list[d] !== null && list[d].trim() !== '') {
						let meal = Meal.parseMonth(list[d], year, month);
						if (i < meal.date.getDate()) {
							continue;
						} //첫주의 31일 제거
						if (prev > meal.date.getDate()) {
							continue;
						} //마지막 주의 1일 제거
						i++;
						prev = meal.date.getDate();
						date[meal.date.getDate()] = meal;
					}
				}
			}
			result[edu][school.code] = date;
			let ret = [];
			for (let meal in result[edu][school.code]) {
				if (result[edu][school.code][meal] instanceof Meal) {
					ret[meal] = result[edu][school.code][meal].clone();
				} else {
					ret[meal] = result[edu][school.code][meal];
				}
			}
			resolve(ret);
			return;
		}
		reject("손상된 데이터입니다.");
	});
};


module.exports = getMeal;