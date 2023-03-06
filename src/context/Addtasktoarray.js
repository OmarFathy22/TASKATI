import { createContext, useReducer } from "react";
const ThemeContexttt = createContext(null);

const initialData = {
  aRR : ["omar"]
};

//,

const reducer = (firstState, action) => {
  switch (action.type) {
    case "newARR":
      return { ...firstState, aRR: action.newValue };
    default:
      return firstState;
  }
};

export function ThemeProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const newARR = (newName) => {
    // @ts-ignore
    dispatch({ type: "newARR", newValue: newName });
  };
  return (
    <ThemeContexttt.Provider value={{ ...firstState, newARR }}>
      {children}
    </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;
