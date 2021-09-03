const axios = require('axios').default;
const documentServer = require('./../lib/documentServer');

const documentserver = new documentServer();

async function getHtml(url) {
	return (await axios.get(url)).data;
}
async function parse() {
	let html = await getHtml('https://rydo.ru/chelyabinsk/');
	documentserver.build(html);
	let selected = documentserver.querySelector(".nss-item-title a");
	console.log(selected);
}

parse();	