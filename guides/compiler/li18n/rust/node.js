/* globals html, title, text, heading, subheading, list, block, c, link */
`
// TODO: mention size
enum Node {
  Block { statements: Vec<Node> },
  Call { function: Node, arguments: Vec<Node> },
  Literal { value: Value },
  If { condition: Node, body: Node },
  IfElse { condition: Node, if_true: Node, if_false: Node },
  For { variable: Node, array: Node, body: Node },
  While { condition: Node, body: Node },
  Match { expression: Node, body: Vec<Node> },
  MatchArm { value: Node, body: Node },
}
`