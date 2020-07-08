import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = process.env.PORT || 3000;
const handler = app.getRequestHandler();
const server = express();

(async() => {
    try{
      await app.prepare();
      
      server.all('*', (request, response) => {
        return handler(request, response);
      })

      server.listen(port, () => {
        console.log(`Listen on port ${port}`)
      });
    }
    catch(err) {
      console.log('Something is wrong...');
    }
  }
)()
