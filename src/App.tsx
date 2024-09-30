import { useState } from "react";
import "./App.css";

function App() {
  const [solution, setSolution] = useState("");
  const [input, setInput] = useState("");
  const et = input.trim();

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setSolution("");
      setInput("0");
    } else if (isOperator(symbol)) {
      setInput(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (input.charAt(0) !== "0") {
        setInput(input + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = input.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);

      if (lastNumber?.includes(".")) return;
      setInput(input + symbol);
    } else {
      if (input.charAt(0) === "0") {
        setInput(input.slice(1) + symbol);
      } else {
        setInput(input + symbol);
      }
    }
  };

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;

    const parts = et.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let k = i - 1;
        let j = 0;

        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newinput = newParts.join(" ");
    if (isOperator(newinput.charAt(0))) {
      setSolution(eval(solution + newinput) as string);
    } else {
      setSolution(eval(newinput) as string);
    }
    setInput("");
  };

  return (
    <>
      <div id="calculator">
        <div id="display" style={{ textAlign: "right" }}>
          <div id="solution">{solution}</div>
          <div id="input">{input}</div>
        </div>
        <div id="keys">
          <button
            id="clear"
            onClick={() => buttonPress("clear")}
            className="yellow"
          >
            C
          </button>

          <button id="eight" onClick={() => buttonPress("8")}>
            8
          </button>

          <button id="nine" onClick={() => buttonPress("9")}>
            9
          </button>

          <button
            id="divide"
            onClick={() => buttonPress("/")}
            className="yellow"
          >
            /
          </button>

          <button id="five" onClick={() => buttonPress("5")}>
            5
          </button>

          <button id="six" onClick={() => buttonPress("6")}>
            6
          </button>

          <button id="seven" onClick={() => buttonPress("7")}>
            7
          </button>

          <button
            id="multiply"
            onClick={() => buttonPress("*")}
            className="yellow"
          >
            *
          </button>
          <button id="two" onClick={() => buttonPress("2")}>
            2
          </button>
          <button id="three" onClick={() => buttonPress("3")}>
            3
          </button>
          <button id="four" onClick={() => buttonPress("4")}>
            4
          </button>

          <button
            id="subtract"
            onClick={() => buttonPress("-")}
            className="yellow"
          >
            -
          </button>
          <button id="zero" onClick={() => buttonPress("0")}>
            0
          </button>
          <button id="one" onClick={() => buttonPress("1")}>
            1
          </button>

          <button
            id="decimal"
            onClick={() => buttonPress(".")}
            className="yellow"
          >
            .
          </button>

          <button id="add" onClick={() => buttonPress("+")} className="yellow">
            +
          </button>

          <button
            id="equals"
            onClick={() => buttonPress("=")}
            className="yellow"
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
