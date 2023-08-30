import { modelColors } from "../constants";
import middleSetCover from "./set-covers/middleSet.png";

export const candleSets = [
  {
    id: 0,
    name: "BIG SET",
    decoratedText: "NEW",
    coverSrc: middleSetCover,
    constructor: "bigConstructor",
    models: [
      {
        type: "thin1",
        color: modelColors.initModelColor,
        position: [-1, -0.2, 0],
        scale: 0.5,
        id: 0,
      },
      {
        type: "thin1",
        color: modelColors.initModelColor,
        position: [0, -0.2, 0],
        scale: 0.5,
        id: 1,
      },
      {
        type: "thin1",
        color: modelColors.initModelColor,
        position: [1, -0.2, 0],
        scale: 0.5,
        id: 2,
      },
    ],
  },
  {
    id: 1,
    name: "MIDDLE SET",
    coverSrc: middleSetCover,
    constructor: "middleConstructor",
    models: [
      {
        type: "thin1",
        color: modelColors.initModelColor,
        position: [-0.5, -0.2, 0],
        scale: 0.5,
        id: 0,
      },
      {
        type: "thin1",
        color: modelColors.initModelColor,
        position: [0.5, -0.2, 0],
        scale: 0.5,
        id: 1,
      },
    ],
  },
  {
    id: 2,
    name: "SMALL SET",
    coverSrc: middleSetCover,
    constructor: "smallConstructor",
    models: [
      {
        type: "thin1",
        color: modelColors.initModelColor,
        position: [0, -0.2, 0],
        scale: 1,
        id: 0,
      },
    ],
  },
];
