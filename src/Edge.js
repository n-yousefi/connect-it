export default class Edge {
  constructor(connectIt) {
    this.connectIt = connectIt;
  }

  refreshEdges() {
    this.graphics = this.resetGraphics();
    this.connectIt.vdom.links.forEach((edge, i) => {
      this.graphics.main.appendChild(this.createPath(edge, false));
      this.graphics.shadows.appendChild(this.createPath(edge, true));
    });
  }

  resetGraphics() {
    const main = this.connectIt.querySelector("svg > g.gmain");
    const shadows = this.connectIt.querySelector("svg > g.gshadow");
    main.innerHTML = "";
    shadows.innerHTML = "";
    return { main, shadows };
  }

  createPath(edge, isShadow) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `M${Math.round(edge.line.x1)},${Math.round(edge.line.y1)} L${Math.round(
        edge.line.x2
      )},${Math.round(edge.line.y2)} `
    );
    const edgeSize = edge.size ?? 2;
    if (isShadow) {
      path.setAttribute("stroke", "black");
      path.setAttribute("opacity", 0);
      path.setAttribute("stroke-width", Math.max(edgeSize, 15));
      path.style = "pointer-events: auto;";
    } else if (!isShadow) {
      path.setAttribute("stroke-width", edgeSize);
      if (edge.color) path.setAttribute("stroke", edge.color ?? "black");
      path.setAttribute("marker-start", `url(#${edge.markerStart})`);
      path.setAttribute("marker-end", `url(#${edge.markerEnd})`);
    }
    return path;
  }
}
