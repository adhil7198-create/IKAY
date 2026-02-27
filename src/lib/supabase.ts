import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid credentials
const isConfigured = !!supabaseUrl && !!supabaseAnonKey && supabaseUrl !== 'your_supabase_project_url';

if (!isConfigured) {
    console.warn('IKAY: Supabase is not configured. Using fallback data.');
}

// Initialize the client only if configured, otherwise use a safe mock to avoid crashes during chained calls
export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : ({
        from: () => {
            const chain: any = {
                select: () => chain,
                order: () => chain,
                limit: () => chain,
                single: () => chain,
                maybeSingle: () => chain,
                eq: () => chain,
                then: (onfulfilled?: any) => Promise.resolve({ data: null, error: new Error('Supabase not configured') }).then(onfulfilled)
            };
            return chain;
        }
    } as any);
