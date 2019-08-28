/*
Copyright 2019 NLOG (박찬솔)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const neis = require("../neis");
const SchoolType = require("../lib/types/SchoolType");

neis.getSchoolDiary(neis.createSchool('BUSAN', 'C100000394', neis.getAllSchoolType().HIGH)).getResult(2).then(list => {
    for (let year of Object.keys(list)) {
        for (let month of Object.keys(list[year])) {
            for (let day of Object.keys(list[year][month])) {
                console.log(`${year}/${month}/${day}: `, list[year][month][day]);
            }
        }
    }
});

/*

var dump of
neis.getSchoolDiary(neis.createSchool('BUSAN', 'C100000394', neis.getAllSchoolType().HIGH)).getResult(2)


{
  '2019': {
    '9': {
      '4': [ '모의수능(3년)', '학력평가(1,2)' ],
      '7': [ '토요휴업일' ],
      '12': [ '추석연휴' ],
      '13': [ '추석' ],
      '14': [ '토요휴업일' ],
      '21': [ '토요휴업일' ],
      '24': [ '영어듣기(1학년)' ],
      '25': [ '영어듣기(2학년)' ],
      '26': [ '영어듣기(3학년)' ],
      '28': [ '토요휴업일' ]
    },
    '10': {
      '3': [ '개천절' ],
      '4': [ '재량휴업일' ],
      '5': [ '토요휴업일' ],
      '9': [ '한글날' ],
      '12': [ '토요휴업일' ],
      '15': [ '학력평가(3)' ],
      '16': [ '1차 지필평가(1,2)' ],
      '17': [ '1차 지필평가(1,2)' ],
      '18': [ '1차 지필평가(1,2)' ],
      '19': [ '토요휴업일' ],
      '21': [ '1차 지필평가(1,2)' ],
      '25': [ '체험학습(1,2)' ],
      '26': [ '토요휴업일' ]
    },
    '11': {
      '2': [ '토요휴업일' ],
      '9': [ '토요휴업일' ],
      '14': [ '대입수능', '대입수능(3)' ],
      '16': [ '토요휴업일' ],
      '20': [ '학력평가(1,2)' ],
      '23': [ '토요휴업일' ],
      '30': [ '토요휴업일' ]
    },
    '12': {
      '7': [ '토요휴업일' ],
      '9': [ '2차 지필평가(1,2)' ],
      '10': [ '2차 지필평가(1,2)' ],
      '11': [ '2차 지필평가(1,2)' ],
      '12': [ '2차 지필평가(1,2)' ],
      '13': [ '2차 지필평가(2)' ],
      '14': [ '토요휴업일' ],
      '21': [ '토요휴업일' ],
      '24': [ '학생회선거' ],
      '25': [ '성탄절' ],
      '26': [ '학예제' ],
      '27': [ '방학식' ],
      '28': [ '겨울방학', '토요휴업일' ],
      '29': [ '겨울방학' ],
      '30': [ '겨울방학' ],
      '31': [ '겨울방학' ]
    }
  },
  '2020': {
    '1': {
      '1': [ '겨울방학' ],
      '2': [ '겨울방학' ],
      '3': [ '겨울방학' ],
      '4': [ '겨울방학', '토요휴업일' ],
      '5': [ '겨울방학' ],
      '6': [ '겨울방학' ],
      '7': [ '겨울방학' ],
      '8': [ '겨울방학' ],
      '9': [ '겨울방학' ],
      '10': [ '겨울방학' ],
      '11': [ '겨울방학', '토요휴업일' ],
      '12': [ '겨울방학' ],
      '13': [ '겨울방학' ],
      '14': [ '겨울방학' ],
      '15': [ '겨울방학' ],
      '16': [ '겨울방학' ],
      '17': [ '겨울방학' ],
      '18': [ '겨울방학', '토요휴업일' ],
      '19': [ '겨울방학' ],
      '20': [ '겨울방학' ],
      '21': [ '겨울방학' ],
      '22': [ '겨울방학' ],
      '23': [ '겨울방학' ],
      '24': [ '겨울방학' ],
      '25': [ '겨울방학', '토요휴업일' ],
      '26': [ '겨울방학' ],
      '27': [ '겨울방학' ],
      '28': [ '겨울방학' ],
      '29': [ '겨울방학' ],
      '30': [ '겨울방학' ],
      '31': [ '겨울방학' ]
    },
    '2': {
      '1': [ '겨울방학', '토요휴업일' ],
      '2': [ '겨울방학' ],
      '3': [ '개학일(1,2년)', '겨울방학(3년)' ],
      '4': [ '겨울방학(3년)' ],
      '5': [ '개학일(3년)' ],
      '8': [ '토요휴업일' ],
      '11': [ '졸업식', '종업식' ],
      '12': [ '학년말방학' ],
      '13': [ '학년말방학' ],
      '14': [ '학년말방학' ],
      '15': [ '토요휴업일', '학년말방학' ],
      '16': [ '학년말방학' ],
      '17': [ '신학년 준비', '학년말방학' ],
      '18': [ '신학년 준비', '학년말방학' ],
      '19': [ '신학년 준비', '학년말방학' ],
      '20': [ '신학년 준비', '학년말방학' ],
      '21': [ '신학년 준비', '학년말방학' ],
      '22': [ '토요휴업일', '학년말방학' ],
      '23': [ '학년말방학' ],
      '24': [ '학년말방학' ],
      '25': [ '학년말방학' ],
      '26': [ '학년말방학' ],
      '27': [ '학년말방학' ],
      '28': [ '학년말방학' ],
      '29': [ '토요휴업일', '학년말방학' ]
    }
  }
}
 */