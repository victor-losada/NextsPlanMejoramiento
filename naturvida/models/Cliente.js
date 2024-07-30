import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema({
  dNombre: {
    type: String,
    required: true
  },
  dDireccion: {
    type: String,
    required: true
  },
  dTelefono: {
    type: String,
    required: true
  },
  dCorreo: {
    type: String,
    required: true
  },
  dCedula: {
    type: String,
    required: true
  }
}, { collection: 'clientes' });

export default mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);
