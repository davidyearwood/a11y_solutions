(function (window) {

  if (typeof window === undefined) {
    throw new Error("Browser environment only.");
  }

  // variables 
  var code = {
    DOWN_KEY: 40,
    UP_KEY: 38,
    ESCAPE_KEY: 27,
    ENTER_KEY: 13
  };

  var counter = 0;
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
    listItem.setAttribute("aria-selected", "false");
    listItem.setAttribute("id", "item-" + item);
    listItem.appendChild(document.createTextNode(item));

    return listItem;
  }

  function getSuggestionsByInput(input) {
    var filteredSuggestions = filterSuggestions(suggestions, input);

    return filteredSuggestions.length > 0 ?
      filteredSuggestions.map(function (suggestion) {
        return createHTMLSuggestion(suggestion);
      }) : [];
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

    var htmlSuggestions = getSuggestionsByInput(userInput);

    if (htmlSuggestions.length <= 0) {
      autocomplete.classList.remove("autocomplete-list--is-active");
    }

    if (autocomplete.classList.contains("autocomplete-list--is-active")) {
      searchInput.setAttribute("aria-expanded", "true");
    } else {
      searchInput.setAttribute("aria-expanded", "false");
    }

    renderAutoComplete(htmlSuggestions);
  }

  function arrowing(keyCode) {
    var items = document.getElementsByClassName("autocomplete-list__item");
    var activeElement = document.activeElement;

    if (items.length === 0) {
      return false;
    }

    if (keyCode === code.DOWN_KEY) {
      if (activeElement.classList.contains("search-form__input")) {
        activeElement = items[0];
      } else {
        activeElement.setAttribute("aria-selected", "false");
        activeElement = activeElement.nextElementSibling ? activeElement.nextElementSibling : searchInput;
      }
    }

    if (keyCode === code.UP_KEY) {
      if (activeElement.classList.contains("search-form__input")) {
        activeElement = items[items.length - 1];
      } else {
        activeElement.setAttribute("aria-selected", "false");
        activeElement = activeElement.previousElementSibling ? activeElement.previousElementSibling : searchInput;
      }
    }


    activeElement.setAttribute("aria-selected", "true");
    activeElement.focus();
    console.log(activeElement);
    return activeElement;
  }

  function handleAutocompleteKeydown(e) {
    switch (e.keyCode) {
      case code.DOWN_KEY:
        e.preventDefault();
        arrowing(e.keyCode);
        break;
      case code.UP_KEY:
        e.preventDefault();
        arrowing(e.keyCode);
        break;
      case code.ESCAPE_KEY:
        autocomplete.classList.remove("autocomplete-list--is-active")
        searchInput.focus();
        break;
      case code.ENTER_KEY:
        var activeElement = document.activeElement;
        autocomplete.classList.remove("autocomplete-list--is-active")
        searchInput.value = activeElement.classList.contains("autocomplete-list__item") ?
          activeElement.getAttribute("data-autocomplete-item") :
          searchInput.value;
        break;
    }
  }

  // Event listeners 
  searchForm.addEventListener("input", handleSearchInput);
  autocomplete.addEventListener("click", handleAutocompleteClick);
  searchInput.addEventListener("keydown", handleAutocompleteKeydown);
  autocomplete.addEventListener("keydown", handleAutocompleteKeydown);
})(window);