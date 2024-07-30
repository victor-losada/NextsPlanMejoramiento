import dbConnect from '../../../lib/dbConnect';
import Cliente from '../../../models/Cliente';
import { authenticate } from '../../../lib/authentication';

const handler = async (req, res) => {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      try {
        const updateData = req.body;
        const updatedCliente = await Cliente.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCliente) {
          return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(updatedCliente);
      }catch (error) {
        res.status(500).json({ message: 'Error en el servidor ' + error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedCliente = await Cliente.findByIdAndDelete(id);
        if (!deletedCliente) {
          return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ message: 'Cliente eliminado exitosamente' });
      } catch (error) {
        res.status(500).json({ message: 'Error en el servidor ' + error.message });
      }
      break;

  }
};

export default authenticate(handler);
