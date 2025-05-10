export type MovementType = 'in' | 'out' | 'adjustment';

export interface InventoryMovement {
  id: string;
  productId: string;
  type: MovementType;
  quantity: number;
  notes?: string;
  createdAt: string;
}

export interface InventoryItem {
  productId: string;
  currentStock: number;
  reservedStock: number;
  minimumStock: number;
  lastUpdated: string;
  movements: InventoryMovement[];
}
