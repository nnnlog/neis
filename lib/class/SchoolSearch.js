/*
Copyright 2019 NLOG (박찬솔)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const list = require("../types/EduLists");
const EduSession = require("../EduSession");
const SchoolSearched = require("./school/SchoolSearched");
const request = require("request");

class SchoolSearch {

    #result;
    #name;
    #code;

    constructor(name, code = 'ALL') {
        if (code !== 'ALL' && list[code] === undefined) {
            throw new Error(code + "은(는) 존재하지 않는 교육청입니다.");
        }

        this.#result = [];
        this.#name = name;
        this.#code = code;
    }

    /**
     *
     * @param {boolean}     refresh             true 인 경우 재검색합니다.
     * @returns {Promise<SchoolSearched[]>}
     */
    async getList(refresh = false) {
        return new Promise(async (resolve) => {
            if (this.#result.length > 0 && !refresh) {
                resolve(this.#result.slice(0));
            }

            resolve(await this.fetchData());
        });
    }

    /**
     *
     * @returns {Promise<SchoolSearched[]>}
     */
    async fetchData() {
        let searchString = this.name;
        let search = async (code) => {
            let response = null;
            await (new Promise(async (resolve, reject) => {
                request(
                    "https://stu." + list[code] + "/spr_ccm_cm01_100.ws",
                    {
                        json: true,
                        headers: {
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
                            'Cookie': 'JSESSIONID=' + await EduSession(code).getCookie()
                        },
                        body: {
                            kraOrgNm: searchString || ""
                        }
                    },
                    (err, res, body) => {
                        if (err) {
                            reject();
                        } else {
                            resolve(body);
                        }
                    });
            })).then(body => response = body).catch(e => {
                throw new Error(code + " 학교 검색 실패");
            });
            if (response != null && response.resultSVO !== undefined && response.resultSVO.orgDVOList !== undefined) {
                let lists = response.resultSVO.orgDVOList, res = [];
                for (let data of lists) {
                    data = data.data;
                    res.push(new SchoolSearched(code, data.orgCode, parseInt(data.schulCrseScCode), data.kraOrgNm, data.zipAdres));
                }
                return res;
            }
            return [];
        };

        if (this.code === 'ALL') {
            this.#result = [];
            for (let code in list) {
                this.#result = this.#result.concat(await search(code));
            }
            return this.#result;
        } else {
            return (this.#result = await search(this.code));
        }
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#result = [];
        this.#name = value;
    }

    get code() {
        return this.#code;
    }

    set code(value) {
        this.#result = [];
        this.#code = value;
    }

}

module.exports = SchoolSearch;