import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.plant.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ plant: action.payload, quantity: 1 });
            }
            state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + (item.plant.price * item.quantity), 0);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.plant.id !== action.payload);
            state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + (item.plant.price * item.quantity), 0);
        },
        updateQuantity: (state, action) => {
            const { plantId, quantity } = action.payload;
            const item = state.items.find(item => item.plant.id === plantId);
            if (item) {
                if (quantity < 1) {
                    state.items = state.items.filter(item => item.plant.id !== plantId);
                } else {
                    item.quantity = quantity;
                }
                state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = state.items.reduce((sum, item) => sum + (item.plant.price * item.quantity), 0);
            }
        }
    }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer; 