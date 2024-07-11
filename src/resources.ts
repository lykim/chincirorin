import { ImageSource, Loader } from "excalibur";
import sword from "./images/sword.png"; // for parcelv2 this is configured in the .parcelrc
import dices from "./images/dice.png";
import bowl from "./images/bowl.png";
import bowl_black from "./images/bowl_black.png";
import pointerBlue from "./images/pointer_blue.png";
import buttons from "./images/buttons.png";
import background from "./images/BG.png";
import window from "./images/Window.png";

export const Resources = {
  Sword: new ImageSource(sword),
  Dices: new ImageSource(dices),
  Bowl: new ImageSource(bowl),
  BlackBowl: new ImageSource(bowl_black),
  PointerBlue: new ImageSource(pointerBlue),
  Buttons: new ImageSource(buttons),
  Background: new ImageSource(background),
  Window: new ImageSource(window),
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
