export default class Edge {
  constructor(connectIt) {
    this.connectIt = connectIt;
  }

  refreshEdges() {
    this.graphics = this.resetGraphics();
    this.connectIt.vdom.links.forEach((edge, i) => {
      this.graphics.main.appendChild(this.createPath(edge));
      this.graphics.shadows.appendChild(this.createPath(edge));
    });
  }

  resetGraphics() {
    const main = this.connectIt.querySelector("svg > g.gmain");
    const shadows = this.connectIt.querySelector("svg > g.gshadow");
    main.innerHTML = "";
    shadows.innerHTML = "";
    return { main, shadows };
  }

  createPath(edge) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `M${edge.line.x1},${edge.line.y1} L${edge.line.x2},${edge.line.y2} `
    );
    path.setAttribute("stroke", edge.color);
    path.setAttribute("stroke-width", edge.size ?? 2);
    path.setAttribute("marker-start", `url(#${edge.markerStart})`);
    path.setAttribute("marker-end", `url(#${edge.markerEnd})`);
    return path;
  }
}
