import { CSSInterpolation } from '@emotion/serialize';
import colors from '../../../design/colors';
import { THEME_VARIANT } from '../theme-variant.css';

export const TIMER_BASE = (theme: keyof typeof THEME_VARIANT): CSSInterpolation => {
  return {
    textAlign: 'center',
    ...THEME_VARIANT[theme],
  };
};

export const TIMEBAR_WRAPPER = (theme: keyof typeof THEME_VARIANT): CSSInterpolation => {
  return {
    height: '0.35rem',
    backgroundColor: theme === 'light' ? colors.backgroundLight3 : colors.backgroundDark3,
    borderRadius: '1rem',
    overflow: 'hidden',
  };
};

export const TIMEBAR_ANIMATION = (time: number): CSSInterpolation => {
  return {
    width: '100%', //시간에 따른 동적 바인딩
    transform: `scaleX(${(11 * time - 10) / 100 > 0 ? (11 * time - 10) / 100 : 0})`,
    transformOrigin: 'left',
    height: '0.35rem',
    borderRadius: '1rem',
    backgroundColor: `${time >= 6 ? colors.ok : time > 2 ? colors.confirm : colors.warn}`, //5초 이상은 초록, 2-4초는 노랑, 0-2초는 빨강
    transition: 'transform 1s linear',
  };
};
