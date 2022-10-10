import express, { Request, Response, NextFunction, Router } from 'express';
import 'express-async-errors';
import cors from 'cors';
import Routes from './routes';

class App{
  routes: Routes;
  app;

  constructor(){
    this.app = express();
    this.routes = new Routes();
    this.app.use(express.json());

    this.app.use(cors());

    this.app.use(this.routes.setup());

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if(err instanceof Error){
        return res.status(400).json({
          error: err.message
        })
      }
    
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
      })
    })

  }

  startServer(){
    this.app.listen(3333, () => {
      console.log('Server started in port 3333');
      
    })
  }

}

export default App;