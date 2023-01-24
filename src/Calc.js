const getCenter = function (div) {
  return {
    x: div.offsetLeft + div.offsetWidth / 2,
    y: div.offsetTop + div.offsetHeight / 2,
  };
};

const getColidPoint = function (edge, destinationLines) {
  let result;
  for (const [key, line] of Object.entries(destinationLines)) {
    if (!result) {
      const collisionPoint = checkLineCollision(edge, line);
      if (collisionPoint) {
        result = collisionPoint;
      }
    }
  }
  return result;
};

const getBorderLines = function (div) {
  var result = new Object();
  result.left = {
    x1: div.offsetLeft,
    y1: div.offsetTop,
    x2: div.offsetLeft,
    y2: div.offsetTop + div.offsetHeight,
  };
  result.top = {
    x1: div.offsetLeft,
    y1: div.offsetTop,
    x2: div.offsetLeft + div.offsetWidth,
    y2: div.offsetTop,
  };
  result.bottom = {
    x1: div.offsetLeft,
    y1: div.offsetTop + div.offsetHeight,
    x2: div.offsetLeft + div.offsetWidth,
    y2: div.offsetTop + div.offsetHeight,
  };
  result.right = {
    x1: div.offsetLeft + div.offsetWidth,
    y1: div.offsetTop,
    x2: div.offsetLeft + div.offsetWidth,
    y2: div.offsetTop + div.offsetHeight,
  };
  return result;
};
const checkLineCollision = function (line1, line2) {
  var uA =
    ((line2.x2 - line2.x1) * (line1.y1 - line2.y1) -
      (line2.y2 - line2.y1) * (line1.x1 - line2.x1)) /
    ((line2.y2 - line2.y1) * (line1.x2 - line1.x1) -
      (line2.x2 - line2.x1) * (line1.y2 - line1.y1));
  var uB =
    ((line1.x2 - line1.x1) * (line1.y1 - line2.y1) -
      (line1.y2 - line1.y1) * (line1.x1 - line2.x1)) /
    ((line2.y2 - line2.y1) * (line1.x2 - line1.x1) -
      (line2.x2 - line2.x1) * (line1.y2 - line1.y1));
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    var intersection = {
      x: line1.x1 + uA * (line1.x2 - line1.x1),
      y: line1.y1 + uA * (line1.y2 - line1.y1),
    };
    return intersection;
  }
  return null;
};

const getUniqueId = function () {
  return new Date().getTime();
};

const getLine = (from, to) => {
  return {
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y,
  };
};

const getEdgeLine = (nodeShape, adjacentShape) => {
  const centerToCenterLine = getLine(nodeShape.center, adjacentShape.center);
  const from = getColidPoint(centerToCenterLine, nodeShape.tagLines);
  const to = getColidPoint(centerToCenterLine, adjacentShape.tagLines);
  return getLine(from, to);
};

const getNodeShape = (node) => {
  const center = getCenter(node);
  const tagLines = getBorderLines(node);
  return {
    center: center,
    tagLines: tagLines,
  };
};

export default {
  getEdgeLine,
  getNodeShape,
};
