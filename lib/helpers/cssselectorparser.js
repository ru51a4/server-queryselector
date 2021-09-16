class cssSelectorParser {
    parse(str) {
        let res = [];
        str = this.utils.lex(str);
        for (var i = 0; i <= str.length - 1; i++) {
            if (str[i].includes(".")) {
                res.push({key: 'class', value: str[i].substring(1)});
            } else if (str[i].includes("#")) {
                res.push({key: 'id', value: str[i].substring(1)});
            } else if (str[i].includes("[")) {
                let current = str[i];
                current = current.substring(1);
                current = current.slice(0, -1);
                current = current.split("=");
                res.push({key: current[0], value: current[1]});
            } else if (str[i] === '>') {
                res.push({key: '', value: str[i]});
            } else if (str[i] === ' ') {
                res.push({key: '', value: str[i]});
            } else if(str[i] !== '') {
                res.push({key: 'tag', value: str[i]});
            }
        }
        //merge
        let mergeRes = [];
        let t = [];
        for (var i = 0; i <= res.length - 1; i++) {
            if (res[i].value === ' ') {
                mergeRes.push(t);
                t = [];
            } else {
                t.push(res[i]);
            }
        }
        mergeRes.push(t);
        //
        return mergeRes;
    }

    utils = {
        lex(str) {
            let res = '';
            for (var i = 0; i <= str.length - 1; i++) {
                res += str[i];
                if (str[i + 1] === "." || str[i + 1] === '#' || str[i + 1] === '>' || str[i + 1] === '[' || (str[i] === ' ')) {
                    res += "\n";
                } else if (str[i + 1] === " ") {
                    res += "\n"
                }
            }
            return res.split("\n");
        }
    }
}

module.exports = cssSelectorParser