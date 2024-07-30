import dbConnect from '../../../lib/dbConnect';
import Vendedor from '../../../models/Vendedor';
import Factura from '../../../models/Factura';
import FacturaDetalle from '../../../models/FacturaDetalle';
import Producto from '../../../models/Producto';
import { authenticate } from '../../../lib/authentication';

const handler = async (req, res) => {
  await dbConnect();

  const { method } = req;
  const { id: vendedorId } = req.query;

  switch (method) {
    case 'GET':
      if (!vendedorId) {
        return res.status(400).json({ message: 'Vendedor ID is required' });
      }

      try {
        // Obtener todas las facturas del vendedor especificado
        const facturas = await Factura.find({ facVendedor: vendedorId });

        // Obtener los detalles de las facturas de esas facturas
        const facturaIds = facturas.map(factura => factura._id);
        const detalles = await FacturaDetalle.find({ facNumero: { $in: facturaIds } })
          .populate('facProducto', 'proDescripcion proValor proCantidad');

        // Agrupar los productos vendidos por el vendedor
        const productosVendidos = detalles.reduce((acc, detalle) => {
          const producto = detalle.facProducto;
          if (!acc[producto._id]) {
            acc[producto._id] = {
              _id: producto._id,
              proDescripcion: producto.proDescripcion,
              proValor: producto.proValor,
              proCantidadDisponible: producto.proCantidad,
              cantidadVendida: 0
            };
          }
          acc[producto._id].cantidadVendida += detalle.facCantidad;
          acc[producto._id].proCantidadDisponible -= detalle.facCantidad; // Restar la cantidad vendida de la cantidad disponible
          return acc;
        }, {});

        // Convertir el objeto en un array
        const productosVendidosArray = Object.values(productosVendidos);

        res.status(200).json(productosVendidosArray);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching productos vendidos: ' + error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
};

export default authenticate(handler);
