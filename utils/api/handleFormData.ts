import multiparty from 'multiparty';
import { NextApiRequest } from 'next';

export type FileType = {
  fieldName: string;
  originalFilename: string;
  path: string;
  size: number;
};

type FormData<Fields, FileFields extends string | number | symbol> = {
  fields: Fields;
  files: {
    [key in FileFields]: FileType[];
  };
};

export const handleFormData = async <Fields, FileFields extends string | number | symbol>(
  req: NextApiRequest
): Promise<FormData<Fields, FileFields> | null> => {
  try {
    const form = new multiparty.Form();

    const data: FormData<{ [key: string]: any }, FileFields> =
      await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
          if (err) {
            reject({ err });
          }
          resolve({ fields, files });
        });
      });

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

    return {
      fields,
      files: data.files,
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
