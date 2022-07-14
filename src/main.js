import NodeWrapper from "./nodeWrapper.js";
import pathState from "./pathState.js";
import Modal from "./modal.js";

const ROOT_API =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";
class App {
  constructor(appNode) {
    this.appNode = document.getElementsByClassName(appNode)[0];
    /* 파일 구조
    현재 디렉토리 -> fetch(현재 디렉토리 id) -> 디렉토리 내 파일 업데이트
    파일 선택 -> 현재 디렉토리 업데이트 -> fetch(현재 디렉토리 id) -> 디렉토리 내 파일 업데이트
    */
    this.state = {
      currentPath: [
        {
          id: null,
          name: "root",
          parent: null,
          children: [],
        },
      ],
      addPath: async (id) => {
        console.log("addPath", id);
        const res = await this.fetch(id);
        // console.log({ res, length: this.currentPath });
        const nextPath = this.state.currentPath[
          this.state.currentPath.length - 1
        ].children.find((item) => item.id === id);

        console.log({ nextPath });
        if (!res.length || !nextPath) return;

        this.state.currentPath.push({ ...nextPath, children: [] });
        this.state.currentPath[this.state.currentPath.length - 1].children =
          res;

        this.pathWrapper.render(this.state.currentPath);
        this.nodeWrapper.render(this.state.currentPath);
        console.log({ nodeW: this.nodeWrapper });
        return this.state.currentPath;
      },
      popPath: () => {
        this.state.currentPath.pop();

        this.pathWrapper.render(this.state.currentPath);
        this.nodeWrapper.render(this.state.currentPath);
      },
      slicePath: (idx) => {
        this.state.currentPath = this.state.currentPath.slice(0, +idx + 1);

        this.pathWrapper.render(this.state.currentPath);
        this.nodeWrapper.render(this.state.currentPath);
      },
    };

    this.pathWrapper = new pathState("Breadcrumb", this.state);
    this.modalWrapper = new Modal(this.appNode);
    this.nodeWrapper = new NodeWrapper(
      "nodeWrapper",
      this.modalWrapper,
      this.state
    );
  }

  /* 디렉토리 매트릭스 */

  async fetch(id) {
    try {
      return await fetch(!id ? ROOT_API : `${ROOT_API}/${id}`).then((res) =>
        res.json()
      );
    } catch (err) {
      console.log("FETCH ERROR", err);
    }
  }

  init() {
    this.nodeWrapper = new NodeWrapper("nodeWrapper");
  }
}

new App("App");
