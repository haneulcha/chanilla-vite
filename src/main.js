import NodeWrapper from "./nodeWrapper.js";
import pathState from "./pathState.js";
import Modal from "./modal.js";

class App {
  constructor(appNode) {
    this.appNode = document.getElementsByClassName(appNode)[0];
    this.path = [{ id: null, name: "root" }];
    this.pathWrapper = new pathState("Breadcrumb");
    this.modalWrapper = new Modal(this.appNode);
    this.nodeWrapper = new NodeWrapper(
      "nodeWrapper",
      this.modalWrapper,
      this.pathWrapper
    );
  }

  init() {
    this.nodeWrapper = new NodeWrapper("nodeWrapper");
  }
}

new App("App");
