/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const list = require("../../types/EduURILists");
let SchoolInfo, SchoolMeal, SchoolDiary;

class School {

	/**
	 * load module
	 * @internal
	 */
	static load() {
		SchoolInfo = require("../SchoolDetail");
		SchoolMeal = require("../SchoolMeal");
		SchoolDiary = require("../SchoolDiarySearch");
	}

	#edu;
	#kind;
	#code;

	constructor(edu, code, kind) {
		kind = parseInt(kind);
		if (list[edu] === undefined) {
			throw new Error(edu + "은(는) 존재하지 않는 교육청입니다.");
		}
		this.#edu = edu;
		this.#code = code;
		this.#kind = kind;
	}

	toJSON() {
		return {
			edu: this.edu,
			code: this.code,
			kind: this.kind
		};
	}


	/**
	 * 학교의 세부 정보 조회 결과를 반환합니다.
	 *
	 *  @param {boolean}    refresh     <false> 인 경우, 캐시된 데이터를 반환합니다.
	 *
	 *  @returns {Promise<SchoolDetail>}
	 */
	getSchoolDetail(refresh = false) {
		return SchoolInfo(this, refresh);
	}

	/**
	 * 월간 급식을 조회합니다.
	 *
	 * @param {int}     year        연도
	 * @param {int}     month       월
	 * @param {boolean} refresh
	 *
	 * @returns {Promise<Meal[]>}
	 */
	getMeal(year, month, refresh = false) {
		return SchoolMeal(this, year, month, refresh);
	}

	/**
	 * 학교의 학사 일정을 가져옵니다.
	 *
	 * @param {number}  month                  검색할 월
	 * @param {boolean} refresh
	 *
	 * @returns {Promise<SchoolDetail>}
	 */
	getDiary(month, refresh = false) {
		return SchoolDiary(this, month, refresh);
	}

	get edu() {
		return this.#edu;
	}

	set edu(value) {
		this.#edu = value;
	}

	get code() {
		return this.#code;
	}

	set code(value) {
		this.#code = value;
	}

	get kind() {
		return this.#kind;
	}

	set kind(value) {
		this.#kind = value;
	}

}

module.exports = School;