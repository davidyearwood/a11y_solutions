(function (window) {

  if (typeof window === undefined) {
    throw new Error("Browser environment only.");
  }

  // variables 
  var resources = Array.prototype.slice.call(document.querySelectorAll(".resources__item"));
  var autocomplete = document.getElementById("autocomplete-list");
  var searchForm = document.getElementById("search-form");
  var searchInput = document.getElementById("search-input");
  var suggestions = resources.map(function (resource) {
    return resource.getAttribute("data-resource-item");
  });

  // Helpers
  function filterSuggestions(suggestions, value) {
    return suggestions.filter(function (suggestion) {
      return value.trim() !== "" ?
        suggestion.toLowerCase().includes(value.toLowerCase()) :
        false
    });
  }

  function createHTMLSuggestion(item) {
    var listItem = document.createElement("LI");
    listItem.setAttribute("class", "autocomplete-list__item");
    listItem.setAttribute("role", "option");
    listItem.setAttribute("tabindex", "-1");
    listItem.setAttribute("data-autocomplete-item", item);
    listItem.appendChild(document.createTextNode(item));

    return listItem;
  }

  function getSuggestions(suggestion) {

  }

  // Views
  function renderList(targetElement, items) {
    targetElement.innerHTML = "";

    items.forEach(function (item) {
      targetElement.appendChild(item);
    });
  }

  function renderAutoComplete(suggestions) {
    var autocompleteList = document.getElementById("autocomplete-list");
    renderList(autocompleteList, suggestions);
  }

  // Handlers
  function handleAutocompleteClick(e) {
    e.preventDefault();
    var selectedSuggestion = e.target.getAttribute("data-autocomplete-item");

    searchInput.value = selectedSuggestion;
    autocomplete.classList.remove("autocomplete-list--is-active");
  }

  function handleSearchInput(e) {
    var userInput = searchInput.value;

    if (userInput) {
      autocomplete.classList.add("autocomplete-list--is-active");
    } else {
      autocomplete.classList.remove("autocomplete-list--is-active");
    }

    var filteredSuggestions = filterSuggestions(suggestions, userInput);
    var htmlSuggestions = filteredSuggestions.length > 0 ?
      filteredSuggestions.map(function (suggestion) {
        return createHTMLSuggestion(suggestion);
      }) : [];

    if (htmlSuggestions.length <= 0) {
      autocomplete.classList.remove("autocomplete-list--is-active");
    }

    renderAutoComplete(htmlSuggestions);
  }

  function isEmpty() {
    return item == false; 
  }
  // Event listeners 
  searchForm.addEventListener("input", handleSearchInput);
  autocomplete.addEventListener("click", handleAutocompleteClick);

})(window);