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
('Travis Edition Graphix Sweat', 'Graphic Sweats', 2499.00, '/images/graphic_sweats.png'),
('Vintage Acid Wash Sweatshirt', 'Graphic Sweats', 2299.00, '/images/hoodies.png'),
('07 Streetide Racing Tee', 'Racing Tees', 1699.00, '/images/racing_tees.png'),
('Vintage Wash Baggy Denim', 'Baggy Denim', 2899.00, '/images/baggy_denim.png'),
('Stone Baggy Cargo Pant', 'Baggy Pants', 2199.00, '/images/baggy_pants.png'),
('Classic Longline Hoodie', 'Hoodies', 2499.00, '/images/hoodies.png'),
('Loose Fit Urban Pant', 'Baggy Pants', 1999.00, '/images/baggy_pants.png'),
('Signature Logo Tee', 'T-Shirts', 1499.00, '/images/tshirts.png');

-- 6. Indexes for faster searching
create index idx_products_category on public.products(category);
create index idx_products_created_at on public.products(created_at);

-- 7. User Roles & Profiles
create type public.user_role as enum ('admin', 'user');

create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    full_name text,
    avatar_url text,
    role user_role default 'user'::public.user_role,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone" on public.profiles
    for select using (true);

create policy "Users can update their own profile" on public.profiles
    for update using (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 8. Enhance Products for Membership
alter table public.products add column is_member_only boolean default false;

-- 9. Orders Table (if not exists)
create table if not exists public.orders (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users not null,
    total_amount numeric(10, 2) not null,
    status text default 'processing', -- processing, shipped, delivered, cancelled
    tracking_number text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for orders
alter table public.orders enable row level security;

-- Orders Policies
create policy "Users can view their own orders" on public.orders
    for select using (auth.uid() = user_id);

create policy "Admins can view all orders" on public.orders
    for select using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );
