"use client";

import { useState } from "react";

import BodyEditor from "../request-builder/BodyEditor";
import HeaderEditor from "../request-builder/HeaderEditor";
import RequestTabs from "../request-builder/RequestTabs";
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
  setResponse: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
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

  const finalHeaders: HeadersInit = {
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

    const queryString = finalQueryParams.toString();

    const pathUrl = buildPathUrl(
      url,
      pathVariables
    );

    const finalUrl = queryString
      ? `${pathUrl}?${queryString}`
      : pathUrl;

    try {
      const startTime = performance.now();

      console.log("Final URL:", finalUrl);
      const res = await fetch(finalUrl, {
        method,
        headers: finalHeaders,
        body: method === "GET" ? undefined : body,
      });

      const endTime = performance.now();

      const data = await res.json();
      const formattedData = JSON.stringify(
        data,
        null,
        2
      );

      setResponse(formattedData);
      setStatus(res.status);
      setTime(
        Math.round(endTime - startTime)
      );
      setSize(
        new Blob([formattedData]).size
      );
    } catch (error) {
      console.error(error);
      setResponse("Request Failed");
    }
  }

  return (
    <div className="border-r border-zinc-800 p-5">
      <h2 className="mb-4 text-xl font-semibold">
        Request Builder
      </h2>

      <RequestToolbar
        method={method}
        url={url}
        onMethodChange={setMethod}
        onUrlChange={setUrl}
        onSend={sendRequest}
      />

      <RequestTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "Body" && (
        <BodyEditor
          body={body}
          onBodyChange={setBody}
        />
      )}

      {activeTab === "Headers" && (
        <HeaderEditor
          headers={headers}
          onHeaderChange={updateHeader}
          onAddHeader={addHeader}
          onRemoveHeader={removeHeader}
        />
    )}
      {activeTab === "Params" && (
      <QueryEditor
        queryParams={queryParams}
        onQueryParamChange={updateQueryParam}
        onAddQueryParam={addQueryParam}
        onRemoveQueryParam={removeQueryParam}
      />
    )}
      {activeTab === "Path" && (
    <PathVariableEditor
      pathVariables={pathVariables}
      onPathVariableChange={updatePathVariable}
      onAddPathVariable={addPathVariable}
      onRemovePathVariable={removePathVariable}
    />
  )}
      {activeTab === "Auth" && (
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
)}
    </div>
  );
}