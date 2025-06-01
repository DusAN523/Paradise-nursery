import React from 'react';
import { Link } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import Header from '../components/Header';

const Success: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header cartItemsCount={0} />

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
                    <BsCheckCircleFill className="text-green-500 text-6xl mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Successful!</h1>
                    <p className="text-gray-600 mb-8">
                        Thank you for your purchase. Your order has been successfully placed.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Success; 