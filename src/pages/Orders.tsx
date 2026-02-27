import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Package, ChevronRight, CheckCircle2, Truck, ExternalLink, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/');
                return;
            }

            // In a real app, you'd fetch from an 'orders' table
            // const { data, error } = await supabase.from('orders').select('*').eq('user_id', user.id);

            // For now, we'll simulate a slight delay
            setTimeout(() => {
                setOrders([]); // Set to empty for now
                setLoading(false);
            }, 800);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-[var(--accent)]" size={40} />
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 bg-[var(--bg-secondary)] min-h-screen">
            <div className="container max-w-5xl">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">My Orders</h1>
                        <p className="text-gray-500">Track and manage your order history.</p>
                    </div>
                    <button
                        onClick={() => navigate('/shop')}
                        className="btn btn-outline px-6 py-2 text-sm bg-white"
                    >
                        New Order
                    </button>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-sm border p-12 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Package size={32} className="text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">No Orders Yet</h2>
                        <p className="text-gray-500 mb-8 max-w-sm">You haven't placed any orders with IKAY. Start exploring our latest collections today!</p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="btn btn-primary px-10 py-4 flex items-center gap-3"
                        >
                            Shop Collections <ChevronRight size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-sm border overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-gray-50 p-6 border-b flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Order Placed</p>
                                            <p className="text-sm font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Total</p>
                                            <p className="text-sm font-bold">{formatPrice(order.total_amount)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Ship To</p>
                                            <p className="text-sm font-medium hover:text-[var(--accent)] cursor-help">{order.customer_name}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Order # {order.id.toString().slice(0, 8)}</p>
                                        <div className="flex gap-4 text-xs font-bold">
                                            <button className="text-black hover:underline flex items-center gap-1">View Details</button>
                                            <button className="text-black hover:underline flex items-center gap-1">Invoice <ExternalLink size={12} /></button>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Status Bar */}
                                <div className="p-8 border-b">
                                    <div className="flex items-center gap-4 mb-6">
                                        {order.status === 'delivered' ? (
                                            <div className="flex items-center gap-2 text-green-600 font-bold">
                                                <CheckCircle2 size={20} /> Delivered on {new Date().toLocaleDateString()}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-blue-600 font-bold animate-pulse">
                                                <Truck size={20} /> In Transit - Arriving Soon
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        {order.items.map((item: any) => (
                                            <div key={item.id} className="flex gap-6">
                                                <div className="w-20 h-28 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                                                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                                                    <p className="text-sm text-gray-500 mb-4">{item.category} | Size: M | Qty: {item.quantity}</p>
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={() => navigate('/shop')}
                                                            className="btn btn-primary text-xs py-2 px-6 rounded-sm"
                                                        >
                                                            Buy Again
                                                        </button>
                                                        <button className="btn btn-outline text-xs py-2 px-6 rounded-sm bg-white">
                                                            View Product
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 flex justify-center">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                                        Support: help@ikay.shop
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
