export const generateMovieCards = async () => {
  const movies = await fetchMovieData();

  const movieCard = document.querySelector(".movies");
  movieCard.innerHTML = movies
    .map(
      (element) => `
        <li class="movie__box-wrapper">
        <div class="movie__box" id="${element.id}" >
            <div class="movie__contents">
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
        </li> 
    `
    )
    .join("");

  movieCard.addEventListener("click", handleClickCard);

  //구조 분해 할당으로 target에 배열 객체 넣어줌.
  function handleClickCard({ target }) {
    const movieCardWrapper = document.querySelector(".movie__box-wrapper");
    const movieCardBox = document.querySelector(".movie__box");
    console.log(movieCardWrapper);
    console.log(target);
    // 카드 영역 외 클릭 무시
    if (target === movieCardWrapper) return;
    if (target === movieCardBox) return;

    if (target.matches(".movie__contents")) {
      alert(`영화 id는 ${target.parentNode.id} 입니다.`);
    } else if (target.matches(".movie__content") || target.matches(".rate__box")) {
      alert(`영화 id는 ${target.parentNode.parentNode.id} 입니다.`);
    } else {
      alert(`영화 id는 ${target.parentNode.parentNode.parentNode.id} 입니다.`);
    }
    console.log(`${target.parentNode.id}`);
  }
};

//영화 데이터 가져오기
async function fetchMovieData() {
  //api 가져오기
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWQzMTE4NjI2ODdhMDFmMjdhZTA5ZDNmY2ZmOGRkYyIsInN1YiI6IjY2Mjg2Y2RiNjNkOTM3MDE2NDczYmY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GUzdeMYC_A_-Ghz52xUS95SXKKzQk1wAf79RJyGuAS8"
    }
  };
  // JSON 읽기
  const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);
  const data = await response.json();

  return data.results;
}
