import polka from 'polka';
import sirv from 'sirv';
import path from 'path';
import fs from 'fs';

const { PORT = 3001 } = process.env;

polka()
  .use(
    sirv(path.resolve(__dirname, '../..'), {
      dev: true,
    }),
  )
  .use(
    sirv(path.resolve(__dirname), {
      dev: true,
    }),
  )
  .get('/health', (req, res) => {
    res.end('OK');
  })
  .get('/slow/*', (req, res) => {
    const reqPath = req.path.substring('/slow/'.length);
    const file = fs.readFileSync(path.resolve(__dirname, reqPath));
    setTimeout(() => res.end(file), 6000);
  })
  .listen(PORT, (_) => {
    console.log(`> Running on http://localhost:${PORT}`);
  });
