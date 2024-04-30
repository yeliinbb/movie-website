import { generateMovieCards } from "./movie.js";
import { handleSearch } from "./search.js";

generateMovieCards();

// 새로고침 시 자동으로 input창에 커서 깜박거리게
const searchInput = document.querySelector("input");
searchInput.focus();

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch(searchInput.value);
});
