import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distLibPath = resolve(__dirname, './dist');
const packagePath = resolve(__dirname, './package.json');

const packageString = readFileSync(packagePath);
const {
  name,
  version,
  author,
  license,
  repository,
  sideEffects,
  bugs
} = JSON.parse(packageString);

const libPackage = JSON.stringify({
  name,
  version,
  author,
  license,
  repository,
  sideEffects,
  bugs,
  main: 'index.js'
}, null, '  ');

writeFileSync(resolve(distLibPath, './package.json'), libPackage);
