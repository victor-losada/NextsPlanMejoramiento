import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
  proDescripcion: {
    type: String,
    required: true
  },
  proValor: {
    type: Number,
    required: true
  },
  proCantidad: {
    type: Number,
    required: true
  }
}, { collection: 'productos' });

export default mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);
