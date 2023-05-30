import { RootState } from '@redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

type Props = {
  size?: number;
  trackWidth?: number;
  trackColor?: string;
  indicatorWidth?: number;
  indicatorColor?: string;
  indicatorCap?: 'round' | 'inherit' | 'butt' | 'square' | undefined;
  spinnerMode?: false;
  spinnerSpeed?: number;
  defaultStepsLength?: number;
};

const CircularProgress = (props: Props) => {
  const {
    size = 250,
    trackWidth = 10,
    defaultStepsLength = 0,
    trackColor = '#F7F7F8',
    indicatorWidth = 10,
    indicatorColor = '#5D23BB',
    indicatorCap = 'square',
    spinnerMode = false,
    spinnerSpeed = 1,
  } = props;

  const highestStep = useSelector((state: RootState) => state.proposal.highestStep);
  const progressPercent = (
    ((highestStep - 1 < 0 ? 0 : highestStep - 1) / defaultStepsLength) *
    100
  ).toFixed();
  const center = size / 2;
  const radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * ((100 - Number(progressPercent) - 1) / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="svg-pi -rotate-90" style={{ width: size, height: size }}>
        <circle
          className="svg-pi-track"
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={trackColor}
          strokeWidth={trackWidth}
        />
        <circle
          className={`svg-pi-indicator ${spinnerMode ? 'svg-pi-indicator--spinner' : ''}`}
          style={{ animationDuration: String(spinnerSpeed * 1000) }}
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={indicatorColor}
          strokeWidth={indicatorWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap={indicatorCap}
        />
      </svg>
      <p className="label-progress absolute top-[40%] text-violet-version-5 text-emph-large-title w-full text-center">
        {`${progressPercent}%`}
      </p>
    </div>
  );
};

export default CircularProgress;
