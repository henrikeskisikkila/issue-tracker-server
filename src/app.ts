import express from 'express';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  return console.log('Server is listening at port 3000');
})