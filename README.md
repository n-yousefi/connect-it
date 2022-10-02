# &lt;connect-it&gt;

Connect everything together with SVG lines. &lt;connect-it&gt; is a web component that is responsible for creating a graph or digraph. Just introduce your styled tags as nodes and then specify the adjacent nodes.

![Directed Javascript graph](https://github.com/n-yousefi/connect-it/blob/main/samples/demo.jpg)

## Examples/Demos

The best way to become acquainted with the library is to see [Demos](https://htmlpreview.github.io/?https://github.com/n-yousefi/connect-it/blob/main/samples/sample.html)

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

## How it works

### Nodes

Spacify an Id for your tag and put it inside the nodes tag. You can style it as you wish.

```html
<nodes>
  <div id="node1">First</div>
  <div id="node2">Second</div>
  <div id="node3">Third</div>
</nodes>
```

### Adjacents

Define source and adjacent nodes to draw the graph. You can specify the color and size of the link.

```html
<edges>
  <edge from="node1" to="node2" color="red"></edge>
  <edge from="node1" to="node3"></edge>
  <edge from="node2" to="node3" size="2"></edge>
</edges>
```

### Markers

For now, we support 3 type of markers; Circle, square and triangle. You should define your markers inside the shapes tag.

```html
<shapes>
  <shape name="shape1" type="triangle" size="10" color="red"></shape>
  <shape name="shape2" type="square" size="10"></shape>
  <shape name="shape3" type="circle" size="5" color="red"></shape>
</shapes>
```

then you can use this shapes as an edge marker:

```html
<edge from="node1" to="node2" marker-start="shape2" marker-end="shape1"></edge>
```

## Author

Naser Yousefi
