/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const request = require("../request/Request");
const School = require("./school/School");

const result = {};

/**
 * 학교의 학사 일정을 가져옵니다.
 *
 * @param {School}  school
 * @param {number}  month                  검색할 월
 * @param {boolean} refresh
 *
 * @returns {Promise<SchoolDetail>}
 */
const search = async (school, month, refresh = false) => {
	if (1 > month || month > 12) {
		throw new Error("월의 범위는 1-12 입니다.");
	}
	let sem = (month < 3 || month > 8) ? 2 : 1, year = (new Date()).getFullYear() + (month < 3 ? 1 : 0);
	return new Promise(async (resolve, reject) => {
		if (result[school.code] !== undefined && result[school.code][year] !== undefined) {
			if (!refresh && result[school.code][month] !== undefined) {
				resolve(JSON.parse(JSON.stringify(result[school.code][year][month])));
				return;
			}
			if (sem === 1) {
				for (let i = 3; i <= 8; i++) {
					result[school.code][year][i] = {};
				}
			} else {
				for (let i = 9; i <= 12; i++) {
					result[school.code][year][i] = {};
				}
				for (let i = 1; i <= 2; i++) {
					result[school.code][year + 1][i] = {};
				}
			}
		}

		let response = await request("sts_sci_sf00_001.ws", school.edu, {
			schulCode: school.code,
			schulCrseScCode: String(school.kind),
			schulKndScCode: "0" + school.kind,
			sem: sem
		}).catch(e => e);

		if (response.status !== 200) {
			reject("정보를 받을 수 없습니다.");
			return;
		}

		response = response.data;
		if (response !== null && response.resultSVO !== undefined && response.resultSVO.selectYear !== undefined) {
			let lists = response.resultSVO.selectYear;
			for (let list of lists) {
				for (let num = 1; num <= 12; num++) {
					let events = list["event" + num];
					if (events !== undefined && (events = events.trim()) !== "") {
						events = events.split("|");
						for (let event of events) {
							let splited = event.split(":");
							let year = splited[1].substr(0, 4), month = splited[1].substr(4, 2),
									day = splited[1].substr(6);

							year = parseInt(year);
							month = parseInt(month);
							day = parseInt(day);

							if (splited[2] === "" || splited[2] === undefined) {
								continue;
							}
							if (result[school.code] === undefined) {
								result[school.code] = {};
							}
							if (result[school.code][year] === undefined) {
								result[school.code][year] = {};
							}
							if (result[school.code][year][month] === undefined) {
								result[school.code][year][month] = {};
							}
							if (result[school.code][year][month][day] === undefined) {
								result[school.code][year][month][day] = [];
							}
							result[school.code][year][month][day].push(splited[2]);
						}
					}
				}
			}
			let ret = result[school.code] && result[school.code][year] && result[school.code][year][month];
			resolve(ret || {});
		} else {
			reject("조회를 실패했습니다.");
		}
	});
};

module.exports = search;
