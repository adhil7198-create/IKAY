import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Filter, Loader2, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock_quantity: number;
    image_url: string;
}

const AdminProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    // Form state
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newCategory, setNewCategory] = useState('Racing Tees');
    const [newStock, setNewStock] = useState('10');
    const [newImage, setNewImage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setProducts(data);
        }
        setLoading(false);
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.from('products').insert([{
            name: newName,
            price: parseFloat(newPrice),
            category: newCategory,
            stock_quantity: parseInt(newStock),
            image_url: newImage || '/images/tshirts.png'
        }]).select();

        if (!error && data) {
            setProducts([data[0], ...products]);
            setShowAddModal(false);
            // Reset form
            setNewName('');
            setNewPrice('');
            setNewImage('');
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (!error) {
                setProducts(products.filter(p => p.id !== id));
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-black italic uppercase tracking-tighter">Product Inventory</h1>
                        <p className="text-gray-500 text-sm">Manage your catalog, stock, and pricing</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[var(--accent)] transition-all"
                    >
                        <Plus size={16} /> Add New Product
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-sm border p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search products by name or category..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-black transition-colors text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 border text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                        <Filter size={16} /> Filter
                    </button>
                </div>

                {/* Table */}
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
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Product</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Category</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Price</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Stock</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-16 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                                                        {product.image_url ? (
                                                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                                <ImageIcon size={20} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm tracking-tight">{product.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium">ID: {product.id.slice(0, 8)}...</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold uppercase tracking-widest text-gray-600">{product.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-black">₹{product.price.toLocaleString()}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${product.stock_quantity > 5 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                    <span className="text-xs font-bold">{product.stock_quantity} units</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button className="p-2 hover:text-[var(--accent)] transition-colors">
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="p-2 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Add Product Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-lg p-8 rounded-sm shadow-2xl animate-in fade-in zoom-in duration-300">
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8">Add New Garment</h2>
                            <form onSubmit={handleAddProduct} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Name</label>
                                        <input
                                            type="text" required value={newName} onChange={(e) => setNewName(e.target.value)}
                                            className="px-4 py-3 bg-gray-50 border border-gray-100 focus:outline-none focus:border-black text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price (INR)</label>
                                        <input
                                            type="number" required value={newPrice} onChange={(e) => setNewPrice(e.target.value)}
                                            className="px-4 py-3 bg-gray-50 border border-gray-100 focus:outline-none focus:border-black text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
                                        <select
                                            value={newCategory} onChange={(e) => setNewCategory(e.target.value)}
                                            className="px-4 py-3 bg-gray-50 border border-gray-100 focus:outline-none focus:border-black text-sm"
                                        >
                                            <option>Racing Tees</option>
                                            <option>Graphic Sweats</option>
                                            <option>Baggy Pants</option>
                                            <option>Hoodies</option>
                                            <option>Jeans</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Initial Stock</label>
                                        <input
                                            type="number" value={newStock} onChange={(e) => setNewStock(e.target.value)}
                                            className="px-4 py-3 bg-gray-50 border border-gray-100 focus:outline-none focus:border-black text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Image Asset Name (e.g. tshirts.png)</label>
                                    <input
                                        type="text" value={newImage} placeholder="/images/..."
                                        onChange={(e) => setNewImage(e.target.value)}
                                        className="px-4 py-3 bg-gray-50 border border-gray-100 focus:outline-none focus:border-black text-sm"
                                    />
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <button
                                        type="button" onClick={() => setShowAddModal(false)}
                                        className="flex-1 py-4 border border-black text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit" disabled={loading}
                                        className="flex-1 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[var(--accent)] transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={14} /> : 'Save Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts;
