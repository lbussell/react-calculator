import React from 'react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButton from './CalculatorButton';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: 0,
      prevValue: null,
      currentOperation: null,
      hasDecimal: false,
      forceDecimal: false,
      decimalPlaces: 0
    };
  }

  render() {
    const { displayValue, prevValue, currentOperation, forceDecimal, decimalPlaces } = this.state;
    return (
      <div className="calculator">
        <CalculatorDisplay
          value={displayValue}
          prevValue={prevValue}
          op={currentOperation}
          forceDecimal={forceDecimal}
          numZeroes={decimalPlaces}
        />
        <div className="button-panel">
          <CalculatorButton className="key fn-key" text="AC" onClick={() => this.clear()} />
          <CalculatorButton className="key fn-key" text="±" onClick={() => this.switchSign()} />
          <CalculatorButton className="key fn-key" text="%" onClick={() => this.switchToPercent()} />
          <CalculatorButton className="key op-key" text="÷" onClick={() => this.inputOperation('÷')} />
          <br />
          <CalculatorButton className="key nm-key" text="7" onClick={() => this.inputDigit(7)} />
          <CalculatorButton className="key nm-key" text="8" onClick={() => this.inputDigit(8)} />
          <CalculatorButton className="key nm-key" text="9" onClick={() => this.inputDigit(9)} />
          <CalculatorButton className="key op-key" text="✕" onClick={() => this.inputOperation('✕')} />
          <br />
          <CalculatorButton className="key nm-key" text="4" onClick={() => this.inputDigit(4)} />
          <CalculatorButton className="key nm-key" text="5" onClick={() => this.inputDigit(5)} />
          <CalculatorButton className="key nm-key" text="6" onClick={() => this.inputDigit(6)} />
          <CalculatorButton className="key op-key" text="-" onClick={() => this.inputOperation('-')} />
          <br />
          <CalculatorButton className="key nm-key" text="1" onClick={() => this.inputDigit(1)} />
          <CalculatorButton className="key nm-key" text="2" onClick={() => this.inputDigit(2)} />
          <CalculatorButton className="key nm-key" text="3" onClick={() => this.inputDigit(3)} />
          <CalculatorButton className="key op-key" text="+" onClick={() => this.inputOperation('+')} />
          <br />
          <CalculatorButton className="key nm-key zero-key" text="0" onClick={() => this.inputDigit(0)} />
          <CalculatorButton className="key nm-key" text="." onClick={() => this.inputDecimal()} />
          <CalculatorButton className="key op-key" text="=" onClick={() => this.calculate()} />
        </div>
      </div>
    );
  }

  inputDigit(digit) {
    const { displayValue, decimalPlaces, hasDecimal } = this.state;
    var nextValue;
    if (hasDecimal) {
      if (digit === 0) {
        this.setState({
          forceDecimal: true,
          decimalPlaces: decimalPlaces + 1
        });
      } else {
        if (displayValue >= 0) {
          nextValue = displayValue + (digit / (Math.pow(10, decimalPlaces + 1)));
        } else {
          nextValue = displayValue - (digit / (Math.pow(10, decimalPlaces + 1)));
        }
        this.setState({
          displayValue: nextValue,
          forceDecimal: false,
          decimalPlaces: decimalPlaces + 1
        });
      }
    } else {
      nextValue = this.state.displayValue;
      nextValue = nextValue * 10 + digit;
      this.setState({
        displayValue: nextValue
      });
    }
  }

  inputOperation(op) {
    const { displayValue, prevValue, currentOperation } = this.state;
    var newPrev = currentOperation
      ? Operations[currentOperation](prevValue, displayValue)
      : displayValue;
    this.setState({
      displayValue: 0,
      prevValue: newPrev,
      currentOperation: op,
      forceDecimal: false,
      hasDecimal: false,
      decimalPlaces: 0,
    });
  }

  inputDecimal() {
    this.setState({
      forceDecimal: true,
      hasDecimal: true
    });
  }

  switchSign() {
    this.setState({
      displayValue: -this.state.displayValue
    });
  }

  switchToPercent() {
    this.setState({
      displayValue: this.state.displayValue / 100
    });
  }

  calculate() {
    const { displayValue, prevValue, currentOperation } = this.state;
    if (!currentOperation) return;
    const newValue = Operations[currentOperation](prevValue, displayValue);
    this.setState({
      displayValue: newValue,
      prevValue: null,
      currentOperation: null,
      forceDecimal: false,
      hasDecimal: false,
      decimalPlaces: 0,
    });
  }

  clear() {
    this.setState({
      displayValue: 0,
      currentOperation: null,
      prevValue: null,
      forceDecimal: false,
      hasDecimal: false,
      decimalPlaces: 0,
    });
  }
}

const Operations = {
  '✕': (v1, v2) => v1 * v2,
  '÷': (v1, v2) => v1 / v2,
  '+': (v1, v2) => v1 + v2,
  '-': (v1, v2) => v1 - v2,
}

export default Calculator;
