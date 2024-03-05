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
  return (
    <div className="mb-3 collapse collapse-arrow">
      <input type="radio" name="my-accordion-2" defaultChecked={defaultChecked} />
      <div className="text-base font-bold shadow text-content collapse-title bg-base-100">
        <i className="mr-2 ri-arrow-right-line" />
        {title}
      </div>

      <div className="collapse-content bg-base-300">
        <div className="">
          {data.map((item: any, i: number) => (
            <div key={i} className="flex flex-col justify-between w-full gap-2 p-3 border-t border-gray-300">
              <h3 className="font-bold">
                {i + 1}) {item.Question}
              </h3>

              <span>
                {item?.SubQuestion?.length < 1 && (
                  <textarea className="w-full p-2" defaultValue={item.SubQuestions} readOnly />
                )}
                {item?.SubQuestion?.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {item?.SubQuestion?.map((el, ii: number) => (
                      <div className="flex flex-col gap-2">
                        <h3 className="font-normal">
                          {alphabet[ii]}) {el}
                        </h3>
                        <textarea className="w-full p-2" readOnly />
                      </div>
                    ))}
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
