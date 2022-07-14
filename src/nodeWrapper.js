const IMG_API = "http://placekitten.com/g/200/300";
class NodeWrapper {
  // #nodeWrapper
  constructor({ onClick }) {
    this.nodeElement = document.getElementById("nodeWrapper");
    // this.modalElement = modalEl;

    this.imageData;
    this.onClick = onClick;
    this.eventHandler = (evt) => this.linkToPathEvent(evt);
    this.gobackHandler = (evt) => this.onGoback(evt);
  }

  onGoback() {
    this.state.popPath();
  }

  async linkToPathEvent(e) {
    let node = e.target.closest("div.Node");

    if (!node || !this) return;
    if (node.dataset.type === "file") {
      this.modalElement.show(IMG_API);
      // this.modalElement.show(node.dataset.path);
    } else {
      // this.state.addPath();
      this.onClick(node.id);
    }
  }

  render(state) {
    this.nodeElement.removeEventListener("click", this.eventHandler);
    this.nodeElement.innerHTML = "";
    // 뒤로가기
    // if (path[0].parent !== null) {
    //   const prev = document.createElement("div");
    //   const prevIcon = document.createElement("img");
    //   prevIcon.src = "./assets/prev.png";
    //   prev.appendChild(prevIcon);
    //   prev.classList.add("Node", "prev");
    //   prev.addEventListener("click", this.gobackHandler);
    //   this.nodeElement.appendChild(prev);
    // }

    for (const data of state) {
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
