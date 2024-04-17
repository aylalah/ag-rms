interface IResponse {
  Header: string;
  Response?: {
    file: string;
    text: string;
  };
  Question: string;
}

type QuestionnaireCardProps = {
  isReadOnly?: boolean;
  questions: { [key: string]: IResponse[] };
  activeQuestions: IResponse[];
  onChangeQuestion: (question: string) => void;
  onUploadFile?: (arg: string) => void;
  onSubmit?: () => void;
};

export default function QuestionnaireCard({ ...props }: QuestionnaireCardProps) {
  return (
    <div className="flex flex-1 h-full gap-2 overflow-hidden">
      <div className="w-[20em] bg-base-100">
        <p className="p-4 font-bold text-white border-b bg-primary">Questionnaire</p>

        {props?.questions &&
          Object.keys(props?.questions).map((question, i) => (
            <div
              onClick={() => props?.onChangeQuestion(question)}
              key={question}
              className={`p-4 text-sm border hover:bg-secondary hover:text-white cursor-pointer ${props?.activeQuestions?.[0]?.Header === question && 'bg-secondary text-white font-bold'}`}
            >
              {question}
            </div>
          ))}
      </div>

      <div className="flex flex-col flex-1 h-full gap-2 overflow-hidden border-b bg-base-100 border-accent">
        <div className="flex justify-between w-full p-4 text-white bg-primary">
          <h2>{props?.activeQuestions?.[0]?.Header}</h2>
        </div>

        <div className="flex-1 overflow-auto">
          {props?.activeQuestions?.map((el, i) => (
            <QuestionCard key={i} index={i} el={el} readOnly={props?.isReadOnly} onUpload={props.onUploadFile} />
          ))}
        </div>
      </div>
    </div>
  );
}

type QuestionCardProps = {
  isMain?: boolean;
  readOnly?: boolean;
  index: number;
  el: IResponse;
  onUploadFile?: (arg: string) => void;
};

const QuestionCard = ({ isMain = false, readOnly = true, index, el, onUploadFile }: QuestionCardProps) => (
  <div className="flex flex-col gap-2 p-4 text-sm border shadow-sm">
    <h3 className={` ${isMain ? 'font-bold capitalize' : 'font-normal'}`}>
      [{index + 1}] {el?.Question}
    </h3>

    <div className="flex gap-2">
      <textarea
        name={el?.Question}
        disabled={readOnly}
        defaultValue={el?.Response?.text}
        className={`w-full p-2 resize-none border ${readOnly ? 'bg-base-200 cursor-not-allowed' : 'bg-base-100'} flex items-center h-[4em]`}
      />

      <div className="relative flex items-center justify-center w-32 gap-1 overflow-hidden border rounded shadow border-accent bg-base-100">
        {!readOnly && onUploadFile && (
          <div className="flex gap-1 text-secondary" onClick={() => onUploadFile(el?.Question)}>
            <i className="ri-upload-cloud-2-fill"></i>
            Upload
          </div>
        )}

        {readOnly && el?.Response?.file && <button>View</button>}
      </div>
    </div>
  </div>
);
