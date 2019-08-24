import React from "react";

const themes = {
    dark: "radial-gradient(circle at 0% 0%, #373b52, #252736 51%, #1d1e26)",
    light: "radial-gradient(circle at 0% 0%, #473b52, #552736 51%, #1d1e26)"
};

const ThemeContext = React.createContext({
    toggleTheme: () => { }
});

export {
    ThemeContext,
    themes
};

export default ThemeContext;