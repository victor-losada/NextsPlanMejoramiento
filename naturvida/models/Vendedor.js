import mongoose from 'mongoose';

const VendedorSchema = new mongoose.Schema({
  venUsername: {
    type: String,
    required: true,
    unique: true
  },
  venPassword: {
    type: String,
    required: true
  }
}, { collection: 'vendedores' });

export default mongoose.models.Vendedor || mongoose.model('Vendedor', VendedorSchema);
