import { ImageUploadComponentTypes } from '@/types/Files';
import ImageWithUpload from '../ImageWithUpload';

type CampaignHeaderTypes<T> = ImageUploadComponentTypes<T>;

const CampaignHeader = <T,>(props: CampaignHeaderTypes<T>) => {
  return (
    <ImageWithUpload
      {...props}
      alt="Campaign Header"
      handler="handleCampaignImageUpload"
      className="rounded-md"
      maxHeight={256}
    />
  );
};

export default CampaignHeader;
