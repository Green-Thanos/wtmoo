/* globals html, title, text, heading, subheading, list, block, c, link */
`
enum Value {
  Unit(),
  Boolean(bool),
  Integer(i64),
  Float(f64),
  String(Box<str>),
}
`