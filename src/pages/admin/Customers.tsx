import React, { useState, useEffect } from 'react';
import { Search, Mail, Calendar, User, MoreVertical, Shield, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Profile {
    id: string;
    email: string;
    full_name: string;
    role: string;
    created_at: string;
}

const AdminCustomers: React.FC = () => {
    const [customers, setCustomers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setCustomers(data);
        }
        setLoading(false);
    };

    const filteredCustomers = customers.filter(c =>
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.full_name && c.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container">
                <div className="mb-10">
                    <h1 className="text-3xl font-heading font-black italic uppercase tracking-tighter">Customer Directory</h1>
                    <p className="text-gray-500 text-sm">Review user activity and manage access levels</p>
                </div>

                <div className="bg-white rounded-sm border p-4 mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-black transition-colors text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-sm border shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="animate-spin text-black" size={32} />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">User</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Role</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Joined Date</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[var(--accent)] text-white flex items-center justify-center rounded-full font-black text-sm uppercase">
                                                        {customer.full_name ? customer.full_name[0] : customer.email[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm tracking-tight">{customer.full_name || 'Incomplete Profile'}</p>
                                                        <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                                            <Mail size={10} /> {customer.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {customer.role === 'admin' ? (
                                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[9px] font-black uppercase">
                                                            <Shield size={10} /> Admin
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[9px] font-black uppercase">
                                                            <User size={10} /> Customer
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
                                                    <Calendar size={12} className="text-gray-400" /> {formatDate(customer.created_at)}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Active</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCustomers;
