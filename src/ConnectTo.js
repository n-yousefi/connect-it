import addSvg from "./components/svg/Svg";
import addMouseEvents from "./utils/Events";
import { VDOM } from "./components/VDOM";
import refreshMarkers from "./components/edge/marker/Marker";
import refreshEdges from "./components/edge/Edge";

class ConnectTo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const connectTo = this;
    addSvg(this);
    this.onLoad(() => {
      connectTo.refresh();
    });
    this.observe(function (mutation) {
      if (mutation.target.parent == this && !mutation.target.closest("nodes"))
        return;
      connectTo.refresh();
    });
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  observe = (handler) => {
    this.observer = new MutationObserver(function (mutations) {
      mutations.forEach(handler);
    });

    this.observer.observe(document, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  };

  refresh = () => {
    const vdom = new VDOM(this);
    if (JSON.stringify(vdom) !== JSON.stringify(this.vdom)) {
      this.vdom = vdom;
      //addMouseEvents(this);
      refreshMarkers(this);
      refreshEdges(this);
      this.resizeSVG();
    }
  };

  resizeSVG = () => {
    var svg = this.querySelector("svg");
    var bbox = svg.getBBox();
    svg.setAttribute("width", bbox.x + bbox.width + bbox.x);
    svg.setAttribute("height", bbox.y + bbox.height + bbox.y);
  };

  onLoad = (func) => {
    Promise.all(
      Array.from(this.querySelectorAll("img"))
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            })
        )
    ).then(() => {
      func();
    });
  };
}

customElements.get("connect-it") ||
  customElements.define("connect-it", ConnectTo);
