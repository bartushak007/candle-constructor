import BigShortCandle from "./BigShortCandle";
import BigTallCandle from "./BigTallCandle";
import ThinShortCandle from "./ThinShortCandle";
import ThinTallCandle from "./ThinTallCandle";
import ThinVeryTallCandle from "./ThinVeryTallCandle";

const candles = {
  "big-short-candle": BigShortCandle,
  "big-tall-candle": BigTallCandle,
  "thin-short-candle": ThinShortCandle,
  "thin-tall-candle": ThinTallCandle,
  "thin-very-tall-candle": ThinVeryTallCandle,
};

export default candles;
