//diary
const test_cnt = 10;

const neis = require("../../src/neis"),
	school_neis = neis.createSchool(neis.REGION.BUSAN, "C100000394", neis.TYPE.HIGH);

const node_school_kr = require("node-school-kr"), school_kr = new node_school_kr();
school_kr.init(node_school_kr.Type.HIGH, node_school_kr.Region.BUSAN, "C100000394");

const diary_neis = async () => {
	let startTime = Date.now();
	for (let i = 1; i <= test_cnt; i++) {
		await school_neis.getDiary(8, true);
	}
	let endTime = Date.now();
	
	console.log(`neis            module  | Average sec: ${(endTime - startTime) / test_cnt}ms`);
};

const diary_school_kr = async () => {
	let startTime = Date.now();
	for (let i = 1; i <= test_cnt; i++) {
		await school_kr.getCalendar(2019, 8);
	}
	let endTime = Date.now();
	
	console.log(`node-school-kr  module  | Average sec: ${(endTime - startTime) / test_cnt}ms`);
};

const diary_test = async () => {
	console.log("First calc...");
	await diary_school_kr();
	await diary_neis();
	
	await new Promise(resolve => setTimeout(() => resolve(), 5000));
	
	console.log("\n\nSecond calc...");
	await diary_neis();
	await diary_school_kr();
};

module.exports = diary_test;

/*
RESULT:

First calc...
node-school-kr  module  | Average sec: 431.7ms
neis            module  | Average sec: 406.9ms


Second calc...
neis            module  | Average sec: 384.2ms
node-school-kr  module  | Average sec: 444ms
 */