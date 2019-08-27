/*
Copyright 2019 NLOG (박찬솔)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const list = require("./types/EduLists");
const request = require("request");

let lists = {};

/**
 *
 * @name EduSession
 * @desc 나이스 요청용 인증 셰션
 */
class EduSession {

    #edu;
    #cookie;

    /**
     *
     * @param code
     */
    constructor(code) {
        if (list[code] === undefined) {
            throw new Error(code + "은(는) 존재하지 않는 교육청입니다.");
        }
        this.#edu = code;
        this.#cookie = "";
    }

    /**
     *
     * @returns {Promise<string>}
     */
    async getCookie() {
        if (this.time < Date.now() || this.#cookie === '') {
            return await this.refreshCookie();
        }
        return this.#cookie;
    }

    /**
     *
     * @returns {Promise<string>}
     */
    async refreshCookie() {
        let cookie_ = '', code = this.#edu;
        await (new Promise(resolve => {
            request("https://stu." + list[code] + "/edusys.jsp?page=stsm42310", {
                    headers: {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36'
                    }
                },
                (err, res, body) => {
                    if (err) {
                        throw new Error(code + " 데이터를 받을 수 없습니다.");
                    }
                    resolve(res.headers['set-cookie'][1].substr("JSESSIONID=".length).replace('Path=/', ''));
                });
        })).then(cookie => {
            cookie_ = cookie;
        }).catch(e => {
            throw e;
        });

        if (cookie_ === '') {
            this.time = Date.now() - 1;
            throw new Error("전달된 코드가 없습니다.");
        }

        this.time = Date.now() + 1000 * 60 * 30;
        return this.#cookie = cookie_;
    }


}

/**
 *
 * @param code
 * @returns {EduSession}
 */
module.exports = code => {
    if (lists[code] instanceof EduSession) {
        return lists[code];
    }

    return lists[code] = new EduSession(code);
};