import { useEffect } from 'react';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function Accordion({
  title,
  defaultChecked = false,
  data,
}: {
  title?: string;
  defaultChecked?: boolean;
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
        className={`${defaultChecked ? 'text-base-100 bg-primary' : 'base-content bg-base-100'} flex justify-between text-base shadow  collapse-title `}
      >
        <div className="flex items-center gap-2 ">
          <i className="mr-2 ri-arrow-right-line" />
          <h3 className="text-lg font-bold">{title}</h3>
        </div>

        <div className="flex items-center gap-2">
          {totalRes} of {totalQues} Completed
        </div>
      </div>

      <div className="collapse-content bg-base-300">
        <div className="">
          {data.map((item: any, i: number) => (
            <div key={i} className="flex flex-col justify-between w-full gap-2 p-3 border-t border-gray-300">
              <AccordionCard key={i} index={i} el={item} isMain />
              <span>
                {item?.SubQuestion?.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {item?.SubQuestion?.map((el, ii: number) => <AccordionCard key={ii} index={ii} el={el} />)}
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
  el: any;
}) => (
  <div className="flex flex-col gap-2">
    <h3 className={` text-base ${isMain ? 'font-bold uppercase' : 'font-normal'}`}>
      {isMain ? index + 1 : alphabet[index]}) {el?.Question}
    </h3>

    <div className="flex gap-2">
      <div
        contentEditable={!readOnly}
        defaultValue={el?.Response}
        className={`w-full p-2 bg-base-100 flex items-center h-[3.3em]`}
      >
        {el?.Response}
      </div>

      <div className="relative flex items-center justify-center gap-1 px-4 overflow-hidden border rounded bg-base-100 ">
        {/* <i className="ri-upload-2-line" /> */}
        <input type="file" accept=".pdf" />
      </div>
    </div>
  </div>
);
