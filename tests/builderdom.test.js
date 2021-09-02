const BuilderDOM = require('../lib/helpers/builderdom');
const axios = require('axios').default;
const documentServer = require('../lib/documentServer');


const builderdom = new BuilderDOM();

test('builderdom simple', () => {
    let dom = builderdom.html_to_dom(`
    <html>
    <span>test</span>
    </html>
    `);
    expect(dom.length).toBe(2);
    expect(dom[1].innerTEXT).toBe('test');
});

test('builderdom comments', () => {
    let dom = builderdom.html_to_dom(`
    <html>
    <!-- comment -->
    <span>test</span>
	// comment
    </html>
    `);
    expect(dom.length).toBe(2);
    expect(dom[1].innerTEXT).toBe('test');
});

test('builderdom real website', async () => {
        expect.assertions(1);
        response = await axios.get('https://education.github.com/pack')
        const documentserver = new documentServer();
        documentserver.build(response.data);
        let breadcrumbSelected = documentserver.querySelector("nav[aria-label=Breadcrumb] ol > .breadcrumb-item-selected")[0];
        let innerHTML = breadcrumbSelected.innerHTML();
        expect(innerHTML).toBe(`<li class="breadcrumb-item-selected text-gray-light breadcrumb-item text-mono h5-mktg" aria-current="GitHub Student Developer Pack">GitHub Student Developer Pack</li>`);
});
