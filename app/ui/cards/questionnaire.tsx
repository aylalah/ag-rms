import { Link } from '@remix-run/react';
import React, { useEffect, useState } from 'react';

type QuestionnaireCardProps = {
  isReadOnly?: boolean;
  isSubmitting?: boolean;
  questions: { [key: string]: IResponse[] };
  activeQuestions: IResponse[];
  onChangeQuestion: (question: string) => void;
  onUploadFile?: (arg: string) => void;
  onDeleteFile?: (arg: string) => void;
  onSubmit?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

export default function QuestionnaireCard({ ...props }: QuestionnaireCardProps) {
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [totalAnswers, setTotalAnswers] = useState<number>(0);

  const percentageCompleted = (header: string) => {
    const totalQuestions = props?.questions[header]?.length || 0;
    const totalAnswers =
      props?.questions[header]?.filter((el) => el?.Response?.text).length ||
      props?.questions[header]?.filter((el) => el?.Response?.file).length ||
      0;
    return Math.round((totalAnswers / totalQuestions) * 100);
  };

  useEffect(() => {
    const totalQuestions = props?.activeQuestions?.length || 0;
    const totalAnswers = props?.activeQuestions?.filter((el) => el?.Response?.text).length || 0;
    setTotalQuestions(totalQuestions);
    setTotalAnswers(totalAnswers);
  }, [props?.activeQuestions]);

  return (
    <div className="flex flex-1 h-full gap-2 overflow-hidden">
      <div className="w-[22em] bg-base-100">
        <div className="flex items-center justify-between p-4 font-bold text-white border-b bg-primary">
          <h2>Questionnaire</h2>
          <p className="text-xs opacity-60">Complete(%)</p>
        </div>

        {props?.questions &&
          Object.keys(props?.questions).map((question, i) => (
            <div
              onClick={() => props?.onChangeQuestion(question)}
              key={question}
              className={`p-4 text-sm border flex items-center justify-between hover:bg-secondary hover:text-white cursor-pointer ${props?.activeQuestions?.[0]?.Header === question && 'bg-secondary text-white font-bold'}`}
            >
              {question}

              <span className="text-xs opacity-60">({percentageCompleted(question)}%)</span>
            </div>
          ))}
      </div>

      <div className="flex flex-col flex-1 h-full gap-2 overflow-hidden border-b bg-base-100 border-accent">
        <div className="flex justify-between w-full p-4 text-white bg-primary before:content['hello_world']">
          <h2>{props?.activeQuestions?.[0]?.Header}</h2>

          <p>
            {totalAnswers} of {totalQuestions}
          </p>
        </div>

        <div className="flex flex-col items-start flex-1 gap-2 overflow-auto bg-base-300">
          {props?.activeQuestions?.map((el, i) => (
            <QuestionCard
              tabIndex={i + 1}
              onBlur={props.onBlur}
              key={el?.Question}
              index={i}
              el={el}
              readOnly={props?.isReadOnly}
              onUploadFile={props.onUploadFile}
              onDeleteFile={props.onDeleteFile}
              isSubmitting={props?.isSubmitting}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type QuestionCardProps = {
  tabIndex: number;
  isMain?: boolean;
  readOnly?: boolean;
  index: number;
  el: IResponse;
  onDeleteFile?: (arg: string) => void;
  onUploadFile?: (arg: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  isSubmitting?: boolean;
};

const QuestionCard = ({ isMain = false, readOnly = true, ...props }: QuestionCardProps) => (
  <div className="flex flex-col justify-start w-full gap-2 p-4 text-sm border shadow-sm bg-base-100">
    <h3 className={` ${isMain ? 'font-bold capitalize' : 'font-normal'}`}>
      [{props.index + 1}] {props?.el?.Question}
    </h3>

    <div className="flex items-center gap-2">
      <textarea
        tabIndex={props?.tabIndex}
        onBlur={props?.onBlur}
        defaultValue={props?.el?.Response?.text ? props?.el?.Response?.text : ''}
        name={props?.el?.Question}
        disabled={readOnly}
        rows={2}
        className={`w-full  p-2 resize-none border ${readOnly ? 'bg-base-200 cursor-not-allowed' : 'bg-base-100'} flex items-center`}
      />

      {!readOnly &&
        (props?.el?.Response?.file === '' || props?.el?.Response?.file === null ? (
          <button
            disabled={props?.isSubmitting}
            role="button"
            className="flex items-center justify-center gap-1 text-xs text-white cursor-pointer w-28 btn text-secondary bg-secondary"
            onClick={() => props?.onUploadFile && props?.onUploadFile(props?.el?.id)}
          >
            <i className="ri-upload-cloud-2-fill"></i>
            Upload
          </button>
        ) : (
          <button
            disabled={props?.isSubmitting}
            className="flex items-center justify-center gap-1 text-xs cursor-pointer btn btn-outlined"
            onClick={() => props?.onDeleteFile && props?.onDeleteFile(props?.el?.id)}
          >
            <i className="ri-close-fill"></i>
            Remove File
          </button>
        ))}

      {readOnly && props?.el?.Response?.file && (
        <Link
          to={props?.el?.Response?.file}
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex items-center text-sm btn btn-secondary"
        >
          <i className="ri-download-cloud-2-fill"></i>
          Download File
        </Link>
      )}
    </div>

    {props?.el?.Response?.file && !readOnly && (
      <Link
        to={props?.el?.Response?.file}
        target="_blank"
        referrerPolicy="no-referrer"
        className="text-xs text-blue-500 link"
      >
        {props?.el?.Response?.file}
      </Link>
    )}
  </div>
);
