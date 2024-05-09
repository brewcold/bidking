import { CSSInterpolation } from '@emotion/serialize';
import { PropsWithChildren } from 'react';
import colors from '../../design/colors';
import { Txt } from './Txt';
import { View } from './View';

type Props = {
  show: boolean;
  type?: 'success' | 'error';
  duration?: number;
} & PropsWithChildren;

export function Alert({ children, show, type = 'error' }: Props) {
  // useEffect(() => {
  //   //useDisplayAnimation을 통한 refactoring
  //   const timer = setTimeout(() => {
  //     setAlert(Alert);
  //     setIsOpen(true);
  //   }, duration);

  //   return () => clearTimeout(timer);
  // }, [duration]);

  return (
    <View css={BASE(type)}>
      <View css={FLEX}>
        <Txt as="h2">{children}</Txt>
      </View>
    </View>
  );
}

const FLEX = { display: 'flex', justifyContent: 'center', alignItems: 'center' };

const STYLES = (key: 'success' | 'error'): CSSInterpolation => {
  const CSS = {
    success: { border: '1px solid ' + colors.ok },
    error: { border: '1px solid ' + colors.warn },
  };
  return CSS[key];
};

const ANIMATION = (show: boolean): CSSInterpolation => {
  return {
    show: show
      ? {
          transform: 'translateY(2rem)',
          opacity: '1',
        }
      : {
          transform: 'translateY(-100%)',
        },
  };
};

const BASE = (type: 'success' | 'error'): CSSInterpolation => {
  const STYLE = STYLES(type);
  const SHOW = ANIMATION(true);
  return {
    fontSize: '1rem',
    position: 'fixed',
    left: '0',
    right: 0,
    margin: '0 auto',
    backgroundColor: colors.backgroundLight2,
    color: colors.black,
    opacity: 0,
    borderRadius: '100%',
    padding: '1rem 2rem 1rem 2rem',
    transition: 'transform 0.25s',
    STYLE,
    SHOW,
  };
};
