import React from 'react';
import { CartDetails } from '../../components/cart/CartDetails';
import { CartSummary } from '../../components/cart/CartSummary';

export const CartPage: React.FC = () => {
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <CartDetails />
        </section>
        <aside>
          <CartSummary />
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
