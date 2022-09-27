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
export default Square;
