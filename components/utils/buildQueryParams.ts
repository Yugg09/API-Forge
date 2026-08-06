export function buildQueryParams(
    queryParams: { key: string; value: string }[],
    authType: string,
    apiKeyLocation: string,
    apiKeyName: string,
    apiKeyValue: string
  ) {
    const params = new URLSearchParams();
  
    queryParams.forEach((param) => {
      const key = param.key.trim();
      const value = param.value.trim();
  
      if (key) {
        params.append(key, value);
      }
    });
  
    if (
      authType === "API Key" &&
      apiKeyLocation === "Query" &&
      apiKeyName.trim() &&
      apiKeyValue.trim()
    ) {
      params.append(apiKeyName, apiKeyValue);
    }
  
    return params;
  }