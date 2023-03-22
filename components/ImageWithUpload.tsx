import { ImageHandlers, ImageUploadComponentTypes } from '@/types/Files';
import React from 'react';
import ImageUpload from './ImageUpload';

type ImageWithUploadTypes<T> = {
  alt: string;
  className: string;
  maxHeight?: number;
  handler: ImageHandlers;
} & ImageUploadComponentTypes<T>;

const ImageWithUpload = <T,>({
  form,
  formPath,
  isUpdate,
  setImage,
  src,
  className,
  alt,
  handler,
  maxHeight,
}: ImageWithUploadTypes<T>) => {
  return (
    <div
      className={`${className} h-full bg-zinc-400 overflow-hidden relative`}
      style={{ maxHeight }}
    >
      <div className="h-full" style={{ height: maxHeight }}>
        {src ? (
          <img src={src} alt={alt} style={{ maxHeight }} />
        ) : (
          <div style={{ maxHeight }}></div>
        )}
        {isUpdate ? (
          <div className="absolute inset-0 h-full">
            <ImageUpload
              initialImage={src}
              setImage={setImage}
              handler={handler}
              form={form}
              formPath={formPath}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ImageWithUpload;
