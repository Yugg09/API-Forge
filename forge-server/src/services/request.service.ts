import { Request } from "../models/Request.model";

type CreateRequestInput = {
  name: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body: string;
  collectionId: string;
  userId: string;
};

export async function createRequest(
  data: CreateRequestInput
) {
  const request = await Request.create({
    name: data.name,
    method: data.method,
    url: data.url,
    headers: data.headers,
    queryParams: data.queryParams,
    body: data.body,
    collection: data.collectionId,
    user: data.userId,
  });

  return request;
}

export async function getRequests(
  collectionId: string,
  userId: string
) {
  return Request.find({
    collection: collectionId,
    user: userId,
  }).sort({
    createdAt: -1,
  });
}

export async function updateRequest(
  requestId: string,
  userId: string,
  data: Partial<CreateRequestInput>
) {
  const request = await Request.findOneAndUpdate(
    {
      _id: requestId,
      user: userId,
    },
    data,
    {
      new: true,
    }
  );

  if (!request) {
    throw new Error("Request not found");
  }

  return request;
}

export async function deleteRequest(
  requestId: string,
  userId: string
) {
  const request = await Request.findOneAndDelete({
    _id: requestId,
    user: userId,
  });

  if (!request) {
    throw new Error("Request not found");
  }

  return request;
}