import React, { useEffect, useState } from 'react';
import { ChevronDown, ListFilter, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';

interface Product {
    id: string | number;
    name: string;
    category: string;
    price: string | number;
    image_url: string;
}

const Shop: React.FC = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const hardcodedProducts = [
        { id: 1, name: 'Travis Edition Graphix Sweat', category: 'Graphic Sweats', price: '₹2,499.00', image_url: '/images/graphic_sweats.png' },
        { id: 2, name: 'Vintage Acid Wash Sweatshirt', category: 'Graphic Sweats', price: '₹2,299.00', image_url: '/images/hoodies.png' },
        { id: 3, name: 'Stone Baggy Cargo Pant', category: 'Baggy Pants', price: '₹2,199.00', image_url: '/images/baggy_pants.png' },
        { id: 4, name: '07 Streetide Racing Tee', category: 'Racing Tees', price: '₹1,699.00', image_url: '/images/racing_tees.png' },
        { id: 5, name: 'Vintage Wash Baggy Denim', category: 'Baggy Denim', price: '₹2,899.00', image_url: '/images/baggy_denim.png' },
        { id: 6, name: 'Classic Longline Hoodie', category: 'Hoodies', price: '₹2,499.00', image_url: '/images/hoodies.png' },
        { id: 7, name: 'Signature Logo Tee', category: 'T-Shirts', price: '₹1,499.00', image_url: '/images/tshirts.png' },
        { id: 8, name: 'Classic Oversized Hoodie', category: 'Hoodies', price: '₹2,699.00', image_url: '/images/hoodies.png' },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase.from('products').select('*');

                if (error) throw error;

                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    // Fallback to hardcoded if DB is empty or not yet set up
                    setProducts(hardcodedProducts);
                }
            } catch (err) {
                console.error('Error fetching products from Supabase:', err);
                setProducts(hardcodedProducts);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const formatPrice = (price: string | number) => {
        if (typeof price === 'number') {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(price);
        }
        return price;
    };

    return (
        <div className="pt-32 pb-20">
            <div className="container">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Shop All</h1>
                    <p className="text-gray-500">Discover our full range of premium essentials.</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="lg:sticky lg:top-32">
                            <div className="flex items-center gap-2 mb-6 lg:mb-8 font-bold border-b pb-4">
                                <ListFilter size={20} />
                                <span>Filters</span>
                            </div>

                            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-6 lg:gap-8">
                                <div>
                                    <h4 className="font-bold mb-4 flex items-center justify-between text-sm lg:text-base">
                                        Category <ChevronDown size={14} className="lg:w-4 lg:h-4" />
                                    </h4>
                                    <ul className="flex flex-col gap-2 text-gray-600 text-xs lg:text-sm">
                                        {['Racing Tees', 'Graphic Sweats', 'Baggy Pants', 'Hoodies', 'Jeans'].map(cat => (
                                            <li key={cat} className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                                                <input type="checkbox" className="w-3 h-3 lg:w-4 lg:h-4 rounded border-gray-300 accent-[var(--primary)]" />
                                                <span>{cat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-4 flex items-center justify-between text-sm lg:text-base">
                                        Size <ChevronDown size={14} className="lg:w-4 lg:h-4" />
                                    </h4>
                                    <div className="flex flex-wrap gap-1 lg:gap-2">
                                        {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                            <button key={size} className="w-8 h-8 lg:w-10 lg:h-10 border flex items-center justify-center text-[10px] lg:text-sm font-medium hover:border-black transition-colors">
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-2 lg:col-auto">
                                    <h4 className="font-bold mb-4 flex items-center justify-between text-sm lg:text-base">
                                        Price Range <ChevronDown size={14} className="lg:w-4 lg:h-4" />
                                    </h4>
                                    <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]" />
                                    <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                                        <span>₹0</span>
                                        <span>₹5000+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 border-b pb-4 gap-4">
                            <p className="text-gray-500 text-sm">
                                {loading ? 'Loading products...' : `Showing ${products.length} products`}
                            </p>
                            <div className="flex items-center gap-2 font-medium cursor-pointer text-sm">
                                <span>Sort by: Featured</span>
                                <ChevronDown size={16} />
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
                                <p className="text-gray-500 animate-pulse">Fetching latest collection...</p>
                            </div>
                        ) : (
                            <div className="grid-auto">
                                {products.map(product => (
                                    <div key={product.id} className="group cursor-pointer">
                                        <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden rounded-sm">
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="btn btn-primary w-full py-3 text-sm active:scale-95 transition-transform"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="font-bold mb-1">{product.name}</h3>
                                        <p className="text-gray-500 text-sm mb-1">{product.category}</p>
                                        <p className="font-bold text-[var(--accent)]">{formatPrice(product.price)}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;

