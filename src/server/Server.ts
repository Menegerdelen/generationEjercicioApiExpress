
import express, { Application } from 'express'
import itemsRoutes from '../routes/items.routes'


export class Server {
    private app: Application;
    private port: number;

    constructor(){
        this.app = express();
        this.port = 3000;

        this.middlewares();
        this.routes();
    }

    private middlewares(): void{
        this.app.use( express.json() )
    }

    private routes(): void{
        this.app.use('/', itemsRoutes)
    }

    public listen(): void{
        this.app.listen( this.port, () => console.log(`Servidor corriendo en http://localhost:${this.port}`) )
    }

}