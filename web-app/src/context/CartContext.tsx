import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Plant, CartItem, Cart } from '../types';

interface CartContextType {
    cart: Cart;
    addToCart: (plant: Plant) => void;
    removeFromCart: (plantId: number) => void;
    updateQuantity: (plantId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart>({
        items: [],
        totalItems: 0,
        totalPrice: 0,
    });

    const calculateTotals = (items: CartItem[]) => {
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + (item.plant.price * item.quantity), 0);
        return { totalItems, totalPrice };
    };

    const addToCart = (plant: Plant) => {
        setCart(prevCart => {
            const existingItem = prevCart.items.find(item => item.plant.id === plant.id);
            let newItems: CartItem[];

            if (existingItem) {
                newItems = prevCart.items.map(item =>
                    item.plant.id === plant.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...prevCart.items, { plant, quantity: 1 }];
            }

            const { totalItems, totalPrice } = calculateTotals(newItems);
            return { items: newItems, totalItems, totalPrice };
        });
    };

    const removeFromCart = (plantId: number) => {
        setCart(prevCart => {
            const newItems = prevCart.items.filter(item => item.plant.id !== plantId);
            const { totalItems, totalPrice } = calculateTotals(newItems);
            return { items: newItems, totalItems, totalPrice };
        });
    };

    const updateQuantity = (plantId: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(plantId);
            return;
        }

        setCart(prevCart => {
            const newItems = prevCart.items.map(item =>
                item.plant.id === plantId
                    ? { ...item, quantity }
                    : item
            );
            const { totalItems, totalPrice } = calculateTotals(newItems);
            return { items: newItems, totalItems, totalPrice };
        });
    };

    const clearCart = () => {
        setCart({
            items: [],
            totalItems: 0,
            totalPrice: 0,
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 