import * as ts from 'typescript';

const transformer = (program: ts.Program): ts.TransformerFactory<ts.SourceFile> => context => sourceFile => {
  const visitor = (node: ts.Node): ts.Node => {
    if (ts.isVariableDeclaration(node)) {
      return ts.updateVariableDeclaration(node, node.name, node.type, ts.createStringLiteral('world'));
    }

    console.log(node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);
    return ts.visitEachChild(node, visitor, context);
  };

  return ts.visitNode(sourceFile, visitor);
};
export default transformer