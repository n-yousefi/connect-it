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

export default Triangle;
