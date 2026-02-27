import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Package, ChevronRight, CheckCircle2, Truck, ExternalLink, Loader2, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Order {
    id: string;
    created_at: string;
    total_amount: number;
    status: string;
    tracking_number: string;
    items?: any[];
}

const Orders: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/');
                return;
            }

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setOrders(data);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [navigate]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'text-green-600 bg-green-50 border-green-100';
            case 'shipped': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'processing': return 'text-amber-600 bg-amber-50 border-amber-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-black text-white">
                <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Syncing Order History</p>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
            <div className="container max-w-5xl">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-5xl font-heading font-black italic uppercase tracking-tighter mb-4">Command Center</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                            <Clock size={12} /> Active Shipments & Drop History
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/shop')}
                        className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[var(--accent)] transition-all flex items-center gap-3"
                    >
                        Browse Latest Drop <ChevronRight size={16} />
                    </button>
                </header>

                {orders.length === 0 ? (
                    <div className="bg-white border p-16 text-center flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-50 flex items-center justify-center mb-8 border border-dashed border-gray-200">
                            <Package size={40} className="text-gray-200" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 italic">No Orders Detected</h2>
                        <p className="text-gray-400 text-sm mb-10 max-w-sm font-medium">Your archive is currently empty. Initialize your first order from the Archive 01 collection.</p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="bg-black text-white px-12 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-[var(--accent)] transition-all active:scale-95"
                        >
                            Explore Drops
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-10">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {/* Order Status Bar */}
                                <div className={`px-6 py-4 border-b flex justify-between items-center ${getStatusStyles(order.status)}`}>
                                    <div className="flex items-center gap-3">
                                        {order.status === 'delivered' ? <CheckCircle2 size={18} /> : <Truck size={18} className="animate-bounce" />}
                                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Status: {order.status}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[9px] font-bold opacity-70 uppercase tracking-tighter">EST. Delivery: 3-5 Working Days</span>
                                    </div>
                                </div>

                                {/* Order Info Grid */}
                                <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                                    <div className="md:col-span-2">
                                        <div className="flex gap-2 items-center text-gray-400 mb-2">
                                            <Package size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Order Identifier</span>
                                        </div>
                                        <h3 className="text-lg font-black uppercase tracking-tighter">#IK-{order.id.slice(0, 8).toUpperCase()}</h3>
                                        <p className="text-xs text-gray-500 mt-1 font-medium italic">Confirmed on {new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <div className="flex gap-2 items-center text-gray-400 mb-2">
                                            <MapPin size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Tracking Number</span>
                                        </div>
                                        <p className="text-sm font-bold uppercase tracking-tight flex items-center gap-2">
                                            {order.tracking_number || 'IK-TBA-0000'}
                                            <ExternalLink size={12} className="text-[var(--accent)] cursor-pointer" />
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex gap-2 items-center justify-end text-gray-400 mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest">Total Value</span>
                                        </div>
                                        <h3 className="text-xl font-black">{formatPrice(order.total_amount)}</h3>
                                        <button className="text-[9px] font-black uppercase tracking-widest text-[var(--accent)] hover:underline mt-2">Download Invoice</button>
                                    </div>
                                </div>

                                {/* Tracking Progress */}
                                <div className="px-8 pb-10">
                                    <div className="relative h-1 bg-gray-100 w-full mt-10 mb-2">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-black transition-all duration-1000"
                                            style={{ width: order.status === 'delivered' ? '100%' : order.status === 'shipped' ? '60%' : '15%' }}
                                        ></div>
                                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-4 border-white"></div>
                                        <div
                                            className="absolute top-1/2 left-[60%] -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full border-4 border-white transition-all"
                                            style={{ backgroundColor: order.status === 'shipped' || order.status === 'delivered' ? 'black' : '#e5e7eb' }}
                                        ></div>
                                        <div
                                            className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full border-4 border-white transition-all"
                                            style={{ backgroundColor: order.status === 'delivered' ? 'black' : '#e5e7eb' }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <span>Processing</span>
                                        <span>Shipped</span>
                                        <span>Delivered</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 border-t text-center">
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em]">
                                        Need Assistance? Contact Command Support: dispatch@ikay.shop
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <footer className="mt-20 border-t pt-10 text-center">
                    <p className="text-[10px] text-gray-400 font-medium max-w-lg mx-auto leading-relaxed">
                        IKAY Logistics ensures global delivery within 5-7 business days. All orders are verified for quality before dispatch from our Bangalore Command Center.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Orders;
