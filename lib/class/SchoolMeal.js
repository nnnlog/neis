/*
Copyright 2019 NLOG (박찬솔)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const list = require("../types/EduLists");
const request = require("request");
const School = require("../class/school/School");
const EduSession = require("../EduSession");
const Meal = require("./meal/Meal");

class SchoolMeal {

    #school;

    constructor(school) {
        if (!(school instanceof School)) {
            throw new Error("School 객체가 필요합니다.");
        }
        this.#school = school;
    }

    get school() {
        return this.#school;
    }

    set school(value) {
        this.#school = value;
    }

    /**
     * 월간 급식을 조회합니다.
     *
     * @param {int} year                    연도
     * @param {int} month                   월
     *
     * @returns {Promise<Meal[]>}
     */
    async getMeal(year, month) {
        return new Promise(async (resolve, reject) => {
            request.post("https://stu." + list[this.school.edu] + "/sts_sci_md00_001.ws", {
                headers: {
                    Cookie: 'JSESSIONID=' + await EduSession(this.school.edu).getCookie()
                },
                body: {
                    ay: year,
                    mm: String((month < 10 ? "0" : '') + month),
                    schulCode: this.school.code,
                    schulCrseScCode: String(this.school.kind)
                },
                json: true
            }, (err, res, body) => {
                let lists = body.resultSVO.mthDietList;
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
                resolve(date);
            });
        });
    }


}

module.exports = SchoolMeal;