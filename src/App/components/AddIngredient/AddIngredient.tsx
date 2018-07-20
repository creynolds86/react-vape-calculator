import * as React from 'react';

type WrapperState = { children: number };
type WrapperProps = {
  onChange: (state: State) => void;
};

class AddIngredient extends React.Component<WrapperProps, WrapperState> {
  state: WrapperState = {
    children: 0,
  };

  addIngredient = () => this.setState(({ children }: WrapperState) => (
    {
      children: children + 1,
    }
  ))

  render() {
    const children = [];

    for (let i = 0; i <= this.state.children; i++) {
      children.push(<IngredientField key={i} name={`Ingredient ${i + 1}`} onChange={this.props.onChange} />);
    }

    return (
      <React.Fragment>
        <div>{children}</div>
        <button onClick={this.addIngredient}>Add ingredient</button>
      </React.Fragment>
    );
  }
}

type Props = {
  name: string;
  onChange: (ingredient: Ingredient) => void;
};

type Ingredient = {
  name: string;
  amount: number;
};

type State = Ingredient & {
  completed: boolean;
};

class IngredientField extends React.Component<Props, State> {
  state = {
    name: '',
    amount: 0,
    completed: false,
  };

  onIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: elName, value } = e.currentTarget;

    this.setState(
      ({ name, amount }: State) => elName === 'ingredientName'
        ? { name: value, amount, completed: false }
        : { name, amount: Number(value), completed: true }
      ,
      () => {
        const { name, amount } = this.state;

        if (this.state.completed) {
          this.props.onChange({
            name,
            amount,
          });
        }
      });
  }

  render() {
    const { onIngredientChange, state } = this;

    return (
      <div>
        <label htmlFor={name}>Name</label>
        <input type="text" id={name} name="ingredientName" onChange={onIngredientChange} />
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" name="ingredientAmount" value={state.amount} onChange={onIngredientChange} />
      </div>
    );
  }
}

export default AddIngredient;
