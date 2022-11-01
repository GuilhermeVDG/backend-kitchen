import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface PayLoad{
  sub: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if(!authToken) return res.status(401).json({ error: 'INVALID_TOKEN' });

  const token = authToken.split(' ')[1];

  try{
    
    const { sub } = verify(
      token,
      authConfig.secret
    ) as PayLoad;

    req.userId = sub;
    
    return next();
  }catch(err){    
    return res.status(401).json({ error: 'INVALID_TOKEN' });
  }


}