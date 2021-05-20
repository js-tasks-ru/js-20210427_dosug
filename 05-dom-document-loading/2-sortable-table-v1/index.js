export default class SortableTable {
  element = null;
  subElements = {};

  constructor(headerConfig = [], { data = [] } = {}) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
  }

  get template() {
    return `
      <div class="sortable-table">
        <div class="sortable-table__header sortable-table__row" data-element="header">
          ${this.getHeaderCells(this.headerConfig)}
        </div>
        <div class="sortable-table__body" data-element="body">
          ${this.getRows(this.data)}
        </div>
      </div>
    `
  }

  getHeaderCells(data = []) {
    let cell = '';

    data.forEach(item => {
      cell += `
        <div class="sortable-table__cell"
           data-name="${item.id}"
           ${item.sortable ? 'data-sortable' : ''}>
          <span>${item.title}</span>
        </div>
      `
    });

    return cell;
  }

  getRows(data = []) {
    let row = '';

    data.forEach(item => {
      row += `
        <a href="#"
           class="sortable-table__row">${this.getCells(this.headerConfig, item)}</a>
      `
    });

    return row;
  }

  getCells(header, data) {
    let cell = '';

    header.forEach(item => {
      if (item.template) {
        cell += item.template(data.images);
        return;
      }

      cell += `
        <div class="sortable-table__cell">${data[item.id]}</div>
      `
    });

    return cell;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  sort(field, order) {
    const newArr = [...this.data];
    const oOption = {
      'asc': {seq: 'ab', case: 'upper'},
      'desc': {seq: 'ba', case: 'lower'}
    }

    newArr.sort((a, b) => {
      const oSort = {a, b};

      if (this.headerConfig.find(item => item.id === field)?.sortType === 'string') {
        return oSort[oOption[order].seq[0]][field].localeCompare(oSort[oOption[order].seq[1]][field], ['ru', 'en'], { caseFirst: oOption[order].case });
      }
      if (this.headerConfig.find(item => item.id === field)?.sortType === 'number') {
        return oSort[oOption[order].seq[0]][field] > oSort[oOption[order].seq[1]][field] ? 1 : -1;
      }
    });

    this.update(newArr)
  }

  update(data) {
    const target = this.element.querySelector('.sortable-table__body');

    target.innerHTML = this.getRows(data)
  }

  render() {
    this.element = document.createElement('div');
    this.element.innerHTML = this.template;

    this.element = this.element.firstElementChild;

    this.subElements = this.getSubElements(this.element);
  }

  remove() {
    if (!this.element) return;
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
