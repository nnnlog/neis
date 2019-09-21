const axios = require("axios");
const list = require("../types/EduURILists");
const EduSession = require("./EduSession");

const request = async (url, edu, body) => {
	let res = [];
	try {
		res = await axios({
			url: `https://stu.${list[edu]}/${url}`,
			headers: {
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
				'Cookie': 'JSESSIONID=' + await EduSession(edu).getCookie()
			},
			data: body
		});
	} catch (e) {
	}
	
	return res;
};

module.exports = request;