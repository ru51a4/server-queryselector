const axios = require('axios').default;
const documentServer = require('./../lib/documentServer');

const documentserver = new documentServer();

async function getHtml(url) {
	return (await axios.get(url)).data;
}
async function parse() {
	let html = await getHtml('https://education.github.com/pack');
	documentserver.build(html);
	let breadcrumbSelected = documentserver.querySelector("nav[aria-label=Breadcrumb] ol > .breadcrumb-item-selected")[0];
	console.log(breadcrumbSelected);
}

parse();	