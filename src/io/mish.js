'use strict';

export const mish = {

  _stisnut: false,

  init: () => {
    document.onmousemove = e => {
      mish.x = e.pageX;
      mish.y = e.pageY;
    }
    document.onmousedown = () => mish.stisnut = true;
    document.onmouseup = () => mish.stisnut = false;
  }(),

  get stisnut() {
    return mish._stisnut;
  },

  set stisnut(bool) {
    mish._stisnut = bool;
  },

  get x() {
    return mish._x;
  },

  set x(x) {
    mish._x = x;
  },

  get y() {
    return mish._y;
  },

  set y(y) {
    mish._y = y;
  }

}
