import { ComponentPropsWithoutRef } from 'react';

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  data: { id: string | number; name: string | number | boolean }[];
  placeholder?: string;
}

export default function Select({ ...props }: SelectProps) {
  const { className, data, placeholder, ...restProps } = props;
  return (
    <select className={`${className} w-full select select-bordered`} {...restProps}>
      <option value="">Select {placeholder}</option>
      {data.map((data) => (
        <option key={`${data?.id}`} value={data?.id}>
          {data?.name}
        </option>
      ))}
    </select>
  );
}
