class Modal {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.modalWrapperEl;
    this.modalImgEl;
    this.close = () => this.onClose();
    this.create();
  }

  create() {
    const modalWrapperEl = document.createElement("div");
    modalWrapperEl.classList.add("ModalWrapper", "ImgViewer");
    const modalContentEl = document.createElement("div");
    modalContentEl.classList.add("ModalContent");
    const modalImgEl = document.createElement("img");
    modalImgEl.src = null;
    this.modalImgEl = modalImgEl;

    modalContentEl.appendChild(modalImgEl);
    modalWrapperEl.appendChild(modalContentEl);
    modalWrapperEl.addEventListener("click", this.close);
    this.parentEl.appendChild(modalWrapperEl);
    this.modalWrapperEl = modalWrapperEl;
  }

  show(imgSrc) {
    this.modalImgEl.src = imgSrc;
    this.modalWrapperEl.classList.add("show");
  }

  onClose() {
    this.modalWrapperEl.classList.remove("show");
  }
}

export default Modal;
