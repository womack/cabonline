import React, { useContext } from "react";

import { Toggle } from "react-toggle-component";

import ThemeContext from "../context/ThemeContext";

import "./css/Toggle.css";


const ToggleThemeButton = () => {
    const themeContext = useContext(ThemeContext);
    return (
        <div className="toggle">
            <label htmlFor="toggleButton" style={{ color: themeContext.theme.secondary }}>
                <Toggle
                    leftBackgroundColor="#252736"
                    rightBackgroundColor="grey"
                    borderColor="black"
                    knobColor="white"
                    name="toggleButton"
                    onToggle={themeContext.toggleTheme}
                />
                Toggle Theme
          </label>
        </div>

    );
};

export default ToggleThemeButton;
