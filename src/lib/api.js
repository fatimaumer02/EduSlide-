// API utility functions for backend communication

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }

  return response.json();
}

export async function generateSlides(fileId, topic) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileId, topic }),
  });

  if (!response.ok) {
    throw new Error('Slide generation failed');
  }

  return response.json();
}

export async function downloadPresentation(fileId) {
  const response = await fetch(`/api/download/${fileId}`);

  if (!response.ok) {
    throw new Error('Download failed');
  }

  return response.blob();
}
