"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AuthType = "No Auth" | "Bearer Token" | "Basic Auth" | "API Key";

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
  onApiKeyLocationChange: (value: "Header" | "Query") => void;
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
    <div className="space-y-4">
      <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Authorization
      </h3>

      <div className="space-y-2">
        <Label>Authentication Type</Label>
        <Select
          value={authType}
          onValueChange={(value) =>
            onAuthTypeChange((value as AuthType) ?? authType)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {authTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {authType === "Bearer Token" && (
        <div className="space-y-2">
          <Label htmlFor="bearer-token">Token</Label>
          <Input
            id="bearer-token"
            value={bearerToken}
            onChange={(e) => onBearerTokenChange(e.target.value)}
            placeholder="Enter Bearer Token"
          />
        </div>
      )}

      {authType === "Basic Auth" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="basic-username">Username</Label>
            <Input
              id="basic-username"
              value={basicUsername}
              onChange={(e) => onBasicUsernameChange(e.target.value)}
              placeholder="Enter Username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="basic-password">Password</Label>
            <Input
              id="basic-password"
              type="password"
              value={basicPassword}
              onChange={(e) => onBasicPasswordChange(e.target.value)}
              placeholder="Enter Password"
            />
          </div>
        </div>
      )}

      {authType === "API Key" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Location</Label>
            <Select
              value={apiKeyLocation}
              onValueChange={(value) =>
                onApiKeyLocationChange(
                  (value as "Header" | "Query") ?? apiKeyLocation
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Header">Header</SelectItem>
                <SelectItem value="Query">Query</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key-name">Key</Label>
            <Input
              id="api-key-name"
              value={apiKeyName}
              onChange={(e) => onApiKeyNameChange(e.target.value)}
              placeholder="e.g. x-api-key"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key-value">Value</Label>
            <Input
              id="api-key-value"
              value={apiKeyValue}
              onChange={(e) => onApiKeyValueChange(e.target.value)}
              placeholder="Enter API Key"
            />
          </div>
        </div>
      )}
    </div>
  );
}
