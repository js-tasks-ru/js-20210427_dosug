export default class ColumnChart {
  constructor({
    data = [],
    link = '',
    label = '',
    value = 0,
    formatHeading = null
  } = {}) {
    this.data = data;
    this.link = link;
    this.label = label;
    this.value = value;
    this.formatHeading = formatHeading;

    this.chartHeight = 50;
    this.maxValue = data.length ? Math.max(...data) : this.chartHeight;
    this.scale = this.chartHeight / this.maxValue;

    this.render();
  }

  getLink() {
    if (!this.link) return '';

    return `
      <a class="column-chart__link" href="${this.link}">View all</a>
    `;
  }

  getHeader() {
    return this.formatHeading ? 
      this.formatHeading(this.value) : 
      this.value || '';
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="column-chart ${!this.data.length && 'column-chart_loading'}">
        <div class="column-chart__title">${this.label ? 'Total ' + this.label : ''}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${this.getHeader()}</div>
          <div data-element="body" class="column-chart__chart">
            ${this.getCharts()}
          </div>
        </div>
      </div>
    `;

    this.element = element.firstElementChild;
  }
  
  update(data) {
    const body = this.element.querySelector('.column-chart__chart');
    data.forEach(item => {this.data.unshift(item)});
    
    this.maxValue = this.data.length ? Math.max(...this.data) : this.chartHeight;
    this.scale = this.chartHeight / this.maxValue;

    body.innerHTML = `
      ${this.getCharts()}
    `;
  }

  getCharts() {
    let charts = '';

    this.data.forEach(value => {
      charts += `
      <div style="--value: ${String(Math.floor(this.scale * value))}" 
            data-tooltip="${(value / this.maxValue * 100).toFixed(0) + '%'}"></div>
      `
    });

    return charts;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
