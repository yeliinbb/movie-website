const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWQzMTE4NjI2ODdhMDFmMjdhZTA5ZDNmY2ZmOGRkYyIsInN1YiI6IjY2Mjg2Y2RiNjNkOTM3MDE2NDczYmY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GUzdeMYC_A_-Ghz52xUS95SXKKzQk1wAf79RJyGuAS8'
    }
  };

let movie_list = [];

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json()) // Promise -> resolve
    .then(data => {
      movie_list.push(data);
      // const movie_list_keys = Object.keys(data) //data배열의 key값들을 가져오기
      // console.log(movie_list_keys);
      //불러온 데이터를 변수에 할당해준다
      const movie_list_values = data.results; //영화 정보가 담겨있는 results 값(배열) 가져오기
      const movie_list_keys_id = []; //값을 담을 빈 배열을 만들어주기
      for (let element of movie_list_values) {
        //배열을 순회하면서 각 객체 안에 있는 id값 새로운 배열에 넣어주기
        movie_list_keys_id.push(element.id)
      }
      // console.log(movie_list_keys_id);
      movie_list_values.forEach(element => {
        document.querySelector(".movies").innerHTML += `
        <div class="movie__box-wrapper" id="${element.id}">
        <div class="movie__box" onclick="alert('영화 id는 ${element.id} 입니다.')" >
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
    })


//외부에서 함수 안에 movie_list를 사용하는 건 가능
// movie_list = new Array(response);
// console.log(movie_list); //undefined : 되는 이유는 아직 데이터 값을 받아오지 못해서, 데이터를 받아오는 시간이 필요하기 때문이다.


const movieCardsBox = document.querySelector(".movies");
const movieCards = document.querySelectorAll(".movie__box"); //박스들 가져오기?
const form = document.querySelector("form");
const input = document.querySelector("input");
const btn = document.querySelector(".search__btn");


// console.dir(input);

// 검색 기능 구현
const onSubmit = (event) => {
  event.preventDefault()
  const inputValue = input.value;
  const inputValueLowercase = inputValue.toLowerCase();
  // const movieInfoLowercase = movieInfo.textContent.toLowerCase();
  // const movieTitleLowercase = movieTitle.textContent.toLowerCase();
  
  if (inputValue === "") {
    alert("Please fill in the blank.");
  } 
  console.log("click", inputValueLowercase);
  //movie_list_values에 inputValue값이 있다면, 없는 나머지를 제외해주기

  //지역 변수로 사용
  const movieBoxWrapper = document.querySelectorAll(".movie__box-wrapper");  

    /* ----------------------------------- */

    //방법 (1) for 반복문
    //배열 순회하면서 input값이 없는 text는 "display : none" 으로 바꿔주기
  //   for(let i = 0; i < movieBoxWrapper.length; i++) {
  //     const element = movieBoxWrapper[i]
  //     const newMovieTexts = element.textContent.toLowerCase();

  //     if (newMovieTexts.includes(inputValueLowercase)) {
  //       movieBoxWrapper[i].style.display = '';
  //     } else {
  //       movieBoxWrapper[i].style.display = 'none';
  //     }
  //   }    

  /* ----------------------------------- */

    //방법 (2) forEach
    movieBoxWrapper.forEach(element => {
      const newMovieTexts = element.textContent.toLowerCase();
      if (newMovieTexts.includes(inputValueLowercase)) {
        element.style.display = '';
      } else {
        element.style.display = 'none';
      }
    });

  /* ----------------------------------- */

      // querySelectorAll returns a NodeList not an Array. You can convert it to an Array if you'd like to use Array methods.
      //array가 아닌 형태를 배열로 가져오는 방법
      // var items = document.querySelectorAll('li');
      // var itemsArray = Array.from(items); 

  // //   방법 (3) filter()
  // //   array가 아닌 형태를 배열로 가져옴.
  // const movieBoxWrapperArr = Array.from(movieBoxWrapper);
  // //   console.log(movieBoxWrapperArr);
  //   console.log(movieBoxWrapperArr[0]);
  //   //filter()메소느는 Nodelist 배열 사용 불가하기 때문에 배열로 바꿔주는 작업 필요함.
  // //   const movieBoxWrapperArr = [... movieBoxWrapper];
  //   const Filtered = movieBoxWrapperArr.filter(element => {
  //     const newMovieTexts = element.textContent.toLowerCase();
  //     newMovieTexts.indexOf(inputValueLowercase)
  //     }); 
  //   console.log(Filtered);
    
  /* ----------------------------------- */
}

form.addEventListener("submit", onSubmit);



