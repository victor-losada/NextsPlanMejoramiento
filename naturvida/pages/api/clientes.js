import dbConnect from '../../lib/dbConnect';
import Cliente from '../../models/Cliente';
// Importación removida ya que no se necesita autenticar
// import { authenticate } from '../../lib/authentication';

const handler = async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const clientes = await Cliente.find({});
        res.status(200).json(clientes);
      } catch (error) {
        console.error('Error retrieving clients:', error);
        res.status(500).json({ message: 'Error retrieving clients' });
      }
      break;

    case 'POST':
      try {
        const newCliente = new Cliente(req.body);
        await newCliente.save();
        res.status(201).json(newCliente);
      } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Error creating client' });
      }
      break;
  
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
};

// Exportación directa sin authenticate
export default handler;
