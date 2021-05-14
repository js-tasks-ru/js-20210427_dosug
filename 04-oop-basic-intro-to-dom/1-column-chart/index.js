export default class ColumnChart {
  constructor(oData) {
    this.oData = oData;
    this.chartHeight = 50;
    this.maxValue = oData && oData.data ? Math.max(...oData.data) : this.chartHeight;
    this.scale = this.chartHeight / this.maxValue;

    this.render();
  }

  render() {
    const element = document.createElement('div');
    const title = this.oData ? 'Total ' + this.oData.label : '';
    const link = this.oData && this.oData.link ? `<a class="column-chart__link" href="${this.oData.link}">View all</a>` : '';
    const header = this.oData && this.oData.formatHeading ? 
      this.oData.formatHeading(this.oData.value) : 
      this.oData ? 
        this.oData.value :
        '';

    let charts = '';
    
    if (this.oData && this.oData.data) {
      this.oData.data.forEach(value => {
        charts += `
        <div style="--value: ${String(Math.floor(this.scale * value))}" 
          data-tooltip="${(value / this.maxValue * 100).toFixed(0) + '%'}"></div>
        `
      });
    }

    element.innerHTML = `
    <div class="column-chart ${!charts.length && 'column-chart_loading'}">
      <div class="column-chart__title">${title}
        ${link}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${header}</div>
        <div data-element="body" class="column-chart__chart">
          ${charts}
        </div>
      </div>
    </div>
    `

    this.element = element.firstElementChild;
  }
  
  update(data) {
    const body = this.element.querySelector('.column-chart__chart');
    let charts = '';

    data.forEach(item => {this.oData.data.unshift(item)});
    
    this.maxValue = this.oData && this.oData.data ? Math.max(...this.oData.data) : this.chartHeight;
    this.scale = this.chartHeight / this.maxValue;

    if (this.oData && this.oData.data) {
      this.oData.data.forEach(value => {
        charts += `
        <div style="--value: ${String(Math.floor(this.scale * value))}" 
             data-tooltip="${(value / this.maxValue * 100).toFixed(0) + '%'}"></div>
        `
      });
    }

    body.innerHTML = `
      ${charts}
    `;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
