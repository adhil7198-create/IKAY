import React, { useEffect, useState } from 'react';
import { ChevronDown, ListFilter, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface Product {
    id: string | number;
    name: string;
    category: string;
    price: string | number;
    image_url: string;
    is_member_only?: boolean;
}

const Shop: React.FC = () => {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const hardcodedProducts = [
        { id: 1, name: 'Travis Edition Graphix Sweat', category: 'Graphic Sweats', price: '₹2,499.00', image_url: '/images/travis_sweat.png' },
        { id: 2, name: 'Vintage Acid Wash Sweatshirt', category: 'Graphic Sweats', price: '₹2,299.00', image_url: '/images/hoodies.png' },
        { id: 3, name: 'Stone Baggy Cargo Pant', category: 'Baggy Pants', price: '₹2,199.00', image_url: '/images/baggy_pants.png' },
        { id: 4, name: '07 Streetide Racing Tee', category: 'Racing Tees', price: '₹1,699.00', image_url: '/images/racing_tees.png', is_member_only: true },
        { id: 5, name: 'Limited Travis Graphix Hood', category: 'Graphic Sweats', price: '₹3,499.00', image_url: '/images/travis_sweat.png', is_member_only: true },
        { id: 6, name: 'Classic Longline Hoodie', category: 'Hoodies', price: '₹2,499.00', image_url: '/images/hoodies.png' },
        { id: 7, name: 'Signature Logo Tee', category: 'T-Shirts', price: '₹1,499.00', image_url: '/images/tshirts.png', is_member_only: true },
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
                <header className="mb-12 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-6xl font-heading font-black italic uppercase italic tracking-tighter mb-4">The Archive</h1>
                    <p className="text-gray-500 uppercase tracking-[0.2em] text-xs">Drop 01 // Full Collection</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="lg:sticky lg:top-32">
                            <div className="flex items-center gap-2 mb-6 lg:mb-8 font-black uppercase text-xs tracking-widest border-b pb-4">
                                <ListFilter size={16} />
                                <span>Refine Drop</span>
                            </div>

                            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-6 lg:gap-8">
                                <div>
                                    <h4 className="font-black uppercase text-[10px] tracking-widest mb-4 flex items-center justify-between">
                                        Category <ChevronDown size={14} />
                                    </h4>
                                    <ul className="flex flex-col gap-3 text-gray-500 text-xs">
                                        {['Racing Tees', 'Graphic Sweats', 'Baggy Pants', 'Hoodies', 'Jeans'].map(cat => (
                                            <li key={cat} className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                                                <input type="checkbox" className="w-3 h-3 rounded-none border-gray-300 accent-black text-black" />
                                                <span className="font-bold uppercase tracking-tight">{cat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-black uppercase text-[10px] tracking-widest mb-4 flex items-center justify-between">
                                        Drop Access <ChevronDown size={14} />
                                    </h4>
                                    <div className="flex flex-col gap-3">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-3 h-3 rounded-none border-gray-300 accent-black" />
                                            <span className="text-xs font-bold uppercase tracking-tight text-gray-500 group-hover:text-black">Member Early Access</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-10 border-b pb-4">
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                {loading ? 'Fetching...' : `${products.length} Garments Found`}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-[var(--accent)]">
                                <span>Sort By</span>
                                <ChevronDown size={14} />
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-32 gap-6">
                                <Loader2 className="animate-spin text-black" size={40} />
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Synchronizing Inventory</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
                                {products.map(product => (
                                    <div key={product.id} className="group flex flex-col">
                                        <div className="relative aspect-[3/4] bg-[#f5f5f5] mb-6 overflow-hidden rounded-sm group">
                                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                                {product.is_member_only && (
                                                    <span className="bg-black text-white text-[9px] font-black uppercase px-2 py-1 tracking-widest flex items-center gap-2 border border-white/20">
                                                        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse"></span>
                                                        Members Only
                                                    </span>
                                                )}
                                            </div>
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:opacity-80"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                                            <div className="absolute inset-x-6 bottom-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (product.is_member_only && !user) {
                                                            alert("This item is reserved for IKAY members. Please log in for access.");
                                                            return;
                                                        }
                                                        addToCart(product);
                                                    }}
                                                    className={`w-full py-4 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl ${product.is_member_only && !user ? 'bg-white/20 text-white backdrop-blur-md cursor-not-allowed' : 'bg-white text-black hover:bg-[var(--accent)] hover:text-white'}`}
                                                >
                                                    {product.is_member_only && !user ? 'Member Early Access' : 'Add To Cart'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-start px-1">
                                            <div>
                                                <h3 className="font-bold text-sm uppercase tracking-tight mb-1">{product.name}</h3>
                                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{product.category}</p>
                                            </div>
                                            <p className="font-black text-sm">{formatPrice(product.price)}</p>
                                        </div>
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
