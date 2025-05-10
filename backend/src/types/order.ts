export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  variantId?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}
