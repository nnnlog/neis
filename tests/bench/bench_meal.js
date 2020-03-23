//Meal
const test_cnt = 10;

const neis = require("../../src/neis"),
	school_neis = neis.createSchool(neis.REGION.BUSAN, "C100000394", neis.TYPE.HIGH);

const node_school_kr = require("node-school-kr"), school_kr = new node_school_kr();
school_kr.init(node_school_kr.Type.HIGH, node_school_kr.Region.BUSAN, "C100000394");

const meal_neis = async () => {
	let startTime = Date.now();
	for (let i = 1; i <= test_cnt; i++) {
		await school_neis.getMeal(2019, 8, true);
	}
	let endTime = Date.now();
	
	console.log(`neis            module  | Average sec: ${(endTime - startTime) / test_cnt}ms`);
};

const meal_school_kr = async () => {
	let startTime = Date.now();
	for (let i = 1; i <= test_cnt; i++) {
		await school_kr.getMeal(2019, 8);
	}
	let endTime = Date.now();
	
	console.log(`node-school-kr  module  | Average sec: ${(endTime - startTime) / test_cnt}ms`);
};

const meal_test = async () => {
	console.log("First calc...");
	await meal_school_kr();
	await meal_neis();
	
	await new Promise(resolve => setTimeout(() => resolve(), 5000));
	
	console.log("\n\nSecond calc...");
	await meal_neis();
	await meal_school_kr();
};

module.exports = meal_test;

/*
RESULT:

First calc...
node-school-kr  module  | Average sec: 533.2ms
neis            module  | Average sec: 403.6ms


Second calc...
neis            module  | Average sec: 437.8ms
node-school-kr  module  | Average sec: 508.1ms
 */