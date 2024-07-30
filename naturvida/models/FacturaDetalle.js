import mongoose from 'mongoose';

const FacturaDetalleSchema = new mongoose.Schema({
  facNumero: { type: mongoose.Schema.Types.ObjectId, ref: 'Factura', required: true },
  facProducto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  facCantidad: { type: Number, required: true },
}, { collection: 'facturadetalles' });

export default mongoose.models.FacturaDetalle || mongoose.model('FacturaDetalle', FacturaDetalleSchema);
