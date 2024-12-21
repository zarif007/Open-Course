interface LangFlowResponse {
  result?: string;
  error?: string;
}

export async function callLangFlowAPI(
  message: string,
  applicationToken: string
): Promise<LangFlowResponse> {
  const LANGFLOW_URL =
    'https://api.langflow.astra.datastax.com/lf/ecc86fb1-c32a-4989-b486-dfb296a87f41/api/v1/run/63622ed9-9608-4d2c-91ea-a5bf7a3e8b6f';

  if (!applicationToken) {
    throw new Error('API token is required');
  }

  const payload = {
    input_value: message,
    output_type: 'chat',
    input_type: 'chat',
    tweaks: {
      'ChatInput-ECwzm': {},
      'Prompt-AFBDK': {},
      'ChatOutput-9CNa7': {},
      'GroqModel-hL2wW': {},
    },
  };

  try {
    const response = await fetch(LANGFLOW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${applicationToken}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { result: data }; // Return just the data
  } catch (error) {
    console.error('API Error:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
