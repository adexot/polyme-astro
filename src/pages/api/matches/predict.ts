import type { APIRoute } from 'astro';
import { analyzeMatch } from '../../../lib/xai';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { team1, team2, history } = body;

    if (!team1 || !team2) {
      return new Response(
        JSON.stringify({ error: 'team1 and team2 are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get API key from environment
    const apiKey = import.meta.env.XAI_API_KEY || 
                   (typeof process !== 'undefined' ? process.env.XAI_API_KEY : undefined);

    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'XAI_API_KEY is not configured. Please set it in your environment variables or .env file.' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await analyzeMatch({
      team1,
      team2,
      history,
    }, apiKey);

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: result.error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Try to parse JSON response from AI
    let prediction = '';
    let reasoning = '';
    
    try {
      const parsed = JSON.parse(result.data || '{}');
      prediction = parsed.prediction || '';
      reasoning = parsed.reasoning || '';
    } catch {
      // If not JSON, try to extract prediction from text
      const predictionMatch = result.data?.match(/(\d+:\d+)/);
      prediction = predictionMatch ? predictionMatch[1] : result.data?.split('\n')[0] || '';
      reasoning = result.data || '';
    }

    return new Response(
      JSON.stringify({
        prediction,
        reasoning,
        usage: result.usage,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Match prediction API error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

