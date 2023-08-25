import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
    module.hot.accept();
}
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controleRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;

        recipeView.renderSpinner();

        // update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());

        // update results view
        bookmarksView.update(model.state.bookmarks);

        // Loading recipe
        await model.loadRecipe(id);

        // Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
    }
};

const controleSearchResult = async function () {
    try {
        resultsView.renderSpinner();

        // Get search query
        const query = searchView.getQury();
        if (!query) return;

        // Load search results
        await model.loadSearchResults(query);

        // Render results
        resultsView.render(model.getSearchResultsPage());

        // Render initial pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

const controlePagination = function (goToPage) {
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
};

const controleServings = function (newSurvings) {
    // Update the recipe survings (in state)
    model.updateSurvings(newSurvings);
    // Update the recipe view
    recipeView.update(model.state.recipe);
};

const controlAddBokmark = function () {
    // Add/remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    // Update recipe view
    recipeView.update(model.state.recipe);

    // Render bookmarks
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
    try {
        // Show loading spinner
        addRecipeView.renderSpinner;
        // Upload the new recipe dATA
        await model.uploadRecipe(newRecipe);
        console.log(model.state.recipe);

        // Render recipe
        recipeView.render(model.state.recipe);

        // Success message
        addRecipeView.renderMessage();

        // Render bookmark view
        bookmarksView.render(model.state.bookmarks);

        // Change ID in url
        window.history.pushState(null, '', `#${model.state.recipe.id}`);
        // Close form windo
        setTimeout(function () {
            addRecipeView.closeWindow();
        }, MODEL_CLOSE_SEC * 1000);
    } catch (err) {
        console.error(err);
        addRecipeView.renderError(err.message);
    }
};
const init = function () {
    bookmarksView.addHandelerRender(controlBookmarks);
    recipeView.addHandelerRender(controleRecipes);
    recipeView.addHandelerRenderUbdateServings(controleServings);
    recipeView.addHandelerAddBookmark(controlAddBokmark);
    searchView.addHandelrSearch(controleSearchResult);
    paginationView.addHandelerclick(controlePagination);
    addRecipeView.addHandelerUpload(controlAddRecipe);
};
init();
