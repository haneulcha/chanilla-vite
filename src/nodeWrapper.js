const ROOT_API =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";
class NodeWrapper {
  // #nodeWrapper
  constructor(nodeId) {
    this.nodeElement = document.getElementById(nodeId);
    this.rootData;
    this.loadRootList();
  }

  async loadRootList() {
    const res = await fetch(ROOT_API).then((res) => res.json());
    console.log({ res });
    this.rootData = res.data;
  }
}

export default NodeWrapper;
