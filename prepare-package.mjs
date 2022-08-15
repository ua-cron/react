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
  license,
  repository,
  sideEffects,
  dependencies,
  peerDependencies,
  bugs
} = JSON.parse(packageString);

const nextVersion = isAlpha ? `${version}-alpha.${Date.now()}` : version;

const libPackage = JSON.stringify({
  name,
  version: nextVersion,
  author,
  license,
  repository,
  dependencies,
  peerDependencies,
  sideEffects,
  bugs,
  main: 'index.js'
}, null, '  ');

writeFileSync(resolve(distLibPath, './package.json'), libPackage);
