/*
Copyright 2019 -2020 박찬솔

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

class Meal {

	/**
	 * @param {string} str
	 * @param {int} year
	 * @param {int} month
	 * @returns {Meal}
	 */
	static parseMonth(str, year, month) {
		if (str === undefined) {
			throw new Error();
		}
		let date = new Date();
		let splited = str.split('<br />');
		date.setHours(0, 0, 0, 0);
		date.setFullYear(year, month - 1, splited.shift());

		let mealString = '';
		let mealList = ['[조식]', '[중식]', '[석식]'];

		let meals = [];
		meals[mealList[0]] = [];
		meals[mealList[1]] = [];
		meals[mealList[2]] = [];
		if (mealList.includes(splited[0])) {
			mealString = splited.shift();
		} else {
			return new Meal(date, '', '', '');
		}

		let currentString = '';
		while ((currentString = splited.shift()) !== undefined) {
			if (mealList.includes(currentString)) {
				mealString = currentString;
				continue;
			}
			meals[mealString].push(currentString);
		}

		return new Meal(date, meals[mealList[0]].join("\n"), meals[mealList[1]].join("\n"), meals[mealList[2]].join("\n"));
	}

	static removeAllergy(text) {
		return text.replace(/([1-9]|1[0-9])\./gi, "");
	}

	#date;
	#breakfast;
	#lunch;
	#dinner;

	/**
	 *
	 * @param {Date}    date        날짜
	 * @param {String}  breakfast   조식
	 * @param {String}  lunch       중식
	 * @param {String}  dinner      석식
	 */
	constructor(date, breakfast, lunch, dinner) {
		this.#date = date;
		this.#breakfast = breakfast;
		this.#lunch = lunch;
		this.#dinner = dinner;
	}

	clone() {
		return new Meal(this.date, this.breakfast, this.lunch, this.dinner);
	}

	get date() {
		return this.#date;
	}

	setString(mealType, value) {
		switch (mealType) {
			case 1:
				return this.#breakfast = value;
			case 2:
				return this.#lunch = value;
			case 3:
				return this.#dinner = value;
			default:
				return undefined;
		}
	}

	getString(mealType) {
		switch (mealType) {
			case 1:
				return this.#breakfast;
			case 2:
				return this.#lunch;
			case 3:
				return this.#dinner;
			default:
				return undefined;
		}
	}

	get breakfast() {
		return this.#breakfast;
	}

	set breakfast(value) {
		this.#breakfast = value;
	}

	get lunch() {
		return this.#lunch;
	}

	set lunch(value) {
		this.#lunch = value;
	}

	get dinner() {
		return this.#dinner;
	}

	set dinner(value) {
		this.#dinner = value;
	}

}

module.exports = Meal;
