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
