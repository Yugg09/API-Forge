"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import RequestPanel from "@/components/request/RequestPanel";
import ResponsePanel from "@/components/response/ResponsePanel";

export default function Home() { 
  const [response, setResponse] = useState(""); //means the response from the API request will be stored in this state variable
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState(0);
  const [size, setSize] = useState(0);

  return (
    <AppLayout>
      <div className="grid h-full grid-cols-2">
      <RequestPanel // means the RequestPanel component will receive the setResponse state updater function as a prop, allowing it to update the response state when a request is made
        setResponse={setResponse}
         setStatus={setStatus} 
         setTime={setTime}
          setSize={setSize}
          /> 
       <ResponsePanel // means the ResponsePanel component will receive the response state variable as a prop, allowing it to display the current response from the API request
          response={response}
          status={status}
          time={time}
         size={size}
            />  
      </div>
    </AppLayout>
  );
}