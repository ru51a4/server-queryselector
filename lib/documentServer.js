const BuilderDOM = require('./helpers/builderdom');
const treeWorker = require('./helpers/treeworker')
class documentServer {

    builderDOM = new BuilderDOM();
    domTreeWorker;
    startNode;
    querySelector(selector) {
        this.domTreeWorker.setCurrentTreeByNode(this.startNode);
        return this.domTreeWorker.filtredBySelector(selector);
    }

    build(str) {
        this.domTreeWorker = new treeWorker();
        global.treeworker = this.domTreeWorker;
        let dom = this.builderDOM.html_to_dom(str);
        global.treeworker = null;
        this.startNode = dom[0];
    }
}


module.exports = documentServer;
