//detail
const test_cnt = 10;

const neis = require("../../src/neis"),
	school_neis = neis.createSchool(neis.REGION.BUSAN, "C100000394", neis.TYPE.HIGH);

const detail_neis = async () => {
	let startTime = Date.now();
	for (let i = 1; i <= test_cnt; i++) {
		await school_neis.getSchoolDetail( true);
		//console.log(`neis module | bench Complete ${i}/${test_cnt}`);
	}
	let endTime = Date.now();
	
	console.log(`neis            module  | Average sec: ${(endTime - startTime) / test_cnt}ms`);
};

const detail_test = async () => {
	console.log("First calc...");
	await detail_neis();
};

module.exports = detail_test;

/*
RESULT:

First calc...
neis            module  | Average sec: 486.9ms

 */