import axios from "axios";
import { Request } from "../models/Request.model";
import { saveHistory } from "./history.service";

export async function executeRequest(
  requestId: string,
  userId: string
) {
  const request = await Request.findOne({
    _id: requestId,
    user: userId,
  });

  if (!request) {
    throw new Error("Request not found");
  }

  const response = await axios({
    method: request.method.toLowerCase() as any,
    url: request.url,
    headers: request.headers,
    params: request.queryParams,
    data: request.body
      ? JSON.parse(request.body)
      : undefined,
  });

  await saveHistory(
    userId,
    requestId,
    response.status,
    response.data
  );

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
  };
}