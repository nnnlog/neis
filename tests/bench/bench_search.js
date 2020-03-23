//search
const test_cnt = 10;

const neis = require("../../src/neis");

const search_neis = async () => {
	let startTime = Date.now();
	for (let i = 1; i <= test_cnt; i++) {
		await neis.searchSchool("동래", 'ALL', true);
	}
	let endTime = Date.now();
	
	console.log(`neis            module  | Average sec: ${(endTime - startTime) / test_cnt}ms`);
};

const search_test = async () => {
	console.log("First calc...");
	await search_neis();
};

module.exports = search_test;

/*
RESULT:

First calc...
neis            module  | Average sec: 295.3ms

 */