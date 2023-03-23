import { ImageUploadComponentTypes } from '@/types/Files';
import { Text, Title } from '@mantine/core';
import ImageUpload from '../ImageUpload';
import ImageWithUpload from '../ImageWithUpload';

type ProfileImageTypes<T> = {
  title?: string;
  subtitle?: string;
  newLine?: boolean;
} & ImageUploadComponentTypes<T>;

const ProfileImage = <T,>({
  src,
  title,
  subtitle,
  newLine,
  isUpdate,
  setImage,
  form,
  formPath,
}: ProfileImageTypes<T>) => {
  return (
    <div
      className={`flex flex-col items-center gap-4 flex-wrap ${
        newLine
          ? 'flex-col items-center text-center'
          : 'md:flex-row md:items-end'
      }`}
    >
      <ImageWithUpload
        alt="Profile Image"
        maxHeight={150}
        className="w-[150px] h-[150px] rounded-full border-white border-4 overflow-hidden"
        handler="handleProfileAvatarImageUpload"
        form={form}
        formPath={formPath}
        isUpdate={isUpdate}
        src={src}
        setImage={setImage}
      />
      {/* <div className="flex justify-between items-center flex-1">
        <div>
          <Title color="white">{title}</Title>
          <Text>{subtitle}</Text>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileImage;
