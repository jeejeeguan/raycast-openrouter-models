import fetch from "node-fetch";

export interface OpenRouterModel {
  id: string;
  name: string;
  description?: string;
  context_length: number;
  created: number;
  pricing: {
    prompt: string;
    completion: string;
  };
  top_provider: {
    max_completion_tokens?: number;
  };
}

export interface OpenRouterResponse {
  data: OpenRouterModel[];
}

export async function fetchOpenRouterModels(): Promise<OpenRouterModel[]> {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as OpenRouterResponse;
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch OpenRouter models:", error);
    throw error;
  }
}

export function formatModelPrice(prompt: string, completion: string): string {
  const promptPrice = parseFloat(prompt) * 1000000;
  const completionPrice = parseFloat(completion) * 1000000;
  return `$${promptPrice.toFixed(2)}/$${completionPrice.toFixed(2)} per 1M tokens`;
}

export function formatTokens(tokens: number): string {
  if (tokens >= 1000000000) {
    // B (Billion) 单位
    const value = tokens / 1000000000;
    if (value >= 100) {
      return `${value.toFixed(0)}B tokens`;
    } else if (value >= 10) {
      return `${value.toFixed(1)}B tokens`;
    } else {
      return `${value.toFixed(2)}B tokens`;
    }
  } else if (tokens >= 1000000) {
    // M (Million) 单位
    const value = tokens / 1000000;
    if (value >= 100) {
      return `${value.toFixed(0)}M tokens`;
    } else if (value >= 10) {
      return `${value.toFixed(1)}M tokens`;
    } else {
      return `${value.toFixed(2)}M tokens`;
    }
  } else if (tokens >= 1000) {
    // K (Thousand) 单位
    return `${(tokens / 1000).toFixed(0)}K tokens`;
  } else {
    return `${tokens} tokens`;
  }
}
