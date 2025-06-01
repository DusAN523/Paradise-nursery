import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';

interface HeaderProps {
    cartItemsCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount }) => {
    return (
        <header className="bg-green-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Paradise Nursery</Link>
                <nav className="space-x-4">
                    <Link to="/products" className="hover:text-green-200">Products</Link>
                    <Link to="/cart" className="relative">
                        <BsCart3 className="inline-block" size={24} />
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header; 