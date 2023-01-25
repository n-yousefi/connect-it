# &lt;connect-it&gt;

Connect everything together with SVG lines. `<connect-it>` is a web component that allows you to create various types of diagrams, such as flowcharts, mind maps, network diagrams, org charts, and flow diagrams. The component is highly customizable, so you can create many other types of diagrams as well.

## Features

- Suitable for creating different types of diagrams
- independent of node types
- Customizable link colors and sizes
- Customizable markers (circle, square, triangle)
- Create interactive diagrams by adding event handlers for edges (click, mouseover, mouseout)

## Examples/Demos

The best way to become familiar with the library is to check out this demos:

- [Diffrent node types](https://htmlpreview.github.io/?https://github.com/n-yousefi/connect-it/blob/main/samples/diffrent-node-types.html)
- [Movable random nodes](https://htmlpreview.github.io/?https://github.com/n-yousefi/connect-it/blob/main/samples/movable-random-nodes.html)
- [Flowchart](https://htmlpreview.github.io/?https://github.com/n-yousefi/connect-it/blob/main/samples/flowchart.html)

## Installing

Using npm:

[![npm](https://img.shields.io/badge/npm-connect--to-brightgreen)](https://www.npmjs.com/package/connect-it/)

```bash
$ npm install connect-it
```

Then import it:

```html
<script src="./node_modules/connect-it/dist/connect-it.js" defer></script>
```

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/connect-it/dist/connect-it.js"></script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/connect-it/dist/connect-it.js"></script>
```

## Usage

### Nodes

Specify an Id for your node and put it inside the `<nodes>` tag. You can style it as you wish.

```html
<connect-it>
  <nodes>
    <div id="node1">First</div>
    <div id="node2">Second</div>
    <div id="node3">Third</div>
  </nodes>
</connect-it>
```

### Adjacents

Define source and adjacent nodes to draw the graph. You can specify the color and size of the link.

```html
<connect-it>
  <nodes>
    <div id="node1">First</div>
    <div id="node2">Second</div>
    <div id="node3">Third</div>
  </nodes>
  <edges>
    <edge from="node1" to="node2" color="red"></edge>
    <edge from="node1" to="node3"></edge>
    <edge from="node2" to="node3" size="2"></edge>
  </edges>
</connect-it>
```

### Edge Markers

You can define different shapes inside the `<shapes>` tag and use them as an edge marker.
For now, we support 3 type of shapes; `circle`, `square` and `triangle`.

```html
<connect-it>
  <nodes>
    <div id="node1">First</div>
    <div id="node2">Second</div>
    <div id="node3">Third</div>
  </nodes>
  <edges>
    <edge from="node1" to="node2" marker-start="s1" marker-end="t1"></edge>
    <edge from="node1" to="node3"></edge>
    <edge from="node2" to="node3"></edge>
  </edges>
  <shapes>
    <shape name="t1" type="triangle" size="10" color="red"></shape>
    <shape name="s1" type="square" size="10"></shape>
    <shape name="c1" type="circle" size="5" color="red"></shape>
  </shapes>
</connect-it>
```

### Event Handlers

`connect-it` provides some event handlers that you can use to create interactive diagrams. The following event handlers are available now:

- onEdgesMouseover: Called when the user hovers over an edge
- onEdgesMouseout: Called when the user stops hovering over an edge
- onEdgesClick: Called when the user clicks on an edge

You can use these event handlers to create custom interactions and animations in your graph.

### Limitations

Currently fixed and sticky position is not supported.
