import dbConnect from "../../../lib/dbConnect";
import { authenticate } from "../../../lib/authentication";
import Producto from "../../../models/Producto";


const handler = async (req, res) =>{
    await dbConnect()

    const {id} = req.body

    switch (req.method){
        case 'PUT':
            try{
                const updateData = req.body
                const updateProductos = await Producto.findByIdAndUpdate(id, updateData, {new: true})
                if(!updateProductos){
                    return res.status(404).json({error: 'Producto no encontrado'})
                }
                res.status(200).json(updateProductos)
            }catch(error){
                res.status(500).json({message: 'error en el servidor' + error.message})
            }
            break

        case 'DELETE':
            try{
                const deleleProductos = await Producto.findByIdAndDelete(id)
                if(!deleleProductos){
                    return res.status(404).json({error: 'producto no encontrado'})
                }
                res.status(200).json({message: 'cliente eliminado exitosamente'})
            }catch(error){
                res.status(500).json({message: 'error en el servidor'+ error.message})
            }
            break    
    }
}

export default authenticate(handler)