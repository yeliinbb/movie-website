const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWQzMTE4NjI2ODdhMDFmMjdhZTA5ZDNmY2ZmOGRkYyIsInN1YiI6IjY2Mjg2Y2RiNjNkOTM3MDE2NDczYmY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GUzdeMYC_A_-Ghz52xUS95SXKKzQk1wAf79RJyGuAS8"
  }
};

let movie_list_values = [];

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json()) // Promise -> resolve
  .then((data) => {
    movie_list_values = data.results; //영화 정보가 담겨있는 results 값(배열) 가져오기
    const movieCardsBox = document.querySelector(".movies");

    movie_list_values.forEach((element) => {
      movieCardsBox.innerHTML += `
        <div class="movie__box-wrapper" id="${element.id}">
        <div class="movie__box">
            <div class="movie__contents" token interpolation="('${element.id}')">
                <div class="movie__content">
                    <img class="movie__img" src=${`https://image.tmdb.org/t/p/w400` + element.poster_path} >
                    <h3 class="movie__title" id="card-title">${element.original_title}</h3>
                    <p class="movie__sum">${element.overview}</p>
                </div>
                <div class="rate__box">
                    <span class="movie__rate">${`Rating : ` + element.vote_average}</span>
                </div>
            </div>
        </div>
        </div> 
        `;
    });

    movie_list_values.forEach((data) => {
      const element = document.getElementById(`${data.id}`);
      element.addEventListener("click", () => movieCardClick(`${data.id}`));
    });
  });

const movieCards = document.querySelectorAll(".movie__box"); //박스들 가져오기?
const form = document.querySelector("form");
const input = document.querySelector("input");

// console.dir(input);

// 검색 기능 구현
const onSubmit = (event) => {
  event.preventDefault();
  const inputValue = input.value;
  const inputValueLowercase = inputValue.toLowerCase();

  if (inputValue === "") {
    alert("Please fill in the blank.");
  }

  //지역 변수로 사용
  const movieBoxWrapper = document.querySelectorAll(".movie__box-wrapper");

  // 방법 (2) forEach
  movieBoxWrapper.forEach((element) => {
    const newMovieTexts = element.textContent.toLowerCase();
    if (newMovieTexts.includes(inputValueLowercase)) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  });
};

form.addEventListener("submit", onSubmit);
