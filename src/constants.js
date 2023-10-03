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
  { id: "0", color: "#864444", text: "Deep Burgundy", cover: color1 },
  { id: "1", color: "#cf98a3", text: "Blush Pink", cover: color2 },
  { id: "2", color: "#ec8ba6", text: "Rose Quartz", cover: color3 },
  { id: "3", color: "#897988", text: "Plum Purple", cover: color4 },
  { id: "4", color: "#94a29e", text: "Moss Green", cover: color5 },
  { id: "5", color: "#a09057", text: "Olive Brown", cover: color6 },
  { id: "6", color: "#ff834b", text: "Tangerine Orange", cover: color7 },
  { id: "7", color: "#e76b7b", text: "Raspberry Red", cover: color8 },
];

export const paletteColorsByIdDictionary = paletteColors.reduce(
  (acc, colorEntry) => ({ ...acc, [colorEntry.id]: colorEntry.color }),
  {}
);
