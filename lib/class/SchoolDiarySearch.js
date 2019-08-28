/*
Copyright 2019 NLOG (박찬솔)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const list = require("../types/EduLists");
const EduSession = require("../EduSession");
const School = require("./school/School");
const request = require("request");

class SchoolDiarySearch {

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
     * 학교의 학사 일정을 가져옵니다.
     *
     * @param {number} sem                  1 or 2 (1학기, 2학기)
     * @returns {Promise<SchoolDetail>}
     */
    async getResult(sem) {
        let school = this.#school;
        return new Promise(async (resolve) => {
            let response = null;
            await (new Promise(async (r1, reject) => {
                request(
                    "https://stu." + list[school.edu] + "/sts_sci_sf00_001.ws",
                    {
                        json: true,
                        headers: {
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36',
                            'Cookie': 'JSESSIONID=' + await EduSession(school.edu).getCookie()
                        },
                        body: {
                            schulCode: school.code,
                            schulCrseScCode: String(school.kind),
                            schulKndScCode: "0" + school.kind,
                            sem: sem
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
                throw new Error(school.edu + " 학교 데이터 조회 실패");
            });
            if (response !== null && response.resultSVO !== undefined && response.resultSVO.selectYear !== undefined) {
                let lists = response.resultSVO.selectYear, res = {};
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

                                let date = new Date(year, month, day);

                                if (splited[2] === "" || splited[2] === undefined) {
                                    continue;
                                }
                                if (res[year] === undefined) {
                                    res[year] = {};
                                }
                                if (res[year][month] === undefined) {
                                    res[year][month] = {};
                                }
                                if (res[year][month][day] === undefined) {
                                    res[year][month][day] = [];
                                }
                                res[year][month][day].push(splited[2]);
                            }
                        }
                    }
                }
                //console.log(lists)
                //TODO: create diary instance
                resolve(res);
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

module.exports = SchoolDiarySearch;