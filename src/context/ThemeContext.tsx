import React from "react";

const themes = {
    dark: {
        primary: "radial-gradient(circle at 0% 0%, #373b52, #252736 51%, #1d1e26)",
        secondary:"white"
    },
    light: {
        primary: "radial-gradient(circle at 0% 0%, white, white 51%, #1d1e26)",
        secondary:"black"
    }
};

const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => { },
});

export {
    ThemeContext,
    themes
};

export default ThemeContext;