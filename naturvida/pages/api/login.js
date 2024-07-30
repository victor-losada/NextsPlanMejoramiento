import bcrypt from 'bcryptjs';
import dbConnect from '../../lib/dbConnect';
import Vendedor from '../../models/Vendedor';
import { generateToken } from '../../lib/authentication';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { venUsername, venPassword } = req.body;
    
    await dbConnect();
    
    const user = await Vendedor.findOne({ venUsername });
    if (!user) {
      return res.status(401).json({ error: 'Invalid venUsername or venPassword' });
    }
    
    const isMatch = await bcrypt.compare(venPassword, user.venPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid venUsername or venPassword' });
    }
    
    const token = generateToken(user);
    res.status(200).json({ token });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
