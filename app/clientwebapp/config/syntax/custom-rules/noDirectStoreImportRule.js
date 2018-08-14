"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "import statement forbidden";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// The walker takes care of all the work.
var NoImportsWalker = /** @class */ (function (_super) {
    __extends(NoImportsWalker, _super);
    function NoImportsWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.message = "Import from the main store entrypoint to avoid import statement bloat";
        _this.indicator = '"@client/store';
        _this.indicatorLen = _this.indicator.length + 1;
        return _this;
    }
    NoImportsWalker.prototype.visitImportDeclaration = function (node) {
        if (!node.getSourceFile().fileName.endsWith(".tsx")) {
            return;
        }
        var importPath = node.moduleSpecifier.getText();
        if (importPath.startsWith(this.indicator) && importPath.length !== this.indicatorLen) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.message));
        }
        // call the base version of this visitor to actually parse this node
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    return NoImportsWalker;
}(Lint.RuleWalker));
