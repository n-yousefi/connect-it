import D from "./D";
import ShadowPath from "./ShadowPath";
import Path from "./Path";
import * as Dom from "../../utils/Dom";

const refreshEdges = function (connectIt) {
  const graphics = Dom.resetGraphics(connectIt);
  connectIt.vdom.links.forEach((edge, i) => {
    DrawEdge(graphics, edge);
  });
};

const DrawEdge = (graphics, edge) => {
  const d = D(edge.line);
  graphics.main.innerHTML += Path(d, edge);
  graphics.shadows.innerHTML += ShadowPath(d);
};

export default refreshEdges;
