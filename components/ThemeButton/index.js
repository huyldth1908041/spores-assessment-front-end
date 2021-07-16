import {useState} from "react";
import styled from "styled-components";
import {useThemeHandler, useThemeState} from "../../state/theme";

const ToggleThemeButton = styled.button`
  background-color: transparent;
  font-size: 2rem;
  outline: none;
  border: none;
  cursor: pointer;
`
export default function ThemeButton() {
    const isDarkMode = useThemeState()
    const {onToggleTheme} = useThemeHandler()
    return (
        <ToggleThemeButton onClick={() => onToggleTheme()}>
            {isDarkMode ?
                (
                    <i className="bx bx-moon"/>
                )
                : (
                    <i className="bx bx-sun"/>
                )}
        </ToggleThemeButton>
    )
}