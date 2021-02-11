const neis = require("../src/neis");
const school = neis.createSchool(neis.REGION.BUSAN, "C100000394", neis.TYPE.HIGH);

const sc_detail = require("../src/class/school/SchoolDetail");
const sc_search = require("../src/class/school/SchoolSearched");
const Meal = require("../src/class/meal/Meal");

let success = true;

const test = async () => {
	
	console.log("검색 기능 테스트 중...");
	await neis.searchSchool("동래고등학교").then(d => {
		d.forEach((sc, i) => {
			if (!sc instanceof sc_search) {
				console.log(`Error: 학교 객체가 SchoolSearched.js 가 아닙니다. Key: ${i}`);
			} else {
				console.log(sc.toJSON());
				for (let k of Object.keys(sc.toJSON())) {
					if (sc.toJSON()[k] === null) {
						success = false;
						console.log(`Error: SchoolSearched.${k}가 null 입니다. Key: ${i}`);
					}
				}
			}
			
		});
	}).catch(e => success = false);
	
	console.log("학사일정 조회 기능 테스트 중...");
	await school.getDiary(2, 2020).then(list => {
		console.log(list);
		for (let day of Object.keys(list)) {
			if (!Array.isArray(list[day])) {
				success = false;
				console.log(`Error: 학사 일정 데이터에 Array 가 아닌 값이 포함되있습니다. Type: ${typeof day} Key: ${day}`);
				continue;
			}
			if (!list[day].length) {
				success = false;
				console.log(`Error: 학사 일정 데이터에 길이가 0인 값이 포함되있습니다. Key: ${day}`);
				continue;
			}
			
			if (list[day].join("").trim() === "") {
				success = false;
				console.log(`Error: 학사 일정 데이터에 공백이 포함되있습니다. Key: ${day}`);
			}
		}
	}).catch(e => success = false);
	
	console.log("급식 기능 테스트 중...");
	await school.getMeal(2019, 12).then(d => {
		if (d.length !== 32 && d[0] === undefined) {
			success = false;
			console.log(`Error: 학교 급식 데이터는 31(일, 12월 기준) 이어야 합니다. Get ${d.length - 1}`);
		}
		
		d.forEach((m, i) => {
			if (!m instanceof Meal) {
				console.log(`Error: ${i}일의 급식 데이터의 객체가 Meal.js 가 아닙니다.`);
			}
		});
	}).catch(e => success = false);
	
	console.log("세부정보 조회 기능 테스트 중...");
	await school.getSchoolDetail().then(res => {
		if (!res instanceof sc_detail) {
			success = false;
			console.log("학교 세부정보에 대한 반환값은 SchoolDetail 입니다.");
		}
		
		for (let k of Object.keys(res.toJSON())) {
			if (res.toJSON()[k] === null) {
				success = false;
				console.log(`Error: SchoolDetail.${k}가 null 입니다.`);
			}
		}
		
		console.log(res.toJSON());
	}).catch(e => success = false);
	
	
	if (success) {
		console.log("\n\n\n[neis] All Test Succeed");
	}else{
		console.log("\n\n\n[neis] Test Failed");
	}
};

test();
