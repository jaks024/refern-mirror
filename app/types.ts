export interface Image {
  _id: string;
  url: string;
  thumbnailUrl: string;
  name: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  creatorUserId: string;
  parentCollectionId: string;
  tags: string[];
  isNSFW?: boolean;

  heart: number;

  metadata: {
    fileName: string;
    type: string;
    size: number;
  };

  transform: {
    angle: number;
    flipX: boolean;
    flipY: boolean;
    scaleX: number;
    scaleY: number;
    brightness: number;
    saturation: number;
    contrast: number;
  };

  inferred?: {
    safeSearch: {
      adult: number;
      spoof: number;
      medical: number;
      violence: number;
      racy: number;
    };
    labelled: {
      status: "success" | "fail";
      content: string;
      people: string;
      environment: string;
      lighting: string;
      perspective: string;
      keywords: string;
      palette: [
        {
          r: number;
          g: number;
          b: number;
        }
      ];
      witi: string;
    };
    wdtagged: {
      rating: string;
      tags: string;
      character: string;
    };
  };

  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  at: string;
  photoUrl: string;

  storageUsage: number;
  storageLimit: number;

  capturerAccessCode: string;

  allTags?: string[];

  heartedIds?: string[];
  savedSourceObjectIds?: string[];

  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  creatorUserId: string;
  parentFolderId: string;
  name: string;
  description: string;
  imageIds: string[];
  tags: string[];
  cover: string;

  heart: number;

  createdAt: string;
  updatedAt: string;

  inferred: {
    keywords: string[];
  };
}

export interface FolderItem {
  _id: string;
  type: "collection" | "board";
}

export interface Folder {
  _id: string;
  creatorUserId: string;
  parentFolderId: string;
  name: string;
  description: string;
  items: FolderItem[];
  tags: string[];
  cover: string;
  createdAt: string;
  updatedAt: string;

  inferred: {
    keywords: string[];
  };
}

export interface BoardImageTransform {
  _id: string;
  imageId: string;
  x: number;
  y: number;
  angle: number;
  flipX: boolean;
  flipY: boolean;
  scaleX: number;
  scaleY: number;
  brightness: number;
  saturation: number;
  contrast: number;
}

export interface Board {
  _id: string;
  creatorUserId: string;
  parentFolderId: string;
  name: string;
  description: string;
  imageProperties: {
    transforms: BoardImageTransform[];
  };
  tags: string[];
  cover: string;
  createdAt: string;
  updatedAt: string;

  heart: number;

  inferred: {
    keywords: string[];
  };
}
