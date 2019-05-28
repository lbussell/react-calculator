import React from 'react';

class CalculatorDisplay extends React.Component {
  render() {

    const { value, prevValue, op, forceDecimal, numZeroes } = this.props;
    var primaryDisplay;

    if (forceDecimal) {
      var zeroes = "";
      for (var i = 0; i < numZeroes; i++) {
        zeroes = zeroes.concat("0");
      }
      primaryDisplay = value + "." + zeroes;
    } else {
      primaryDisplay = String(value);
    }

    return (
      <div className="display-panel">
        <div className="secondary-display">
          {prevValue}{op}
        </div>
        <div className="primary-display">
          {primaryDisplay}
        </div>
      </div>
    );
  }
}

export default CalculatorDisplay;