export const modelColors = {
  initModelColor: "#b3b3b3",
};

export const paletteColors = [
  { id: "0", color: "#fff", text: "WHITE" },
  { id: "1", color: "#ff0000", text: "RED" },
  { id: "2", color: "#00ff00", text: "GREEN" },
  { id: "3", color: "#0000ff", text: "BLUE" },
  { id: "4", color: "#ffff00", text: "YELLOW" },
  { id: "5", color: "#ff00ff", text: "MAGENTA" },
  { id: "6", color: "#00ffff", text: "CYAN" },
  { id: "7", color: "#ffa500", text: "ORANGE" },
  { id: "8", color: "#800080", text: "PURPLE" },
  { id: "9", color: "#ff8c00", text: "D ORANGE" },
  { id: "10", color: "#8a2be2", text: "B VIOLET" },
  { id: "11", color: "#5f9ea0", text: "C BLUE" },
  { id: "12", color: "#ff69b4", text: "H PINK" },
  { id: "13", color: "#008b8b", text: "D CYAN" },
  { id: "14", color: "#8b008b", text: "D MGT" },
  { id: "15", color: "#00fa9a", text: "X GREEN" },
  { id: "16", color: "#f08080", text: "L CORAL" },
  { id: "17", color: "#dda0dd", text: "PLUM" },
  { id: "18", color: "#20b2aa", text: "S GREEN" },
  { id: "19", color: "#000", text: "BLACK" },
];

export const paletteColorsByIdDictionary = paletteColors.reduce(
  (acc, colorEntry) => ({ ...acc, [colorEntry.id]: colorEntry.color }),
  {}
);
