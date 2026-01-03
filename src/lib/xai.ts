import { xai, createXai } from '@ai-sdk/xai';
import { generateText, streamText } from 'ai';

/**
 * XAI Service
 * Provides utilities for interacting with XAI (xAI) API
 * 
 * Set your API key via environment variable: XAI_API_KEY
 */

/**
 * Generate text completion using XAI
 * @param prompt - The prompt to send to XAI
 * @param options - Additional options for the completion
 * @returns Promise with the completion response
 */
export async function generateCompletion(
  prompt: string,
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    apiKey?: string;
  }
) {
  try {
    // Get API key from options, environment variable, or process.env (for Node.js)
    const apiKey = options?.apiKey || 
                   import.meta.env.XAI_API_KEY || 
                   (typeof process !== 'undefined' ? process.env.XAI_API_KEY : undefined);
    
    if (!apiKey) {
      return {
        success: false,
        error: 'XAI_API_KEY is not set. Please provide an API key via options, XAI_API_KEY environment variable, or set it in your .env file.',
        data: null,
      };
    }

    // Always use createXai with explicit API key to ensure it's passed correctly
    const xaiProvider = createXai({ apiKey });
    const model = xaiProvider(options?.model || 'grok-beta');

    const { text, usage } = await generateText({
      model: model,
      prompt: prompt,
      temperature: options?.temperature ?? 0.7,
      maxOutputTokens: options?.maxTokens ?? 1000,
    });

    return {
      success: true,
      data: text,
      usage: usage,
    };
  } catch (error) {
    console.error('XAI API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      data: null,
    };
  }
}

/**
 * Stream text completion from XAI
 * @param prompt - The prompt to send to XAI
 * @param options - Additional options for the completion
 * @returns Async generator that yields chunks of the response
 */
export async function* streamCompletion(
  prompt: string,
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    apiKey?: string;
  }
) {
  try {
    // Get API key from options, environment variable, or process.env (for Node.js)
    const apiKey = options?.apiKey || 
                   import.meta.env.XAI_API_KEY || 
                   (typeof process !== 'undefined' ? process.env.XAI_API_KEY : undefined);
    
    if (!apiKey) {
      throw new Error('XAI_API_KEY is not set. Please provide an API key via options, XAI_API_KEY environment variable, or set it in your .env file.');
    }

    // Always use createXai with explicit API key to ensure it's passed correctly
    const xaiProvider = createXai({ apiKey });
    const model = xaiProvider(options?.model || 'grok-beta');

    const { textStream } = await streamText({
      model: model,
      prompt: prompt,
      temperature: options?.temperature ?? 0.7,
      maxOutputTokens: options?.maxTokens ?? 1000,
    });

    for await (const chunk of textStream) {
      yield chunk;
    }
  } catch (error) {
    console.error('XAI Stream Error:', error);
    throw error;
  }
}

/**
 * Analyze match data and generate predictions
 * @param matchData - Match data to analyze
 * @param apiKey - Optional API key (if not provided, will use environment variable)
 * @returns Promise with analysis and prediction
 */
export async function analyzeMatch(
  matchData: {
    team1: string;
    team2: string;
    history?: Array<{
      result1: string;
      h2h: string;
      result2: string;
    }>;
  },
  apiKey?: string
) {
  const historyText = matchData.history
    ? matchData.history
        .map((h) => `${h.result1} | ${h.h2h} | ${h.result2}`)
        .join('\n')
    : 'No history available';

  const prompt = `Analyze this football match and provide a score prediction:

Teams: ${matchData.team1} vs ${matchData.team2}

Head-to-Head History:
${historyText}

Please provide:
1. A score prediction in the format "X:Y"
2. Brief reasoning based on the historical data

Format your response as JSON with "prediction" and "reasoning" fields.`;

  const result = await generateCompletion(prompt, {
    temperature: 0.3, // Lower temperature for more consistent predictions
    maxTokens: 500,
    apiKey: apiKey, // Pass API key explicitly
  });

  return result;
}

