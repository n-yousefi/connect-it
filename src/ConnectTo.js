import addSvg from "./components/svg/Svg";
import addMouseEvents from "./utils/Events";
import { VDOM } from "./components/VDOM";
import refreshMarkers from "./components/edge/marker/Marker";
import refreshEdges from "./components/edge/Edge";

class ConnectTo extends HTMLElement {
  constructor() {
    super();

    this.onLoad(() => {
      this.addCommonStyles();
      this.vdom = new VDOM(this);
      addSvg(this);
      addMouseEvents(this);
      refreshMarkers(this);
      refreshEdges(this);
    });
  }

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

  addCommonStyles = () => {
    this.style["overflow"] = "hidden";
    this.style["z-index"] = "1";
  };
}

customElements.get("connect-it") || customElements.define("connect-it", ConnectTo);