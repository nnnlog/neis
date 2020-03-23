/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const list = require("../types/EduURILists");
const request = require("../request/Request");
const SchoolSearched = require("./school/SchoolSearched");

let result = {ALL: {}};

for (let edu in list) {
	result[edu] = {};
}

/**
 * @param {string}      name                검색할 이름
 * @param {string}      edu                 교육청 이름 (전체 검색의 경우는 `ALL`)
 * @param {boolean}     refresh             true면 재검색합니다.
 * @returns {Promise<SchoolSearched[]>}
 */
const search = async (name, edu = 'ALL', refresh = false) => {
	return new Promise(async (resolve) => {
		if (result[edu][name] !== undefined && !refresh) {
			resolve(result[edu][name].slice(0));
		}

		resolve((await fetchData(name, edu)).slice(0));
	});
};

/**
 *
 * @returns {Promise<SchoolSearched[]>}
 */
const fetchData = async (searchString, code) => {
	let complete = [], res = [];

	let search = async (code) => {
		let response = await request("spr_ccm_cm01_100.ws", code, {kraOrgNm: searchString});

		if (response.status !== 200) {
			return [];
		}

		response = response.data;
		if (response !== null && response.resultSVO !== undefined && response.resultSVO.orgDVOList !== undefined) {
			let lists = response.resultSVO.orgDVOList;
			for (let data of lists) {
				data = data.data;
				res.push(new SchoolSearched(code, data.orgCode, parseInt(data.schulCrseScCode), data.kraOrgNm, data.zipAdres));
			}
		}
	};

	if (code === 'ALL') {
		for (let code in list) {
			complete.push(search(code, true));
		}

		return Promise.all(complete).then(() => result[code][searchString] = res);
	} else {
		return result[code][searchString] = await search(code);
	}
};

module.exports = search;