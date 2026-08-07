import { History } from "../models/History.model";

export async function saveHistory(
  userId: string,
  requestId: string,
  status: number,
  response: unknown
) {
  return History.create({
    user: userId,
    request: requestId,
    status,
    response,
  });
}

export async function getHistory(
  userId: string
) {
  return History.find({
    user: userId,
  })
    .populate("request")
    .sort({
      createdAt: -1,
    });
}

export async function deleteHistory(
  historyId: string,
  userId: string
) {
  return History.findOneAndDelete({
    _id: historyId,
    user: userId,
  });
}