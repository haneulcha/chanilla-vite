const ROOT_API =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

// const IMG_API = "http://placekitten.com/g/200/300";
class NodeWrapper {
  // #nodeWrapper
  constructor(nodeId) {
    this.nodeElement = document.getElementById(nodeId);
    this.rootData = [];
    this.imageData;
    this.eventHandler = (evt) => this.linkToPathEvent(evt);
    this.loadRootList();
  }

  async loadRootList() {
    try {
      this.rootData = await fetch(ROOT_API).then((res) => res.json());
      this.render();
    } catch (err) {
      console.log("error :: loadRootList", err);
    }
  }

  async fetchInfo(type, _path) {
    if (!_path) return;
    let path = _path;
    if (_path[0] === "/") {
      path = _path.slice(1);
    }

    if (type === "FILE") {
      // show modal
      return;
    }

    try {
      const res = await fetch(`${ROOT_API}/${path}`).then((res) => res.json());
      console.log({ res });
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
      this.fetchInfo("FILE", node.dataset.path);
    } else {
      this.fetchInfo("DIRECTORY", node.id);
    }
  }

  render() {
    this.nodeElement.removeEventListener("click", this.eventHandler);
    this.nodeElement.innerHTML = "";
    if (this.rootData[0].parent) {
      const goback = document.createElement("div");
      const gobackImg = document.createElement("img");
      gobackImg.src = "./assets/prev.png";
      this.nodeElement.appendChild(goback);
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
