/* globals html, title, text, heading, subheading, list, block, c, link */
`
typedef enum NodeType {
  Block,
  Call,
} NodeType;

typedef struct Node {
  NodeType type;
  const char *contents;
} Node;
`