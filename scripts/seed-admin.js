/**
 * One-time script to create the system administrator account.
 *
 * Usage:
 *   node scripts/seed-admin.js
 *
 * Environment variables (reads from .env.local automatically):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Change the credentials below before running.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ─── CONFIGURE ADMIN CREDENTIALS HERE ───────────────────────
const ADMIN = {
  username: 'admin',
  email: 'admin@eduslide.com',
  password_hash: 'Admin@12345',   // change this to a strong password
  full_name: 'System Administrator',
  institution: 'EduSlide',
  department: 'Administration',
  phone: '',
  role: 'admin',
};
// ─────────────────────────────────────────────────────────────

async function seed() {
  // Check if an admin already exists
  const { data: existing, error: fetchErr } = await supabase
    .from('users')
    .select('id, username, role')
    .eq('role', 'admin')
    .maybeSingle();

  if (fetchErr) {
    console.error('Error checking for existing admin:', fetchErr.message);
    process.exit(1);
  }

  if (existing) {
    console.log(`Admin already exists → username: "${existing.username}", id: ${existing.id}`);
    console.log('No changes made.');
    process.exit(0);
  }

  // Insert the admin
  const { data, error } = await supabase
    .from('users')
    .insert([ADMIN])
    .select('id, username, email, role')
    .single();

  if (error) {
    console.error('Failed to create admin:', error.message);
    process.exit(1);
  }

  console.log('Admin created successfully:');
  console.log(`  id       : ${data.id}`);
  console.log(`  username : ${data.username}`);
  console.log(`  email    : ${data.email}`);
  console.log(`  role     : ${data.role}`);
}

seed();
