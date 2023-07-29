import React, { ReactNode, KeyboardEvent, FC, ComponentProps, useState } from 'react';

import * as Label from '@radix-ui/react-label';
import clsx from 'clsx';

import s from './TextArea.module.scss';
import { Typography } from '@/shared/ui/typography';

export type TextAreaProps = {
  value?: string;
  label?: string;
  errorMessage?: string;
  cols?: number;
  disabled?: boolean;
  maxlength?: number;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  form?: string | number;
  autofocus?: boolean;
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClearValue?: () => void;
  className?: string;
} & ComponentProps<'textarea'>;

export const TextArea: FC<TextAreaProps> = ({
  disabled,
  value,
  label,
  errorMessage,
  onEnter,
  onKeyDown,
  onClearValue,
  className,
  ...rest
}) => {
  const showError = errorMessage && errorMessage.length > 0;

  const handleKeyDown = (e: any) => {};
  const classNames = {
    root: clsx(s.root, className),
    textarea: clsx(s.textarea, showError && s.error),
    iconButton: clsx(s.iconButton, disabled && s.disabled),
    iconStart: clsx(s.iconStart),
  };
  return (
    <div className={classNames.root}>
      <Label.Root>
        <Typography variant={'body2'} color={'inherit'} className={s.errorLabelText}>
          {label}
        </Typography>
        <div className={s.inputContainer}>
          <textarea
            value={value}
            disabled={disabled}
            className={classNames.textarea}
            onKeyDown={handleKeyDown}
            {...rest}
          />
        </div>
      </Label.Root>
      {showError && (
        <Typography variant={'error'} color={'error'} className={s.errorMessageText}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
//  закомментирован код в typography.module.scss : .error{} ошибка под textarea имеет дефолтный цвет//
