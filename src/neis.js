/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const School = require("./class/school/School");
const SchoolSearched = require("./class/school/SchoolSearched");
const SchoolDetail = require("./class/school/SchoolDetail");

const SchoolSearch = require("./class/SchoolSearch");

const Meal = require("./class/meal/Meal");

const list = require("./types/EduURILists");
const region = require("./types/RegionLists");
const scType = require("./types/SchoolType");

class neis {

	/**
	 * 모든 교육청 코드를 반환합니다. {교육청코드 => 교육청링크, ...}
	 * @returns {{SEJONG, DAEJEON, BUSAN, JEJU, GYEONGNAM, SEOUL, DAEGU, GYEONGGI, GANGWON, ULSAN, JEONBUK, GYEONGBUK, INCHOEN, CHUNGBUK, GWANGJU, CHUNKNAM, JEONNAM}}
	 */
	static get URI() {
		return JSON.parse(JSON.stringify(list));
	}

	/**
	 * 모든 지역을 반환합니다. {지역명 => 교육청코드}
	 * 지역명과 교육청코드는 같습니다.
	 *
	 * 따라서, 아래와 같이 코드를 작성할 수 있습니다.
	 * neis.createSchool(neis.REGION.SEOUL, '학교코드', neis.TYPE.HIGH);
	 *
	 * @returns {{SEJONG, DAEJEON, BUSAN, JEJU, GYEONGNAM, SEOUL, DAEGU, GYEONGGI, GANGWON, ULSAN, JEONBUK, GYEONGBUK, INCHOEN, CHUNGBUK, GWANGJU, CHUNKNAM, JEONNAM}}
	 */
	static get REGION() {
		return JSON.parse(JSON.stringify(region));
	}

	/**
	 *
	 * @returns {{HIGH, MIDDLE, ELEMENTARY, KINDERGARTEN}}
	 */
	static get TYPE() {
		return JSON.parse(JSON.stringify(scType));
	}

	/**
	 * 급식 문자열에서 알러지 정보를 제거합니다.
	 * @param {string} text
	 */
	static removeAllergy(text) {
		return Meal.removeAllergy(text);
	}

	/**
	 * School.toJSON() 의 데이터를 다시 학교 객체로 만듭니다.
	 *
	 * @param data
	 * @returns {School|SchoolSearched|SchoolDetail}
	 */
	static createSchoolFromJSON(data) {
		return neis.createSchool(
				data.edu,
				data.code,
				data.kind,

				data.name,
				data.addr,

				data.fondYmd,
				data.zipCode,
				data.tellNum,
				data.faxNum,
				data.homepage,
				data.coeduScNm,
				data.fondScNm,
				data.teacherCnt
		);
	}


	/**
	 * 학교를 반환합니다.
	 *
	 * @param {string}  edu_code            교육청 코드 (/lib/types/RegionLists.js 참고)
	 * @param {string}  code                학교 코드
	 * @param {int}     kind                학교 종류 (/lib/types/SchoolType.js 참고)
	 * @param {string}  name                학교 이름
	 * @param {string}  addr                학교 주소
	 * @param {string}  fondYmd             학교 설립일
	 * @param {string}  zipCode             학교 우편 번호
	 * @param {string}  tellNum             학교 전화 번호
	 * @param {string}  faxNum              학교 팩스 번호
	 * @param {string}  homepage            학교 홈페이지 주소
	 * @param {string}  coeduScNm           학교 남녀 유형 (남/여/남여공학)
	 * @param {string}  fondScNm            학교 설립 유형 (공립/사립)
	 * @param {string}  teacherCnt          학교 선생님 수
	 *
	 * @returns {School|SchoolSearched|SchoolDetail}
	 */
	static createSchool(edu_code, code, kind, name = undefined, addr = undefined, fondYmd = undefined, zipCode = undefined, tellNum = undefined, faxNum = undefined, homepage = undefined, coeduScNm = undefined, fondScNm = undefined, teacherCnt = undefined) {
		if (name !== undefined && addr !== undefined) {
			if (fondYmd !== undefined && zipCode !== undefined && tellNum !== undefined && faxNum !== undefined && homepage !== undefined && coeduScNm !== undefined && fondScNm !== undefined && teacherCnt !== undefined) {
				return new SchoolDetail(edu_code, code, kind, name, addr, fondYmd, zipCode, tellNum, faxNum, homepage, coeduScNm, fondScNm, teacherCnt);
			}
			return new SchoolSearched(edu_code, code, kind, name, addr);
		}
		return new School(edu_code, code, kind);
	}


	/**
	 * 학교를 검색합니다.
	 *
	 * 검색 : neis.createSearchInstance('string', 'ALL').getList();
	 *
	 * @param {string}  text                 검색할 문자열
	 * @param {string}  type                 교육청 코드 (/lib/types/RegionLists.js 참고)
	 * @param {boolean} refresh              true 인 경우 재검색합니다.
	 *
	 * @returns {Promise<SchoolSearched[]>}
	 */
	static searchSchool(text, type = 'ALL', refresh = false) {
		return SchoolSearch(text, type, refresh);
	}

}

module.exports = neis;

School.load();