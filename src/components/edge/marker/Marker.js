import Circle from "./Circle";
import Rectangle from "./Rectangle";
import Triangle from "./Triangle";

const refreshMarkers = (connectIt) => {
  connectIt.defs.innerHTML = "";
  connectIt.vdom.shapes.forEach((shape) => {
    let markerHtml = "";
    switch (shape.type) {
      case "triangle":
        markerHtml = Triangle(shape);
        break;
      case "circle":
        markerHtml = Circle(shape);
        break;
      case "rectangle":
        markerHtml = Rectangle(shape);
        break;
      default:
        break;
    }
    connectIt.defs.insertAdjacentHTML("beforeend", markerHtml);
  });
};

export default refreshMarkers;
