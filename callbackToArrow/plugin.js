export default function(babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      FunctionExpression(path) {
        const isArgument = path.parentKey === "arguments";
        let hasThis = false;

        if (isArgument) {
          path.traverse({
            ThisExpression(path) {
              hasThis = true;
            }
          });
        }

        if (isArgument && !hasThis) {
          const { body, params } = path.node;
          path.replaceWith(t.arrowFunctionExpression(params, body));
        }
      }
    }
  };
}
