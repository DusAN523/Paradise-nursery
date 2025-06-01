import React, { useState } from 'react';
import { plants } from '../data/plants';
import { Plant } from '../types';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

const Products: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [disabledButtons, setDisabledButtons] = useState<number[]>([]);
    const { cart, addToCart } = useCart();
    const categories = ['All', ...new Set(plants.map(plant => plant.category))];

    const filteredPlants = selectedCategory === 'All'
        ? plants
        : plants.filter(plant => plant.category === selectedCategory);

    const handleAddToCart = (plant: Plant) => {
        addToCart(plant);
        setDisabledButtons(prev => [...prev, plant.id]);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header cartItemsCount={cart.totalItems} />

            <div className="container mx-auto px-4 py-8">
                {/* Category Filter */}
                <div className="flex justify-center space-x-4 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full ${selectedCategory === category
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-green-100'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlants.map(plant => (
                        <div key={plant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={plant.image}
                                alt={plant.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{plant.name}</h3>
                                <p className="text-gray-600 mb-2">{plant.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-green-600 font-bold">${plant.price.toFixed(2)}</span>
                                    <button
                                        className={`px-4 py-2 rounded transition-colors ${disabledButtons.includes(plant.id)
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-green-600 text-white hover:bg-green-700'
                                            }`}
                                        onClick={() => handleAddToCart(plant)}
                                        disabled={disabledButtons.includes(plant.id)}
                                    >
                                        {disabledButtons.includes(plant.id) ? 'Added to Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products; 