import apiRoutes from '@/routes/api';
import { signedRequest } from '@/utils/api/signedRequest';
import config from '@/utils/config';
import Icons from '@/utils/icons';
import { ActionIcon, FileInput, LoadingOverlay } from '@mantine/core';
import React, { FC, useRef, useState } from 'react';
import ErrorMessage from './ErrorMessage';

type ImageUploadTypes = {
  label?: string;
  description?: string;
  placeholder?: string;
  setImage: (image: Blob | null) => void;
  initialImage?: string;
  handler: 'handleProfileAvatarImageUpload' | 'handleProfileHeaderImageUpload';
};

const ImageUpload: FC<ImageUploadTypes> = ({
  initialImage,
  setImage,
  description,
  label,
  placeholder,
  handler,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [errorMessage, setErrorMessage] = useState('');

  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    ref.current?.click();
  };

  const handleDelete = () => {
    setImageUrl(undefined);
    setImage && setImage(null);
  };

  const handleSubmit = async (image: File) => {
    if (!image?.type) {
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(image);
      reader.addEventListener('load', async () => {
        const imageResult = reader.result;
        const fd = new FormData();
        fd.append('image', new Blob([imageResult as ArrayBuffer]));
        fd.append('type', handler as string);

        const { data } = await signedRequest({
          type: 'post',
          url: apiRoutes.image,
          data: fd,
          isFormData: true,
        });

        const imageData = config.images.getImageData(data?.data as Blob);
        const fetchedImage = await fetch(imageData);
        const imageBlob = await fetchedImage.blob();

        setImage && setImage(imageBlob);
        setImageUrl(imageData);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-800/70 w-full h-full flex items-center justify-center">
      <FileInput
        label={label}
        description={description}
        placeholder={placeholder}
        onChange={handleSubmit}
        ref={ref}
        styles={{ input: { display: 'none' } }}
      />
      <div className="flex gap-4 items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded Image"
            className="w-full h-full absolute brightness-50"
          />
        ) : null}
        <div className="text-6xl flex gap-4 ">
          <ActionIcon onClick={handleClick}>
            <Icons.Camera />
          </ActionIcon>
          {imageUrl ? (
            <ActionIcon onClick={handleDelete}>
              <Icons.Trash />
            </ActionIcon>
          ) : null}
        </div>
        {loading ? <LoadingOverlay visible={loading} className="z-0" /> : null}
      </div>
      {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
    </div>
  );
};

export default ImageUpload;
