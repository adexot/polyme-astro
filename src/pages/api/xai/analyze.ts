import type { APIRoute } from 'astro';
import { generateCompletion } from '../../../lib/xai';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { prompt, model, temperature, maxTokens } = body;

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await generateCompletion(prompt, {
      model,
      temperature,
      maxTokens,
      apiKey: import.meta.env.XAI_API_KEY,
    });

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: result.error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        text: result.data,
        usage: result.usage,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('XAI API route error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

