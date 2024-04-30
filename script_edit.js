const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWQzMTE4NjI2ODdhMDFmMjdhZTA5ZDNmY2ZmOGRkYyIsInN1YiI6IjY2Mjg2Y2RiNjNkOTM3MDE2NDczYmY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GUzdeMYC_A_-Ghz52xUS95SXKKzQk1wAf79RJyGuAS8"
  }
};

//fetch로 받아온 데이터로 영화 카드 UI 만들기
const renderMovie = async () => {
  const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);
  const data = await response.json();

  data.results.forEach((element) => {
    document.querySelector(".movies").innerHTML += `
        <div class="movie__box-wrapper">
        <div class="movie__box" id="${element.id}" >
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

  data.results.forEach((data) => {
    const element = document.getElementById(`${data.id}`);
    element.addEventListener("click", () => movieCardClick(`${data.id}`));
  });
};

function movieCardClick(id) {
  console.log({ id });
  if (id) {
    alert(`영화 id는 ${id} 입니다.`);
  }
}

renderMovie();

const form = document.querySelector("form");
const input = document.querySelector("input");

// 영화 검색 UI 구현
const searchMovie = (event) => {
  event.preventDefault();
  const inputValue = input.value;

  if (inputValue === "") {
    alert("Please fill in the blank.");
  }

  const movieBoxWrapper = document.querySelectorAll(".movie__box-wrapper");

  movieBoxWrapper.forEach((element) => {
    const title = element.querySelector(".movie__title").textContent.toLowerCase();
    const inputValueLowercase = inputValue.toLowerCase();

    if (title.includes(inputValueLowercase)) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  });
};

form.addEventListener("submit", searchMovie);
// 새로고침 시 자동으로 input창에 커서 깜박거리게
input.focus();
