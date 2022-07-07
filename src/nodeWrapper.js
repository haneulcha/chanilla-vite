const ROOT_API =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";
class NodeWrapper {
  // #nodeWrapper
  constructor(nodeId) {
    this.nodeElement = document.getElementById(nodeId);
    this.rootData = [];
    this.loadRootList();
  }

  async loadRootList() {
    try {
      const res = await fetch(ROOT_API);
      this.rootData = await res.json();
      this.render();
    } catch (err) {
      console.log(err);
      console.log("error");
    }
  }

  linkToPathEvent(e) {
    let node = e.target.closest("div.Node");
    if (!node) return;
    if (node.dataset.type === "file") {
      console.log("file clicked");
      console.log(node.dataset.path);
    } else {
      console.log("directory clicked");
      console.log(node.id);
    }
  }

  render() {
    this.nodeElement.removeEventListener("click", this.linkToPathEvent);
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
        node.classList.add("file");
        node.dataset.type = "file";
        node.dataset.path = data.filePath;
      } else {
        img.src = `./assets/directory.png`;
        node.dataset.type = "directory";
        node.classList.add("directory");
      }
      node.appendChild(img);
      node.appendChild(title);
      this.nodeElement.appendChild(node);
      this.nodeElement.addEventListener("click", this.linkToPathEvent);
    }
  }
}

export default NodeWrapper;
