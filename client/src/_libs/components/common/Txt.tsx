/** @jsxImportSource @emotion/react */
import React, { ComponentPropsWithoutRef, ElementType } from 'react';
import colors from '../../design/colors';

type Props<T extends ElementType> = {
  as?: T;
  variant?: 'normal' | 'bold';
  theme?: 'light' | 'dark';
} & ComponentPropsWithoutRef<T>;

export function Txt<T extends ElementType>({ as, variant = 'normal', theme = 'light', ...props }: Props<T>) {
  const Component = as || 'span';
  return (
    <Component css={{ ...FONT_TYPE[variant], ...THEME_VARIANT[theme] }} {...props}>
      {props.children}
    </Component>
  );
}

const FONT_TYPE = {
  normal: {
    fontWeight: '400',
  },
  bold: {
    fontWeight: '700',
  },
};

const THEME_VARIANT = {
  light: {
    color: colors.black,
  },
  dark: {
    color: colors.white,
  },
};
