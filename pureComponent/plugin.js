export default function(babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      MemberExpression(path) {
        const { node } = path;
        const isSuperClass = path.parent.superClass === node;

        if (isSuperClass) {
          node.property = t.Identifier("PureComponent");
        }
      }
    }
  }
}
