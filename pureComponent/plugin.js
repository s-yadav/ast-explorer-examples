export default function(babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      MemberExpression(path) {
        const { node } = path;
        const { object, property } = node;
        const isReactComponent = object.name === 'React' && property.name === 'Component';
        const isSuperClass = path.parent.superClass === node;
        if (isReactComponent && isSuperClass) {
          node.property = t.Identifier('PureComponent');
        }
      }
    }
  };
}
