class Events {
  constructor(element) {
    this.element = element;
  }

  refresh = () => {
    this.element.refresh();
  };

  refreshOnImagesLoaded() {
    Promise.all(
      Array.from(this.element.querySelectorAll("img"))
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            })
        )
    ).then(this.refresh);
  }

  refreshOnScroll() {
    document.addEventListener("scroll", this.refresh);
    window.addEventListener("resize", this.refresh);
  }

  disposeRefreshOnScroll() {
    this.observer.disconnect();
  }

  refreshOnUserChanges() {
    this.observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        if (
          mutation.target.parent == this.element &&
          !mutation.target.closest("nodes")
        )
          return;
        this.refresh();
      });
    });

    this.observer.observe(document, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }

  disposeRefreshOnUserChanges() {
    document.removeEventListener("scroll", this.refresh);
    window.removeEventListener("resize", this.refresh);
  }

  addMouseEvents() {
    this.element.addEventListener("click", (e) => {
      e.target.parentElement.classList.contains("gshadow") &&
        this.fireHandler("click", e);
    });

    this.element.addEventListener("mouseout", (e) => {
      e.target.parentElement.classList.contains("gshadow") &&
        this.fireHandler("mouseout", e);
    });

    this.element.addEventListener("mouseover", (e) => {
      e.target.parentElement.classList.contains("gshadow") &&
        this.fireHandler("mouseout", e);
    });
  }

  fireHandler(eventName, e) {
    const listenerName =
      "onEdges" + eventName.charAt(0).toUpperCase() + eventName.slice(1);
    const listener = this.element[listenerName];
    listener && listener(this.getRelatedPath(e.target));
    this.refresh();
    e.stopPropagation();
  }

  getRelatedPath(shadowPath) {
    const element = Array.prototype.indexOf.call(
      shadowPath.parentElement.childNodes,
      shadowPath
    );
    return this.element.querySelector(`edges edge:nth-child(${element + 1})`);
  }
}

export default Events;
