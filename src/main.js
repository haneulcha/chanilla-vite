import NodeList from "./nodeWrapper.js";
import pathList from "./pathState.js";
// import Modal from "./modal.js";

const ROOT_API =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

/* 
init - root 데이터 불러오기
state에 초기값 설정
렌더링 - 노드, breadcrumb 컴포넌트 작성
*/

async function getNodes(id) {
  try {
    return await fetch(!id ? ROOT_API : `${ROOT_API}/${id}`).then((res) =>
      res.json()
    );
  } catch (err) {
    console.log("FETCH ERROR", err);
  }
}

function App(elementId) {
  // 왜 this ?
  this.appEl = document.getElementById(elementId);
  this.state = [];
  this.path = [{ id: null, name: "root" }];
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.nodeList = new NodeList({
    onClick: async (id) => {
      const res = await getNodes(id);
      const curNode = this.state.find((node) => node.id === id);
      this.path.push({ id, name: curNode.name });
      this.setState(res);
    },
  });

  this.pathList = new pathList({
    onClick: async (idx) => {
      this.path = this.path.slice(0, +idx + 1);
      const curDirId = this.path[this.path.length - 1].id;
      const res = await getNodes(curDirId);
      this.setState(res);
    },
  });
  /* 파일 구조
    현재 디렉토리 -> fetch(현재 디렉토리 id) -> 디렉토리 내 파일 업데이트
    파일 선택 -> 현재 디렉토리 업데이트 -> fetch(현재 디렉토리 id) -> 디렉토리 내 파일 업데이트
    */
  // this.state = {
  //   currentPath: [
  //     {
  //       id: null,
  //       name: "root",
  //       parent: null,
  //       children: [],
  //     },
  //   ],
  //   addPath: async (id) => {
  //     console.log("addPath", id);
  //     const res = await this.fetch(id);
  //     // console.log({ res, length: this.currentPath });
  //     const nextPath = this.state.currentPath[
  //       this.state.currentPath.length - 1
  //     ].children.find((item) => item.id === id);

  //     console.log({ nextPath });
  //     if (!res.length || !nextPath) return;

  //     this.state.currentPath.push({ ...nextPath, children: [] });
  //     this.state.currentPath[this.state.currentPath.length - 1].children = res;

  //     this.pathWrapper.render(this.state.currentPath);
  //     this.nodeWrapper.render(this.state.currentPath);
  //     console.log({ nodeW: this.nodeWrapper });
  //     return this.state.currentPath;
  //   },
  //   popPath: () => {
  //     this.state.currentPath.pop();

  //     this.pathWrapper.render(this.state.currentPath);
  //     this.nodeWrapper.render(this.state.currentPath);
  //   },
  //   slicePath: (idx) => {
  //     this.state.currentPath = this.state.currentPath.slice(0, +idx + 1);

  //     this.pathWrapper.render(this.state.currentPath);
  //     this.nodeWrapper.render(this.state.currentPath);
  //   },
  // };

  // this.pathWrapper = new pathState("Breadcrumb", this.state);
  // this.modalWrapper = new Modal(this.appNode);
  // this.nodeWrapper = new NodeWrapper(
  //   "nodeWrapper",
  //   this.modalWrapper,
  //   this.state
  // );

  this.render = () => {
    this.nodeList.render(this.state);
    this.pathList.render(this.path);
  };

  const init = async () => {
    try {
      const res = await getNodes();
      this.setState(res);
    } catch (err) {
      console.log(err);
    }
  };

  init();
}

new App("App");
