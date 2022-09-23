const Path = (d, edge) => {
  return `<path d="${d}" 
    stroke="${edge.color}" 
    stroke-width="${edge.size ?? 2}" 
    marker-start="url(#${edge.markerStart})"
    marker-end="url(#${edge.markerEnd})"
    "/>`;
};

export default Path;
