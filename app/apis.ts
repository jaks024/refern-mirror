import { Board, Collection, Folder, Image, User } from "./types";

export async function getUser(userId: string) {
  const res = await fetch(`${process.env.API_ROOT}/user/${userId}`);
  if (res.ok) {
    const data = await res.json();
    return data as User;
  } else {
    return undefined;
  }
}

export async function getUserByAt(at: string) {
  const res = await fetch(`${process.env.API_ROOT}/user/at/${at}`);
  if (res.ok) {
    const data = await res.json();
    return data as User;
  } else {
    return undefined;
  }
}

export async function getImage(imageId: string) {
  const res = await fetch(`${process.env.API_ROOT}/image/${imageId}`);
  if (res.ok) {
    const data = await res.json();
    return data as Image;
  } else {
    return undefined;
  }
}

export async function getCollection(collectionId: string) {
  const res = await fetch(`${process.env.API_ROOT}/collection/${collectionId}`);
  if (res.ok) {
    const data = await res.json();
    return data as Collection;
  } else {
    return undefined;
  }
}

export async function getFolder(folderId: string) {
  const res = await fetch(`${process.env.API_ROOT}/folder/${folderId}`);
  if (res.ok) {
    const data = await res.json();
    return data as Folder;
  } else {
    return undefined;
  }
}

export async function getAllUserFolders(userId: string) {
  const res = await fetch(`${process.env.API_ROOT}/folder/user/${userId}`);
  if (res.ok) {
    const data = await res.json();
    return data as Folder[];
  } else {
    return undefined;
  }
}

export async function getBoard(boardId: string) {
  const res = await fetch(`${process.env.API_ROOT}/board/${boardId}`);
  if (res.ok) {
    const data = await res.json();
    return data as Board;
  } else {
    return undefined;
  }
}
