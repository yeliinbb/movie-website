const apiKey = 'd5d311862687a01f27ae09d3fcff8ddc';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWQzMTE4NjI2ODdhMDFmMjdhZTA5ZDNmY2ZmOGRkYyIsInN1YiI6IjY2Mjg2Y2RiNjNkOTM3MDE2NDczYmY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GUzdeMYC_A_-Ghz52xUS95SXKKzQk1wAf79RJyGuAS8'
    }
  };

let movie_list;

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json()) // Promise -> resolve
    .then(data => {
      movie_list = data;
      const movie_list_keys = Object.keys(data) //data배열의 key값들을 가져오기
      //불러온 데이터를 변수에 할당해준다
      const movie_list_values = data.results; //영화 정보가 담겨있는 results 값(배열) 가져오기
      const movie_list_keys_id = []; //값을 담을 빈 배열을 만들어주기
      for (let element of movie_list_values) {
        //배열을 순회하면서 각 객체 안에 있는 id값 새로운 배열에 넣어주기
        movie_list_keys_id.push(element.id)
      }
      // console.log(movie_list_keys_id);
      movie_list_values.forEach(element => {
        movieCardsBox.innerHTML += `
        <div class="movie__box-wrapper">
        <div class="movie__box" onclick="alert('영화 id : ${element.id}')" >
            <div class="movie__contents" id="${element.id}" token interpolation="('${element.id}')">
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

// onclick="alert('영화 id : ${element.id}')"

//외부에서 함수 안에 movie_list를 사용하는 건 가능
// movie_list = new Array(response);

// console.log(movie_list); //undefined : 되는 이유는 아직 데이터 값을 받아오지 못해서, 데이터를 받아오는 시간이 필요하기 때문이다.

const movieBoxWrapper = document.querySelectorAll(".movie__box-wrapper");
const movieCardsBox = document.querySelector(".movies");
const movieCards = document.querySelectorAll(".movie__box"); //박스들 가져오기?
const form = document.querySelector("form");
const input = document.querySelector("input");
const btn = document.querySelector(".search__btn");


// console.dir(input);

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
  // let newMovieTitles =[];
  // let newMovieInfos = [];
  // 무비카드 자체를 안 보이게 해야하기 때문에 사용 필요.
  const movieBoxWrapper = document.querySelectorAll(".movie__box-wrapper"); //forEach나 for in을 사용해서 조건문 실행.
  console.log(movieBoxWrapper);

  // movieBoxWrapper.forEach((element, index) => {
  //   // const id = movieCards.indexOf(i).id;
  //   // console.log(id);
  //   const textContent = element.textContent;
  //   if (textContent.includes(inputValueLowercase)) {
  //     document.querySelectorAll(".movie__box-wrapper")[index].style.display = '';
  //     console.log("Found it");
  //   } else {
  //     document.querySelectorAll(".movie__box-wrapper")[index].style.display = 'none';
  //   }
  //   console.log(textContent.includes(inputValueLowercase));
    
  // });
  

    // newMovieTitles.push(movieTitles[i].textContent.toLowerCase());
    // newMovieInfos.push(movieInfos[i].textContent.toLowerCase());

    for(let i = 0; i < movieBoxWrapper.length; i++) {
      const element = movieBoxWrapper[i]
      const newMovieTexts = element.textContent.toLowerCase();
      // const id = movieTitles[i].parentElement.parentElement.id;

      // const result = newMovieTitles.filter((inputValueLowercase) => {});
      if (newMovieTexts.includes(inputValueLowercase)) {
        movieBoxWrapper[i].style.display = '';
      } else {
        movieBoxWrapper[i].style.display = 'none';
      }
    }
    
    // let newMovieBox = movieBoxWrapper.map(function(movieTitles) {
    //   return movieTitles.textContent.toLowerCase();
    // });

    //Enter 키 입력해도 값 처리하기
    function enterKey () {
      if (window.event,keyCode === 13) {
        form.submit();
      }
    }

}

form.addEventListener("submit", onSubmit);


//1. 영화카드 선택 시 id값 들어간 alert 창 띄우기
//1-1. 영화 카드 id값 변수로 지정해주기
//1-2. 영화카드 누를 때 이벤트리스너 추가하기
//1-3. 배열을 순회하면서 각각의 버튼 클릭 이벤트 넣어줌.
// function movieCardClick (a) {
//   alert("영화 id : " + a);
// }

// for(let i = 0; i < movieCards.length; i++) {
//     movieCards[i].addEventListener("click", movieCardClick(movieCards[i].id));
// }



//forEach는 왜 적용이 안되는지? return을 안 하기 때문에?
// movieCards.forEach(element => {
//   movieCards[i].addEventListener("click", movieCardClick);
// })



