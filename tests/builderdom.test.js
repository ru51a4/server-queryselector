const BuilderDOM = require('../lib/helpers/builderdom');
const axios = require('axios').default;
const documentServer = require('../lib/documentServer');


const builderdom = new BuilderDOM();


test('real website', async () => {
        expect.assertions(1);
        response = await axios.get('https://education.github.com/pack')
        const documentserver = new documentServer();
        documentserver.build(response.data);
        let breadcrumbSelected = documentserver.querySelector(".h1-mktg.lh-condensed.text-left.d-inline-block")[0];
        let innerHTML = breadcrumbSelected.innerHTML();
        expect(innerHTML).toBe(`<h1 class="h1-mktg lh-condensed text-left d-inline-block">GitHub Student Developer Pack</h1>`);
});
