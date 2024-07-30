import dbConnect from '../../lib/dbConnect';
import Producto from '../../models/Producto';
import FacturaDetalle from '../../models/FacturaDetalle';
import { authenticate } from '../../lib/authentication';

async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        // Obtener todos los productos
        const productos = await Producto.find({});

        // Obtener todos los detalles de las facturas
        const detalles = await FacturaDetalle.find({});

        // Calcular las unidades vendidas por producto
        const unidadesVendidasPorProducto = {};

        detalles.forEach(detalle => {
          if (unidadesVendidasPorProducto[detalle.facProducto]) {
            unidadesVendidasPorProducto[detalle.facProducto] += detalle.facCantidad;
          } else {
            unidadesVendidasPorProducto[detalle.facProducto] = detalle.facCantidad;
          }
        });

        // Formatear los productos con la cantidad disponible y las unidades vendidas
        const productosConDetalle = productos.map(producto => {
          return {
            _id: producto._id,
            proDescripcion: producto.proDescripcion,
            proValor: producto.proValor,
            proCantidad: producto.proCantidad,
            proUnidadesVendidas: unidadesVendidasPorProducto[producto._id] || 0
          };
        });

        res.status(200).json(productosConDetalle);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching productos: ' + error.message });
      }
      break;

    case 'POST':
      try {
        const newProducto = new Producto(req.body);
        await newProducto.save();
        res.status(201).json(newProducto);
      } catch (error) {
        res.status(500).json({ error: 'Error creating producto' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}

export default authenticate(handler);
