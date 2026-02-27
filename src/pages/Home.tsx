import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Product {
    id: string | number;
    name: string;
    category: string;
    price: string | number;
    image_url: string;
}

const Home: React.FC = () => {
    const [arrivals, setArrivals] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fallbackArrivals = [
        { id: 1, name: 'Premium Street Tee', category: 'T-Shirts', price: '₹1,499.00', image_url: '/images/tshirts.png' },
        { id: 2, name: 'Urban Oversized Hoodie', category: 'Hoodies', price: '₹2,499.00', image_url: '/images/hero_v3.jpg' },
        { id: 3, name: 'White Linen Shirt', category: 'Shirts', price: '₹1,899.00', image_url: '/images/shirt.png' },
        { id: 4, name: 'Cargo Urban Trousers', category: 'Trousers', price: '₹2,199.00', image_url: '/images/trousers.png' },
    ];

    useEffect(() => {
        const fetchArrivals = async () => {
            try {
                // Fetch first 4 products as "New Arrivals"
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .limit(4)
                    .order('created_at', { ascending: false });

                if (error) throw error;

                if (data && data.length > 0) {
                    setArrivals(data);
                } else {
                    setArrivals(fallbackArrivals);
                }
            } catch (err) {
                console.error('Error fetching arrivals:', err);
                setArrivals(fallbackArrivals);
            } finally {
                setLoading(false);
            }
        };

        fetchArrivals();
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
        <div className="home-page">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero_v3.jpg"
                        alt="Ikay Fashion"
                        className="w-full h-full object-cover scale-105 animate-pulse-slow"
                        style={{ animation: 'zoom-out 20s infinite alternate' }}
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="container relative z-10 text-white">
                    <div className="max-w-2xl">
                        <span className="inline-block px-4 py-1 bg-[var(--accent)] text-black font-bold text-xs uppercase tracking-widest mb-6 animate-in slide-in-from-left-4 duration-500">
                            New Collection 2026
                        </span>
                        <h1 className="text-6xl md:text-8xl mb-8 leading-tight animate-in slide-in-from-left-8 duration-700 delay-100">
                            Elevate Your <br />
                            <span className="italic">Everyday</span> Style.
                        </h1>
                        <p className="text-xl text-gray-200 mb-10 max-w-lg animate-in slide-in-from-left-12 duration-1000 delay-200">
                            Discover premium, minimal clothing designed for the modern urban lifestyle. Crafted in Bangalore, delivered to your doorstep.
                        </p>
                        <div className="flex gap-4 animate-in slide-in-from-bottom-4 duration-1200 delay-300">
                            <Link to="/shop" className="btn btn-primary bg-white text-black hover:bg-[var(--accent)] hover:text-black px-8 py-4 text-lg">
                                Shop Collection <ArrowRight size={20} />
                            </Link>
                            <Link to="/shop?category=New" className="btn btn-outline border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
                                View Lookbook
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <div className="bg-[var(--bg-secondary)] py-10 border-b">
                <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <Truck className="text-[var(--accent)]" size={32} />
                        <h4 className="font-bold">Fast Delivery</h4>
                        <p className="text-sm text-gray-500">Free shipping on orders over ₹1999</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <ShieldCheck className="text-[var(--accent)]" size={32} />
                        <h4 className="font-bold">Secure Payment</h4>
                        <p className="text-sm text-gray-500">100% secure payment gateways</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <ShoppingBag className="text-[var(--accent)]" size={32} />
                        <h4 className="font-bold">Easy Returns</h4>
                        <p className="text-sm text-gray-500">14-day hassle-free return policy</p>
                    </div>
                </div>
            </div>

            {/* Category Grid */}
            <section className="section bg-white">
                <div className="container">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl mb-4">Shop by Category</h2>
                            <p className="text-gray-500">Explore our curated collections</p>
                        </div>
                        <Link to="/shop" className="text-black font-bold border-b-2 border-black pb-1 hover:text-[var(--accent)] hover:border-[var(--accent)]">
                            View All Categories
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Link to="/shop?category=T-Shirts" className="group relative h-[500px] overflow-hidden rounded-sm">
                            <img src="/images/tshirts.png" alt="T-Shirts" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                            <div className="absolute bottom-10 left-10 text-white">
                                <h3 className="text-3xl mb-2">Premium T-Shirts</h3>
                                <p className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity">Soft cotton essentials</p>
                                <div className="flex items-center gap-2 font-bold">Shop Now <ArrowRight size={18} /></div>
                            </div>
                        </Link>
                        <Link to="/shop?category=Hoodies" className="group relative h-[500px] overflow-hidden rounded-sm">
                            <img src="/images/hoodie_category_v2.jpg" alt="Hoodies" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                            <div className="absolute bottom-10 left-10 text-white">
                                <h3 className="text-3xl mb-2">Street Hoodies</h3>
                                <p className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity">Cozy urban staples</p>
                                <div className="flex items-center gap-2 font-bold">Shop Now <ArrowRight size={18} /></div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section bg-[var(--bg-secondary)]">
                <div className="container text-center">
                    <h2 className="text-4xl mb-12">New Arrivals</h2>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
                            <p className="text-gray-500">Curating the latest arrivals...</p>
                        </div>
                    ) : (
                        <div className="grid-auto text-left">
                            {arrivals.map((product) => (
                                <div key={product.id} className="group cursor-pointer">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4 rounded-sm">
                                        <span className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 text-xs font-bold uppercase">New</span>
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                            <button className="btn btn-primary rounded-full p-4"><ShoppingBag size={24} /></button>
                                        </div>
                                    </div>
                                    <h3 className="font-bold mb-1">{product.name}</h3>
                                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                                    <p className="font-bold text-[var(--accent)]">{formatPrice(product.price)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <section className="section bg-[var(--primary)] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)] rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
                <div className="container max-w-4xl text-center relative z-10">
                    <h2 className="text-4xl mb-6 font-bold">Join the IKAY Club</h2>
                    <p className="text-gray-400 mb-10 text-lg">
                        Subscribe to receive updates, access to exclusive deals, and more. <br />
                        Plus, get 10% off your first order.
                    </p>
                    <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white rounded-sm focus:outline-none focus:border-[var(--accent)]"
                        />
                        <button className="btn btn-primary bg-[var(--accent)] text-black hover:bg-white px-8 py-4">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            <style>{`
        @keyframes zoom-out {
          from { transform: scale(1.1); }
          to { transform: scale(1); }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
        </div>
    );
};

export default Home;

