import TriangleMarker from "./TriangleMarker";
import CircleMarker from "./CircleMarker";
import SquareMarker from "./SquareMarker";

const refreshMarkers = (connectIt) => {
  connectIt.defs.innerHTML = "";
  connectIt.vdom.shapes.forEach((shape) => {
    let markerStart = null;
    let markerEnd = null;
    switch (shape.type) {
      case "triangle":
        markerStart = new TriangleMarker(shape);
        markerEnd = new TriangleMarker(shape);
        markerEnd.type = "End";
        markerEnd.refX = markerEnd.center;
        break;
      case "circle":
        markerStart = new CircleMarker(shape);
        markerEnd = new CircleMarker(shape);
        markerEnd.type = "End";
        markerEnd.refX = markerEnd.size;
        break;
      case "square":
        markerStart = new SquareMarker(shape);
        markerEnd = new SquareMarker(shape);
        markerEnd.type = "End";
        markerEnd.refX = markerEnd.center;
        break;
      default:
        break;
    }
    connectIt.defs.appendChild(markerStart.createMarker());
    connectIt.defs.appendChild(markerEnd.createMarker());
  });
};

export default refreshMarkers;
