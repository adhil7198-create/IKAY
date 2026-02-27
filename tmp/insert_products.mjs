
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jmhclxlhlzogpceilppk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptaGNseGxobHpvZ3BjZWlscHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxODM5NDksImV4cCI6MjA4Nzc1OTk0OX0._-DxhhI3TQMbPFplf2TiSbgOqekbqhUzvbiCgjkL0S4';
const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
    { name: 'Travis Edition Graphix Sweat', category: 'Graphic Sweats', price: 2499, image_url: '/images/travis_sweat.png', is_member_only: false },
    { name: 'M-01 Technical Bomber', category: 'Jackets', price: 4999, image_url: '/images/tech_bomber.png', is_member_only: true },
    { name: 'High-Utility Cargo Shorts', category: 'Shorts', price: 2499, image_url: '/images/cargo_shorts.png', is_member_only: false },
    { name: 'Boxy Flannel Workshop Shirt', category: 'Shirts', price: 2899, image_url: '/images/shirt.png', is_member_only: false },
    { name: 'Deconstructed Racing Jacket', category: 'Jackets', price: 5499, image_url: '/images/hero_racing.png', is_member_only: true },
    { name: 'Vintage Acid Wash Sweatshirt', category: 'Graphic Sweats', price: 2299, image_url: '/images/hoodies.png', is_member_only: false },
    { name: '90s Baggy Utility Denim', category: 'Baggy Denim', price: 2899, image_url: '/images/baggy_denim.png', is_member_only: false }
];

async function insert() {
    console.log('Inserting products...');
    for (const product of products) {
        const { data, error } = await supabase
            .from('products')
            .upsert(product, { onConflict: 'name' });

        if (error) {
            console.error(`Error inserting ${product.name}:`, error.message);
        } else {
            console.log(`Successfully added/updated: ${product.name}`);
        }
    }
}

insert();
