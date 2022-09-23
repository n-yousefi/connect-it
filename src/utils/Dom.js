export const resetGraphics = function (connectIt) {
  const main = getGmain(connectIt);
  const shadows = getGshadow(connectIt);
  main.innerHTML = "";
  shadows.innerHTML = "";
  return { main, shadows };
};

export const getNodes = (connectIt) => {
  return connectIt.querySelectorAll(".node");
};

export const getAdjacent = (connectIt, edge) => {
  return getById(connectIt, getAttr(edge, "to"));
};

export const getMarkers = (connectIt) => {
  return connectIt.querySelectorAll("marker");
};

export const getEdgeMarker = (edge) => {
  return edge.querySelector("marker");
};

export const getEdges = function (connectIt) {
  return [...connectIt.querySelectorAll("edge")];
};

export const getNodeEdges = function (connectIt, originDiv) {
  return getEdges(connectIt).filter(
    (e) => getAttr(e, "from") == getAttr(originDiv, "id")
  );
};

export const getGmain = function (connectIt) {
  return connectIt.querySelector("svg > g.gmain");
};

export const getGshadow = function (connectIt) {
  return connectIt.querySelector("svg > g.gshadow");
};

export const getById = function (connectIt, id) {
  return connectIt.querySelector("#" + id);
};

export const getAttr = function (tag, attr) {
  return tag?.attributes[attr]?.value;
};

export const getPathes = (connectIt) => {
  return connectIt.querySelectorAll("path");
};

export const getImages = (connectIt) => {
  return connectIt.querySelectorAll("img");
};

export const getRelatedPath = function (connectIt, shadowPath) {
  const element = indexOf(shadowPath.parentElement.childNodes, shadowPath);
  return connectIt.querySelector(`.gmain path:nth-child(${element + 1})`);
};

export const indexOf = function (arr, item) {
  return Array.prototype.indexOf.call(arr, item);
};

export const addSelectedPathStyles = function (path) {
  path.style["stroke-dasharray"] = 5.5;
};

export const removeSelectedPathStyles = function (path) {
  path.style["stroke-dasharray"] = 0;
};
