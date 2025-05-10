import { describe, it, expect, jest } from '@jest/globals';
import { orderController } from '../../../controllers/orderController';
import { orderService } from '../../../services/orderService';

jest.mock('../../../services/orderService');

describe('Order Controller', () => {
  it('should create a new order', async () => {
    const mockOrder = {
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      items: [{ productId: '1', quantity: 2 }]
    };

    const mockReq = {
      body: mockOrder
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await orderController.createOrder(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(201);
  });
});
