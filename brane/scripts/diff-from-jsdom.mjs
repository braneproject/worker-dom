import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as console from 'node:console';

import { diffLines, createTwoFilesPatch } from 'diff';

import sourceMap from './jsdom-source-map.mjs';

const dirName = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.resolve(dirName, '..');

for (const [src, dest] of sourceMap) {
  const srcResolved = path.resolve(baseDir, '../../jsdom', src);
  const destResolved = path.resolve(baseDir, dest);
  const srcContent = fs.readFileSync(srcResolved).toString();
  const destContent = fs.readFileSync(destResolved).toString();
  const changes = diffLines(srcContent, destContent);
  const changed = changes.some(change => change.added || change.removed);
  if (!changed) continue;
  const patch = createTwoFilesPatch(src, dest, srcContent, destContent);
  console.log(patch);
}
