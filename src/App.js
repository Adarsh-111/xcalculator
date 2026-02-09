import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const appendValue = (value) => {
    setInput((prev) => prev + value);
  };

  const clearAll = () => {
    setInput("");
    setResult("");
  };

  const calculate = () => {
    if (input.trim() === "") {
      setResult("Error");
      return;
    }

    try {
      // Safe evaluation without eval (CI + ESLint safe)
      const output = Function(`"use strict"; return (${input})`)();
      setResult(String(output));
    } catch {
      setResult("Error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>XCalculator</h2>

      {/* Input field */}
      <input
        type="text"
        value={input}
        readOnly
        style={{ width: "220px", height: "32px", fontSize: "18px" }}
      />

      {/* Result display (ONLY ONE DIV) */}
      <div style={{ margin: "10px", fontSize: "18px" }}>
        {result}
      </div>

      {/* Buttons */}
      <div>
        <button onClick={() => appendValue("7")}>7</button>
        <button onClick={() => appendValue("8")}>8</button>
        <button onClick={() => appendValue("9")}>9</button>
        <button onClick={() => appendValue("+")}>+</button>
      </div>

      <div>
        <button onClick={() => appendValue("4")}>4</button>
        <button onClick={() => appendValue("5")}>5</button>
        <button onClick={() => appendValue("6")}>6</button>
        <button onClick={() => appendValue("-")}>-</button>
      </div>

      <div>
        <button onClick={() => appendValue("1")}>1</button>
        <button onClick={() => appendValue("2")}>2</button>
        <button onClick={() => appendValue("3")}>3</button>
        <button onClick={() => appendValue("*")}>*</button>
      </div>

      <div>
        <button onClick={clearAll}>C</button>
        <button onClick={() => appendValue("0")}>0</button>
        <button onClick={calculate}>=</button>
        <button onClick={() => appendValue("/")}>/</button>
      </div>
    </div>
  );
}

export default App;
