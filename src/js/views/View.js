export default class View {
  _msg = 'Found none items';

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderOne(data) {
    this._data = data;

    const markup = this._generateMarkup();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  renderAll(dataArr) {
    this._clear();
    dataArr.forEach(data => this.renderOne(data));
  }

  renderMessage(msg = this._msg) {
    this._clear();
    const markup = `<p class="text-center col-end-3 text-black-500">${msg}</p>`;
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
