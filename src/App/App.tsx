import * as React from 'react';

import Slider, { ESlider } from './components/Slider/Slider';
import AddIngredient from './components/AddIngredient/AddIngredient';

import './App.scss';

type Ingredient = {
  name: string;
  amount: number;
};

type State = {
  produceAmount: number;
  pg: number;
  vg: number;
  ingredients: Array<Ingredient>;
};

class App extends React.Component<{}, State> {
  state = {
    produceAmount: 10,
    pg: 50,
    vg: 50,
    ingredients: [],
  };

  calculateAmounts = () => {
    const { produceAmount, pg, vg } = this.state;

    return {
      pg: Number((pg / 100 * produceAmount).toFixed(2)),
      vg: Number((vg / 100 * produceAmount).toFixed(2)),
    };
  }

  setProduceAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      produceAmount: Number(e.currentTarget.value),
    });
  }

  setSliderValue = (type: ESlider) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = Number(e.currentTarget.value);
    const oppositeValue = 100 - eventValue;

    const state = type === ESlider.PG ? {
      pg: eventValue,
      vg: oppositeValue,
    } : {
        pg: oppositeValue,
        vg: eventValue,
      };

    this.setState(state);
  }

  addIngredient = (currentIngredient: Ingredient) => {
    this.setState((state: State) => {
      const { ingredients } = state;
      const duplicateIndex = ingredients.findIndex(({ name }: Ingredient) => name === currentIngredient.name);

      return duplicateIndex >= 0 ? {
        ...state,
        ingredients: [
          ...ingredients.slice(0, duplicateIndex),
          currentIngredient,
          ...ingredients.slice(duplicateIndex + 1),
        ],
      } : {
        ...state,
        ingredients: [
          ...ingredients,
          currentIngredient,
        ],
      };
    });
  }

  render() {
    const { calculateAmounts, state, setProduceAmount, setSliderValue, addIngredient } = this;
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
        <div>
          {state.ingredients.map(({ name, amount }: Ingredient, i: number) => (
            <p key={i}>{name}: {amount}</p>
          ))}
          <AddIngredient onChange={addIngredient} />
        </div>
        <p>PG: {calculatedPg}ml</p>
        <p>VG: {calculatedVg}ml</p>
      </div>
    );
  }
}

export default App;
