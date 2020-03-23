const axios = require("axios");
const list = require("../types/EduURILists");
const EduSession = require("./EduSession");

const request = async (url, edu, body) => {
	return await axios({
		url: `https://stu.${list[edu]}/${url}`,
		headers: {
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
			'Cookie': 'JSESSIONID=' + await EduSession(edu).getCookie()
		},
		data: body
	}).catch(e => e);
};

module.exports = request;