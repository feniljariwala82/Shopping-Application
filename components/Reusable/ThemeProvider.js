import React from "react";
import { useTheme } from "../src/themes";

const ThemeProvider = (props) => {
  const theme = useTheme();
  return (
    <Container>
      <Title>Shopping app</Title>
      <Switch
        value={theme.mode === "dark"}
        onValueChange={(value) => theme.setMode(value ? "dark" : "light")}
      />
    </Container>
  );
};

export default ThemeProvider;
