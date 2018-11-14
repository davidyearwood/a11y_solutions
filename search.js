(function (window) {
    if (typeof window === undefined) {
        throw new Error("Browser environment only.");
    }

    // private variables
    var resources = Array.prototype.slice.call(document.querySelectorAll(".resources__item"));
    var searchForm = document.getElementById("search-form");
    var searchInput = document.getElementById("search-input");
    var autocomplete = document.getElementById("autocomplete-list");

    var autocompleteSuggestions = resources.map(function (resource) {
        return resource.getAttribute("data-resource-item");
    });

    function handleSearchFormSubmit(e) {
        e.preventDefault();

        var value = searchInput.value;

        var filteredResources = resources.filter(function (resource) {
            return resource.getAttribute("data-resource-item").toLowerCase() === value.toLowerCase()
        });

        if (filteredResources.length < 1) {
            renderResources(resources);
        } else {
            renderResources(filteredResources);
        }
    }

    function renderList(targetElement, items) {
        targetElement.innerHTML = "";

        items.forEach(function (item) {
            targetElement.appendChild(item);
        });
    }

    function renderResources(resources) {
        var resourcesContainer = document.querySelector(".resources");

        renderList(resourcesContainer, resources);
    }

    function renderAutoComplete(suggestions) {
        var autocompleteList = document.getElementById("autocomplete-list");

        renderList(autocompleteList, suggestions);
    }
    // when the user click submit 
    // we want to retrieve the data they have inputted
    searchForm.addEventListener("submit", handleSearchFormSubmit);
})(window);