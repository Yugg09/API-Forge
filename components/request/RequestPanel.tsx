"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import PanelHeader from "@/components/layout/PanelHeader";
import BodyEditor from "../request-builder/BodyEditor";
import HeaderEditor from "../request-builder/HeaderEditor";
import RequestTabs, { TabsContent } from "../request-builder/RequestTabs";
import RequestToolbar from "../request-builder/RequestToolbar";
import QueryEditor from "../request-builder/QueryEditor";
import PathVariableEditor from "../request-builder/PathVariableEditor";
import AuthorizationEditor from "../request-builder/AuthorizationEditor";
import { buildHeaders } from "../utils/buildHeaders";
import { buildQueryParams } from "../utils/buildQueryParams";
import { buildPathUrl } from "../utils/buildPathUrl";
import { buildAuthorization } from "../utils/buildAuthorization";

type Header = {
  key: string;
  value: string;
};

type QueryParam = {
    key: string;
    value: string;
};

type PathVariable = {
  key: string;
  value: string;
};

type AuthType =
  | "No Auth"
  | "Bearer Token"
  | "Basic Auth"
  | "API Key";

type RequestPanelProps = {
    setResponse: React.Dispatch<React.SetStateAction<any>>;
    setStatus: React.Dispatch<React.SetStateAction<any>>;
    setTime: React.Dispatch<React.SetStateAction<any>>;
    setSize: React.Dispatch<React.SetStateAction<any>>;
  
    setMethod: React.Dispatch<React.SetStateAction<string>>;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    setRequestBody: React.Dispatch<React.SetStateAction<string>>;
  };

const INITIAL_HEADER: Header = {
  key: "",
  value: "",
};

const INITIAL_QUERY_PARAM: QueryParam = {
    key: "",
    value: "",
};

const INITIAL_PATH_VARIABLE: PathVariable = {
  key: "",
  value: "",
};

