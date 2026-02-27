import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Lock, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [method, setMethod] = useState<'email' | 'phone'>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (authMode === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                onClose();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setAuthMode('login');
                }, 3000);
            }
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneAuth = (e: React.FormEvent) => {
        e.preventDefault();
        setError("Phone authentication requires additional Supabase setup (OTP). Please use Email for now.");
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-sm overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="relative h-32 bg-[var(--primary)] flex items-center justify-center">
                        <div className="absolute top-4 right-4 text-white/60 hover:text-white cursor-pointer" onClick={onClose}>
                            <X size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tighter">
                            IKAY<span className="text-[var(--accent)]">.</span>
                        </h2>
                    </div>

                    <div className="p-8">
                        {success ? (
                            <div className="py-8 text-center animate-in fade-in duration-500">
                                <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
                                <h3 className="text-xl font-bold mb-2">Check your email!</h3>
                                <p className="text-gray-500">We've sent a verification link to your inbox.</p>
                            </div>
                        ) : (
                            <>
                                {/* Tabs */}
                                <div className="flex border-b mb-8">
                                    <button
                                        className={`flex-1 pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${authMode === 'login' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
                                        onClick={() => setAuthMode('login')}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className={`flex-1 pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${authMode === 'signup' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
                                        onClick={() => setAuthMode('signup')}
                                    >
                                        Register
                                    </button>
                                </div>

                                {/* Method Toggle */}
                                <div className="flex gap-4 mb-6">
                                    <button
                                        className={`flex-1 py-2 rounded-sm border flex items-center justify-center gap-2 text-xs font-medium transition-all ${method === 'email' ? 'bg-black text-white border-black' : 'bg-transparent text-gray-500 border-gray-200 hover:border-black'}`}
                                        onClick={() => setMethod('email')}
                                    >
                                        <Mail size={14} /> Email
                                    </button>
                                    <button
                                        className={`flex-1 py-2 rounded-sm border flex items-center justify-center gap-2 text-xs font-medium transition-all ${method === 'phone' ? 'bg-black text-white border-black' : 'bg-transparent text-gray-500 border-gray-200 hover:border-black'}`}
                                        onClick={() => setMethod('phone')}
                                    >
                                        <Phone size={14} /> Phone
                                    </button>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs rounded-sm border border-red-100 italic">
                                        {error}
                                    </div>
                                )}

                                {method === 'email' ? (
                                    <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                required
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-black transition-colors"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                required
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-black transition-colors"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn btn-primary w-full py-4 mt-2 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                                <>
                                                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                                                    <ArrowRight size={18} />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handlePhoneAuth} className="flex flex-col gap-4">
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="tel"
                                                placeholder="+91 00000 00000"
                                                required
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-black transition-colors"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1 italic">
                                            You'll receive a 6-digit verification code.
                                        </p>
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-full py-4 mt-2 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                                        >
                                            Send OTP <ArrowRight size={18} />
                                        </button>
                                    </form>
                                )}

                                <div className="mt-8 text-center">
                                    <p className="text-xs text-gray-500">
                                        {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                                        <button
                                            className="text-black font-bold hover:underline"
                                            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                                        >
                                            {authMode === 'login' ? 'Register Now' : 'Sign In'}
                                        </button>
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
