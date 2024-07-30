import mongoose from 'mongoose';

const FacturaSchema = new mongoose.Schema({
  facFecha: { type: Date, required: true },
  facCliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  facVendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendedor', required: true },
  facValorTotal: { type: Number, required: true },
}, { collection: 'facturas' });

export default mongoose.models.Factura || mongoose.model('Factura', FacturaSchema);
