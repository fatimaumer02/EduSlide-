// Supabase API utility functions for EduSlide AI
import { supabase } from './supabase';

// ============================================================
// INPUT SANITIZATION
// ============================================================

function sanitize(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/[<>]/g, '')        // Strip HTML angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '')     // Remove inline event handlers
    .trim();
}

function sanitizeObject(obj) {
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      cleaned[key] = sanitize(value);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateUUID(id) {
  const re = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return re.test(id);
}

// ============================================================
// AUTH FUNCTIONS
// ============================================================

export async function signUp({ username, email, password, fullName, institution, department, phone, role }) {
  // Validate required fields
  if (!username || !email || !password) {
    throw new Error('Username, email, and password are required');
  }
  if (!validateEmail(email)) {
    throw new Error('Invalid email address');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Prevent admin role from being set via public signup
  const sanitizedRole = sanitize(role) || 'educator';
  if (sanitizedRole === 'admin') {
    throw new Error('Admin accounts cannot be created through signup');
  }

  const { data, error } = await supabase
    .from('users')
    .insert([{
      username: sanitize(username),
      email: sanitize(email),
      password_hash: password,
      full_name: sanitize(fullName),
      institution: sanitize(institution),
      department: sanitize(department),
      phone: sanitize(phone),
      role: sanitizedRole,
    }])
    .select()
    .single();

  if (error) throw error;
  // Never return password_hash to the client
  const { password_hash, ...safeUser } = data;
  return safeUser;
}

export async function login({ username, password }) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', sanitize(username))
    .eq('password_hash', password)
    .single();

  if (error) throw new Error('Invalid username or password');
  // Never return password_hash to the client
  const { password_hash, ...safeUser } = data;
  return safeUser;
}

export async function getUserById(userId) {
  if (!validateUUID(userId)) throw new Error('Invalid user ID');

  const { data, error } = await supabase
    .from('users')
    .select('id, username, email, full_name, institution, department, phone, role, avatar_url, created_at, updated_at')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateUser(userId, updates) {
  if (!validateUUID(userId)) throw new Error('Invalid user ID');

  const safeUpdates = sanitizeObject(updates);
  // Prevent updating sensitive fields from the client
  delete safeUpdates.password_hash;
  delete safeUpdates.id;

  const { data, error } = await supabase
    .from('users')
    .update({ ...safeUpdates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select('id, username, email, full_name, institution, department, phone, role, avatar_url, created_at, updated_at')
    .single();

  if (error) throw error;
  return data;
}

// ============================================================
// PRESENTATIONS FUNCTIONS
// ============================================================

export async function getPresentations(userId) {
  const { data, error } = await supabase
    .from('presentations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createPresentation({ userId, title, topic, template, slidesCount, status, filePath, fileSize }) {
  if (!validateUUID(userId)) throw new Error('Invalid user ID');

  const { data, error } = await supabase
    .from('presentations')
    .insert([{
      user_id: userId,
      title: sanitize(title),
      topic: sanitize(topic),
      template: sanitize(template),
      slides_count: slidesCount || 10,
      status: sanitize(status) || 'processing',
      file_path: sanitize(filePath),
      file_size: fileSize,
      views: 0,
      downloads: 0,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePresentation(presentationId, updates) {
  const { data, error } = await supabase
    .from('presentations')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', presentationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePresentation(presentationId) {
  if (!validateUUID(presentationId)) throw new Error('Invalid presentation ID');

  const { error } = await supabase
    .from('presentations')
    .delete()
    .eq('id', presentationId);

  if (error) throw error;
  return true;
}

export async function incrementPresentationViews(presentationId) {
  const { data: pres } = await supabase
    .from('presentations')
    .select('views')
    .eq('id', presentationId)
    .single();

  if (pres) {
    await supabase
      .from('presentations')
      .update({ views: (pres.views || 0) + 1 })
      .eq('id', presentationId);
  }
}

export async function incrementPresentationDownloads(presentationId) {
  const { data: pres } = await supabase
    .from('presentations')
    .select('downloads')
    .eq('id', presentationId)
    .single();

  if (pres) {
    await supabase
      .from('presentations')
      .update({ downloads: (pres.downloads || 0) + 1 })
      .eq('id', presentationId);
  }
}

// ============================================================
// TOPICS FUNCTIONS
// ============================================================

export async function getTopics(userId) {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createTopic({ userId, name, category, description }) {
  if (!validateUUID(userId)) throw new Error('Invalid user ID');
  if (!name) throw new Error('Topic name is required');

  const { data, error } = await supabase
    .from('topics')
    .insert([{
      user_id: userId,
      name: sanitize(name),
      category: sanitize(category),
      description: sanitize(description),
      presentations_count: 0,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTopic(topicId, updates) {
  if (!validateUUID(topicId)) throw new Error('Invalid topic ID');

  const safeUpdates = sanitizeObject(updates);
  const { data, error } = await supabase
    .from('topics')
    .update({ ...safeUpdates, updated_at: new Date().toISOString() })
    .eq('id', topicId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTopic(topicId) {
  if (!validateUUID(topicId)) throw new Error('Invalid topic ID');

  const { error } = await supabase
    .from('topics')
    .delete()
    .eq('id', topicId);

  if (error) throw error;
  return true;
}

// ============================================================
// UPLOADS FUNCTIONS
// ============================================================

export async function createUpload({ userId, fileName, fileType, filePath, fileSize }) {
  if (!validateUUID(userId)) throw new Error('Invalid user ID');

  const { data, error } = await supabase
    .from('uploads')
    .insert([{
      user_id: userId,
      file_name: sanitize(fileName),
      file_type: sanitize(fileType),
      file_path: sanitize(filePath),
      file_size: fileSize,
      status: 'uploaded',
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUploads(userId) {
  const { data, error } = await supabase
    .from('uploads')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// ============================================================
// ANALYTICS FUNCTIONS
// ============================================================

export async function trackEvent({ userId, presentationId, eventType }) {
  const { data, error } = await supabase
    .from('analytics')
    .insert([{
      user_id: userId,
      presentation_id: presentationId,
      event_type: eventType,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAnalyticsStats(userId) {
  const presentations = await getPresentations(userId);
  const topics = await getTopics(userId);

  const totalViews = presentations.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalDownloads = presentations.reduce((sum, p) => sum + (p.downloads || 0), 0);
  const totalPresentations = presentations.length;
  const totalTopics = topics.length;

  const topPresentations = [...presentations]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  const categoryMap = {};
  presentations.forEach(p => {
    const cat = p.topic || 'Uncategorized';
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });
  const totalForPercentage = presentations.length || 1;
  const categoryData = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    count,
    percentage: Math.round((count / totalForPercentage) * 100),
  }));

  return {
    totalViews,
    totalDownloads,
    totalPresentations,
    totalTopics,
    topPresentations,
    categoryData,
  };
}

// ============================================================
// CONTACT MESSAGES
// ============================================================

export async function submitContactMessage({ name, email, subject, message }) {
  if (!name || !email || !subject || !message) {
    throw new Error('All contact form fields are required');
  }
  if (!validateEmail(email)) {
    throw new Error('Invalid email address');
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{
      name: sanitize(name),
      email: sanitize(email),
      subject: sanitize(subject),
      message: sanitize(message),
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================================
// DAILY GENERATION LIMIT (3 per day for template-based slides)
// ============================================================

const DAILY_GENERATION_LIMIT = 3;

export async function getDailyGenerationCount(userId) {
  if (!validateUUID(userId)) throw new Error('Invalid user ID');

  // Start of today (UTC)
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const { data, error, count } = await supabase
    .from('presentations')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', todayStart.toISOString());

  if (error) throw error;
  return count || 0;
}

export async function canGenerateToday(userId) {
  const count = await getDailyGenerationCount(userId);
  return {
    allowed: count < DAILY_GENERATION_LIMIT,
    used: count,
    limit: DAILY_GENERATION_LIMIT,
    remaining: Math.max(0, DAILY_GENERATION_LIMIT - count),
  };
}

// ============================================================
// DASHBOARD STATS
// ============================================================

export async function getDashboardStats(userId) {
  const presentations = await getPresentations(userId);
  const topics = await getTopics(userId);
  const uploads = await getUploads(userId);

  const totalDownloads = presentations.reduce((sum, p) => sum + (p.downloads || 0), 0);

  return {
    totalPresentations: presentations.length,
    totalTopics: topics.length,
    totalUploads: uploads.length,
    totalDownloads,
    recentPresentations: presentations.slice(0, 5),
  };
}
