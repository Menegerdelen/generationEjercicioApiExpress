

import { Router } from "express";
import { getAllItemsController, getByIdItemsController, getWelcomeMessageController, postItemsController } from "../controllers/items.controllers";


const router = Router();

router.get('/', getWelcomeMessageController)

router.get('/items', getAllItemsController)

router.get('/items/:id', getByIdItemsController)

router.post('/items', postItemsController)



export default router;