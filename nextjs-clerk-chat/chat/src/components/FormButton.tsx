"use client";

import { RdsButton } from "rds/atoms";
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type ButtonAttr = ComponentProps<typeof RdsButton>;
type AdditionalProps = { pendingText?: ReactNode };
type ButtonProps = PropsWithChildren<ButtonAttr & AdditionalProps>;

export const FormButton: FC<ButtonProps> = ({
  children,
  pendingText,
  ...props
}) => {
  const { pending } = useFormStatus();

  return (
    <RdsButton
      _variant="secondary"
      type="submit"
      className="w-full"
      disabled={pending || props.disabled}
      aria-disabled={pending || props.disabled}
    >
      {pending ? pendingText : children}
    </RdsButton>
  );
};
