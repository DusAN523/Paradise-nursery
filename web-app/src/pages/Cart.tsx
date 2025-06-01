import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsTrash, BsDash, BsPlus } from 'react-icons/bs';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        // Clear the cart before navigating to success page
        clearCart();
        navigate('/success');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header cartItemsCount={cart.totalItems} />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                {cart.items.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
                        <Link
                            to="/products"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            {cart.items.map((item) => (
                                <div key={item.plant.id} className="flex items-center py-4 border-b last:border-b-0">
                                    <img
                                        src={item.plant.image}
                                        alt={item.plant.name}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <div className="ml-6 flex-grow">
                                        <h3 className="text-lg font-semibold">{item.plant.name}</h3>
                                        <p className="text-gray-600">${item.plant.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="p-2 hover:bg-gray-100 rounded"
                                                onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}
                                            >
                                                <BsDash className="inline-block" size={16} />
                                            </button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button
                                                className="p-2 hover:bg-gray-100 rounded"
                                                onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}
                                            >
                                                <BsPlus className="inline-block" size={16} />
                                            </button>
                                        </div>
                                        <button
                                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                                            onClick={() => removeFromCart(item.plant.id)}
                                        >
                                            <BsTrash className="inline-block" size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg">Total Items:</span>
                                <span className="font-semibold">{cart.totalItems}</span>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg">Total Price:</span>
                                <span className="text-xl font-bold text-green-600">${cart.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <Link
                                    to="/products"
                                    className="flex-1 bg-gray-200 text-gray-800 text-center px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                                <button
                                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                                    onClick={handleCheckout}
                                >
                                    Checkout
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