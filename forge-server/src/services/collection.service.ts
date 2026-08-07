import { Collection } from "../models/Collection.model";

type CreateCollectionInput = {
  name: string;
  userId: string;
};

export async function createCollection(
  data: CreateCollectionInput
) {
  const collection = await Collection.create({
    name: data.name,
    user: data.userId,
  });

  return collection;
}

export async function getCollections(
  userId: string
) {
  return Collection.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
}

export async function deleteCollection(
  collectionId: string,
  userId: string
) {
  const collection = await Collection.findOneAndDelete({
    _id: collectionId,
    user: userId,
  });

  if (!collection) {
    throw new Error("Collection not found");
  }

  return collection;
}

export async function renameCollection(
  collectionId: string,
  userId: string,
  name: string
) {
  const collection =
    await Collection.findOneAndUpdate(
      {
        _id: collectionId,
        user: userId,
      },
      {
        name,
      },
      {
        new: true,
      }
    );

  if (!collection) {
    throw new Error("Collection not found");
  }

  return collection;
}