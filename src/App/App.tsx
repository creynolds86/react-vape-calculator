import * as React from 'react';

import Slider, { ESlider } from './components/Slider/Slider';

import './App.scss';

type IState = {
  produceAmount: string;
  pg: string;
  vg: string;
};

class App extends React.Component<{}, IState> {
  state = {
    produceAmount: '10',
    pg: '50',
    vg: '50',
  };

  calculateAmounts = () => {
    const { produceAmount, pg, vg } = this.state;

    return {
      pg: (Number(pg) / 100 * Number(produceAmount)).toFixed(2),
      vg: (Number(vg) / 100 * Number(produceAmount)).toFixed(2),
    };
  }

  setProduceAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      produceAmount: e.currentTarget.value,
    });
  }

  setSliderValue = (type: ESlider) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const oppositeValue = String(100 - Number(e.currentTarget.value));

    const state = type === ESlider.PG ? {
      pg: e.currentTarget.value,
      vg: oppositeValue,
    } : {
      pg: oppositeValue,
      vg: e.currentTarget.value,
    };

    this.setState(state);
  }

  render() {
    const { calculateAmounts, state, setProduceAmount, setSliderValue } = this;
    const { pg: calculatedPg, vg: calculatedVg } = calculateAmounts();

    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to React</h1>
        </header>
        <input type="number" value={state.produceAmount} onChange={setProduceAmount} />
        <p>{state.pg}</p>
        <Slider
          value={state.pg}
          onChange={setSliderValue(ESlider.PG)}
        />
        <p>{state.vg}</p>
        <Slider
          value={state.vg}
          onChange={setSliderValue(ESlider.VG)}
        />
        <p>PG: {calculatedPg}ml</p>
        <p>VG: {calculatedVg}ml</p>
      </div>
    );
  }
}

export default App;
