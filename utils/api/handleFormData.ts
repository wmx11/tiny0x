import multiparty from 'multiparty';
import { NextApiRequest } from 'next';

export type FileType = {
  fieldName: string;
  originalFilename: string;
  path: string;
  size: number;
};

type Files = {
  files: {
    image: FileType[];
    images: FileType & { [key: string]: any };
    file: FileType[];
  };
};

type FormData<Fields> = {
  fields: Fields;
  files: {
    image?: FileType;
    images: FileType & { [key: string]: any };
    file?: FileType;
  };
};

export const handleFormData = async <Fields>(
  req: NextApiRequest
): Promise<FormData<Fields> | null> => {
  try {
    const form = new multiparty.Form();
    const data: FormData<{ [key: string]: any }> & Files = await new Promise(
      (resolve, reject) => {
        form.parse(req, function (err, fields, files) {
          if (err) {
            reject({ err });
          }
          resolve({ fields, files });
        });
      }
    );

    const fields = Object.keys(data.fields).reduce((obj, key) => {
      let value = JSON.parse(JSON.stringify(data.fields[key][0])).trim();

      if (value === 'true') {
        value = true;
      }

      if (value === 'false') {
        value = false;
      }

      if (value === 'undefined') {
        value = undefined;
      }

      if (value === 'null') {
        value = null;
      }

      if (/('\d+')/.test(`'${value}'`)) {
        value = parseInt(value, 10);
      }

      Object.assign(obj, { [key]: value ?? '' });

      return obj;
    }, {}) as Fields;

    const image = data.files.image ? data.files.image[0] : undefined;
    const file = data.files.file ? data.files.file[0] : undefined;

    return {
      fields,
      files: {
        image,
        file,
        images: data.files as unknown as FileType & { [key: string]: any },
      },
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const formDataHeader = { 'Content-Type': 'multipart/form-data' };

export const formDataConfig = {
  api: {
    bodyParser: false,
  },
};
