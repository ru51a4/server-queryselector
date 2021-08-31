const cssSelectorParser = require('../lib/helpers/cssselectorparser');


const cssselectorparser = new cssSelectorParser();

test('cssselectorparser simple', () => {
    let selectors = cssselectorparser.parse('nav[aria-label=Breadcrumb] ol > .breadcrumb-item-selected');
    expect(selectors).toStrictEqual(JSON.parse(`[[{"key":"tag","value":"nav"},{"key":"aria-label","value":"Breadcrumb"}],[{"key":"tag","value":"ol"}],[{"key":"","value":">"}],[{"key":"class","value":"breadcrumb-item-selected"}]]`));
});
