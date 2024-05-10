import { CSSInterpolation } from '@emotion/serialize';
import { THEME_VARIANT } from '../theme-variant.css';

export const BASE = (theme: keyof typeof THEME_VARIANT): CSSInterpolation => {
  return {
    borderRadius: '2.25rem',
    display: 'flex',
    justifyContent: 'center',
    ...THEME_VARIANT[theme],
  };
};

export const INNER = (theme: keyof typeof THEME_VARIANT): CSSInterpolation => {
  return {
    width: '100%',
    padding: '0 1rem 0 1rem',
    ...THEME_VARIANT[theme],
  };
};
