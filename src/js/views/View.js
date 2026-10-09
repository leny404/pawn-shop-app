export default class View {
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
}
