export default class Marker {
  constructor(shape) {
    this.shape = shape;
  }

  createMarker() {
    const marker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "marker"
    );
    marker.setAttribute("id", this.shape.id + this.type);
    marker.setAttribute("orient", "auto");
    marker.setAttribute("refY", this.refY);
    marker.setAttribute("refX", this.refX);
    marker.setAttribute("markerHeight", this.size);
    marker.setAttribute("markerWidth", this.size);
    marker.setAttribute("viewBox", `0 0 ${this.size} ${this.size}`);
    return marker;
  }
}
