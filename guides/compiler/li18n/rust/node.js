
````/* globals html, title, text, heading, subheading, list, block, c, lin`
enum Literal {
  Boolean(bool),
  Integer(isize),
  Float(f64),
  String(Box<str>),
}

enum Node {
  Block { statements: Vec<Node> },
  Call { function: Node, arguments: Vec<Node> },
}
```