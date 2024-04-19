import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';

const { DO_SPACES_KEY, DO_SPACES_SECRET, DO_SPACES_ENDPOINT, DO_SPACES_REGION } = process.env;

if (!DO_SPACES_ENDPOINT) {
  throw new Error(`Storage is missing required configuration.`);
}

if (!DO_SPACES_KEY) {
  throw new Error(`Storage is missing required configuration.`);
}

if (!DO_SPACES_SECRET) {
  throw new Error(`Storage is missing required configuration.`);
}

// Set S3 endpoint to DigitalOcean Spaces
const s3 = new S3Client({
  forcePathStyle: false,
  endpoint: DO_SPACES_ENDPOINT,
  region: DO_SPACES_REGION,
  credentials: { accessKeyId: DO_SPACES_KEY, secretAccessKey: DO_SPACES_SECRET },
});

export const uploadStreamToSpaces = (file: any, fileName: string) => {
  return new Upload({
    client: s3,
    params: {
      Bucket: 'agustoportals',
      Key: `rating-mgt-portal/uploads/${fileName}`,
      Body: file,
      ACL: 'public-read',
    },
  }).done();
};

export const deleteFileFromSpaces = async (fileName: string) => {
  const params = {
    Bucket: 'agustoportals',
    Key: `rating-mgt-portal/uploads/${fileName}`,
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
    return { message: 'File deleted' };
  } catch (error: any) {
    return { error: error.message };
  }
};

const uploadHandler = unstable_composeUploadHandlers(
  unstable_createFileUploadHandler({
    maxPartSize: 5_000_000,
    file: ({ filename }) => filename,
  }),
  unstable_createMemoryUploadHandler()
);

export const uploadFileHandler = async (request: Request, id: string) => {
  try {
    const formData = await unstable_parseMultipartFormData(request, uploadHandler);
    const file = formData.get('file') as any;
    const fileName: any = formData.get('fileName');
    const type = file?.type;
    const name = `${id}/${fileName?.replace(/\s/g, '-')}.${type?.split('/')[1]}`.toLowerCase();
    const upload = await uploadStreamToSpaces(file, name);

    if (upload?.$metadata?.httpStatusCode === 200) return { storedUrl: upload?.Location };
    throw new Error('Upload failed');
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteFileHandler = async (request: Request, id: string) => {
  const formData = await request.formData();
  const fileName = formData.get('fileName') as string;
  const name = `${id}/${fileName}`.toLowerCase();
  const { message, error } = await deleteFileFromSpaces(name);
  return { message, error };
};
