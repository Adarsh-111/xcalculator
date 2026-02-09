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
      // Manual calculation parser
      const sanitized = input.replace(/\s/g, '');
      const calculated = evaluateExpression(sanitized);
      setResult(String(calculated));
    } catch (error) {
      setResult("Error");
    }
  };

  // Simple expression evaluator
  const evaluateExpression = (expr) => {
    // Handle multiplication and division first
    let result = expr.replace(/(\d+\.?\d*)\s*([*/])\s*(\d+\.?\d*)/g, (match, a, op, b) => {
      return op === '*' ? parseFloat(a) * parseFloat(b) : parseFloat(a) / parseFloat(b);
    });
    
    // Keep evaluating until no more */ operations
    while (/\d+\.?\d*\s*[*/]\s*\d+\.?\d*/.test(result)) {
      result = result.replace(/(\d+\.?\d*)\s*([*/])\s*(\d+\.?\d*)/g, (match, a, op, b) => {
        return op === '*' ? parseFloat(a) * parseFloat(b) : parseFloat(a) / parseFloat(b);
      });
    }
    
    // Handle addition and subtraction
    while (/[+-]/.test(result) && result.match(/\d/)) {
      result = result.replace(/(-?\d+\.?\d*)\s*([+\-])\s*(\d+\.?\d*)/g, (match, a, op, b) => {
        return op === '+' ? parseFloat(a) + parseFloat(b) : parseFloat(a) - parseFloat(b);
      });
    }
    
    return parseFloat(result);
  };

  return (
    <div style={{ 
      textAlign: "center", 
      marginTop: "40px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2>XCalculator</h2>

      {/* Input field */}
      <input
        type="text"
        value={input}
        readOnly
        style={{ 
          width: "220px", 
          height: "32px", 
          fontSize: "18px",
          marginBottom: "10px",
          padding: "5px",
          textAlign: "right"
        }}
      />

      {/* Result display */}
      <div style={{ 
        margin: "10px", 
        fontSize: "18px",
        minHeight: "24px",
        fontWeight: "bold"
      }}>
        {result}
      </div>

      {/* Buttons */}
      <div style={{ marginBottom: "5px" }}>
        <button onClick={() => appendValue("7")} style={buttonStyle}>7</button>
        <button onClick={() => appendValue("8")} style={buttonStyle}>8</button>
        <button onClick={() => appendValue("9")} style={buttonStyle}>9</button>
        <button onClick={() => appendValue("+")} style={buttonStyle}>+</button>
      </div>

      <div style={{ marginBottom: "5px" }}>
        <button onClick={() => appendValue("4")} style={buttonStyle}>4</button>
        <button onClick={() => appendValue("5")} style={buttonStyle}>5</button>
        <button onClick={() => appendValue("6")} style={buttonStyle}>6</button>
        <button onClick={() => appendValue("-")} style={buttonStyle}>-</button>
      </div>

      <div style={{ marginBottom: "5px" }}>
        <button onClick={() => appendValue("1")} style={buttonStyle}>1</button>
        <button onClick={() => appendValue("2")} style={buttonStyle}>2</button>
        <button onClick={() => appendValue("3")} style={buttonStyle}>3</button>
        <button onClick={() => appendValue("*")} style={buttonStyle}>*</button>
      </div>

      <div>
        <button onClick={clearAll} style={buttonStyle}>C</button>
        <button onClick={() => appendValue("0")} style={buttonStyle}>0</button>
        <button onClick={calculate} style={buttonStyle}>=</button>
        <button onClick={() => appendValue("/")} style={buttonStyle}>/</button>
      </div>
    </div>
  );
}

const buttonStyle = {
  width: "50px",
  height: "50px",
  margin: "2px",
  fontSize: "18px",
  cursor: "pointer",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#f0f0f0"
};

export default App;