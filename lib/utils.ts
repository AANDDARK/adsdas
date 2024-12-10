import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
require('dotenv').config();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(supabaseUrl, supabaseKey);