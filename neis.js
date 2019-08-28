/*
Copyright 2019 NLOG (박찬솔)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const School = require("./lib/class/school/School");
const SchoolSearched = require("./lib/class/school/SchoolSearched");
const SchoolDetail = require("./lib/class/school/SchoolDetail");

const SchoolSearch = require("./lib/class/SchoolSearch");
const SchoolInfo = require("./lib/class/SchoolInfo");

const SchoolDiary = require("./lib/class/SchoolDiarySearch");

const SchoolMeal = require("./lib/class/SchoolMeal");

const list = require("./lib/types/EduLists");
const scType = require("./lib/types/SchoolType");


class neis {

    /**
     * 모든 교육청 코드를 반환합니다. {교육청코드 => 교육청링크, ...}
     * @returns {{SEJONG, DAEJEON, BUSAN, JEJU, GYEONGNAM, SEOUL, DAEGU, GYEONGGI, GANGWON, ULSAN, JEONBUK, GYEONGBUK, INCHOEN, CHUNGBUK, GWANGJU, CHUNKNAM, JEONNAM}}
     */
    static getAllEducationName() {
        return JSON.parse(JSON.stringify(list));
    }

    /**
     *
     * @returns {{HIGH, MIDDLE, ELEMENTARY, KINDERGARTEN}}
     */
    static getAllSchoolType() {
        return JSON.parse(JSON.stringify(scType));
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
            data.fondScNm
        );
    }


    /**
     * 학교를 반환합니다.
     *
     * @param {string}  edu_code            교육청 코드 (/lib/types/EduLists.js 참고)
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
     *
     * @returns {School|SchoolSearched|SchoolDetail}
     */
    static createSchool(edu_code, code, kind, name = undefined, addr = undefined, fondYmd = undefined, zipCode = undefined, tellNum = undefined, faxNum = undefined, homepage = undefined, coeduScNm = undefined, fondScNm = undefined) {
        if (name !== undefined && addr !== undefined) {
            if (fondYmd !== undefined && zipCode !== undefined && tellNum !== undefined && faxNum !== undefined && homepage !== undefined && coeduScNm !== undefined && fondScNm !== undefined) {
                return new SchoolDetail(edu_code, code, kind, name, addr, zipCode, tellNum, faxNum, homepage);
            }
            return new SchoolSearched(edu_code, code, kind, name, addr);
        }
        return new School(edu_code, code, kind);
    }


    /**
     * 학교 검색 객체를 반환합니다.
     * 검색 : neis.createSearchInstance('string', 'ALL').getList();
     * @see SchoolSearch.getList
     *
     * @param {string} text                 검색할 문자열
     * @param {string} type                 교육청 코드 (/lib/types/EduLists.js 참고)
     *
     * @returns {SchoolSearch}
     */
    static createSearchInstance(text, type = 'ALL') {
        return new SchoolSearch(text, type);
    }


    /**
     * 학교의 세부 정보 조회 객체를 반환합니다.
     *
     * @param {School} school               정보를 가져올 학교의 최소한의 정보 (학교 코드, 교육청, 학교 유형{KINDERGARTEN, ELEMENTARY, MIDDLE, HIGH})
     *
     * @returns {SchoolInfo}
     */
    static getSchoolInformation(school) {
        return new SchoolInfo(school);
    }


    /**
     * 학교의 학사 일정 조회 객체를 반환합니다.
     *
     * @param {School} school               정보를 가져올 학교의 최소한의 정보 (학교 코드, 교육청, 학교 유형{KINDERGARTEN, ELEMENTARY, MIDDLE, HIGH})
     *
     * @returns {SchoolDiarySearch}
     */
    static getSchoolDiary(school) {
        return new SchoolDiary(school);
    }

    /**
     * 학교 월간 급식 조회 객체를 반환합니다.
     * /tests/test_meal.js 파일 참고
     * @see SchoolMeal.getMeal
     *
     * @param {School} school               학교 객체
     *
     * @returns {SchoolMeal}
     */
    static getMeal(school) {
        return new SchoolMeal(school);
    }


}

module.exports = neis;