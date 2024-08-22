const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../', 'src', 'components');
const outputDir = path.join(__dirname, '../', 'docs');
const essentialFiles = ['.nojekyll', 'index.html', 'README.md'];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
} else {
  // Clear out the directory but skip essential files
  fs.readdirSync(outputDir).forEach(file => {
    if (!essentialFiles.includes(file)) {
      const filePath = path.join(outputDir, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmdirSync(filePath, { recursive: true });
      } else {
        fs.unlinkSync(filePath);
      }
    }
  });
}

function createMarkdownContent(relativePath, content, ext) {
  if (ext === '.html') {
    return `\n### ${relativePath}\n\`\`\`html\n${content}\n\`\`\`\n`;
  } else if (ext === '.js') {
    return `\n### ${relativePath}\n\`\`\`javascript\n${content}\n\`\`\`\n`;
  } else if (ext === '.scss') {
    return `\n### ${relativePath}\n\`\`\`scss\n${content}\n\`\`\`\n`;
  }
  return '';
}

function generateComponentMarkdown(componentName, componentFiles) {
  let content = `# ${componentName}\n`;

  // Check if there's a README.md in the component folder and include its content under the title
  const readmePath = path.join(srcDir, componentName, 'README.md');
  if (fs.existsSync(readmePath)) {
    const readmeContent = fs.readFileSync(readmePath, 'utf-8');
    content += `${readmeContent}\n`;
  }

  // Add a heading for file snippets
  content += `\n## File Snippets\n`;

  componentFiles.forEach(file => {
    const relativePath = path.relative(srcDir, file.path);
    const ext = path.extname(file.path);
    const fileContent = fs.readFileSync(file.path, 'utf-8');
    content += createMarkdownContent(relativePath, fileContent, ext);
  });

  return content;
}

function generateComponentList(components) {
  let content = '## Component List\n\n';

  components.forEach(component => {
    const componentName = component.name;
    content += `- [${componentName}](./${componentName}.md)\n`;

    component.files.forEach(file => {
      const relativePath = path.relative(srcDir, file.path);
      const id = relativePath.replace(/\//g, '').replace(/\./g, '').replace(/-/g, '').toLowerCase();
      content += `  - [${relativePath}](./${componentName}.md#${id})\n`;
    });
  });

  return content;
}

function generateSidebarMarkdown(components) {
  let content = '* [Home](/)\n';
  content += '* Components\n';

  components.forEach(component => {
    const componentName = component.name;
    content += `    * [${componentName}](./${componentName}.md)\n`;
  });

  return content;
}

function readDirectory(dir) {
  const components = [];

  function traverseDir(currentDir, rootDir) {
    const files = fs.readdirSync(currentDir);
    const componentFiles = [];

    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        traverseDir(filePath, rootDir);
      } else if (fileStat.isFile()) {
        const ext = path.extname(filePath);
        if (['.html', '.js', '.scss'].includes(ext)) {
          componentFiles.push({ path: filePath, ext });
        }
      }
    });

    if (componentFiles.length > 0) {
      const componentName = path.basename(rootDir);
      const existingComponent = components.find(comp => comp.name === componentName);
      if (existingComponent) {
        existingComponent.files.push(...componentFiles);
      } else {
        components.push({ name: componentName, files: componentFiles });
      }
    }
  }

  const rootDirs = fs.readdirSync(dir);
  rootDirs.forEach(rootDir => {
    const rootDirPath = path.join(dir, rootDir);
    if (fs.statSync(rootDirPath).isDirectory()) {
      traverseDir(rootDirPath, rootDirPath);
    }
  });

  return components;
}

const components = readDirectory(srcDir);

// Create Markdown files for each component
components.forEach(component => {
  const componentMarkdown = generateComponentMarkdown(component.name, component.files);
  fs.writeFileSync(path.join(outputDir, `${component.name}.md`), componentMarkdown);
});

// Generate the Docsify sidebar file
const sidebarMarkdown = generateSidebarMarkdown(components);
fs.writeFileSync(path.join(outputDir, '_sidebar.md'), sidebarMarkdown);

// Update the README.md with a component list using placeholder tags
const readmePath = path.join(outputDir, 'README.md');
let readmeContent = '';

if (fs.existsSync(readmePath)) {
  readmeContent = fs.readFileSync(readmePath, 'utf-8');
}

// Placeholder tags for component list
const startTag = '<!-- COMPONENT LIST START -->';
const endTag = '<!-- COMPONENT LIST END -->';
const componentList = generateComponentList(components);

const newReadmeContent = readmeContent.includes(startTag) && readmeContent.includes(endTag)
  ? readmeContent.replace(new RegExp(`${startTag}[\\s\\S]*${endTag}`), `${startTag}\n\n${componentList}\n${endTag}`)
  : `${readmeContent}\n\n${startTag}\n\n${componentList}\n${endTag}`;

fs.writeFileSync(readmePath, newReadmeContent);

console.log('Markdown documents, sidebar, and updated README.md created in the output directory');