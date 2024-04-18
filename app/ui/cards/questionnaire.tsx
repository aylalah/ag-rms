import React, { useEffect, useState } from 'react';

interface IResponse {
  Header: string;
  Response?: {
    file: string | null;
    text: string | null;
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
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

export default function QuestionnaireCard({ ...props }: QuestionnaireCardProps) {
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [totalAnswers, setTotalAnswers] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    const totalQuestions = props?.activeQuestions?.length || 0;
    const totalAnswers = props?.activeQuestions?.filter((el) => el?.Response?.text).length || 0;
    setTotalQuestions(totalQuestions);
    setTotalAnswers(totalAnswers);
    setPercentage(Math.round((totalAnswers / totalQuestions) * 100));
  }, [props?.activeQuestions]);

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
        <div className="flex justify-between w-full p-4 text-white bg-primary before:content['hello_world']">
          <h2>
            {props?.activeQuestions?.[0]?.Header} <span className="text-sm opacity-60">({percentage}% Completed)</span>
          </h2>

          <p>
            {totalAnswers} of {totalQuestions}
          </p>
        </div>

        <div className="flex-1 overflow-auto">
          {props?.activeQuestions?.map((el, i) => (
            <QuestionCard
              onBlur={props.onBlur}
              key={el?.Question}
              index={i}
              el={el}
              readOnly={props?.isReadOnly}
              onUploadFile={props.onUploadFile}
            />
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
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const QuestionCard = ({ isMain = false, readOnly = true, index, el, onUploadFile, onBlur }: QuestionCardProps) => (
  <div className="flex flex-col gap-2 p-4 text-sm border shadow-sm">
    <h3 className={` ${isMain ? 'font-bold capitalize' : 'font-normal'}`}>
      [{index + 1}] {el?.Question}
    </h3>

    <div className="flex gap-2">
      <textarea
        contentEditable={!readOnly}
        onBlur={onBlur}
        defaultValue={el?.Response?.text ? el?.Response?.text : ''}
        name={el?.Question}
        disabled={readOnly}
        className={`w-full  p-2 resize-none border ${readOnly ? 'bg-base-200 cursor-not-allowed' : 'bg-base-100'} flex items-center h-[4em]`}
      />

      {!readOnly && onUploadFile && (
        <button
          className="flex items-center justify-center h-full gap-1 text-white cursor-pointer w-28 btn text-secondary bg-secondary"
          onClick={() => onUploadFile(el?.Question)}
        >
          <i className="ri-upload-cloud-2-fill"></i>
          Upload
        </button>
      )}

      {readOnly && el?.Response?.file && (
        <button className="w-32 btn btn-secondary">
          <i className="ri-download-cloud-2-fill"></i>
          Download
        </button>
      )}
    </div>
  </div>
);
