class dom_node {
    childrens = [];
    innerTEXT = '';
    tag;
    treeWorker;

    constructor() {
        this.treeWorker = global.treeworker;
    }

    innerHTML = (cliFormat = false) => {
        return this.treeWorker.getInnerHTML(this, cliFormat);
    };
    querySelector = (selector) => {
        this.treeWorker.setCurrentTreeByNode(this);
        return this.treeWorker.filtredBySelector(selector);
    }
}

class BuilderDOM {
    html_to_dom(str) {
        var utils = {
            noEndTag(tag) {
                let noEndTags = [
                    'noscript',
                    'link',
                    'base',
                    'meta',
                    'input',
                    'svg',
                    'path',
                    'img',
                    'br',
                    'area',
                    'base',
                    'br',
                    'col',
                    'embed',
                    'hr',
                    'img',
                    'input',
                    'keygen',
                    'link',
                    'meta',
                    'param',
                    'source',
                    'track',
                    'wbr'
                ];
                return noEndTags.includes(tag);
            }
        };

        let res = [];
        let isOpen = false;
        let startAttr = false;
        let t = ''
        let tAttrKey = '';
        let tAttrValue = '';
        let tAttrStart = false;
        let tAttr = '';
        let attr = [];
        let parrentStack = [];

        //(1)<li (2)class="breadcrumb-item-selected text-gray-light breadcrumb-item text-mono h5-mktg" aria-current="GitHub Student Developer Pack"(3)>GitHub Student Developer Pack(4)</li(5)>
        for (let i = 0; i <= str.length - 1; i++) {
            //comments // <!-- -->
            if (str[i] === '/' && str[i + 1] === "/") {
                for (let j = i + 2; j <= str.length - 1; j++) {
                    if (str[j] === '\n') {
                        i = j;
                        break;
                    }
                }
                continue
            }else if (str[i] === "<") { //1
                //comments <!-- -->
                if (str[i + 1] === '!' && str[i + 2] === "-" && str[i + 3] === "-") {
                    for (let j = i + 4; j <= str.length - 1; j++) {
                        if (str[j] === '-' && str[j + 1] === '-' && str[j + 2] === '>') {
                            i = j + 2;
                            break;
                        }
                    }
                    continue
                }
                ///

                if (t !== '') {
                    //cut innerTEXT 4
                    if (parrentStack[parrentStack.length - 1]) {
                        parrentStack[parrentStack.length - 1].innerTEXT += t;
                    }
                    t = '';
                }
                //open tag 
                isOpen = true;
                if (str[i + 1] === "/") {
                    isOpen = false;
                    i = i + 1;
                    continue;
                }
            } else if (str[i] === '>') {
                ///closed tag - build 3/5

                if (isOpen) {
                    //tag p
                    if (t === 'p' && parrentStack[parrentStack.length - 1]?.tag === 'p') {
                        parrentStack.pop();
                    }
                    //
                    let el = new dom_node();
                    el.attr = attr;
                    el.tag = t;
                    if (el.tag !== 'script') {
                        res.push(el);
                    }
                    el.attr.push({
                        key: 'tag',
                        value: [t]
                    })
                    if (parrentStack[parrentStack.length - 1]) {
                        parrentStack[parrentStack.length - 1].childrens.push(el)
                    }
                    if (!utils.noEndTag(el.tag)) {
                        parrentStack.push(el);
                    }
                } else {
                    parrentStack.pop();
                }
                attr = [];
                t = '';
                startAttr = false;
                isOpen = false;
            } else {
                //accum str
                if ((!startAttr && str[i] !== ' ') || !isOpen) {
                    t += str[i];
                } else if (startAttr) { //get attr 2
                    if (str[i] === '=') {
                        tAttrKey = tAttr
                        tAttr = '';
                    }
                    else if (str[i] === '"') {
                        tAttrStart = !tAttrStart;
                        if (tAttrStart === false) {
                            if (tAttrKey === 'class') {
                                tAttrValue = tAttr.split(" ");
                            } else {
                                tAttrValue = [tAttr];
                            }
                            tAttr = '';
                            attr.push({ key: tAttrKey, value: tAttrValue });
                            if (str[i + 1] === ' ') {
                                i = i + 1;
                                continue;
                            }
                        }
                    }
                    else {
                        tAttr += str[i];
                    }

                }
                else if (str[i] === ' ' && isOpen) {
                    startAttr = true;
                }

            }
        }
        return res;
    }

}

module.exports = BuilderDOM;