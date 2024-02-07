import { ComponentPropsWithoutRef } from 'react';

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  data: { id: string | number; name: string | number | boolean }[];
}

export default function Select({ ...props }: SelectProps) {
  const { className, data, ...restProps } = props;
  return (
    <select className={`${className} w-full max-w-xs select`} {...restProps}>
      <option value="">Select a country</option>
      {data.map((data) => (
        <option key={`${data?.id}`} value={data?.id}>
          {data?.name}
        </option>
      ))}
    </select>
  );
}
