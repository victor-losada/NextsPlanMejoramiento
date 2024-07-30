import dbConnect from '../../lib/dbConnect';
import DetalleFactura from '../../models/FacturaDetalle';
import { authenticate } from '../../lib/authentication';

const handler = async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const detalles = await DetalleFactura.find({}).populate('facNumero facProducto');
      res.status(200).json(detalles);
      break;

    case 'POST':
      const newDetalle = new DetalleFactura(req.body);
      await newDetalle.save();
      res.status(201).json(newDetalle);
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
};

export default authenticate(handler);
