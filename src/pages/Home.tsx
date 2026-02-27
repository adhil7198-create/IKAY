import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';

interface Product {
    id: string | number;
    name: string;
    category: string;
    price: string | number;
    image_url: string;
}

const Home: React.FC = () => {
    const { addToCart } = useCart();
    const [arrivals, setArrivals] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [heroLoaded, setHeroLoaded] = useState(false);

    const fallbackArrivals = [
        { id: 1, name: 'Travis Edition Graphix Sweat', category: 'Graphic Sweats', price: '₹2,499.00', image_url: '/images/graphic_sweats.png' },
        { id: 2, name: 'Vintage Acid Wash Sweatshirt', category: 'Graphic Sweats', price: '₹2,299.00', image_url: '/images/hoodies.png' },
        { id: 3, name: '07 Streetide Racing Tee', category: 'Racing Tees', price: '₹1,699.00', image_url: '/images/racing_tees.png' },
        { id: 4, name: '90s Baggy Utility Denim', category: 'Baggy Denim', price: '₹2,899.00', image_url: '/images/baggy_denim.png' },
        { id: 9, name: 'M-01 Technical Bomber', category: 'Jackets', price: '₹4,999.00', image_url: '/images/tech_bomber.png' },
        { id: 10, name: 'Wide-Leg Cargo Shorts // Khaki', category: 'Shorts', price: '₹2,499.00', image_url: '/images/cargo_shorts.png' },
    ];

    useEffect(() => {
        const fetchArrivals = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .limit(8)
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
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
                <div className="absolute inset-0 z-0 bg-[#0d0d0d] flex items-center justify-center">
                    <img
                        src="/images/hero_lace_up.jpg"
                        alt="Ikay Deconstructed Collection"
                        onLoad={() => setHeroLoaded(true)}
                        className={`max-w-full max-h-full object-contain transition-all duration-[2000ms] ${heroLoaded ? 'opacity-90 blur-0 scale-100' : 'opacity-0 blur-2xl scale-95'}`}
                    />
                </div>

                <div className="container relative z-10 text-center text-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                            Drop 02 // Deconstructed
                        </span>
                        <h1 className="text-6xl md:text-[10rem] mb-10 leading-[0.9] font-heading font-black italic tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                            DECONSTRUCTED <br />
                            CUSTOMS.
                        </h1>
                        <p className="text-md md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                            A detailed exploration of lace-up silhouettes and raw textures. <br className="hidden md:block" />
                            Reimagining urban utility through avant-garde design.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                            <Link to="/shop" className="px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-[var(--accent)] hover:text-white transition-all transform hover:scale-105">
                                Shop The Drop
                            </Link>
                            <Link to="/shop?category=New" className="px-12 py-5 border-2 border-white text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all transform hover:scale-105">
                                View Lookbook
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Brand Grid */}
            <div className="py-16 border-b bg-white overflow-hidden">
                <div className="container">
                    <div className="flex animate-scroll-text whitespace-nowrap gap-20 items-center opacity-40">
                        {['IKAY DECONSTRUCTED', 'LACE-UP CUSTOMS', 'RAW TEXTURES', 'AVANT GARDE URBAN', 'IKAY DECONSTRUCTED', 'LACE-UP CUSTOMS'].map((text, i) => (
                            <span key={i} className="text-4xl md:text-6xl font-black italic tracking-tighter text-black">{text}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Collection */}
            <section className="section bg-[#0a0a0a] text-white py-32">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-heading font-black italic uppercase mb-4 tracking-tighter">Latest Arrivals</h2>
                            <p className="text-gray-500 uppercase tracking-widest text-xs">// Selected garments for Drop 01</p>
                        </div>
                        <Link to="/shop" className="hidden md:block border-b-2 border-white pb-2 text-xs font-bold uppercase tracking-widest hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
                            Explore All
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="animate-spin text-white" size={32} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {arrivals.map((product) => (
                                <div key={product.id} className="group flex flex-col bg-[#111] p-4 border border-white/5 hover:border-white/20 transition-all">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a] mb-6">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:opacity-60"
                                        />
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100"
                                        >
                                            <span className="bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest">Add to Cart</span>
                                        </button>
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[var(--accent)] text-black px-3 py-1 text-[9px] font-black uppercase">Drop 01</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 uppercase tracking-tight">{product.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500 text-xs font-bold uppercase">{product.category}</p>
                                        <p className="text-white font-black">{formatPrice(product.price)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Category Grid - Street Aesthetic */}
            <section className="py-32 bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Link to="/shop?category=Racing Tees" className="group relative h-[500px] overflow-hidden bg-[#111]">
                            <img src="/images/racing_tees.png" alt="Racing Tees" className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)] mb-2 block">Archive 01</span>
                                <h3 className="text-4xl font-heading font-black italic text-white uppercase tracking-tighter mb-4">Racing <br />Tees</h3>
                                <span className="inline-flex items-center gap-4 text-white font-black uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform">
                                    Shop Now <ArrowRight size={16} />
                                </span>
                            </div>
                        </Link>
                        <Link to="/shop?category=Graphic Sweats" className="group relative h-[500px] overflow-hidden bg-black">
                            <img src="/images/travis_sweat.png" alt="Graphic Sweats" className="w-full h-full object-cover object-top transition-all duration-1000 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)] mb-2 block">Archive 02</span>
                                <h3 className="text-4xl font-heading font-black italic text-white uppercase tracking-tighter mb-4">Graphic <br />Sweats</h3>
                                <span className="inline-flex items-center gap-4 text-white font-black uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform">
                                    Shop Now <ArrowRight size={16} />
                                </span>
                            </div>
                        </Link>
                        <Link to="/shop?category=Jackets" className="group relative h-[500px] overflow-hidden bg-[#0d0d0d]">
                            <img src="/images/hero_racing.png" alt="Jackets" className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)] mb-2 block">Archive 03</span>
                                <h3 className="text-4xl font-heading font-black italic text-white uppercase tracking-tighter mb-4">Utility <br />Jackets</h3>
                                <span className="inline-flex items-center gap-4 text-white font-black uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform">
                                    Shop Now <ArrowRight size={16} />
                                </span>
                            </div>
                        </Link>
                        <Link to="/shop?category=Shirts" className="group relative h-[500px] overflow-hidden bg-black">
                            <img src="/images/shirt.png" alt="Shirts" className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)] mb-2 block">Archive 04</span>
                                <h3 className="text-4xl font-heading font-black italic text-white uppercase tracking-tighter mb-4">Drop <br />Shirts</h3>
                                <span className="inline-flex items-center gap-4 text-white font-black uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform">
                                    Shop Now <ArrowRight size={16} />
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter - Concrete style */}
            <section className="section bg-[#0f0f0f] border-t border-white/10 text-white">
                <div className="container py-20 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-8xl font-heading font-black italic italic uppercase mb-8 tracking-tighter">Join The Crew</h2>
                        <p className="text-gray-400 mb-12 text-lg uppercase tracking-widest font-medium">
                            Early access to Drop 02 and hidden archives.
                        </p>
                        <form className="flex flex-col md:flex-row gap-0 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="ENTER EMAIL ADDRESS"
                                className="flex-1 px-8 py-6 bg-white/5 border border-white/10 text-white focus:outline-none focus:bg-white/10 transition-all font-bold uppercase tracking-widest"
                            />
                            <button className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-[var(--accent)] transition-all">
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
