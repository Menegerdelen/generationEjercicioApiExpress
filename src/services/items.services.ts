

import * as fs from 'fs';
import { items } from "../data/items.data"
import { Item } from "../types/items.interface";


const idItems = items.length + 1
let nextId = idItems

interface Respuestas<T>{
    msg: string;
    status: number;
    datos: T;
}

const ITEMS_DATA_PATH = "src/data/items.data.ts"

export const getWelcomeMessageService = (): Respuestas<object> => {
    try {
        const welcomeData = {
            message: "Bienvenido a la API de listado de Items!"
        }

        return {
            msg: 'Bienvenida exitosa!',
            status: 200,
            datos: welcomeData
        }
    } catch (error) {
        console.error('Error en el welcome service.', error)
        return {
            msg: 'Error en el servidor, welcome service',
            status: 500,
            datos: []
        }
    }
}

export const getAllItemsService = (): Respuestas<Item[]> => {
    try {
        if(items.length === 0){
            return {
                msg: 'No hay items en la lista',
                status: 204,
                datos: []
            }
        }
        return {
            msg: 'Los items consultados son:',
            status: 200,
            datos: items
        }
    } catch (error) {
        console.log('Error service:', error);
            return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        };
    }
}

export const getByIdItemsService = (id: number): Respuestas<Item | null> => {
    try {
        const item = items.find(i => i.id === id);

        if (!item) {
            return {
                msg: `Item con id: ${id} no encontrado.`,
                status: 404,
                datos: null
            }
        }

        return {
            msg: 'Item encontradoe xitosamente.',
            status: 200,
            datos: item
        }
    } catch (error) {
        console.error('Error en el service:', error)
        return {
            msg: 'Error en el servidor', 
            status: 500,
            datos: null
        }
    }
}

export const postItemsService = (name: string): Respuestas<Item | null> =>  {
    try {
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return {
                msg: 'Noimbre del item requerido',
                status: 400,
                datos: null
            }
        }

        const nuevoItem: Item = {
            id: nextId++,
            name: name.trim()
        }

        items.push(nuevoItem);

        const archivoFormato = 
            `import { Item } from '../types/items.interface'\n\n` +
            `export const items: Item[] = ${JSON.stringify(items, null, 2)};`;

        fs.writeFileSync( ITEMS_DATA_PATH, archivoFormato )

        return {
            msg: 'Item creado exitosamente',
            status: 201,
            datos: nuevoItem
        }
    } catch (error) {
        console.error('Error en el servicio  Post Item', error)
        return {
            msg: 'Error en el servidor Post Item service',
            status: 500,
            datos: null
        }
    }
}