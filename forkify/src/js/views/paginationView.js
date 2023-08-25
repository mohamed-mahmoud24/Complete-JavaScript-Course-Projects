import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandelerclick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');

            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;

        const nextBtn = `
        <button data-goto="${
            curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;

        const prevBtn = `
            <button   data-goto="${
                curPage - 1
            }"  class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button> `;

        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );
        // Page 1 , and there are other pages
        if (curPage === 1 && numPages > 1) {
            return nextBtn;
        }
        // Page 1 , and there are other pages

        //Last page
        if (curPage === numPages && numPages > 1) {
            console.log(curPage);
            return prevBtn;
        }

        //Other pages
        if (curPage < numPages && curPage > 1) {
            return `${nextBtn} ${prevBtn}`;
        }

        return '';
    }
}

export default new PaginationView();
