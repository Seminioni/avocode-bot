import express from 'express';
const app = express();
const port = 3000;

app.get('/', (request, response) => {
  console.log('Hello from Express!');
  console.log(`Your IP: ${request.connection.remoteAddress}`);
  response.send('Hello from Express!');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
