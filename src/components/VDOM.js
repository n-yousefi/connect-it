import Calc from "../utils/Calc";

export class VDOM {
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
