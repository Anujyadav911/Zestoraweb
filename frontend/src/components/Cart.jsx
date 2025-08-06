import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { IoClose } from 'react-icons/io5';
import { FaMinus, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Cart = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsCheckoutLoading(true);
    
    // Close cart and redirect to reservation form
    setTimeout(() => {
      toast.success('Redirecting to order form...');
      onClose();
      setIsCheckoutLoading(false);
      
      // Scroll to reservation section
      const reservationSection = document.getElementById('reservation');
      if (reservationSection) {
        reservationSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p className="item-category">{item.category}</p>
                    <p className="item-price">${item.price}</p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.success('Item removed from cart');
                    }}
                    className="remove-btn"
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-price">${getTotalPrice()}</span>
              </div>
              <div className="cart-actions">
                <button onClick={clearCart} className="clear-cart-btn">
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="checkout-btn"
                  disabled={isCheckoutLoading}
                >
                  {isCheckoutLoading ? 'Processing...' : 'Checkout'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 