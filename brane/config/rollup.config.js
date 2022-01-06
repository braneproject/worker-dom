import {
  babelPlugin,
  replacePlugin,
} from '../../config/rollup.plugins.js';

const mainThreadConfig = {
  input: 'output/main-thread/index.brane.js',
  output: {
    file: 'dist/brane-debug/main.mjs',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    replacePlugin({ debug: true, brane: true }),
    babelPlugin({
      transpileToES5: false,
      allowConsole: true,
    }),
  ],
};

const workerThreadConfig = {
  input: 'output/worker-thread/index.brane.js',
  output: {
    file: 'dist/brane-debug/worker/worker.mjs',
    format: 'iife',
    name: 'WorkerThread',
    sourcemap: true,
  },
  plugins: [
    replacePlugin({ debug: true, brane: true }),
    babelPlugin({
      transpileToES5: false,
      allowConsole: true,
    }),
  ],
};

export default [
  mainThreadConfig,
  workerThreadConfig,
];
