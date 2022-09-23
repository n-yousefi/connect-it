import addSvg from "./components/svg/Svg";
import addEvents from "./utils/Events";
import { VDOM } from "./components/VDOM";
import refreshMarkers from "./components/edge/marker/Marker";
import refreshEdges from "./components/edge/Edge";

class Main extends HTMLElement {
  constructor() {
    super();

    this.addCommonStyles();
    this.vdom = new VDOM(this);
    addSvg(this);
    addEvents(this);
    refreshMarkers(this);
    refreshEdges(this);
  }

  addCommonStyles = () => {
    this.style["overflow"] = "hidden";
    this.style["z-index"] = "1";
  };
}

customElements.define("connect-it", Main);
