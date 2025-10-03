

import { Request, Response } from "express"
import { getAllItemsService, getByIdItemsService, getWelcomeMessageService, postItemsService } from "../services/items.services"


export const getWelcomeMessageController = ( req: Request, res: Response ) => {
    const respuesta = getWelcomeMessageService();
    res.status(respuesta.status).json({
        msg: respuesta.msg,
        datos: respuesta.datos
    })
}

export const getAllItemsController = async ( req: Request, res: Response ) => {
    const respuesta = getAllItemsService();

    res.status(respuesta.status).json({
        msg: respuesta.msg,
        datos: respuesta.datos
    })
}

export const getByIdItemsController = ( req: Request, res: Response ) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(400).json({
            msg: 'El id debe ser un numero valido',
            datos: null
        })
    }

    const respuesta = getByIdItemsService(id)
    res.status(respuesta.status).json({
        msg: respuesta.msg,
        datos: respuesta.datos
    })
}

export const postItemsController = ( req: Request, res: Response ) =>  {
    const { name } = req.body;

    const resItem = postItemsService( name );

    res.status( resItem.status ).json({
        msg: resItem.msg,
        datos: resItem.datos
    })
}