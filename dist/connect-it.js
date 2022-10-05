(function () {
  'use strict';

  const Defs = () => {
    return `<defs></defs>`;
  };

  const Gmain = () => {
    return `<g class="gmain" fill="none" stroke="black" stroke-width="2"></g>`;
  };

  const Gshadow = () => {
    return `<g class="gshadow"></g>`;
  };

  const addSvg = (connectIt) => {
    const html = `<svg style="position: absolute; top: 0; left: 0;  z-index:-1">
    ${Defs() + Gmain() + Gshadow()}
    </svg>`;

    connectIt.insertAdjacentHTML("afterbegin", html);
    connectIt.defs = connectIt.querySelector("defs");
  };

  const resetGraphics = function (connectIt) {
    const main = getGmain(connectIt);
    const shadows = getGshadow(connectIt);
    main.innerHTML = "";
    shadows.innerHTML = "";
    return { main, shadows };
  };

  const getGmain = function (connectIt) {
    return connectIt.querySelector("svg > g.gmain");
  };

  const getGshadow = function (connectIt) {
    return connectIt.querySelector("svg > g.gshadow");
  };

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

  const Circle = (shape) => {
    const size = shape.size ?? 6;
    const center = size / 2;
    const color = shape.color ?? "black";

    return `<marker id="${
    shape.id
  }Start" orient="auto" refY="${center}" refX="${0}" markerHeight="${size}" markerWidth="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx=${center} cy=${center} r=${center}  fill="${color}"></circle>
  </marker>
  <marker id="${
    shape.id
  }End" orient="auto" refY="${center}" refX="${size}" markerHeight="${size}" markerWidth="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx=${center} cy=${center} r=${center}  fill="${color}"></circle>
  </marker>`;
  };

  const Square = (shape) => {
    const size = shape.size ?? 6;
    const center = size / 2;
    const color = shape.color ?? "black";

    return `<marker id="${shape.id}Start" orient="auto" refY="${
    center / 2
  }" refX="${0}" markerHeight="${size}" markerWidth="${size}" viewBox="0 0 ${size} ${size}">
    <rect x="0" y="0" width=${center} height=${center}  fill="${color}"/>
  </marker>
  <marker id="${shape.id}End" orient="auto" refY="${
    center / 2
  }" refX="${center}" markerHeight="${size}" markerWidth="${size}" viewBox="0 0 ${size} ${size}">
    <rect x="0" y="0" width=${center} height=${center}  fill="${color}"/>
  </marker>`;
  };

  const Triangle = function (shape) {
    const size = shape.size ?? 6;
    const center = size / 2;
    const color = shape.color ?? "black";
    return `<marker id="${
    shape.id
  }Start" orient="auto" refY="${center}" refX="${0}" 
    markerHeight="${size}" markerWidth="${size}" viewBox="0 0 ${size} ${size}">
        <polygon points="0,0 0,${size} ${center},${center}" fill="${color}"></polygon>
  </marker>
  <marker id="${shape.id}End" orient="auto" refY="${center}" refX="${center}" 
    markerHeight="${size}" markerWidth="${size}" viewBox="0 0 ${size} ${size}">
        <polygon points="0,0 0,${size} ${center},${center}" fill="${color}"></polygon>
  </marker>`;
  };

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
        case "square":
          markerHtml = Square(shape);
          break;
      }
      connectIt.defs.insertAdjacentHTML("beforeend", markerHtml);
    });
  };

  const D = (line) => {
    return `M${line.x1},${line.y1} L${line.x2},${line.y2} `;
  };

  const ShadowPath = (d) => {
    return `<path stroke="transparent" stroke-width="12" d="${d}"/>`;
  };

  const Path = (d, edge) => {
    return `<path d="${d}" 
    stroke="${edge.color}" 
    stroke-width="${edge.size ?? 2}" 
    marker-start="url(#${edge.markerStart})"
    marker-end="url(#${edge.markerEnd})"
    "/>`;
  };

  const refreshEdges = function (connectIt) {
    const graphics = resetGraphics(connectIt);
    connectIt.vdom.links.forEach((edge, i) => {
      DrawEdge(graphics, edge);
    });
  };

  const DrawEdge = (graphics, edge) => {
    const d = D(edge.line);
    graphics.main.innerHTML += Path(d, edge);
    graphics.shadows.innerHTML += ShadowPath(d);
  };

  class ConnectTo extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.onScroll();
      const connectTo = this;
      addSvg(this);
      this.onLoad(() => {
        connectTo.refresh();
      });
      this.observe(function (mutation) {
        if (mutation.target.parent == this && !mutation.target.closest("nodes"))
          return;
        connectTo.refresh();
      });
    }

    onScroll = () => {
      const connectTo = this;
      document.addEventListener("scroll", connectTo.refresh);
      window.addEventListener("resize", connectTo.refresh);
    };

    disconnectedCallback() {
      this.observer.disconnect();
    }

    observe = (handler) => {
      this.observer = new MutationObserver(function (mutations) {
        mutations.forEach(handler);
      });

      this.observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    };

    refresh = () => {
      const vdom = new VDOM(this);
      if (JSON.stringify(vdom) !== JSON.stringify(this.vdom)) {
        this.vdom = vdom;
        //addMouseEvents(this);
        refreshMarkers(this);
        refreshEdges(this);
        this.resizeSVG();
      }
    };

    resizeSVG = () => {
      var svg = this.querySelector("svg");
      var bbox = svg.getBBox();
      svg.setAttribute("width", bbox.x + bbox.width + bbox.x);
      svg.setAttribute("height", bbox.y + bbox.height + bbox.y);
    };

    onLoad = (func) => {
      Promise.all(
        Array.from(this.querySelectorAll("img"))
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise((resolve) => {
                img.onload = img.onerror = resolve;
              })
          )
      ).then(() => {
        func();
      });
    };
  }

  customElements.get("connect-it") ||
    customElements.define("connect-it", ConnectTo);

})();
//# sourceMappingURL=connect-it.js.map
