import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import linkController from './controllers/linkController';

const app = express();

// For getting the IP address
app.set('trust proxy', true);

app.use(helmet());
app.use(cors({ origin: '*' }));

app.get('/t/:slug', (req: Request, res: Response) => {
  return linkController(req, res);
});

app.listen(3001, () => {
  console.log('listening');
});
