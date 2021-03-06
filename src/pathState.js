class pathState {
  constructor({ onClick }) {
    this.initialized = false;
    this.pathEl = document.querySelector(".Breadcrumb");
    this.onClick = onClick;
    this.onClickHandler = (e) => this.onClickPath(e);
  }

  onClickPath(e) {
    const target = e.target.closest(".path");
    if (!target) return;
    const idx = target.dataset.idx;
    this.onClick(idx);
    // this.state.slicePath(idx);
    // this.render();
    // 리스트 업데이트
  }

  /* path handle
  기본값: ["root"]
  외부 업데이트:
    추가 push: 폴더 클릭
    삭제 pop: 뒤로 가기 클릭
  자체 업데이트:
    클릭 slice: GET -> 선택한 폴더로 이동, -> 리렌더링
  */

  // addPath(path) {
  //   this.pathList.push(path);
  //   this.render();
  // }

  // popPath() {
  //   const result = this.pathList.pop();
  //   this.render();
  //   return result;
  // }

  // slicePath(idx) {
  //   this.pathList = this.pathList.slice(0, +idx + 1);
  //   this.render();
  //   return this.pathList[idx];
  // }

  render(path) {
    if (this.initialized) {
      this.pathEl.removeEventListener("click", this.onClickHandler);
      this.pathEl.innerHTML = "";
    }

    path.forEach(({ id, name }, idx) => {
      const pathItem = document.createElement("span");
      pathItem.innerText = name;
      pathItem.id = id;
      pathItem.dataset.idx = idx;
      pathItem.classList.add("path");
      this.pathEl.appendChild(pathItem);
    });

    this.pathEl.addEventListener("click", this.onClickHandler);
    this.initialized = true;
  }
}

export default pathState;
