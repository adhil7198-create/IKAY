import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center container text-center">
                <div className="w-24 h-24 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={40} className="text-gray-300" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our collection to find something you love.</p>
                <Link to="/shop" className="btn btn-primary px-10 py-4 flex items-center gap-3">
                    Start Shopping <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 bg-[var(--bg-secondary)] min-h-screen">
            <div className="container">
                <div className="flex items-center gap-2 mb-8 text-gray-500 hover:text-black transition-colors cursor-pointer" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} />
                    <span className="text-sm font-medium">Continue Shopping</span>
                </div>

                <h1 className="text-4xl font-bold mb-10 flex items-center gap-4">
                    Shopping Cart
                    <span className="text-xl font-normal text-gray-400">({cartCount} items)</span>
                </h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items List */}
                    <div className="flex-1 flex flex-col gap-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-6 rounded-sm border flex flex-col sm:flex-row gap-6 group">
                                <div className="w-full sm:w-32 aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden">
                                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 italic">{item.category}</p>
                                            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap justify-between items-end gap-4">
                                        <div className="flex flex-col gap-3">
                                            <p className="text-xs font-bold text-gray-400 uppercase">Quantity</p>
                                            <div className="flex items-center border rounded-sm">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-30"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-1 text-right">Subtotal</p>
                                            <p className="text-xl font-bold text-[var(--accent)]">{formatPrice(item.price * item.quantity)}</p>
                                            <p className="text-[10px] text-gray-400">{formatPrice(item.price)} / pc</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white p-8 rounded-sm border sticky top-32">
                            <h2 className="text-2xl font-bold mb-8 italic">Order Summary</h2>

                            <div className="flex flex-col gap-4 mb-8">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-black">{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Shipping</span>
                                    <span className="font-medium text-black">Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Estimated Taxes</span>
                                    <span className="font-medium text-black">Included</span>
                                </div>
                            </div>

                            <div className="border-t pt-6 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold">Total Amount</span>
                                    <span className="text-3xl font-bold text-[var(--accent)]">{formatPrice(cartTotal)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="btn btn-primary w-full py-5 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                            >
                                Proceed to Checkout <ArrowRight size={20} />
                            </button>

                            <div className="mt-8 flex flex-col gap-4">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-sm">
                                    <div className="w-2 h-2 rounded-full bg-green-500 pulse"></div>
                                    <p className="text-xs text-gray-500">Free shipping applies to this order!</p>
                                </div>
                                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest leading-relaxed">
                                    Secure SSL encrypted checkout. <br />
                                    14-day hassle free returns.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
