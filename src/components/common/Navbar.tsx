import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onAuthOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuthOpen }) => {
  const { cartCount } = useCart();
  const { user, role, signOut } = useAuth();
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
    <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-white border-b py-5'}`}>
      <div className="container flex items-center justify-between">
        {/* Left: Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center gap-6 font-medium text-sm uppercase tracking-wider">
          <Link to="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-[var(--accent)] transition-colors">Shop</Link>
          {role === 'admin' && (
            <Link to="/admin" className="text-[var(--accent)] font-bold hover:opacity-80 transition-opacity">Admin</Link>
          )}
          <Link to="/about" className="hover:text-[var(--accent)] transition-colors">About</Link>
        </div>

        {/* Mobile Menu Button (Left on mobile) */}
        <button className="md:hidden p-2 -ml-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Center: Logo */}
        <div className="flex-1 flex justify-center">
          <Link to="/" className="text-2xl md:text-3xl font-bold tracking-[0.15em] hover:opacity-80 transition-opacity">
            IKAY<span className="text-[var(--accent)]">.</span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
          <button className="hover:text-[var(--accent)] p-2 hidden sm:block">
            <Search size={20} strokeWidth={1.5} />
          </button>

          <div className="group relative">
            <button
              className={`hover:text-[var(--accent)] p-2 transition-colors ${user ? 'text-[var(--accent)]' : ''}`}
              onClick={user ? undefined : onAuthOpen}
            >
              <User size={20} strokeWidth={1.5} />
            </button>

            {user && (
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-white border p-6 shadow-[0_10px_40px_rgba(0,0,0,0.1)] min-w-[240px] rounded-sm">
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.1em] mb-1">Account</p>
                  <p className="text-xs font-bold mb-5 truncate">{user.email}</p>
                  <div className="border-t pt-4 flex flex-col gap-3">
                    {role === 'admin' && (
                      <Link to="/admin" className="text-xs font-bold text-[var(--accent)] hover:opacity-80 transition-opacity">Admin Dashboard</Link>
                    )}
                    <Link to="/profile" className="text-xs hover:text-[var(--accent)] transition-colors">Profile Settings</Link>
                    <Link to="/orders" className="text-xs hover:text-[var(--accent)] transition-colors">Order History</Link>
                    <button
                      onClick={() => signOut()}
                      className="text-xs text-left text-red-500 hover:text-red-700 mt-2 font-bold transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative hover:text-[var(--accent)] p-2">
            <ShoppingCart size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 border-t py-8 px-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold uppercase tracking-widest">Home</Link>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold uppercase tracking-widest">Shop</Link>
          {role === 'admin' && (
            <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold uppercase tracking-widest text-[var(--accent)]">Admin Panel</Link>
          )}
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold uppercase tracking-widest">About</Link>
          {user && (
            <button
              onClick={() => {
                signOut();
                setIsMobileMenuOpen(false);
              }}
              className="text-xl font-bold uppercase tracking-widest text-red-500 text-left mt-4"
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
