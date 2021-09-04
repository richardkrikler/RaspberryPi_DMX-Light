"use strict";

class ColorObj {
  constructor(red, green, blue, alpha) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;

    this.setFromDmxObj = function (dmxColorObj) {
      this.red = dmxColorObj[1];
      this.green = dmxColorObj[2];
      this.blue = dmxColorObj[3];
      this.alpha = dmxColorObj[0] / 255;
    }

    this.getDmxObj = function () {
      return {
        red: this.red,
        green: this.green,
        blue: this.blue,
        alpha: this.alpha * 255,
      }
    }

    this.setFromColorWheel = function (colorWheelObj) {
      this.red = Math.round(colorWheelObj.r * 255);
      this.green = Math.round(colorWheelObj.g * 255);
      this.blue = Math.round(colorWheelObj.b * 255);
      this.alpha = (colorWheelObj.a).toPrecision(2);
    }

    this.setFromRgbaString = function (rgbaString) {
      rgbaString = rgbaString.split(",");
      this.red = rgbaString[0];
      this.green = rgbaString[1];
      this.blue = rgbaString[2];
      this.alpha = rgbaString[3];
    }

    this.getRgbaString = function () {
      return this.red + "," + this.green + "," + this.blue + "," + this.alpha;
    }
  }
}