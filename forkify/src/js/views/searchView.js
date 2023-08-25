class SearchView {
    _parentElement = document.querySelector('.search');

    getQury() {
        const query = this._parentElement.querySelector('.search__field').value;
        this._clear();
        return query;
    }

    _clear() {
        return (this._parentElement.querySelector('.search__field').value = '');
    }
    addHandelrSearch(handeler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handeler();
        });
    }
}
export default new SearchView();
