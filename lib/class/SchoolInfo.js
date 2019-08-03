/*
Copyright 2019 NLOG (박찬솔)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const list = require("../types/EduLists");
const EduSession = require("../EduSession");
const SchoolDetail = require("./school/SchoolDetail");
const School = require("./school/School");
const request = require("request");

class SchoolInfo {

    #school;

    constructor(school) {
        if (!school instanceof School) {
            throw new Error("School 객체가 필요합니다.");
        }
        let code = school.edu;
        if (list[code] === undefined) {
            throw new Error(code + "은(는) 존재하지 않는 교육청입니다.");
        }
        this.#school = school;
    }

    /**
     * 학교의 세부 정보를 가져옵니다.
     *
     * @returns {Promise<SchoolDetail>}
     */
    async getResult() {
        let school = this.#school;
        return new Promise(async (resolve) => {
            let response = null;
            await (new Promise(async (r1, reject) => {
                request(
                    "https://stu." + list[school.edu] + "/sts_sci_si00_001.ws",
                    {
                        json: true,
                        headers: {
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36',
                            'Cookie': 'JSESSIONID=' + await EduSession(school.edu).getCookie()
                        },
                        body: {
                            schulCode: school.code,
                            schulCrseScCode: String(school.kind),
                            schulKndScCode: "0" + school.kind
                        }
                    },
                    (err, res, body) => {
                        if (err) {
                            reject();
                        } else {
                            r1(body);
                        }
                    });
            })).then(body => response = body).catch(e => {
                throw new Error(school.edu + " 학교 검색 실패");
            });
            if (response != null && response.resultSVO !== undefined && response.resultSVO.swcSciSi00M00List !== undefined) {
                let lists = response.resultSVO.swcSciSi00M00List[0];
                let sc = new SchoolDetail(
                    school.edu,
                    school.code,
                    response.resultSVO.schulCrseScCode,
                    lists.kraOrgNm,
                    lists.zipAdres,
                    lists.zipCode,
                    lists.orgTelno,
                    lists.orgFaxno,
                    lists.homepage
                );
                resolve(sc);
            }
            resolve(null);
        });
    }

    get school() {
        return this.#school;
    }

    set school(value) {
        if (!value instanceof School) {
            throw new Error("School 객체가 필요합니다.");
        }
        let code = value.edu;
        if (list[code] === undefined) {
            throw new Error(code + "은(는) 존재하지 않는 교육청입니다.");
        }
        this.#school = value;
    }

}

module.exports = SchoolInfo;