import ReactDOM from "react-dom";
import ScaleText from "react-scale-text";
import {useState} from "react";

function App() {
  const operators = [["÷", "/"], ["×", "*"], "-", "+", "="];
  const [number, setNumber] = useState(0);
  const [lastNumber, setLastNumber] = useState(0);
  const [operation, setOperation] = useState("");

  function inputNumber(number) {
    setNumber((prev) => (prev * 10) + number);
  }

  function clearNumber() {
    setNumber(0);
  }

  function inputOperator(operator) {
    const newOperator = operator[1] || operator;

    setOperation(newOperator);

    if (newOperator !== "=") {
      const calcResult = calculate(lastNumber !== 0);

      setLastNumber(calcResult);
      setNumber(0);
      return;
    }

    const calcResult = calculate(operation);

    setOperation("");
    setLastNumber(0);
    setNumber(calcResult);
  }

  function calculate(condition) {
    return condition ? eval(lastNumber + operation + number) : number;
  }

  return (
    <div className="main">
      <div className="display">
        <ScaleText maxFontSize={104} minFontSize={1}>
          <div className="text">{number}</div>
        </ScaleText>
      </div>
      <div className="keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button onClick={clearNumber}>AC</button>
          </div>
          <div className="digit-keys">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <button key={index} onClick={() => inputNumber(index)}>{index}</button>
              ))}
          </div>
        </div>
        <div className="operator-keys">
          {operators.map((operator, index) => (
            <button key={index} onClick={() => inputOperator(operator)}>{operator[0] || operator}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App/>, document.querySelector(".root"));
