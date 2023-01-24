import Marker from "./Marker";
export default class TriangleMarker extends Marker {
  constructor(shape) {
    super(shape);
    this.type = "Start";
    this.size = shape.size ?? 6;
    this.center = this.size / 2;
    this.color = shape.color ?? "black";
    this.refX = 0;
    this.refY = this.center;
  }

  createMarker() {
    const marker = super.createMarker();
    const triangle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    triangle.setAttribute(
      "points",
      `0,0 0,${this.size} ${this.center},${this.center}`
    );
    triangle.setAttribute("fill", this.color);
    marker.appendChild(triangle);
    return marker;
  }
}
