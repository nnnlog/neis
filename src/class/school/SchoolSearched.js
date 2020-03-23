/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const School = require("./School");

class SchoolSearched extends School {

	#name;
	#addr;

	constructor(edu, code, kind, name, addr) {
		super(edu, code, kind);
		this.#name = name;
		this.#addr = addr;
	}

	toJSON() {
		return Object.assign(super.toJSON(), {
			name: this.name,
			addr: this.addr
		});
	}

	get name() {
		return this.#name;
	}

	set name(value) {
		this.#name = value;
	}

	get addr() {
		return this.#addr;
	}

	set addr(value) {
		this.#addr = value;
	}

}

module.exports = SchoolSearched;