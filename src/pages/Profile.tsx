import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User, Mail, MapPin, Phone, Package, Heart, LogOut, Loader2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Form fields
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/');
                return;
            }
            setUser(user);

            // In a real app, you'd fetch additional profile data from a 'profiles' table
            // For now, we'll use placeholder data or user metadata if available
            setFullName(user.user_metadata?.full_name || '');
            setPhoneNumber(user.phone || '');
            setLoading(false);
        };

        checkUser();
    }, [navigate]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);

        // Simulate update or update user metadata
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: fullName }
            });
            if (error) throw error;
            alert('Profile updated successfully!');
        } catch (err: any) {
            console.error(err.message);
        } finally {
            setUpdating(false);
        }
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
            <div className="container max-w-6xl">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">My Account</h1>
                    <p className="text-gray-500">Manage your profile and track your orders.</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Navigation Sidebar */}
                    <aside className="w-full lg:w-1/3">
                        <div className="bg-white rounded-sm border p-6 flex flex-col gap-6">
                            <div className="flex items-center gap-4 border-b pb-6">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold">
                                    {fullName ? fullName.charAt(0) : user.email?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{fullName || 'User'}</h3>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>

                            <nav className="flex flex-col gap-2">
                                <button className="flex items-center gap-3 p-3 bg-black text-white rounded-sm text-sm font-medium">
                                    <User size={18} /> Profile Information
                                </button>
                                <button className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-sm text-sm font-medium transition-colors">
                                    <Package size={18} /> My Orders
                                </button>
                                <button className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-sm text-sm font-medium transition-colors">
                                    <Heart size={18} /> Wishlist
                                </button>
                                <button className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-sm text-sm font-medium transition-colors">
                                    <MapPin size={18} /> Saved Addresses
                                </button>
                                <button
                                    onClick={() => {
                                        supabase.auth.signOut();
                                        navigate('/');
                                    }}
                                    className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-sm text-sm font-bold mt-4 transition-colors"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1">
                        <div className="bg-white rounded-sm border p-8">
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <User size={24} className="text-[var(--accent)]" />
                                Personal Information
                            </h2>

                            <form onSubmit={handleUpdate} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                            <input
                                                type="text"
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-black outline-none transition-colors"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 opacity-60">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                            <input
                                                type="email"
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 outline-none cursor-not-allowed"
                                                value={user.email}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                            <input
                                                type="tel"
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-black outline-none transition-colors"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                placeholder="+91 00000 00000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Default Shipping Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-4 text-gray-300" size={18} />
                                        <textarea
                                            rows={3}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-black outline-none transition-colors resize-none"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your full address"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={updating}
                                        className="btn btn-primary px-10 py-4 flex items-center gap-3 transition-transform active:scale-95"
                                    >
                                        {updating ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} /> Save Changes</>}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary Preview */}
                        <div className="mt-8 bg-white rounded-sm border p-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Package size={24} className="text-[var(--accent)]" />
                                Recent Orders
                            </h2>
                            <div className="text-center py-10 border-2 border-dashed rounded-sm border-gray-100">
                                <p className="text-gray-400 mb-4">You haven't placed any orders yet.</p>
                                <button
                                    onClick={() => navigate('/shop')}
                                    className="text-black font-bold flex items-center gap-2 mx-auto hover:text-[var(--accent)] transition-colors"
                                >
                                    Start Shopping <Package size={18} />
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Profile;
