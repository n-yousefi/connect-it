(function () {
  'use strict';

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

  var Calc = {
    getEdgeLine,
    getNodeShape,
  };

  class VDOM {
    constructor(element) {
      this.nodes = this.parseNodes(element);
      this.shapes = this.parseAll(element, "shapes shape");
      const edges = this.parseAll(element, "edges edge");
      this.setShapeIds();
      this.setNodesAdjecentsAndProps(edges);
      this.links = this.getLinks();
    }

    setNodesAdjecentsAndProps(edges) {
      edges.forEach((edge) => {
        const from = this.getById(this.nodes, edge.from);
        const to = this.getById(this.nodes, edge.to);
        if (
          to &&
          from &&
          (to.center.x !== from.center.x || to.center.y !== from.center.y)
        ) {
          from.adjacents.push({
            to,
            ...this.getMarkers(edge),
            color: edge.color,
            size: edge.size,
          });
        }
      });
    }

    getLinks() {
      const edges = [];
      this.nodes.forEach((node, i) => {
        node.adjacents.forEach((adjacent) => {
          const line = Calc.getEdgeLine(node, adjacent.to);
          edges.push({
            line,
            markerStart: adjacent.markerStart?.id + "Start",
            markerEnd: adjacent.markerEnd?.id + "End",
            color: adjacent.color,
            size: adjacent.size,
          });
        });
      });
      return edges;
    }

    parseAll(element, query) {
      return [...element.querySelectorAll(query)].map(this.parseTag);
    }

    getById(tags, id) {
      return tags.filter((tag) => tag.id == id)[0];
    }

    getByName(tags, name) {
      return tags.filter((tag) => tag.name == name)[0];
    }

    getMarkers(edge) {
      return {
        markerStart: this.getByName(this.shapes, edge["marker-start"]),
        markerEnd: this.getByName(this.shapes, edge["marker-end"]),
      };
    }

    setShapeIds() {
      this.shapes.forEach((shape) => (shape.id = shape.name));
    }

    parseNodes(element) {
      const nodes = [];
      element.querySelectorAll("nodes *[id]").forEach((node, i) => {
        const shape = Calc.getNodeShape(node);
        nodes.push({
          id: node.attributes["id"]?.value,
          ...shape,
          adjacents: [],
        });
      });
      return nodes;
    }

    parseTag = (tag) => {
      const result = {
        name: tag.tagName,
        ...this.getAttributes(tag),
      };
      if (tag.children.length > 0)
        result.children = [...tag.children].map(this.parseTag);
      return result;
    };

    getAttributes(tag) {
      const result = [];
      [...tag.attributes].map((attr) => {
        result[attr.name] = attr.value;
      });
      return result;
    }
  }

  class Marker {
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

  class TriangleMarker extends Marker {
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

  class CircleMarker extends Marker {
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

  class SquareMarker extends Marker {
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
      }
      connectIt.defs.appendChild(markerStart.createMarker());
      connectIt.defs.appendChild(markerEnd.createMarker());
    });
  };

  class Edge {
    constructor(connectIt) {
      this.connectIt = connectIt;
    }

    refreshEdges() {
      this.graphics = this.resetGraphics();
      this.connectIt.vdom.links.forEach((edge, i) => {
        this.graphics.main.appendChild(this.createPath(edge));
        this.graphics.shadows.appendChild(this.createPath(edge));
      });
    }

    resetGraphics() {
      const main = this.connectIt.querySelector("svg > g.gmain");
      const shadows = this.connectIt.querySelector("svg > g.gshadow");
      main.innerHTML = "";
      shadows.innerHTML = "";
      return { main, shadows };
    }

    createPath(edge) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        `M${edge.line.x1},${edge.line.y1} L${edge.line.x2},${edge.line.y2} `
      );
      path.setAttribute("stroke", edge.color);
      path.setAttribute("stroke-width", edge.size ?? 2);
      path.setAttribute("marker-start", `url(#${edge.markerStart})`);
      path.setAttribute("marker-end", `url(#${edge.markerEnd})`);
      return path;
    }
  }

  class SVG {
    constructor(element) {
      this.element = element;
      this.init();
      this.edge = new Edge(element);
    }

    init() {
      this.svg = this.createSVG();
      this.element.appendChild(this.svg);
      this.element.defs = this.svg.querySelector("defs");
    }

    refresh() {
      const vdom = new VDOM(this.element);
      if (JSON.stringify(vdom) !== JSON.stringify(this.element.vdom)) {
        this.element.vdom = vdom;
        refreshMarkers(this.element);
        this.edge.refreshEdges();
        this.resizeSVG();
      }
    }

    resizeSVG() {
      var bbox = this.svg.getBBox();
      this.svg.setAttribute("width", bbox.x + bbox.width + bbox.x);
      this.svg.setAttribute("height", bbox.y + bbox.height + bbox.y);
    }

    createSVG() {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      this.setSVGProperties(svg);
      svg.appendChild(this.createDefs());
      svg.appendChild(this.createGmain());
      svg.appendChild(this.createGshadow());
      return svg;
    }

    createDefs() {
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      return defs;
    }

    createGmain() {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "gmain");
      g.setAttribute("fill", "none");
      g.setAttribute("stroke", "black");
      g.setAttribute("stroke-width", "2");
      return g;
    }

    createGshadow() {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "gshadow");
      return g;
    }

    setSVGProperties(svg) {
      svg.setAttribute(
        "style",
        "position: absolute; top: 0; left: 0; z-index:-1"
      );
    }

    resetSVG(svg) {
      svg.innerHTML = "";
    }
  }

  class Events {
    constructor(element) {
      this.element = element;
    }

    refresh = () => {
      this.element.refresh();
    };

    refreshOnImagesLoaded() {
      Promise.all(
        Array.from(this.element.querySelectorAll("img"))
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise((resolve) => {
                img.onload = img.onerror = resolve;
              })
          )
      ).then(this.refresh);
    }

    refreshOnScroll() {
      document.addEventListener("scroll", this.refresh);
      window.addEventListener("resize", this.refresh);
    }

    disposeRefreshOnScroll() {
      this.observer.disconnect();
    }

    refreshOnUserChanges() {
      this.observer = new MutationObserver(function (mutations) {
        mutations.forEach((mutation) => {
          if (
            mutation.target.parent == this.element &&
            !mutation.target.closest("nodes")
          )
            return;
          this.refresh();
        });
      });

      this.observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    disposeRefreshOnUserChanges() {
      document.removeEventListener("scroll", this.refresh);
      window.removeEventListener("resize", this.refresh);
    }

    addMouseEvents() {
      this.element.addEventListener("click", (e) => {
        e.target.parentElement.classList.contains("gshadow") &&
          this.fireHandler("click", e);
      });

      this.element.addEventListener("mouseout", (e) => {
        e.target.parentElement.classList.contains("gshadow") &&
          this.fireHandler("mouseout", e);
      });

      this.element.addEventListener("mouseover", (e) => {
        e.target.parentElement.classList.contains("gshadow") &&
          this.fireHandler("mouseout", e);
      });
    }

    fireHandler(eventName, e) {
      const listenerName =
        "onEdges" + eventName.charAt(0).toUpperCase() + eventName.slice(1);
      const listener = this.element[listenerName];
      listener && listener(this.getRelatedPath(e.target));
      this.refresh();
      e.stopPropagation();
    }

    getRelatedPath(shadowPath) {
      const element = Array.prototype.indexOf.call(
        shadowPath.parentElement.childNodes,
        shadowPath
      );
      return this.element.querySelector(`edges edge:nth-child(${element + 1})`);
    }
  }

  class ConnectTo extends HTMLElement {
    constructor() {
      super();

      this.svg = new SVG(this);
      this.events = new Events(this);
    }

    connectedCallback() {
      this.events.refreshOnImagesLoaded();
      this.events.refreshOnScroll();
      this.events.refreshOnUserChanges();
      this.events.addMouseEvents();
    }

    disconnectedCallback() {
      this.events.disposeRefreshOnScroll();
      this.events.disposeRefreshOnUserChanges();
    }

    refresh() {
      this.svg.refresh();
    }
  }

  customElements.get("connect-it") ||
    customElements.define("connect-it", ConnectTo);

})();
//# sourceMappingURL=connect-it.js.map
