/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import { useRecoilState } from 'recoil';
import { timerSelector } from '../../../../recoil-states/bid/timer';
import colors from '../../../design/colors';
import { useSocketListener } from '../../../hooks/useSocket';
import { Spacing } from '../../common/Spacing';
import { Text } from '../../common/Text';
import { View } from '../../common/View';
import { TIMEBAR_ANIMATION, TIMEBAR_WRAPPER, TIMER_BASE } from './Timer.css';

export function Timer({ theme = 'light' }: Props) {
  const [time, setTime] = useRecoilState(timerSelector);

  useSocketListener<number>('time', left => {
    setTime(left);
  });

  return (
    <View css={TIMER_BASE(theme)}>
      <Text type="bold" content={`남은 시간 ${time + '초'}`} />
      <Spacing rem="0.5" />
      <View css={TIMEBAR_WRAPPER(theme)}>
        <View css={TIMEBAR_ANIMATION(time)} />
      </View>
    </View>
  );
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme: 'dark' | 'light';
}
