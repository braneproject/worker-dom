import path from 'path';
import fs from 'fs';
import console from 'console';

import { diffLines, createTwoFilesPatch } from 'diff';

import sourceMap from './jsdom-source-map.js';

for (const [src, dest] of sourceMap) {
  const srcResolved = path.resolve(__dirname, '../../jsdom', src);
  const destResolved = path.resolve(__dirname, dest);
  const srcContent = fs.readFileSync(srcResolved).toString();
  const destContent = fs.readFileSync(destResolved).toString();
  const changes = diffLines(srcContent, destContent);
  const changed = changes.some(change => change.added || change.removed);
  if (!changed) continue;
  const patch = createTwoFilesPatch(src, dest, srcContent, destContent);
  console.log(patch);
}
