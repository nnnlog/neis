const run = async () => {
	console.log("Starting Bench...");
	
	try {
		console.log("[Bench] Starting detail bench");
		await require("./bench_detail")();
		
		console.log("\n\n[Bench] Starting diary bench");
		await require("./bench_diary")();
		
		console.log("\n\n[Bench] Starting meal bench");
		await require("./bench_meal")();
		
		console.log("\n\n[Bench] Starting search bench");
		await require("./bench_search")();
		
		
		console.log("\n\n[Bench] Bench Success");
	} catch (e) {
		console.log(`Error: Bench Failed`);
	}
};

run();