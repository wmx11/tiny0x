import { ImageUploadComponentTypes } from '@/types/Files';
import ImageWithUpload from '../ImageWithUpload';

type ProfileHeaderTypes<T> = ImageUploadComponentTypes<T>;

const ProfileHeader = <T,>(props: ProfileHeaderTypes<T>) => {
  return (
    <ImageWithUpload
      {...props}
      alt="Profile Header Image"
      handler="handleProfileHeaderImageUpload"
      className="rounded-md"
      maxHeight={200}
    />
  );
};

export default ProfileHeader;
