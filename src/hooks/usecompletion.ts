import { useState, useEffect, useCallback } from "react";

interface GeminiCompletionOptions {
  url: string; // Required, the URL to your Gemini API endpoint
  initialCompletion?: string; // Optional, initial completion text
}

interface GeminiCompletionResult {
  completion: string;
  complete: (prompt: string) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

function useCompletion(
  options: GeminiCompletionOptions
): GeminiCompletionResult {
  const [completion, setCompletion] = useState<string>(
    options.initialCompletion || ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const complete = useCallback(
    async (prompt: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(options.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }), // Send the prompt in the request body
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `API Error: ${response.status} - ${JSON.stringify(errorData)}`
          );
        }

        const data = await response.json();

        if (typeof data === "string") {
          setCompletion(data); // Assuming the API returns a plain string
        } else if (data && data.completion) {
          setCompletion(data.completion); // Assuming the API returns { completion: string }
        } else {
          throw new Error("API response format incorrect.");
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setCompletion("");
      } finally {
        setIsLoading(false);
      }
    },
    [options.url]
  );

  return { completion, complete, isLoading, error };
}

export default useCompletion;
