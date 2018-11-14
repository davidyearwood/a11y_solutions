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

    function handleAutocompleteClick(e) {
        e.preventDefault(); 
        var value = e.target.getAttribute("data-autocomplete-value"); 

        console.log(value); 

        searchInput.value = value; 
        autocomplete.classList.remove("autocomplete-list--is-active");
    }

    function handleSearchFormInput(e) {
        var value = searchInput.value;

        if (value) {
            autocomplete.classList.add("autocomplete-list--is-active");
        } else {
            autocomplete.classList.remove("autocomplete-list--is-active");
        }

        var filteredSuggestions = autocompleteSuggestions.filter(function (suggestion) {
            if (value.trim() === "") {
                return false; 
            }

            return suggestion.toLowerCase().includes(value.toLowerCase());
        });

        var htmlSuggestions = filteredSuggestions.length > 0 ?
            filteredSuggestions.map(function (suggestion) {
                var listItem = document.createElement("LI");
                listItem.setAttribute("class", "autocomplete-list__item");
                listItem.setAttribute("role", "option");
                listItem.setAttribute("tabindex", "-1");
                listItem.setAttribute("data-autocomplete-value", suggestion);
                listItem.appendChild(document.createTextNode(suggestion));
                return listItem;
            }) : [];
        
        if (htmlSuggestions.length <= 0) {
            autocomplete.classList.remove("autocomplete-list--is-active");
        }

        renderAutoComplete(htmlSuggestions);

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

    // when the user is 
    // inputing data we want to display 
    // an autocompvare list they can choose from
    searchForm.addEventListener("input", handleSearchFormInput);
    autocomplete.addEventListener("click", handleAutocompleteClick); 

})(window);