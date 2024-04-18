import { useFetcher, useLoaderData } from '@remix-run/react';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { validateCookie } from '@helpers/cookies';
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import QuestionnaireCard from '@ui/cards/questionnaire';

type Questions = {
  [key: string]: IResponse[];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id as string;
  const { token } = await validateCookie(request);
  const ratingQuery = await RMSservice(token)
    .ratings.one({
      id,
    })
    .then((res) => {
      const { rating, error } = res || {};
      const { responses, ...rest } = rating || {};
      return { rating: rest, error, responses: responses as any as Questions };
    });

  return json({ ratingQuery });
};

export async function action({ request, params }: ActionFunctionArgs) {
  const method = request.method;
  const id = params.id as string;
  const { token } = await validateCookie(request);

  if (method === 'POST') {
    const { storedUrl, error } = await uploadFileHandler(request, id as string);

    console.log({ storedUrl, error });
    return json({ storedUrl, error });
  }

  if (method === 'PATCH') {
    const fd = await request.formData();
    const data = Object.fromEntries(fd.entries()) as any;
    const { updateRating, error } = await RMSservice(token).ratings.update({ id, data });
    return json({ message: updateRating, error });
  }
}

export default function Rating() {
  const Fetcher = useFetcher({ key: 'upload' });
  const FetcherData = Fetcher.data as { storedUrl: string; message: string; error: string };
  const UploadRef = useRef<HTMLDialogElement>(null);
  const { ratingQuery } = useLoaderData<typeof loader>();
  const [fileName, setFileName] = useState<string | null>(null);
  const isSubmitting = Fetcher.state === 'submitting';
  const [questions, setQuestions] = useState<Questions>(
    ratingQuery?.responses ? JSON.parse(ratingQuery?.responses as any) : {}
  );
  const [activeQuestions, setActiveQuestions] = useState<IResponse[]>([]);

  const onUploadFile = async (name: string) => {
    setFileName(name);
    UploadRef.current?.showModal();
  };

  const onChangeQuestion = (question: string) => {
    const questionQuestions = questions[question as keyof typeof questions];
    setActiveQuestions(questionQuestions);
  };

  const onSubmit = async () => {
    Fetcher.submit({ responses: JSON.stringify(questions) }, { method: 'PATCH' });
  };

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (value === '' || value === null) return;
    const QuestionHeader = activeQuestions[0].Header;
    const question = name;
    const textResponse = value;

    const newResponses = questions[QuestionHeader as keyof typeof questions].map((response) => {
      if (response.Question === question && response?.Response) response.Response.text = textResponse;
      return response;
    });
    setQuestions({ ...questions, [QuestionHeader]: newResponses });
  };

  useEffect(() => {
    const firstHeader = Object.keys(questions || {})[0];
    const firstQuestions = questions[firstHeader as keyof typeof questions];
    setActiveQuestions(firstQuestions);
  }, []);

  useEffect(() => {
    if (FetcherData?.storedUrl) {
      toast.success('File uploaded successfully', { toastId: 'upload-file' });
      const questionId = fileName;
      const fileResponse = FetcherData?.storedUrl;

      const newResponses = questions[activeQuestions[0].Header as keyof typeof questions].map((response) => {
        if (response.id === questionId && response?.Response) response.Response.file = fileResponse;
        return response;
      });
      setQuestions({ ...questions, [activeQuestions[0].Header]: newResponses });

      UploadRef.current?.close();
    }

    if (FetcherData?.message) toast.success(FetcherData?.message, { toastId: 'update-rating' });
    if (FetcherData?.error) toast.error(FetcherData?.error, { toastId: 'update-rating' });
  }, [FetcherData]);

  return (
    <div className="flex flex-col flex-1 h-full gap-2">
      <div className="flex items-center justify-between ">
        <h3>
          Rating Title : <span className="text-xl font-bold">{ratingQuery?.rating?.ratingTitle}</span>
        </h3>
        <button disabled={isSubmitting} onClick={onSubmit} className="btn btn-secondary btn-sm w-28">
          {isSubmitting && <span className="loading loading-xs loading-base-100" />}
          Save
        </button>
      </div>

      <QuestionnaireCard
        isReadOnly={false}
        isSubmitting={isSubmitting}
        questions={questions}
        activeQuestions={activeQuestions}
        onChangeQuestion={onChangeQuestion}
        onUploadFile={onUploadFile}
        onSubmit={onSubmit}
        onBlur={onBlur}
      />

      <dialog className="modal" ref={UploadRef}>
        <Fetcher.Form method="post" encType="multipart/form-data">
          <fieldset disabled={isSubmitting} className="flex flex-col flex-1 gap-6 p-8 rounded-lg shadow bg-base-100">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold">Select File</h1>
                <p className="text-xs opacity-70">Select the file you want to upload</p>
              </div>

              <i
                role="button"
                onClick={() => UploadRef.current?.close()}
                className="text-2xl cursor-pointer ri-close-circle-fill text-secondary hover:scale-105"
              />
            </div>

            <div className="flex items-center gap-2 ">
              <input type="hidden" name="fileName" defaultValue={`${fileName}`} />
              <input name="file" type="file" className="file-input-primary file-input input-bordered " required />

              <button className="gap-2 text-base btn btn-secondary">
                Upload
                {isSubmitting && (
                  <div className="h-4 w-4 rounded-full animate-spin border-l-[#fff5] border-[3px] border-#fff"></div>
                )}
              </button>
            </div>
          </fieldset>
        </Fetcher.Form>
      </dialog>
    </div>
  );
}
