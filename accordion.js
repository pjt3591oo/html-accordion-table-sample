class Accordion {
  #defaultClass = 'row'
  #activeClass = 'active'
  #defaultRowClasses = [this.#defaultClass]
  #activeRowClasses = [this.#defaultClass, this.#activeClass]

  constructor(target = 'body', data = []) {
    this.target = target;
    this.bodyEl = document.getElementById(this.target);

    this.data = data;

    this.#rerender();
  }

  setData(data, options) {
    this.data = data;

    if (options.isRerender) {
      this.#rerender();
    }
  }

  #rerender() {
    this.#eventUnMount();
    this.#render();
    this.#eventMount();
  }

  #clickHandlerByRow(el) {
    const classes = el.currentTarget.getAttribute('class').split(' ');
    if (classes.includes(this.#activeClass)) {
      el.currentTarget.setAttribute('class', this.#defaultRowClasses.join(' '));
    } else {
      el.currentTarget.setAttribute('class', this.#activeRowClasses.join(' '));
    }
  }

  #render() {
    Array.from(this.bodyEl.children).forEach(c => c.remove())

    for (const data of this.data) {
      const rowEl = document.createElement('div');
      const rowDisplayEl = document.createElement('div');
      const accordionEl = document.createElement('div');
      const idColumnEl = document.createElement('div');
      const nameColumnEl = document.createElement('div');
      const ageColumnEl = document.createElement('div');
      const addrColumnEl = document.createElement('div');

      rowEl.className = this.#defaultClass;
      rowDisplayEl.className = 'row-display';

      idColumnEl.className = 'column';
      nameColumnEl.className = 'column';
      ageColumnEl.className = 'column';
      addrColumnEl.className = 'column';

      accordionEl.className = 'accordion';

      idColumnEl.textContent = data.id
      nameColumnEl.textContent = data.name
      ageColumnEl.textContent = data.age
      addrColumnEl.textContent = data.addr
      accordionEl.textContent = data.desc;

      rowDisplayEl.appendChild(idColumnEl);
      rowDisplayEl.appendChild(nameColumnEl);
      rowDisplayEl.appendChild(ageColumnEl);
      rowDisplayEl.appendChild(addrColumnEl);

      rowEl.appendChild(rowDisplayEl)
      rowEl.appendChild(accordionEl);

      this.bodyEl.appendChild(rowEl);
    }
  }

  #eventMount() {
    const removedRows = document.getElementsByClassName(this.#defaultClass)
    for (const row of removedRows) {
      row.addEventListener('click', this.#clickHandlerByRow.bind(this));
    }
  }

  #eventUnMount() {
    const removedRows = document.getElementsByClassName(this.#defaultClass)
    for (const row of removedRows) {
      row.removeEventListener('click', this.#clickHandlerByRow.bind(this));
    }
  }
}