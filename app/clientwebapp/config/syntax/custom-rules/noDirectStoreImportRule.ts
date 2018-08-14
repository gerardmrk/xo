import * as ts from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = "import statement forbidden";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
  }
}

// The walker takes care of all the work.
class NoImportsWalker extends Lint.RuleWalker {
  private message: string = "Import from the main store entrypoint to avoid import statement bloat";

  private indicator: string = '"@client/store';
  private indicatorLen: number = this.indicator.length + 1;

  public visitImportDeclaration(node: ts.ImportDeclaration): void {
    if (!node.getSourceFile().fileName.endsWith(".tsx")) {
      return;
    }

    const importPath: string = node.moduleSpecifier.getText();

    if (importPath.startsWith(this.indicator) && importPath.length !== this.indicatorLen) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.message));
    }

    // call the base version of this visitor to actually parse this node
    super.visitImportDeclaration(node);
  }
}
