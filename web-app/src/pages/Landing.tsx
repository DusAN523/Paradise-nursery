import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1600')",
                    filter: "brightness(0.7)"
                }}
            />

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white p-8">
                <h1 className="text-5xl font-bold mb-6">Paradise Nursery</h1>
                <p className="text-xl max-w-2xl text-center mb-8">
                    Welcome to Paradise Nursery, your destination for beautiful houseplants that bring life and joy to your home.
                    We offer a carefully curated selection of plants that are perfect for any space, from beginner-friendly succulents
                    to statement-making tropical plants.
                </p>
                <Link
                    to="/products"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default Landing; 