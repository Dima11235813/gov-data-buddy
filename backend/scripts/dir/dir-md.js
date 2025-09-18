"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var ignore_1 = require("ignore");
var ROOT_DIR = path.resolve('.');
var GITIGNORE_PATH = path.join(ROOT_DIR, '.gitignore');
var OUTPUT_DIR = path.join(ROOT_DIR, 'scripts', 'dir');
var OUTPUT_FILE = path.join(OUTPUT_DIR, 'project-structure.md');
// Additional ignored files not in .gitignore
var ADDITIONAL_IGNORED = ['.git', '.cursor', '.github', '.vscode', 'assets', 'docs', 'project-mgmt', 'scripts', '.dockerignore'];
function loadGitignore() {
    var ig = (0, ignore_1.default)();
    if (fs.existsSync(GITIGNORE_PATH)) {
        var gitignoreContent = fs.readFileSync(GITIGNORE_PATH, 'utf-8');
        ig.add(gitignoreContent);
    }
    ig.add(ADDITIONAL_IGNORED);
    return ig;
}
var gitignore = loadGitignore();
function shouldIgnore(filePath) {
    var relPath = path.relative(ROOT_DIR, filePath);
    return gitignore.ignores(relPath);
}
function buildMarkdownTree(dirPath, depth) {
    if (depth === void 0) { depth = 0; }
    var indentation = '  '.repeat(depth);
    var items = fs.readdirSync(dirPath).sort();
    var mdContent = '';
    var fileIncluded = false;
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var fullPath = path.join(dirPath, item);
        if (shouldIgnore(fullPath))
            continue;
        var stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            mdContent += "".concat(indentation, "- \uD83D\uDCC1 **").concat(item, "/**\n");
            mdContent += buildMarkdownTree(fullPath, depth + 1);
        }
        else if (!fileIncluded) {
            mdContent += "".concat(indentation, "- \uD83D\uDCC4 ").concat(item, "\n");
            fileIncluded = true;
        }
    }
    return mdContent;
}
if (fs.existsSync(OUTPUT_FILE)) {
    fs.unlinkSync(OUTPUT_FILE);
}
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
var markdownContent = "# Project Structure (Simplified)\n\n".concat(buildMarkdownTree(ROOT_DIR));
fs.writeFileSync(OUTPUT_FILE, markdownContent, 'utf-8');
console.log('project-structure.md generated successfully.');
