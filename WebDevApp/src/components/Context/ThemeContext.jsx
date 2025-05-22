import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [modoOscuro, setOscuro] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? JSON.parse(saved) : false;
    });

    const toggle = () => {
        setOscuro((prev) => {
            const theme = !prev;
            localStorage.setItem("theme", JSON.stringify(theme));
            return theme;
        })
    };

    useEffect(() => {
        if (modoOscuro) {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
          } else {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
          }
    }, [modoOscuro]);
    
    return(
        <ThemeContext.Provider value={{modoOscuro, toggle}}>
            {children}
        </ThemeContext.Provider>
    );    
};

export {ThemeContext};
export default ThemeProvider;