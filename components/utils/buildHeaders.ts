export function buildHeaders(
    headers: { key: string; value: string }[],
    method: string
  ): Record<string, string> {
    const requestHeaders = headers.reduce((acc, header) => {
      const key = header.key.trim();
  
      if (key) {
        acc[key] = header.value || "";
      }
  
      return acc;
    }, {} as Record<string, string>);
  
    const hasContentType = Object.keys(requestHeaders).some(
      (key) => key.toLowerCase() === "content-type"
    );
  
    return {
      ...requestHeaders,
  
      ...(!hasContentType && method !== "GET"
        ? {
            "Content-Type": "application/json",
          }
        : {}),
    };
  }