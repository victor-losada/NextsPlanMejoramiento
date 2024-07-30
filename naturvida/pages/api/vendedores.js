import dbConnect from '../../lib/dbConnect';
import Vendedor from '../../models/Vendedor';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      const { venUsername, venPassword } = req.body;

      try {
        const hashedPassword = await bcrypt.hash(venPassword, 10);

        const newVendedor = new Vendedor({
          venUsername,
          venPassword: hashedPassword
        });

        await newVendedor.save();
        res.status(201).json(newVendedor);
      } catch (error) {
        res.status(500).json({ message: 'Error creando vendedor' });
      }
      break;

    case 'GET':
      try {
        const vendedores = await Vendedor.find();
        res.status(200).json(vendedores);
      } catch (error) {
        res.status(500).json({ message: 'Error obteniendo vendedores' });
      }
      break;

    
  }
}