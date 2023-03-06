export type NFTMetadataSchema = {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attribute: {
    display_type?:
      | string
      | 'number'
      | 'boost_percentage'
      | 'boost_number'
      | 'date';
    trait_type?: string;
    value?: string | number;
  }[];
};
