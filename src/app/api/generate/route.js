import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DAILY_GENERATION_LIMIT = 3;

// Server-side Supabase client for limit checks
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

async function checkDailyLimit(userId) {
  if (!userId) return { allowed: true }; // unauthenticated users can't be tracked
  const supabase = getSupabase();
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from('presentations')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', todayStart.toISOString());

  if (error) return { allowed: true }; // fail open on DB error
  const used = count || 0;
  return {
    allowed: used < DAILY_GENERATION_LIMIT,
    used,
    remaining: Math.max(0, DAILY_GENERATION_LIMIT - used),
  };
}

export async function POST(request) {
  try {
    const { topic, fileContent, template, slideCount = 15, userId } = await request.json();

    // Enforce daily generation limit
    const limitCheck = await checkDailyLimit(userId);
    if (!limitCheck.allowed) {
      return NextResponse.json(
        {
          error: `Daily limit reached. You can generate up to ${DAILY_GENERATION_LIMIT} presentations per day. You have ${limitCheck.remaining} remaining.`,
          limitReached: true,
          used: limitCheck.used,
          limit: DAILY_GENERATION_LIMIT,
        },
        { status: 429 }
      );
    }

    if (!topic && !fileContent) {
      return NextResponse.json(
        { error: 'Either a topic or file content is required' },
        { status: 400 }
      );
    }

    const subject = topic || 'the provided content';

    const systemPrompt = `You are an expert educational presentation designer. Create exactly ${slideCount} slides for an educational presentation. Return ONLY a valid JSON array with no extra text.

Each slide object must have:
- "title": string (concise slide title)
- "subtitle": string (optional subtitle, can be empty)
- "content": array of 3-5 bullet point strings (each 10-25 words)
- "notes": string (speaker notes, 1-2 sentences)
- "layout": one of "title", "content", "two-column", "summary"

Rules:
- Slide 1 must have layout "title" (the intro/title slide)
- Last slide must have layout "summary"
- Mix "content" and "two-column" layouts for middle slides
- Content should be educational, clear, and well-structured
- Use engaging but professional language
- Each bullet should be a complete thought`;

    const userPrompt = fileContent
      ? `Create a ${slideCount}-slide educational presentation based on this content:\n\n${fileContent.slice(0, 6000)}\n\nTopic: ${subject}`
      : `Create a ${slideCount}-slide educational presentation about: ${subject}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0].message.content;
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    // Normalize — the model may wrap in { "slides": [...] }
    const slides = Array.isArray(parsed) ? parsed : (parsed.slides || parsed.presentation || Object.values(parsed)[0]);

    if (!Array.isArray(slides) || slides.length === 0) {
      return NextResponse.json(
        { error: 'AI returned invalid slide data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      slides,
      topic: subject,
      template,
      slideCount: slides.length,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Slide generation error:', err);
    const message = err?.status === 401
      ? 'Invalid OpenAI API key'
      : err?.status === 429
        ? 'Rate limit exceeded — please wait a moment'
        : 'Failed to generate slides';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
