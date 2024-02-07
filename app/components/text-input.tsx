import { ComponentPropsWithoutRef } from 'react';

interface TextInputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
}

export default function TextInput({ label, className, ...props }: TextInputProps) {
  return (
    <div className="w-full form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input {...props} className={`${className} w-full input-md input  bg-base-200 input-bordered`} />
    </div>
  );
}
