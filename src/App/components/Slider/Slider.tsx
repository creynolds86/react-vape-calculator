import * as React from 'react';

import './Slider.scss';

type IProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export enum ESlider {
  PG,
  VG
}

const Slider: React.SFC<IProps> = ({ value, onChange }) => {
  return (
    <input
      type="range"
      min="0"
      max="100"
      step="5"
      value={value}
      className="slider"
      onChange={onChange}
    />
  );
};

export default Slider;