export default function RequestPanel({
  setResponse,
  setStatus,
  setTime,
  setSize,

  setMethod: setSelectedMethod,
  setUrl: setSelectedUrl,
  setRequestBody,
}: RequestPanelProps) {
  // Request State
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [authType, setAuthType] =
  useState<AuthType>("No Auth");
  const [bearerToken, setBearerToken] = useState("");
  //basic auth state
  const [basicUsername, setBasicUsername] = useState("");
  const [basicPassword, setBasicPassword] = useState("");
  // API Key State
const [apiKeyName, setApiKeyName] = useState("");
const [apiKeyValue, setApiKeyValue] = useState("");
const [apiKeyLocation, setApiKeyLocation] = useState<
  "Header" | "Query"
>("Header");

  // Headers State
  const [headers, setHeaders] = useState<Header[]>([
    INITIAL_HEADER,
  ]);

  // Query Params State
  const [queryParams, setQueryParams] = useState<QueryParam[]>([
    INITIAL_QUERY_PARAM,
  ]);

  // Path Variables State
  const [pathVariables, setPathVariables] = useState<PathVariable[]>([
    INITIAL_PATH_VARIABLE,
  ]);

  function updatePathVariable(
    index: number,
    field: "key" | "value",
    value: string
  ) {
    const updatedPathVariables = [...pathVariables];
  
    updatedPathVariables[index][field] = value;
  
    setPathVariables(updatedPathVariables);
  }

  function addPathVariable() {
    setPathVariables([
      ...pathVariables,
      INITIAL_PATH_VARIABLE,
    ]);
  }

  function removePathVariable(index: number) {
    if (pathVariables.length === 1) {
      setPathVariables([INITIAL_PATH_VARIABLE]);
      return;
    }
  
    setPathVariables(
      pathVariables.filter((_, i) => i !== index)
    );
  }

  function updateQueryParam(
    index: number,
    field: "key" | "value",
    value: string
  ) {
    const updatedQueryParams = [...queryParams];

    updatedQueryParams[index][field] = value;

    setQueryParams(updatedQueryParams);
  }

  function addQueryParam() {
    setQueryParams([
      ...queryParams,
      INITIAL_QUERY_PARAM,
    ]);
  }

  function removeQueryParam(index: number) {
    if (queryParams.length === 1) {
      setQueryParams([INITIAL_QUERY_PARAM]);
      return;
    }
  
    setQueryParams(
      queryParams.filter((_, i) => i !== index)
    );
  }

  // UI State
  const [activeTab, setActiveTab] =
    useState("Headers");
  const [loading, setLoading] = useState(false);

  function updateHeader(
    index: number,
    field: "key" | "value",
    value: string
  ) {
    const updatedHeaders = [...headers];

    updatedHeaders[index][field] = value;

    setHeaders(updatedHeaders);
  }

  function addHeader() {
    setHeaders([
      ...headers,
      INITIAL_HEADER,
    ]);
  }

  function removeHeader(index: number) {
    if (headers.length === 1) {
      setHeaders([INITIAL_HEADER]);
      return;
    }

    setHeaders(
      headers.filter(
        (_, i) => i !== index
      )
    );
  }

  function validateBody() {
    if (method === "GET") return true;

    if (!body.trim()) return true;

    try {
      JSON.parse(body);
      return true;
    } catch {
      setResponse("Invalid JSON");
      return false;
    }
  }

  async function sendRequest() {
    if (!validateBody()) return;
  
    if (authType === "Bearer Token" && !bearerToken.trim()) {
      setResponse("Bearer token is required.");
      return;
    }

    setLoading(true);
  
    const finalHeaders = {
      ...buildHeaders(headers, method),
      ...buildAuthorization({
        authType,
        bearerToken,
        basicUsername,
        basicPassword,
        apiKeyLocation,
        apiKeyName,
        apiKeyValue,
      }),
    };
  
    const finalQueryParams = buildQueryParams(
      queryParams,
      authType,
      apiKeyLocation,
      apiKeyName,
      apiKeyValue
    );
  
    const pathUrl = buildPathUrl(url, pathVariables);
    setSelectedMethod(method);
    setSelectedUrl(pathUrl);
    setRequestBody(body);
    try {
      const saveResponse = await fetch(
        "http://localhost:8000/api/requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: "Untitled Request",
            method,
            url: pathUrl,
            headers: Object.fromEntries(
              Object.entries(finalHeaders).filter(
                ([, value]) => value !== undefined
              )
            ),
            queryParams: Object.fromEntries(finalQueryParams),
            body,
          }),
        }
      );
    
      const saved = await saveResponse.json();
    
      if (!saved.success) {
        setResponse(saved.message || "Request save failed");
        return;
      }
      
      // ================= EXECUTE REQUEST =================
      
      const startTime = performance.now();
      
      const response = await fetch(pathUrl, {
        method,
        headers: finalHeaders,
        body:
          method === "GET" || method === "DELETE"
            ? undefined
            : body || undefined,
      });
      
      const endTime = performance.now();
      
      const text = await response.text();
      
      setResponse(text);
      
      setStatus(response.status);
      
      setTime(Math.round(endTime - startTime));
      
      setSize(new Blob([text]).size);
    
    } 
     catch (error) {
      console.error(error);
  
      setResponse(
        error instanceof Error
          ? error.message
          : "Request Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <div className="panel-surface border-r border-border">
      <PanelHeader
        title="Request Builder"
        description="Configure and send HTTP requests"
        icon={<Send className="size-4" />}
      />

      <div className="flex flex-1 flex-col overflow-hidden p-5">
        <RequestToolbar
          method={method}
          url={url}
          loading={loading}
          onMethodChange={setMethod}
          onUrlChange={setUrl}
          onSend={sendRequest}
        />

        <RequestTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          <TabsContent value="Body">
            <BodyEditor
              body={body}
              onBodyChange={setBody}
            />
          </TabsContent>

          <TabsContent value="Headers">
            <HeaderEditor
              headers={headers}
              onHeaderChange={updateHeader}
              onAddHeader={addHeader}
              onRemoveHeader={removeHeader}
            />
          </TabsContent>

          <TabsContent value="Params">
            <QueryEditor
              queryParams={queryParams}
              onQueryParamChange={updateQueryParam}
              onAddQueryParam={addQueryParam}
              onRemoveQueryParam={removeQueryParam}
            />
          </TabsContent>

          <TabsContent value="Path">
            <PathVariableEditor
              pathVariables={pathVariables}
              onPathVariableChange={updatePathVariable}
              onAddPathVariable={addPathVariable}
              onRemovePathVariable={removePathVariable}
            />
          </TabsContent>

          <TabsContent value="Auth">
            <AuthorizationEditor
              authType={authType}
              onAuthTypeChange={setAuthType}
              bearerToken={bearerToken}
              onBearerTokenChange={setBearerToken}
              basicUsername={basicUsername}
              onBasicUsernameChange={setBasicUsername}
              basicPassword={basicPassword}
              onBasicPasswordChange={setBasicPassword}
              apiKeyName={apiKeyName}
              onApiKeyNameChange={setApiKeyName}
              apiKeyValue={apiKeyValue}
              onApiKeyValueChange={setApiKeyValue}
              apiKeyLocation={apiKeyLocation}
              onApiKeyLocationChange={setApiKeyLocation}
            />
          </TabsContent>
        </RequestTabs>
      </div>
    </div>
  );
}