export default class NotificationMessage {
  static element = null;

  elTimer = null;

  constructor(message, { type = '', duration = 1000 } = {}) {
    this.message = message;
    
    this.type = type;
    this.duration = duration;

    this.render();
  }

  get template() {
    return `
      <div class="notification ${this.type}">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">${this.message + ' ' + Math.random()}</div>
        </div>
      </div>
    `
  }

  get onlyElement() {
    return NotificationMessage.element;
  }

  set onlyElement(el) {
    NotificationMessage.element = el;
  }

  render() {
    this.element = document.createElement('div')
    this.element.innerHTML = this.template;

    this.elTimer = this.element.querySelector('.timer');
    this.element = this.element.firstElementChild;

    if (this.onlyElement) {
      this.onlyElement.remove();
    }

    this.onlyElement = this.element;
  }

  show(el) {
    const target = el || document.querySelector('body');

    target.append(this.onlyElement);
    this.startTimer();
  }

  startTimer() {
    let value = 100;
    const interval = setInterval(() => {
      value -= 1000 / this.duration;
      this.elTimer.setAttribute('style', `width: ${value}%`);
    }, 10);
    
    setTimeout(() => {
      this.remove();
      clearInterval(interval);
    }, this.duration);
  }

  remove() {
    if (!this.element) return;
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
    this.onlyElement = null;
  }
}
