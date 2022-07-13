const ROOT_API =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const IMG_API = "http://placekitten.com/g/200/300";
class NodeWrapper {
  // #nodeWrapper
  constructor(nodeId, modalEl, pathEl) {
    this.nodeElement = document.getElementById(nodeId);
    this.modalElement = modalEl;
    this.pathEl = pathEl;
    this.rootData = [];
    this.imageData;
    this.eventHandler = (evt) => this.linkToPathEvent(evt);
    this.gobackHandler = (evt) => this.onGoback(evt);
    this.loadRootList();
  }

  onGoback() {
    const result = this.pathEl.popPath();
    this.fetchInfo(result.parent);
  }

  async loadRootList() {
    try {
      this.rootData = await fetch(ROOT_API).then((res) => res.json());
      this.render();
    } catch (err) {
      console.log("error :: loadRootList", err);
    }
  }

  async fetchInfo(id) {
    try {
      const res = await fetch(`${ROOT_API}/${id}`).then((res) => res.json());
      console.log({ res });
      if (!res.length) return;
      this.rootData = res;
      this.render();
      return res;
    } catch (err) {
      console.log("error :: fetchNode", err);
    }
  }

  async linkToPathEvent(e) {
    let node = e.target.closest("div.Node");

    if (!node || !this) return;
    if (node.dataset.type === "file") {
      this.modalElement.show(IMG_API);
      // this.modalElement.show(node.dataset.path);
    } else {
      const result = await this.fetchInfo(node.id);
      this.pathEl.addPath({
        id: result.id,
        name: result.name,
        parent: result.parent,
      });
    }
  }

  render() {
    this.nodeElement.removeEventListener("click", this.eventHandler);
    this.nodeElement.innerHTML = "";
    // 뒤로가기
    if (this.rootData[0].parent !== null) {
      const prev = document.createElement("div");
      const prevIcon = document.createElement("img");
      prevIcon.src = "./assets/prev.png";
      prev.appendChild(prevIcon);
      prev.classList.add("Node", "prev");
      prev.addEventListener("click", this.gobackHandler);
      this.nodeElement.appendChild(prev);
    }
    for (const data of this.rootData) {
      const node = document.createElement("div");
      const img = document.createElement("img");
      const title = document.createElement("div");
      node.classList.add("Node");
      node.id = data.id;
      title.innerText = data.name ?? "";
      if (data.type === "FILE") {
        img.src = `./assets/file.png`;
        node.dataset.type = "file";
        node.classList.add("file");
        node.dataset.path = data.filePath;
      } else {
        img.src = `./assets/directory.png`;
        node.dataset.type = "directory";
        node.classList.add("directory");
      }
      node.appendChild(img);
      node.appendChild(title);
      this.nodeElement.appendChild(node);
      this.nodeElement.addEventListener("click", this.eventHandler);
    }
  }
}

export default NodeWrapper;
