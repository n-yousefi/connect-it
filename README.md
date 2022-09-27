## <connect-to>

Connect everything together with SVG lines, like a graph or digraph. Just introduce your styled tag as a node and then specify the adjacent node.

![Directed Javascript graph](https://github.com/n-yousefi/connect-it/blob/main/samples/demo.jpg)

## Examples/Demos

The best way to become acquainted with the library is to see [Demos](https://htmlpreview.github.io/?https://github.com/n-yousefi/connect-it/blob/main/samples/sample.html)

## Installing

```bash
$ npm install connect-to --save-dev
```

## How it works

### Nodes:

Spacify an Id for your tag and put it inside the <nodes> tag. You can style it as you wish.

```html
<nodes>
  <div id="node 1">First</div>
  <div id="node 2">Second</div>
  <div id="node 2">Third</div>
</nodes>
```

### Adjacents

Define source and adjacent nodes to draw the graph. You can specify the color and size of the link.

```html
<edges>
  <edge from="item1" to="item2" color="red"></edge>
  <edge from="item1" to="item3"></edge>
  <edge from="item2" to="item3" size="2"></edge>
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

then you can use this shapes as edge start or end marker:

```html
<edge from="item1" to="item2" marker-start="shape2" marker-end="shape1"></edge>
```

## Author

Naser Yousefi
