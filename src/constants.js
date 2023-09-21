import color1 from "./assets/color-covers/1.png";
import color2 from "./assets/color-covers/2.png";
import color3 from "./assets/color-covers/3.png";
import color4 from "./assets/color-covers/4.png";
import color5 from "./assets/color-covers/5.png";
import color6 from "./assets/color-covers/6.png";
import color7 from "./assets/color-covers/7.png";
import color8 from "./assets/color-covers/8.png";

export const modelColors = {
  initModelColor: "#b3b3b3",
};

export const paletteColors = [
  { id: "0", color: "#521915", text: "Deep Burgundy", cover: color1 },
  { id: "1", color: "#b87c8f", text: "Blush Pink", cover: color2 },
  { id: "2", color: "#ff73bb", text: "Rose Quartz", cover: color3 },
  { id: "3", color: "#544352", text: "Plum Purple", cover: color4 },
  { id: "4", color: "#8f9987", text: "Moss Green", cover: color5 },
  { id: "5", color: "#85472", text: "Olive Brown", cover: color6 },
  { id: "6", color: "#ff7323", text: "Tangerine Orange", cover: color7 },
  { id: "7", color: "#ec276b", text: "Raspberry Red", cover: color8 },
];

export const paletteColorsByIdDictionary = paletteColors.reduce(
  (acc, colorEntry) => ({ ...acc, [colorEntry.id]: colorEntry.color }),
  {}
);
