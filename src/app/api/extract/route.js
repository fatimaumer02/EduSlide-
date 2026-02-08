import { NextResponse } from 'next/server';
import { PDFParse } from 'pdf-parse';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let text = '';
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.pdf')) {
      const parser = new PDFParse();
      const result = await parser.parseBuffer(buffer);
      // Collect text from all pages
      text = result.pages.map(p => p.text || '').join('\n');
    } else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
      text = new TextDecoder().decode(buffer);
    } else {
      // For .docx / .epub — extract raw text (basic approach)
      text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
      // Clean up binary garbage
      text = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s{3,}/g, ' ');
    }

    // Limit to ~6000 chars to fit in GPT context
    const trimmed = text.trim().slice(0, 6000);

    if (!trimmed) {
      return NextResponse.json(
        { error: 'Could not extract text from the file. Try a different format.' },
        { status: 422 }
      );
    }

    return NextResponse.json({ text: trimmed, charCount: trimmed.length });
  } catch (err) {
    console.error('File extraction error:', err);
    return NextResponse.json(
      { error: 'Failed to process the file' },
      { status: 500 }
    );
  }
}
