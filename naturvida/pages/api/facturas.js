import dbConnect from '../../lib/dbConnect';
import Factura from '../../models/Factura';
import Cliente from '../../models/Cliente';
import Vendedor from '../../models/Vendedor';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const facturas = await Factura.find({})
          .populate('facCliente', 'dCedula dNombre')
          .populate('facVendedor', 'venUsername');

        const formattedFacturas = facturas.map(factura => ({
          id: factura._id, 
          facValorTotal: factura.facValorTotal, 
          cliCedula: factura.facCliente ? factura.facCliente.dCedula : null, 
          cliNombre: factura.facCliente ? factura.facCliente.dNombre : null,
          venUsername: factura.facVendedor ? factura.facVendedor.venUsername : null, 
        }));

        res.status(200).json(formattedFacturas);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching facturas: ' + error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
