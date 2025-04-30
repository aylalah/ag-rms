import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

const {
  DO_SPACES_KEY,
  DO_SPACES_SECRET,
  DO_SPACES_ENDPOINT,
  DO_SPACES_REGION,
} = process.env;

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
  credentials: {
    accessKeyId: DO_SPACES_KEY,
    secretAccessKey: DO_SPACES_SECRET,
  },
});
// uploadClientStreamToSpaces

// export const uploadClientStreamToSpace = (file: any, fileName: string) => {
//   return new Upload({
//     client: s3,
//     params: {
//       Bucket: "agustoportals",
//       Key: `rating-mgt-portal/uploads/${fileName}`,
//       Body: file,
//       ACL: "public-read",
//     },

//   }).done();
// };
export const uploadClientStreamToSpace = async (file: any, fileName: string) => {
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: "agustoportals",
      Key: `rating-mgt-portal/uploads/${fileName}`,
      Body: file,
      ACL: "public-read",
    },
    partSize: 100 * 1024 * 1024, 
    leavePartsOnError: false,
  });

  return upload.done(); // Wait for completion
};
export const uploadLoeToSpaces = (file: any, fileName: string) => {
  return new Upload({
    client: s3,
    params: {
      Bucket: "agustoportals",
      Key: `rating-mgt-portal/letter-of-engagement/${fileName}`,
      Body: file,
      ACL: "public-read",
    },
  }).done();
};

export const uploadInvoiceToSpaces = (file: any, fileName: string) => {
  return new Upload({
    client: s3,
    params: {
      Bucket: "agustoportals",
      Key: `rating-mgt-portal/invoice/${fileName}`,
      Body: file,
      ACL: "public-read",
    },
  }).done();
};


export const deleteInvoiceFromSpaces = async (fileName: string) => {
  const params = {
    Bucket: "agustoportals",
    Key: `rating-mgt-portal/invoice/${fileName}`,
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
    return { message: "File deleted" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const uploadReceiptToSpaces = (file: any, fileName: string) => {
  return new Upload({
    client: s3,
    params: {
      Bucket: "agustoportals",
      Key: `rating-mgt-portal/receipts/${fileName}`,
      Body: file,
      ACL: "public-read",
      ContentType: "application/pdf"
    },
  }).done();
}

export const uploadStreamToSpaces = (
  file: any,
  fileName: string,
  version?: string
) => {
  const originalFileName = file.name.split(".")[0];
  const originalExtension = file.name.split(".").pop();

  //  Create the final file name using original name and version (if it exists)
  const finalFileName = version
    ? `${originalFileName}.v${version}.${originalExtension}`
    : fileName;

  return new Upload({
    client: s3,
    params: {
      Bucket: "agustoportals",
      Key: `rating-mgt-portal/uploads/${finalFileName}`,
      Body: file.stream(),
      ACL: "public-read",
    },
  }).done();
};

export const uploadLogoToSpaces = (file: any, fileName: string) => {
  return new Upload({
    client: s3,
    params: {
      Bucket: "agustoportals",
      Key: `rating-mgt-portal/logos/${fileName}`,
      Body: file,
      ACL: "public-read",
    },
  }).done();
};

export const deleteFileFromSpaces = async (fileName: string) => {
  const params = {
    Bucket: "agustoportals",
    Key: `rating-mgt-portal/uploads/${fileName}`,
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
    return { message: "File deleted" };
  } catch (error: any) {
    return { error: error.message };
  }
};

const uploadHandler = unstable_composeUploadHandlers(
  unstable_createFileUploadHandler({
    maxPartSize: 50_000_000,
    file: ({ filename }) => filename,
  }),
  unstable_createMemoryUploadHandler()
);

export const uploadFileHandler = async (request: Request, id: string) => {
  try {
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );
    const file = formData.get("file") as any;
    const fileName: any = formData.get("fileName");

    return {};
    const type = file?.type;
    const name = `${id}/${fileName?.replace(/\s/g, "-")}.${
      type?.split("/")[1]
    }`.toLowerCase();
    const upload = await uploadStreamToSpaces(file, name);

    if (upload?.$metadata?.httpStatusCode === 200)
      return { storedUrl: upload?.Location };
    throw new Error("Upload failed");
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteFileHandler = async (request: Request, id: string) => {
  const formData = await request.formData();
  const fileName = formData.get("fileName") as string;
  const name = `${id}/${fileName}`.toLowerCase();
  const { message, error } = await deleteFileFromSpaces(name);
  return { message, error };
};
