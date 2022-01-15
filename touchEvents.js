class TouchEvents {
  constructor(element, callback) {
    this.element = element;
    this.callback = callback;
    this.element.addEventListener("touchstart", this.handleTouchStart);
    this.element.addEventListener("touchmove", this.handleTouchMove);
    this.element.addEventListener("touchend", this.handleTouchEnd);

    this.xStart = null;
    this.yStart = null;
    this.xEnd = null;
    this.yEnd = null;
  }

  handleTouchEnd = (e) => {
    const xDiff = this.xStart - this.xEnd;
    const yDiff = this.yStart - this.yEnd;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        /* left swipe */
        this.callback("left");
      } else {
        /* right swipe */
        this.callback("right");
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        this.callback("up");
      } else {
        /* down swipe */
        this.callback("down");
      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
    this.xStart = null;
    this.xEnd = null;
  };

  handleTouchStart = (e) => {
    const firstTouch = e.touches[0];
    this.xStart = firstTouch.clientX;
    this.yStart = firstTouch.clientY;
  };

  handleTouchMove = (e) => {
    e.preventDefault(); // prevent scrolling
    if (!this.xStart || !this.yStart) {
      return;
    }
    this.xEnd = e.touches[0].clientX;
    this.yEnd = e.touches[0].clientY;
  };
}
