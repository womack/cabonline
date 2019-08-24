import React, { useContext } from "react";

import { Toggle } from "react-toggle-component";

import ThemeContext from "../context/ThemeContext";

import "./css/Toggle.css";


const ToggleThemeButton = () => {
    const themeContext = useContext(ThemeContext);
    return (
        <div className="toggle">
            <label htmlFor="toggleButton">
                <Toggle
                    leftBackgroundColor="grey"
                    rightBackgroundColor="red"
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
