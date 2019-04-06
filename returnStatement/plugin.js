export default function(babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      FunctionDeclaration(path) {
        const { node } = path;
        const returnStatementIndex = node.body.body.findIndex(function(part) {
          return t.isReturnStatement(part);
        });
        node.body.body = node.body.body.slice(0, returnStatementIndex + 1);
      }
    }
  };
}
