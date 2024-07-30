import jwt from 'jsonwebtoken';
import Vendedor from '../models/Vendedor';
import dbConnect from './dbConnect';

const secret = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, secret, {
    expiresIn: '1d',
  });
};

export const authenticate = (handler) => {
  return async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
      const decoded = jwt.verify(token, secret);
      await dbConnect();
      const user = await Vendedor.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      req.user = user;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
