import {
  ActionFunctionArgs,
  json,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import numeral from 'numeral';
import { useEffect, useRef, useState } from 'react';

const allowFileTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/pdf',
  'application/zip',
  'application/rar',
  'text/csv',
];

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.id || 'testing';
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 30_000_000,
      file: ({ filename }) => filename,
    }),
    unstable_createMemoryUploadHandler()
  );

  //const loader = uploadFileHandler(request, 'and');
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const files = Object.fromEntries(formData.entries());

  const saveFiles = await Promise.all(
    Object.entries(files).map(async ([key, file]) => {
      const fileData = file as { name: string; type: string; size: number };
      const fileName = fileData?.name;

      const name = `${id}/${fileName?.replace(/\s/g, '-')}`.toLowerCase();
      const upload = await uploadStreamToSpaces(file, name);

      if (upload?.$metadata?.httpStatusCode === 200) return { storedUrl: upload?.Location, status: true, id: key };
      return { storedUrl: null, status: false, id: key };
    })
  );

  return json({ saveQuery: saveFiles });
};

export default function Dragger() {
  const Fetcher = useFetcher();
  const FetcherData = Fetcher.data as {
    saveQuery: { id: string; storedUrl: string | null; status: boolean; fileName: string }[];
  };
  const dragRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<
    { id: string; name: string; size: number; status: boolean; shouldAllow: boolean }[]
  >([]);

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const payload = [];
    for (let i = 0; i < files.length; i++) {}

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const key = `file_${i}`;
      const fileType = files[i].type;
      const shouldAllow = allowFileTypes.includes(fileType);

      payload.push({ id: key, name: files[i].name, size: files[i].size, status: false, shouldAllow });

      if (allowFileTypes.includes(files[i].type)) {
        formData.append(key, files[i]);
      }
    }

    setFileList([...fileList, ...payload]);
    Fetcher.submit(formData, { method: 'POST', encType: 'multipart/form-data' });
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragRef.current?.style.setProperty('border', '2px dashed #9f9f9f');
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragRef.current?.style.setProperty('border', 'none');
  };

  useEffect(() => {
    console.log('FetcherData', FetcherData);
    const saveQuery = FetcherData?.saveQuery;
    if (saveQuery) {
      const newFileList = fileList.map((file) => {
        const found = saveQuery.find((query) => query.id === file.id);
        if (found) {
          return { ...file, status: found.status };
        }
        return file;
      });
      setFileList(newFileList);
    }
  }, [FetcherData]);

  return (
    <div className="flex flex-col flex-1 gap-10">
      <div
        className="relative flex items-center justify-center w-full transition-all bg-red-100 border cursor-pointer rounded-xl h-96"
        ref={dragRef}
        id="drop_zone"
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      >
        <p>
          Drag one or more files to this <i>drop zone</i>.
        </p>
        {/* <input type="text" className="absolute top-0 left-0 w-full h-full" /> */}
      </div>

      <div>
        <h2 className="text-xl font-bold">File(s)</h2>
      </div>

      <div className="w-full">
        {fileList &&
          Array.from(fileList).map((file, index) => (
            <div key={index} className="flex items-center justify-between py-4 border-b ">
              <div className="flex items-center gap-4">
                {file?.status && <i className="text-xl text-green-600 ri-checkbox-circle-fill" />}
                {!file?.shouldAllow && <i className="text-xl text-red-600 ri-close-circle-fill" />}
                {!file?.status && file.shouldAllow && <span className="loading loading-sm" />}

                <p className={`${!file?.shouldAllow && 'text-red-500'}`}>{file.name}</p>
              </div>
              <p className={`${!file?.shouldAllow && 'text-red-500'}`}>
                {file?.size && numeral(file.size / 1000000).format('0,00.00')} MB
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
