import { getCSRFToken } from "./django";

/**
 * The main request function using fetch, replacing the axios-based logic.
 * It replicates the behavior of the previous apiClient and its interceptors.
 */
export async function request(
  method: string,
  path: string,
  data?: Record<string, unknown>, // Use Record<string, unknown> to avoid 'any'
  customHeaders: Record<string, string> = {}
) {
  const headersInit: HeadersInit = {
    Accept: "application/json",
    ...customHeaders,
  };

  const fetchOptions: RequestInit = {
    method: method.toUpperCase(),
    headers: headersInit,
  };

  // Add authentication headers and CSRF tokens
  headersInit["X-CSRFToken"] = getCSRFToken();
  headersInit["User-Agent"] = "openbase app";

  // If we have data, attach it, and set the content type to JSON
  if (data !== undefined) {
    fetchOptions.body = JSON.stringify(data);
    (headersInit as Record<string, string>)["Content-Type"] =
      "application/json";
  }

  let response: Response;
  try {
    response = await fetch(path, fetchOptions);
  } catch (networkError) {
    // Handle network errors (e.g., server unreachable)
    console.error("Network error in request:", path, networkError);
    throw networkError; // Re-throw to be handled by the caller
  }

  let msg: any; // To store the parsed JSON response body.
  try {
    const text = await response.text();
    // Attempt to parse JSON only if text is not empty, otherwise JSON.parse would throw.
    if (text) {
      msg = JSON.parse(text);
    } else {
      // If the response text is empty (e.g., 204 No Content), msg will be undefined.
      msg = undefined;
    }
  } catch (jsonParseError) {
    // If JSON parsing fails.
    if (response.ok) {
      console.warn(
        "Response was OK but failed to parse as JSON:",
        path,
        jsonParseError
      );
    }
    // `msg` remains undefined if parsing failed.
  }

  // Process session tokens and authentication events
  if (msg !== undefined) {
    // Fire auth change events
    if (
      (typeof msg.status === "number" && [401, 410].includes(msg.status)) ||
      (msg.status === 200 && msg.meta?.is_authenticated)
    ) {
      const event = new CustomEvent("allauth.auth.change", {
        detail: msg,
      });
      document.dispatchEvent(event);
    }
  }

  if (!response.ok) {
    // If the server responded with an error status code (4xx, 5xx).
    if (msg !== undefined) {
      return msg; // Return the parsed JSON error body
    }
    // If there's no parsed JSON body for the error, throw a new error.
    console.error(
      `HTTP error ${response.status} for path ${path}. No JSON body.`
    );
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }

  // Return the parsed JSON body or undefined if body was empty/non-JSON
  return msg;
}
