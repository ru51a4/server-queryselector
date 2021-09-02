const BuilderDOM = require('../lib/helpers/builderdom');

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