import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';

const Navbar: React.FC = () => {
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
          <Link to="/admin" className="hover:text-[var(--accent)] p-2">
            <User size={20} />
          </Link>
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
