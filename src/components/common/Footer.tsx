import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[var(--primary)] text-[var(--text-light)] pt-16 pb-8">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="flex flex-col gap-4">
                        <Link to="/" className="text-3xl font-bold tracking-tighter">
                            IKAY<span className="text-[var(--accent)]">.</span>
                        </Link>
                        <p className="text-gray-400 mt-2">
                            Modern urban fashion for the conscious professional. Redefining Bangalore's style.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="hover:text-[var(--accent)] transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-[var(--accent)] transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-[var(--accent)] transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="flex flex-col gap-3 text-gray-400">
                            <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
                            <li><Link to="/shop?category=T-Shirts" className="hover:text-white transition-colors">T-Shirts</Link></li>
                            <li><Link to="/shop?category=Hoodies" className="hover:text-white transition-colors">Hoodies</Link></li>
                            <li><Link to="/shop?category=Trousers" className="hover:text-white transition-colors">Trousers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6">Support</h4>
                        <ul className="flex flex-col gap-3 text-gray-400">
                            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                            <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
                            <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6">Locate Us</h4>
                        <ul className="flex flex-col gap-4 text-gray-400">
                            <li className="flex gap-3">
                                <MapPin size={20} className="text-[var(--accent)] shrink-0" />
                                <span>Indiranagar, Bangalore, Karnataka 560038</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone size={20} className="text-[var(--accent)] shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex gap-3">
                                <Mail size={20} className="text-[var(--accent)] shrink-0" />
                                <span>hello@ikay.shop</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} IKAY Retail. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/terms" className="hover:text-white">Terms of Service</Link>
                        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
