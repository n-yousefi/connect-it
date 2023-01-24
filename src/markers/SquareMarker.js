import Marker from "./Marker";
export default class SquareMarker extends Marker {
  constructor(shape) {
    super(shape);
    this.type = "Start";
    this.size = shape.size ?? 6;
    this.center = this.size / 2;
    this.color = shape.color ?? "black";
    this.refX = 0;
    this.refY = this.center / 2;
  }

  createMarker() {
    const marker = super.createMarker();
    const square = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    square.setAttribute("x", "0");
    square.setAttribute("y", "0");
    square.setAttribute("width", this.center);
    square.setAttribute("height", this.center);
    square.setAttribute("fill", this.color);
    marker.appendChild(square);
    return marker;
  }
}
