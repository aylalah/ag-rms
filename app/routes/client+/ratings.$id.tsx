import { useFetcher, useLoaderData } from '@remix-run/react';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { validateCookie } from '@helpers/cookies';
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import QuestionnaireCard from '@ui/cards/questionnaire';

interface IResponse {
  Header: string;
  Response?: {
    file: string | null;
    text: string | null;
  };
  Question: string;
}

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
      const allResponses = responses as any as IResponse[];

      //group responses by Header into IResponse
      const groupedResponses = allResponses.reduce((acc: any, response: any) => {
        const { Header } = response || {};
        if (!acc[Header as keyof typeof acc]) acc[Header] = [];

        acc[Header as keyof typeof acc].push(response);
        return acc;
      }, {}) as { [key: string]: IResponse[] };

      return { rating: rest, error, responses: groupedResponses };
    });

  console.log(ratingQuery?.responses);

  return json({ ratingQuery });
};

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method;

  if (method === 'POST') {
    const { storedUrl, error } = await uploadFileHandler(request);
    return json({ storedUrl, error });
  }

  if (method === 'PATCH') {
    const fd = await request.formData();
    const body = Object.fromEntries(fd.entries()) as any;
    console.log(body);
    return {};
  }
}

export default function Rating() {
  const Fetcher = useFetcher({ key: 'upload' });
  const FetcherData = Fetcher.data as { storedUrl: string; error: string };
  const UploadRef = useRef<HTMLDialogElement>(null);
  const { ratingQuery } = useLoaderData<typeof loader>();
  const [fileName, setFileName] = useState<string | null>(null);
  const isSubmitting = Fetcher.state === 'submitting';
  const [questions, setQuestions] = useState<(typeof ratingQuery)['responses']>(ratingQuery?.responses);
  const [activeQuestions, setActiveQuestions] = useState<IResponse[]>([]);

  const onUploadFile = async (name: string) => {
    setFileName(name);
    UploadRef.current?.showModal();
  };

  const onChangeQuestion = (question: string) => {
    const questionQuestions = questions[question as keyof typeof questions];
    setActiveQuestions(questionQuestions);
  };

  const onSubmit = async () => {};

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (value === '' || value === null) return;
    const QuestionHeader = activeQuestions[0].Header;
    const question = name;
    const textResponse = value;

    const newResponses = questions[QuestionHeader as keyof typeof questions].map((response) => {
      if (response.Question === question) {
        response.Response = { text: textResponse, file: null };
      }
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
      toast.success('File uploaded successfully');
      UploadRef.current?.close();
    }

    if (FetcherData?.error) toast.error(FetcherData?.error);
  }, [FetcherData]);

  return (
    <div className="flex flex-col flex-1 h-full">
      <QuestionnaireCard
        isReadOnly={false}
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
