-- Ikay Retail Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Products Table
create table public.products (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    slug text unique,
    description text,
    price numeric(10, 2) not null,
    category text, 
    image_url text,
    stock_quantity integer default 0,
    is_featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- 4. Create Policy to allow public read access
create policy "Allow public read access"
  on public.products
  for select
  using (true);

-- 5. Insert Sample Data
insert into public.products (name, category, price, image_url) values
('Essential White Linen Shirt', 'Shirts', 1899.00, '/images/shirt.png'),
('Premium Urban Hoodie', 'Hoodies', 2499.00, '/images/hoodies.png'),
('Cargo Relaxed Trousers', 'Trousers', 2199.00, '/images/trousers.png'),
('Classic Street Tee', 'T-Shirts', 1299.00, '/images/tshirts.png'),
('Minimalist Cotton Shirt', 'Shirts', 1699.00, '/images/shirt.png'),
('Oversized Street Hoodie', 'Hoodies', 2699.00, '/images/hoodies.png'),
('Modern Slim Trousers', 'Trousers', 1999.00, '/images/trousers.png'),
('Signature Logo Tee', 'T-Shirts', 1499.00, '/images/tshirts.png');

-- 6. Indexes for faster searching
create index idx_products_category on public.products(category);
create index idx_products_created_at on public.products(created_at);
