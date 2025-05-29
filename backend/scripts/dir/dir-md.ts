
import * as fs from 'fs';
import * as path from 'path';
import ignore from 'ignore';

const ROOT_DIR = path.resolve('.');
const GITIGNORE_PATH = path.join(ROOT_DIR, '.gitignore');
const OUTPUT_DIR = path.join(ROOT_DIR, 'scripts', 'dir');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'project-structure.md');

// Additional ignored files not in .gitignore
const ADDITIONAL_IGNORED = ['.git', '.cursor', '.github', '.vscode', 'assets', 'docs', 'project-mgmt', 'scripts', '.dockerignore'];

function loadGitignore() {
  const ig = ignore();
  if (fs.existsSync(GITIGNORE_PATH)) {
    const gitignoreContent = fs.readFileSync(GITIGNORE_PATH, 'utf-8');
    ig.add(gitignoreContent);
  }
  ig.add(ADDITIONAL_IGNORED);
  return ig;
}

const gitignore = loadGitignore();

function shouldIgnore(filePath: string): boolean {
  const relPath = path.relative(ROOT_DIR, filePath);
  return gitignore.ignores(relPath);
}

function buildMarkdownTree(dirPath: string, depth = 0): string {
  const indentation = '  '.repeat(depth);
  const items = fs.readdirSync(dirPath).sort();

  let mdContent = '';
  let fileIncluded = false;

  for (const item of items) {
    const fullPath = path.join(dirPath, item);

    if (shouldIgnore(fullPath)) continue;

    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      mdContent += `${indentation}- 📁 **${item}/**\n`;
      mdContent += buildMarkdownTree(fullPath, depth + 1);
    } else if (!fileIncluded) {
      mdContent += `${indentation}- 📄 ${item}\n`;
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

const markdownContent = `# Project Structure (Simplified)\n\n${buildMarkdownTree(ROOT_DIR)}`;

fs.writeFileSync(OUTPUT_FILE, markdownContent, 'utf-8');
console.log('project-structure.md generated successfully.');
