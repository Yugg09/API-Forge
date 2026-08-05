"use client";

type AuthType =
  | "No Auth"
  | "Bearer Token"
  | "Basic Auth"
  | "API Key";

  type AuthorizationEditorProps = {
    authType: AuthType;
    onAuthTypeChange: (type: AuthType) => void;
  
    bearerToken: string;
    onBearerTokenChange: (token: string) => void;

    basicUsername: string;
    onBasicUsernameChange: (value: string) => void;

    basicPassword: string;
    onBasicPasswordChange: (value: string) => void;

    apiKeyName: string;
    onApiKeyNameChange: (value: string) => void;

    apiKeyValue: string;
    onApiKeyValueChange: (value: string) => void;

    apiKeyLocation: "Header" | "Query";
    onApiKeyLocationChange: (
    value: "Header" | "Query"
    ) => void;
  };

const authTypes: AuthType[] = [
  "No Auth",
  "Bearer Token",
  "Basic Auth",
  "API Key",
];

export default function AuthorizationEditor({
    authType,
    onAuthTypeChange,
  
    bearerToken,
    onBearerTokenChange,
  
    basicUsername,
    onBasicUsernameChange,
  
    basicPassword,
    onBasicPasswordChange,

    apiKeyName,
    onApiKeyNameChange,

    apiKeyValue,
    onApiKeyValueChange,

    apiKeyLocation,
    onApiKeyLocationChange,
}: AuthorizationEditorProps) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 font-medium">Authorization</h3>

      <div className="space-y-2">
        <label className="text-sm text-zinc-400">
          Authentication Type
        </label>

        <select
          value={authType}
          onChange={(e) =>
            onAuthTypeChange(e.target.value as AuthType)
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none"
        >
          {authTypes.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </select>
        {authType === "Bearer Token" && (
  <div className="mt-4 space-y-2">
    <label className="text-sm text-zinc-400">
      Token
    </label>

    <input
      type="text"
      value={bearerToken}
      onChange={(e) =>
        onBearerTokenChange(e.target.value)
      }
      placeholder="Enter Bearer Token"
      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none"
    />
  </div>
)}
    {authType === "Basic Auth" && (
    <div className="mt-4 space-y-4">
        <div className="space-y-2">
        <label className="text-sm text-zinc-400">
            Username
        </label>

        <input
            type="text"
            value={basicUsername}
            onChange={(e) =>
            onBasicUsernameChange(e.target.value)
            }
            placeholder="Enter Username"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none"
        />
        </div>

        <div className="space-y-2">
        <label className="text-sm text-zinc-400">
            Password
        </label>

        <input
            type="password"
            value={basicPassword}
            onChange={(e) =>
            onBasicPasswordChange(e.target.value)
            }
            placeholder="Enter Password"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none"
        />
        </div>
    </div>
    )}

{authType === "API Key" && (
  <div className="mt-4 space-y-4">
    <div className="space-y-2">
      <label className="text-sm text-zinc-400">
        Location
      </label>

      <select
        value={apiKeyLocation}
        onChange={(e) =>
          onApiKeyLocationChange(
            e.target.value as "Header" | "Query"
          )
        }
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none"
      >
        <option value="Header">Header</option>
        <option value="Query">Query</option>
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-sm text-zinc-400">
        Key
      </label>

      <input
        type="text"
        value={apiKeyName}
        onChange={(e) =>
          onApiKeyNameChange(e.target.value)
        }
        placeholder="e.g. x-api-key"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none"
      />
    </div>

    <div className="space-y-2">
      <label className="text-sm text-zinc-400">
        Value
      </label>

      <input
        type="text"
        value={apiKeyValue}
        onChange={(e) =>
          onApiKeyValueChange(e.target.value)
        }
        placeholder="Enter API Key"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none"
      />
    </div>
  </div>
)}

      </div>
    </div>
  );
}