export const handleSearch = (searchKeyword) => {
  const movieCardWrappers = document.querySelectorAll(".movie__box-wrapper");

  movieCardWrappers.forEach((card) => {
    const title = card.querySelector(".movie__title").textContent.toLowerCase();
    const searchedValue = searchKeyword.toLowerCase();

    if (title.includes(searchedValue)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
};
