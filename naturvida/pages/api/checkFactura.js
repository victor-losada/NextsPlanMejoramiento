import dbConnect from '../../lib/dbConnect';
import Factura from '../../models/Factura';
import Cliente from '../../models/Cliente';
import Vendedor from '../../models/Vendedor';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const facturaId = '6695439dadb4e4f11fa10971'; // Reemplaza esto con el ID que deseas verificar

    // Primero, verificar si la factura existe
    const facturaSinPopulate = await Factura.findById(facturaId);
    if (!facturaSinPopulate) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }

    // Verificar si el cliente y el vendedor existen
    const cliente = await Cliente.findById(facturaSinPopulate.facCliente);
    const vendedor = await Vendedor.findById(facturaSinPopulate.facVendedor);

    console.log('Cliente:', cliente);
    console.log('Vendedor:', vendedor);
    

    // Buscar la factura y hacer populate en los campos facCliente y facVendedor
    const factura = await Factura.findById(facturaId)
      .populate('facCliente', 'dCedula dNombre')
      .populate('facVendedor', 'venUsername');

    console.log('Factura completa:', factura);

    res.status(200).json(factura);
  } catch (error) {
    console.error('Error fetching factura:', error.message);
    res.status(500).json({ message: 'Error fetching factura: ' + error.message });
  }
}

