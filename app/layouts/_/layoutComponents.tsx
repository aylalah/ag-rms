import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@remix-run/react';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const splitCamelCase = (str: string) => {
  if (!str) return str;
  return str
    .split(/(?=[A-Z])/)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

export const Title = ({ title }: any) => <p className="text-[2.3rem] font-bold capitalize">{title}</p>;

export const ControlJsonTextArea = ({ el, value, isRequired }: any) => {
  const JsonRef = useRef<HTMLTextAreaElement>(null);
  const [jsonValue, setJsonValue] = useState<any>(value);

  useEffect(() => {
    if (JsonRef?.current) {
      try {
        JSON.stringify(JSON.parse(JsonRef?.current?.value));
        JsonRef.current.setCustomValidity('');
      } catch (e) {
        JsonRef.current.setCustomValidity('Invalid JSON');
      }
    }
  }, [jsonValue]);

  return (
    <textarea
      ref={JsonRef}
      required={isRequired}
      name={el}
      defaultValue={value}
      className="w-full text-[15px] p-4 border shadow outline-none resize-none bg-surface border-line"
      rows={12}
      placeholder={splitCamelCase(el)}
      onChange={(e) => setJsonValue(e.target.value)}
    ></textarea>
  );
};

export const ControlTextArea = ({ ...props }: React.HTMLProps<HTMLTextAreaElement>) => {
  ``;
  return (
    <textarea
      {...props}
      name={props?.placeholder}
      className="w-full text-[15px] p-4 border shadow outline-none resize-none bg-surface border-line"
      rows={12}
      placeholder={splitCamelCase(`${props?.placeholder}`)}
    />
  );
};

export const ControlInput = ({ ...props }: React.HTMLProps<HTMLInputElement>) => {
  return (
    <input
      {...props}
      name={props?.placeholder}
      readOnly={props?.placeholder === 'createdBy'}
      placeholder={splitCamelCase(`${props?.placeholder}`)}
      className={`w-full p-4 border  shadow outline-none resize-none border-line text-[15px] ${
        props?.placeholder === 'createdBy' ? 'bg-gray-300 dark:bg-gray-700 dark:opacity-50' : 'bg-surface'
      }`}
    ></input>
  );
};

export const ControlBoolean = ({ ...props }: React.HTMLProps<HTMLSelectElement>) => {
  return (
    <div className="px-3 border shadow bg-surface border-line">
      <select
        {...props}
        name={props?.placeholder}
        className="w-full py-3 text-[15px] outline-none cursor-pointer resize-none bg-surface "
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </div>
  );
};

interface ControlObjectProps extends React.HTMLProps<HTMLSelectElement> {
  data: { id: string; name: string }[] | any;
}

export const ControlObject = ({ data, ...props }: ControlObjectProps) => {
  return (
    <div className="px-3 border shadow bg-surface border-line">
      <select
        {...props}
        name={props?.placeholder}
        className="w-full py-3 text-[15px] outline-none cursor-pointer resize-none bg-surface capitalize "
      >
        <option value="">Select {props?.placeholder}</option>
        {data &&
          data?.map((el: any, i: number) => (
            <option key={i} value={el.id} className="capitalize">
              {el.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export const ControlCheckboxes = ({ el, value }: any) => {
  return (
    <div className="grid flex-col grid-cols-3 gap-3">
      {value?.list?.map((ell: any, i: number) => (
        <div key={i} className="flex items-center gap-2 p-3 shadow bg-surface">
          <input
            value={ell?.id}
            name={el}
            id={ell?.id}
            type="checkDiv"
            className="w-4 h-4 text-[15px] border shadow outline-none resize-none bg-surface border-line"
            defaultChecked={value?.active?.find((x: any) => x.id === ell.id)}
          />
          <label htmlFor={ell?.id} className="flex-1 text-sm font-medium capitalize cursor-pointer ">
            {ell.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export const ControlInputSelect = ({
  data,
  ...props
}: React.HTMLProps<HTMLInputElement> & { data: { id: string; name: string }[] | any }) => {
  const navigation = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [value, setValue] = useState<any>(data?.find((el: any) => el.id === props?.defaultValue)?.name);
  const [id, setId] = useState<any>(props?.defaultValue);
  const [list, setList] = useState<any>(data);

  const setData = (input: { id: string; value: string }) => {
    setValue(input.value);
    setId(input.id);
  };

  const searchItem = (value: string) => {
    if (!value) return navigation(`?`);
    navigation(`?${props?.name}=${value}`);
  };

  const filterData = (e: any) => {
    const value = e.target.value;
    searchItem(value);
    const filter = data?.filter((el: any) => el.name.toLowerCase().includes(value.toLowerCase()));
    setList(filter);
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (inputRef?.current && !inputRef.current.contains(e.target)) {
        inputRef.current?.blur();
        //check if the input value is on the list

        const check = list?.find((el: any) => el.name === inputRef.current?.value);
        if (!check) {
          inputRef.current.value = '';
          setValue('');
          setId('');
          navigation(`?`);
        }
        setIsFocus(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [list]);

  return (
    <div className="box-border relative border shadow bg-surface border-line">
      <div className="flex items-center">
        <input
          ref={inputRef}
          onFocus={() => setIsFocus(true)}
          onChange={(e) => filterData(e)}
          defaultValue={value}
          type="text"
          placeholder={splitCamelCase(`${props?.placeholder}`)}
          className={`w-full p-4 outline-none resize-none text-[15px] ${
            props?.placeholder === 'createdBy' ? 'bg-gray-300 dark:bg-gray-700 dark:opacity-50' : 'bg-surface'
          }`}
        />

        <i
          aria-hidden
          onClick={() => inputRef.current?.focus()}
          className="flex items-center justify-center w-10 h-10 text-xl cursor-pointer text-text ri-arrow-down-s-fill"
        ></i>

        <input {...props} type="hidden" name={props?.placeholder} defaultValue={id} onChange={() => {}} />
      </div>

      <ul
        className={`${
          isFocus ? ' block opacity-100 ' : 'hidden opacity-0'
        } absolute w-full border max-h-[13em] overflow-auto shadow bg-surface transition-all border-line z-10 left-[50%] -translate-x-[50%]`}
      >
        {list?.map((el: any, i: number) => (
          <li
            aria-hidden
            key={i}
            onClick={() => setData({ id: el?.id, value: el?.name })}
            className="p-3 text-sm capitalize transition-all cursor-pointer hover:bg-line"
          >
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
