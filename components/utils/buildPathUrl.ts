type PathVariable = {
    key: string;
    value: string;
  };
  
  export function buildPathUrl(
    url: string,
    pathVariables: PathVariable[]
  ) {
    let finalPathUrl = url;
  
    pathVariables.forEach((variable) => {
      const key = variable.key.trim();
      const value = variable.value.trim();
  
      if (key) {
        finalPathUrl = finalPathUrl.replace(
          `:${key}`,
          value
        );
      }
    });
  
    return finalPathUrl;
  }