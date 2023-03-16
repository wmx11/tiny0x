export type ImageRequest = {
  fields: {
    left: string;
    top: string;
    height: string;
    width: string;
    fit: 'contain' | 'fill' | 'cover' | 'inside' | 'outside';
  };
  files: {
    imageData: {
      path: string;
    }[];
  };
};

export type SetImage = { setImage?: (image: Blob | null) => void };

export type ImageUploadReturnTypes = { filename: string; url: string };
