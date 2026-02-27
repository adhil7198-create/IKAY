import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface NavbarProps {
  onAuthOpen: () => void;
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ onAuthOpen, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter hover:opacity-80">
          IKAY<span className="text-[var(--accent)]">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-[var(--accent)]">Home</Link>
          <Link to="/shop" className="hover:text-[var(--accent)]">Shop</Link>
          <Link to="/collections" className="hover:text-[var(--accent)]">Collections</Link>
          <Link to="/about" className="hover:text-[var(--accent)]">About</Link>
        </div>

        <div className="flex items-center gap-5">
          <button className="hover:text-[var(--accent)] p-2">
            <Search size={20} />
          </button>

          <div className="group relative">
            <button
              className={`hover:text-[var(--accent)] p-2 transition-colors ${user ? 'text-[var(--accent)]' : ''}`}
              onClick={user ? undefined : onAuthOpen}
            >
              <User size={20} />
            </button>

            {user && (
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-white border p-4 shadow-xl min-w-[200px] rounded-sm">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                  <p className="text-xs font-bold mb-4 truncate">{user.email}</p>
                  <div className="border-t pt-4 flex flex-col gap-2">
                    <Link to="/profile" className="text-xs hover:text-[var(--accent)]">My Profile</Link>
                    <Link to="/orders" className="text-xs hover:text-[var(--accent)]">My Orders</Link>
                    <button
                      onClick={() => supabase.auth.signOut()}
                      className="text-xs text-left text-red-500 hover:text-red-600 mt-2 font-bold"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative hover:text-[var(--accent)] p-2">
            <ShoppingCart size={20} />
            <span className="absolute top-0 right-0 bg-[var(--primary)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Link>
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 border-t py-6 px-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Home</Link>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Shop</Link>
          <Link to="/collections" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Collections</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">About</Link>
          {user && (
            <button
              onClick={() => {
                supabase.auth.signOut();
                setIsMobileMenuOpen(false);
              }}
              className="text-lg font-medium text-red-500 text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
