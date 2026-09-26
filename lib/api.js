export const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
    if (!response.ok) throw new Error(`Request failed with ${response.status}`);
    return response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function getWorkouts() {
  const data = await fetchJson(API_URL);
  if (!Array.isArray(data)) throw new Error('Workout response was not a list');
  return data;
}

export async function getWorkout(id) {
  const data = await fetchJson(`${API_URL}/${id}`);
  if (!data || !data.id) throw new Error('Workout response was empty');
  return data;
}
