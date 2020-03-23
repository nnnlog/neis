/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const SchoolSearched = require("./SchoolSearched");

class SchoolDetail extends SchoolSearched {


	#fondYmd; //설립일
	#zipCode;
	#tellNum;
	#faxNum;
	#homepage;
	#coeduScNm; //남/여/남여공학
	#fondScNm; //공립/사립
	#teacherCnt; //선생님 수

	constructor(edu, code, kind, name, addr, fondYmd, zipCode, tellNum, faxNum, homepage, coeduScNm, fondScNm, teacherCnt) {
		super(edu, code, kind, name, addr);
		this.#fondYmd = fondYmd;
		this.#zipCode = zipCode;
		this.#tellNum = tellNum;
		this.#faxNum = faxNum;
		this.#homepage = homepage;
		this.#coeduScNm = coeduScNm;
		this.#fondScNm = fondScNm;
		this.#teacherCnt = teacherCnt;
	}

	toJSON() {
		return Object.assign(super.toJSON(), {
			fondYmd: this.fondYmd,
			zipCode: this.zipCode,
			tellNum: this.tellNum,
			faxNum: this.faxNum,
			homepage: this.homepage,
			coeduScNm: this.coeduScNm,
			fondScNm: this.fondScNm,
			teacherCnt: this.teacherCnt
		});
	}

	get fondYmd() {
		return this.#fondYmd;
	}

	set fondYmd(value) {
		this.#fondYmd = value;
	}

	get zipCode() {
		return this.#zipCode;
	}

	set zipCode(value) {
		this.#zipCode = value;
	}

	get tellNum() {
		return this.#tellNum;
	}

	set tellNum(value) {
		this.#tellNum = value;
	}

	get faxNum() {
		return this.#faxNum;
	}

	set faxNum(value) {
		this.#faxNum = value;
	}

	get homepage() {
		return this.#homepage;
	}

	set homepage(value) {
		this.#homepage = value;
	}

	get coeduScNm() {
		return this.#coeduScNm;
	}

	set coeduScNm(value) {
		this.#coeduScNm = value;
	}

	get fondScNm() {
		return this.#fondScNm;
	}

	set fondScNm(value) {
		this.#fondScNm = value;
	}

	get teacherCnt() {
		return this.#teacherCnt;
	}

	set teacherCnt(value) {
		this.#teacherCnt = value;
	}

}

module.exports = SchoolDetail;