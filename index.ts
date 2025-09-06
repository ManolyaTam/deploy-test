import express from 'express';
import fs from 'fs';
import path from 'path';
import { character } from './types'

const app = express();
const port = 3001;

app.use(express.json())

app.get("/characters", (req: express.Request, res: express.Response) => {
  fs.readFile('characters.json', 'utf-8', (err, data) => {
    if (err) {
      console.error('something went wrong', err);
      res.status(500).end();
    } else {
      res.contentType('application/json').status(200).send(data);
    }
  })
})

app.get("/characters/:id", (req: express.Request, res: express.Response) => {
  const id = req.params?.id;
  fs.readFile('characters.json', 'utf-8', (err, data) => {
    if (err) {
      console.error('something went wrong', err);
      res.status(500).end();
    }
    else {
      const arr = JSON.parse(data) as character[];
      if (id) {
        const found = arr.find(item => item.id === +id);
        if (found) {
          res.contentType('application/json').status(200).send(found);
        } else {
          res.status(404).send("No characters found");
        }
      } else {
        res.status(400).send("Something went wrong");
      }
    }
  })
})

app.use((req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, 'not-found.html'));
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})