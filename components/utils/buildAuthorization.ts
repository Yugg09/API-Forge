type AuthType =
  | "No Auth"
  | "Bearer Token"
  | "Basic Auth"
  | "API Key";

type BuildAuthorizationProps = {
  authType: AuthType;
  bearerToken: string;
  basicUsername: string;
  basicPassword: string;
  apiKeyLocation: "Header" | "Query";
  apiKeyName: string;
  apiKeyValue: string;
};

export function buildAuthorization({
  authType,
  bearerToken,
  basicUsername,
  basicPassword,
  apiKeyLocation,
  apiKeyName,
  apiKeyValue,
}: BuildAuthorizationProps): Record<string, string> {
  switch (authType) {
    case "Bearer Token":
      if (!bearerToken.trim()) {
        return {};
      }

      return {
        Authorization: `Bearer ${bearerToken}`,
      };

    case "Basic Auth":
      if (!basicUsername.trim() || !basicPassword.trim()) {
        return {};
      }

      return {
        Authorization: `Basic ${btoa(
          `${basicUsername}:${basicPassword}`
        )}`,
      };

    case "API Key":
      if (
        apiKeyLocation !== "Header" ||
        !apiKeyName.trim() ||
        !apiKeyValue.trim()
      ) {
        return {};
      }

      return {
        [apiKeyName]: apiKeyValue,
      };

    case "No Auth":
    default:
      return {};
  }
}