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
      const calculated = parseAndCalculate(input);
      setResult(String(calculated));
    } catch (error) {
      setResult("Error");
    }
  };

  // Safe calculator without eval
  const parseAndCalculate = (expression) => {
    // Remove spaces
    let expr = expression.replace(/\s/g, '');
    
    // Split by + and - (but keep the operators)
    const terms = [];
    let currentTerm = '';
    let currentOp = '+';
    
    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      if ((char === '+' || char === '-') && i > 0 && expr[i-1] !== '*' && expr[i-1] !== '/') {
        terms.push({ value: currentTerm, op: currentOp });
        currentOp = char;
        currentTerm = '';
      } else {
        currentTerm += char;
      }
    }
    terms.push({ value: currentTerm, op: currentOp });
    
    // Calculate each term (handle * and /)
    const calculatedTerms = terms.map(term => {
      let value = calculateMultDiv(term.value);
      return { value, op: term.op };
    });
    
    // Calculate final result (handle + and -)
    let finalResult = 0;
    calculatedTerms.forEach(term => {
      if (term.op === '+') {
        finalResult += term.value;
      } else if (term.op === '-') {
        finalResult -= term.value;
      }
    });
    
    return finalResult;
  };

  const calculateMultDiv = (expr) => {
    const tokens = [];
    let currentNumber = '';
    
    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      if (char === '*' || char === '/') {
        tokens.push(parseFloat(currentNumber));
        tokens.push(char);
        currentNumber = '';
      } else {
        currentNumber += char;
      }
    }
    tokens.push(parseFloat(currentNumber));
    
    // Process * and / from left to right
    while (tokens.length > 1) {
      let found = false;
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '*') {
          const result = tokens[i - 1] * tokens[i + 1];
          tokens.splice(i - 1, 3, result);
          found = true;
          break;
        } else if (tokens[i] === '/') {
          const result = tokens[i - 1] / tokens[i + 1];
          tokens.splice(i - 1, 3, result);
          found = true;
          break;
        }
      }
      if (!found) break;
    }
    
    return tokens[0];
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