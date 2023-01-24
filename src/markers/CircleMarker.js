import Marker from "./Marker";
export default class CircleMarker extends Marker {
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
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", this.center);
    circle.setAttribute("cy", this.center);
    circle.setAttribute("r", this.center);
    circle.setAttribute("fill", this.color);
    marker.appendChild(circle);
    return marker;
  }
}
