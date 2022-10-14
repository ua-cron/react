import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { env } from 'node:process';

const isAlpha = env.ALPHA;
const __dirname = dirname(fileURLToPath(import.meta.url));
const distLibPath = resolve(__dirname, './dist');
const packagePath = resolve(__dirname, './package.json');

const packageString = readFileSync(packagePath);
const {
  name,
  version,
  author,
  homepage,
  keywords,
  license,
  repository,
  sideEffects,
  dependencies,
  peerDependencies,
  bugs
} = JSON.parse(packageString);

const nextVersion = isAlpha ? `${version}-alpha.${Date.now()}` : version;
const nextDependencies = Object.keys(dependencies).reduce((acc, prop) => {
  if (prop === name) {
    return acc;
  }
  return {
    ...acc,
    [prop]: dependencies[prop]
  }
}, {});

const libPackage = JSON.stringify({
  name,
  version: nextVersion,
  author,
  license,
  keywords,
  repository,
  homepage,
  dependencies: nextDependencies,
  peerDependencies,
  sideEffects,
  bugs,
  main: 'index.js',
  types: 'index.d.ts'
}, null, '  ');

writeFileSync(resolve(distLibPath, './package.json'), libPackage);
