import path from 'path';
import fs from 'fs';

import sourceMap from './jsdom-source-map.js';

for (const [src, dest] of sourceMap) {
  const srcResolved = path.resolve(__dirname, '../../jsdom', src);
  const destResolved = path.resolve(__dirname, dest);
  fs.copyFileSync(srcResolved, destResolved);
}
