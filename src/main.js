import NodeWrapper from "./nodeWrapper.js";
import pathList from "./pathList.js";
import Modal from "./modal.js";

class App {
  constructor(appNode) {
    this.appNode = document.getElementsByClassName(appNode)[0];
    this.pathWrapper = new pathList("Breadcrumb");
    this.modalWrapper = new Modal(this.appNode);
    this.nodeWrapper = new NodeWrapper("nodeWrapper", this.modalWrapper);
    this.path = ["root"];
  }

  init() {
    this.nodeWrapper = new NodeWrapper("nodeWrapper");
  }
}

new App("App");
