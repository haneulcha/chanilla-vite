import NodeWrapper from "./nodeWrapper.js";
import pathList from "./pathList.js";

class App {
  constructor(appNode) {
    this.appNode = document.getElementsByClassName(appNode)[0];
    this.pathWrapper = new pathList("Breadcrumb");
    this.nodeWrapper = new NodeWrapper("nodeWrapper");
    this.path = ["root"];
  }

  init() {
    this.nodeWrapper = new NodeWrapper("nodeWrapper");
  }
}

new App("App");
