import dbConnect from "../../../lib/dbConnect";
import Factura from "../../../models/Factura";
import { authenticate } from "../../../lib/authentication";

const handler = async(req,res) => {
    await dbConnect()

    const {id} = req.body

    switch (req.method){
        case 'PUT':
            try {

                const updateData = req.body
                const updateFacturas = await Factura.findByIdAndUpdate(id, updateData, {new: true})
                if(!updateFacturas) {
                    return res.status(404).json({error: 'factura no encontrada'})
                }
                res.status(200).json(updateFacturas)
            }catch(error){
                res.status(500).json({message: 'error en el servidor'+ error.message})
            }
            break
        
        case 'DELETE':
            try{
                const deleteFacturas = await Factura.findByIdAndDelete(id)
                if(!deleteFacturas){
                    return res.status(404).josn({error: 'factura no encontrada'})
                }
                res.status(200).json({message: 'factura eliminada con exito'})
            }catch(error){
                res.status(500).json({message: 'error en el servidor' + error.message})
            }
            break
    }
}

export default authenticate(handler)