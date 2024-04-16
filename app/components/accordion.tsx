import { useEffect } from 'react';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function Accordion({
  title,
  defaultChecked = false,
  data,
  accountType,
}: {
  title?: string;
  defaultChecked?: boolean;
  accountType?: 'user' | 'client';
  data: any;
}) {
  let totalQuestions = data.length;

  //reduce total questions by 1 if there are subQuestions
  const totalSubQuestions = data.reduce((acc: number, item: any) => {
    if (item?.SubQuestion?.length > 0) {
      totalQuestions--;
      return acc + item?.SubQuestion?.length;
    }
    return acc;
  }, 0);

  const totalResponses = data.reduce((acc: number, item: any) => {
    if (item?.Response) return acc + 1;
    return acc;
  }, 0);

  const totalSubResponses = data.reduce((acc: number, item: any) => {
    if (item?.SubQuestion?.length > 0) {
      return (
        acc +
        item?.SubQuestion?.reduce((acc: number, el: any) => {
          if (el?.Response) return acc + 1;
          return acc;
        }, 0)
      );
    }
    return acc;
  }, 0);

  const totalQues = totalQuestions + totalSubQuestions;
  const totalRes = totalResponses + totalSubResponses;

  return (
    <div className="mb-3 collapse collapse-arrow">
      <input type="radio" name="my-accordion-2" defaultChecked={defaultChecked} />
      <div
        className={`${defaultChecked ? 'text-base-100 bg-primary' : 'base-content bg-base-100'} flex justify-between text-sm shadow  collapse-title `}
      >
        <div className="flex items-center gap-2 ">
          <i className="mr-2 ri-arrow-right-line" />
          <h3 className="font-bold">{title}</h3>
        </div>

        <div className="flex items-center gap-2">
          {totalRes} of {totalQues} Completed
        </div>
      </div>

      <div className="collapse-content bg-base-300">
        <div className="pt-4">
          {data.map((item: any, i: number) => (
            <div key={i} className="flex flex-col justify-between w-full gap-2 p-3 py-2 border-t border-gray-300">
              <AccordionCard key={i} index={i} el={item} isMain readOnly={accountType === 'user'} />
              <span>
                {item?.SubQuestion?.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {item?.SubQuestion?.map((el: any, ii: number) => <AccordionCard key={ii} index={ii} el={el} />)}
                  </div>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const AccordionCard = ({
  isMain = false,
  readOnly = true,
  index,
  el,
}: {
  isMain?: boolean;
  readOnly?: boolean;
  index: number;
  el: {
    Question: string;
    Response: {
      type: 'file' | 'text';
      value: string;
    };
  };
}) => (
  <div className="flex flex-col gap-2">
    <h3 className={` ${isMain ? 'font-bold capitalize' : 'font-normal'}`}>
      [{isMain ? index + 1 : alphabet[index]}] {el?.Question}
    </h3>

    <div className="flex gap-2">
      <textarea
        name={el?.Question}
        disabled={readOnly}
        defaultValue={el?.Response?.value}
        className={`${el?.Response?.type === 'file' && 'opacity-50'} w-full p-2 resize-none ${readOnly ? 'bg-base-200 cursor-not-allowed' : 'bg-base-100'} flex items-center h-[4em]`}
      />

      <div className="relative flex items-center justify-center gap-1 px-4 overflow-hidden border rounded bg-base-100 ">
        {/* <i className="ri-upload-2-line" /> */}
        {!readOnly && <input type="file" accept=".pdf" />}
        {readOnly && el?.Response?.type === 'file' && <button>View</button>}
      </div>
    </div>
  </div>
);
