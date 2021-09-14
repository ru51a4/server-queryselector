const cssSelectorParser = require('./cssselectorparser');


class treeWorker {
    _tree;

    setCurrentTreeByNode(node) {
        let tree = this._getChildrens([node]);
        this._tree = tree;
    }

    filtredBySelector(selector) {
        let cssselectorParser = new cssSelectorParser();
        selector = cssselectorParser.parse(selector);
        let res;
        for (let i = 0; i <= selector.length - 1; i++) {
            let currentSelector = selector[i];
            let key;
            let item;
            let isArrowSelector = (currentSelector[0].value === '>');
            if (isArrowSelector) {
                continue;
            }
            for (var j = 0; j < currentSelector.length; j++) {
                key = currentSelector[j].key
                item = currentSelector[j].value;
                this._filtredByAttribute(key, item)
            }
            res = this._tree;
            let nextSelectorArrow = selector[i + 1] && selector[i + 1][0] && selector[i + 1][0].value === '>';
            this._sliceChildrens(nextSelectorArrow)
        }
        return res;
    }

    getInnerHTML(dom_node, cliFormat = false) {
        let res = '';
        let lvl = -1;
        function deep(node) {
            let leftMargin = '';
            for (let i = 0; i <= lvl; i++) {
                leftMargin += (cliFormat) ? '   ' : '';
            }
            res += leftMargin + '<' + node.tag + ((node.attr.length > 1) ? ' ' : '') + `${node.attr.reduce((acc, item, i) => acc + ((item.key !== 'tag') ? `${item.key}="${item.value.join(" ")}"${((node.attr.length - 1 != i + 1) ? ' ' : '')}` : ''), '')}` + ">"
            res += (cliFormat) ? "\n" : "";  
            res += (cliFormat && node.innerTEXT !== '') ? leftMargin + '   ' : '';
            res += node.innerTEXT;
            res += (cliFormat && node.innerTEXT !== '') ? "\n" : "";
            node.childrens.forEach((childNode) => {
                lvl++;
                deep(childNode);
                lvl--;
            });
            res += leftMargin + '</' + node.tag + '>';
            res += (cliFormat && lvl !== -1) ? "\n" : "";
        }

        deep(dom_node);
        return res;
    }

    _filtredByAttribute(_key, _value) {
        this._tree = this._tree.filter((item) => {
            let currentAttr = item.attr.find((attr) => attr.key === _key);
            if (currentAttr) {
                return currentAttr.value.includes(_value.trim())
            }
        });
    }

    _sliceChildrens(firstChild = false) {
        let res = [];
        if (firstChild) {
            for (let i = 0; i <= this._tree.length - 1; i++) {
                res.push(...this._tree[i].childrens);
            }
        } else {
            res = this._getChildrens(this._tree)
        }
        this._tree = res;
    }  

    _getChildrens(currentNodes) {
        //get all childs
        let allChilds = [...currentNodes];

        function getAllChilds(nodes) {
            let child = [];
            nodes.forEach((item) => {
                if (item.childrens.length > 0) {
                    allChilds.push(...item.childrens)
                    child.push(...item.childrens);
                }
            });
            if (child.length > 0) {
                getAllChilds(child);
            }
        }

        getAllChilds(currentNodes);

        return allChilds;
    }

}

module.exports = treeWorker;
