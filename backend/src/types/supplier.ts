export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  items: PurchaseOrderItem[];
  status: 'pending' | 'approved' | 'received' | 'cancelled';
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
