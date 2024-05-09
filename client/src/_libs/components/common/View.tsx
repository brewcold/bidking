/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from '@emotion/react';
import React, { ComponentPropsWithoutRef, ElementType } from 'react';

type Props<T extends ElementType> = {
  as?: T;
  css?: Interpolation<Theme>;
} & ComponentPropsWithoutRef<T>;

export function View<T extends ElementType>({ as, css, ...props }: Props<T>) {
  const Component = as || 'div';
  return (
    <Component css={css} {...props}>
      {props.children}
    </Component>
  );
}
