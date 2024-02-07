import { ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {}

export default function Button({ ...props }: ButtonProps) {
  const { className, children, ...restProps } = props;
  return (
    <button className={`${className} btn`} {...restProps}>
      {children}
    </button>
  );
}
