# Directory Structure Generator

This script generates a markdown representation of the StyleForgeAI project structure, which is used to maintain up-to-date documentation of our codebase organization. The generated structure is used in our main project documentation and is required to be updated as part of our PR process.

## Purpose

- Maintain accurate documentation of project structure
- Help new team members understand codebase organization
- Track changes in project architecture
- Support CI/CD process by ensuring documentation stays in sync with code

## Usage

### Quick Start

```bash
# Generate project structure
npx ts-node scripts/dir/dir-md.ts

# Review the generated structure in scripts/dir/project-structure.md
# If changes look correct, copy to root:
cp scripts/dir/project-structure.md ./project-structure.md
```

### Manual Compilation and Execution

```bash
# Compile TypeScript
tsc scripts/dir/dir-md.ts

# Run the compiled JavaScript
node scripts/dir/dir-md.js

# Or run both commands at once
tsc scripts/dir/dir-md.ts && node scripts/dir/dir-md.js
```

## Output

The script generates a markdown file (`project-structure.md`) that includes:
- Directory tree structure
- File counts and sizes
- Ignored directories (based on .gitignore)
- Timestamp of generation

## Integration with Development Workflow

As part of our PR process, developers are required to:
1. Run the directory structure generator
2. Review the generated structure
3. Update the project-structure.md file if changes are needed
4. Include any structure changes in their PR

## Configuration

The script automatically:
- Ignores directories listed in .gitignore
- Excludes node_modules and other common build artifacts
- Formats the output in a consistent markdown structure

## Maintenance

The script is maintained in the `scripts/dir` directory:
- `dir-md.ts`: TypeScript source
- `dir-md.js`: Compiled JavaScript (generated)
- `dir-md-readme.md`: This documentation file

## Related Documentation

- [CI/CD Process](../../docs/ci-cd.md) - Details about PR process and structure updates
- [Project Structure](./project-structure.md) - The generated project structure
- [Architecture Overview](../../docs/architecture.md) - High-level architecture documentation