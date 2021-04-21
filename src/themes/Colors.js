const ThemeBasedColors = (theme = "light") => {
  /**
   * Light theme colors
   */
  if (theme === "light") {
    return {
      backgroundColor: "#fafbfd", // grey
      primary: "#436eee", // blue
      accent: "#8d3276", // purple
      textDark: "#171717", // black
      textLight: "#898989", // dark grey
      borderColor: "#171717", // black
      danger: "#ce1212", // danger
    };
  } else {
    /**
     * Dark theme colors
     */
    return {
      backgroundColor: "#222222", // grey
      primary: "#436eee", // blue
      accent: "#8d3276", // purple
      textDark: "#ffffff", // white
      textLight: "#898989", // dark grey
      borderColor: "#ffffff", // white
      danger: "#ce1212", // danger
    };
  }
};

export default ThemeBasedColors;
