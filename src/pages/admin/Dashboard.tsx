import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Package, Users, ShoppingBag, LayoutDashboard } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const { profile } = useAuth();

    const stats = [
        { label: 'Total Products', value: '12', icon: <Package size={20} />, color: 'bg-blue-500' },
        { label: 'Total Customers', value: '450', icon: <Users size={20} />, color: 'bg-green-500' },
        { label: 'Total Orders', value: '89', icon: <ShoppingBag size={20} />, color: 'bg-purple-500' },
        { label: 'Monthly Revenue', value: '₹2,45,000', icon: <LayoutDashboard size={20} />, color: 'bg-amber-500' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-black italic uppercase tracking-tighter">Admin Control Center</h1>
                        <p className="text-gray-500 text-sm">Welcome back, {profile?.full_name || 'Administrator'}</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/admin/products" className="px-6 py-3 border border-black text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                            Manage Inventory
                        </Link>
                        <Link to="/admin/customers" className="px-6 py-3 border border-black text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                            Manage Customers
                        </Link>
                        <button className="px-6 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[var(--accent)] transition-all">
                            Add New Product
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 border rounded-sm shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-center mb-4">
                                <div className={`${stat.color} text-white p-2 rounded-sm`}>
                                    {stat.icon}
                                </div>
                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">+12%</span>
                            </div>
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white border rounded-sm p-6 shadow-sm">
                        <h3 className="text-lg font-black uppercase mb-6 tracking-tight">Recent Orders</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b">
                                    <tr>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest">Order ID</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest">Customer</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest">Amount</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <tr key={item} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 text-sm font-medium">#IK-2024-{1000 + item}</td>
                                            <td className="py-4 text-sm text-gray-500">Customer Name {item}</td>
                                            <td className="py-4 text-sm font-bold">₹2,499.00</td>
                                            <td className="py-4">
                                                <span className="bg-amber-100 text-amber-700 text-[9px] px-2 py-1 font-black uppercase">Processing</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Inventory Stock */}
                    <div className="bg-white border rounded-sm p-6 shadow-sm">
                        <h3 className="text-lg font-black uppercase mb-6 tracking-tight">Low Stock Alerts</h3>
                        <div className="flex flex-col gap-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex gap-4 items-center p-3 border rounded-sm">
                                    <div className="w-12 h-12 bg-gray-100 rounded-sm"></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase truncate">Travis Edition Graphic Sweat</p>
                                        <p className="text-[10px] text-red-500 font-bold uppercase">Only 2 left</p>
                                    </div>
                                    <button className="text-[10px] font-black underline uppercase">Restock</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
