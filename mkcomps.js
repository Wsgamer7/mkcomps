#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (args.length === 2) {
  createComponent(args[0], args[1]);
} else {
  console.log("Usage: node mkcomps.js <parentPath> <componentName>");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function createComponentFile(parentPath, componentName) {
  const componentPath = path.join(parentPath, componentName, "index.tsx");
  const componentContent = `import styles from './index.module.scss' \n export default function ${componentName} () {
        return (<div>${componentName}</div>)
    }`;
  fs.writeFileSync(componentPath, componentContent);
  console.log(`Component is in ${componentPath}`);
}
function createScssFile(parentPath, componentName) {
  const scssPath = path.join(parentPath, componentName, "index.module.scss");
  const cssMediaQuery = "@media (max-width: 900px) {\n}";
  fs.writeFileSync(scssPath, cssMediaQuery);
  console.log(`Scss is in ${scssPath}`);
}

function createComponent(parentPath, componentName) {
  componentName = capitalizeFirstLetter(componentName);
  const componentPath = path.join(parentPath, componentName);
  if (fs.existsSync(componentPath)) {
    console.log(`Component ${componentName} 已经存在`);
    return;
  }
  fs.mkdirSync(componentPath, { recursive: true });
  createComponentFile(parentPath, componentName);
  createScssFile(parentPath, componentName);
}
