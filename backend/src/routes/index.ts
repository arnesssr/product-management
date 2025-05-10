import { Router } from 'express';
import productRoutes from './productRoutes';
import categoryRoutes from './categoryRoutes';
import orderRoutes from './orderRoutes';
import inventoryRoutes from './inventoryRoutes';

const router = Router();

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/inventory', inventoryRoutes);

export default router;
