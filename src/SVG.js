import { VDOM } from "./VDOM";
import refreshMarkers from "./markers/refreshMarkers";
import Edge from "./Edge";

class SVG {
  constructor(element) {
    this.element = element;
    this.init();
    this.edge = new Edge(element);
  }

  init() {
    this.svg = this.createSVG();
    this.element.appendChild(this.svg);
    this.element.defs = this.svg.querySelector("defs");
  }

  refresh() {
    const vdom = new VDOM(this.element);
    if (JSON.stringify(vdom) !== JSON.stringify(this.element.vdom)) {
      this.element.vdom = vdom;
      refreshMarkers(this.element);
      this.edge.refreshEdges();
      this.resizeSVG();
    }
  }

  resizeSVG() {
    var bbox = this.svg.getBBox();
    this.svg.setAttribute("width", bbox.x + bbox.width + bbox.x);
    this.svg.setAttribute("height", bbox.y + bbox.height + bbox.y);
  }

  createSVG() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.setSVGProperties(svg);
    svg.appendChild(this.createDefs());
    svg.appendChild(this.createGmain());
    svg.appendChild(this.createGshadow());
    return svg;
  }

  createDefs() {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    return defs;
  }

  createGmain() {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "gmain");
    g.setAttribute("fill", "none");
    g.setAttribute("stroke", "black");
    g.setAttribute("stroke-width", "2");
    return g;
  }

  createGshadow() {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "gshadow");
    return g;
  }

  setSVGProperties(svg) {
    svg.setAttribute(
      "style",
      "position: absolute; top: 0; left: 0; pointer-events: none;"
    );
  }

  resetSVG(svg) {
    svg.innerHTML = "";
  }
}

export default SVG;
