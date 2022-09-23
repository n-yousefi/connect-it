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
export default Circle;
