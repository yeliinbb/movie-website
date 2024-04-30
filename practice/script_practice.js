const apiKey = "d5d311862687a01f27ae09d3fcff8ddc";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWQzMTE4NjI2ODdhMDFmMjdhZTA5ZDNmY2ZmOGRkYyIsInN1YiI6IjY2Mjg2Y2RiNjNkOTM3MDE2NDczYmY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GUzdeMYC_A_-Ghz52xUS95SXKKzQk1wAf79RJyGuAS8"
  }
};

let movie_list_values = []; // 외부에서 data.results값을 사용해주기 위해 빈 배열로 일단 선언

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json()) // Promise -> resolve
  .then((data) => {
    movie_list.push(data);
    // const movie_list_keys = Object.keys(data) //data배열의 key값들을 가져오기
    // console.log(movie_list_keys);
    //불러온 데이터를 변수에 할당해준다
    movie_list_values = data.results; //영화 정보가 담겨있는 results 값(배열) 가져오기
    const movie_list_keys_id = []; //값을 담을 빈 배열을 만들어주기
    for (let element of movie_list_values) {
      //배열을 순회하면서 각 객체 안에 있는 id값 새로운 배열에 넣어주기
      movie_list_keys_id.push(element.id);
    }
    // console.log(movie_list_keys_id);
    movie_list_values.forEach((element) => {
      document.querySelector(".movies").innerHTML += `
        <div class="movie__box-wrapper" id="${element.id}">
        <div class="movie__box"  >
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
  });

// onclick="alert('영화 id : ${element.id}')"

/* ----------------------------------- */
// 방법 (2)
// const render = async () => {
//   const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);
//   const data = await response.json();

//   data.results.forEach((element) => {
//     document.querySelector(".movies").innerHTML += `
//         <div class="movie__box-wrapper" id="${element.id}">
//         <div class="movie__box"  >
//             <div class="movie__contents" token interpolation="('${element.id}')">
//                 <div class="movie__content">
//                     <img class="movie__img" src=${`https://image.tmdb.org/t/p/w400` + element.poster_path} >
//                     <h3 class="movie__title" id="card-title">${element.original_title}</h3>
//                     <p class="movie__sum">${element.overview}</p>
//                 </div>
//                 <div class="rate__box">
//                     <span class="movie__rate">${`Rating : ` + element.vote_average}</span>
//                 </div>
//             </div>
//         </div>
//         </div>
//         `;
//   });

//   data.results.forEach((data) => {
//     const element = document.getElementById(`${data.id}`);
//     element.addEventListener("click", () => movieCardClick(`${data.id}`));
//   });
// };

// render();

/* ----------------------------------- */
// function movieCardClick(id) {
//   console.log({ id });
//   if (id) {
//     alert(`영화 id : ${id}`);
//   }
// }

// // 1. movie_list_values => fetch 비동기 => 동기적으로 바꾸는 것
// movie_list_values.forEach((data) => {
//   const element = document.getElementById(`${data.id}`);
//   element.addEventListener("click", () => movieCardClick(`${data.id}`));
// });

/* ----------------------------------- */

//외부에서 함수 안에 movie_list를 사용하는 건 가능
// movie_list = new Array(response);

// console.log(movie_list); //undefined : 되는 이유는 아직 데이터 값을 받아오지 못해서, 데이터를 받아오는 시간이 필요하기 때문이다.

// const movieBoxWrapper = document.querySelectorAll(".movie__box-wrapper");
const movieCardsBox = document.querySelector(".movies");
const movieCards = document.querySelectorAll(".movie__box"); //박스들 가져오기?
const form = document.querySelector("form");
const input = document.querySelector("input");
const btn = document.querySelector(".search__btn");

// console.dir(input);

const onSubmit = (event) => {
  event.preventDefault();
  const inputValue = input.value;
  const inputValueLowercase = inputValue.toLowerCase();
  // const movieInfoLowercase = movieInfo.textContent.toLowerCase();
  // const movieTitleLowercase = movieTitle.textContent.toLowerCase();

  if (inputValue === "") {
    alert("Please fill in the blank.");
  }
  console.log("click", inputValueLowercase);
  //movie_list_values에 inputValue값이 있다면, 없는 나머지를 제외해주기
  // 무비카드 자체를 안 보이게 해야하기 때문에 사용 필요.
  //forEach나 for in을 사용해서 조건문 실행.
  const movieBoxWrapper = document.querySelectorAll(".movie__box-wrapper");
  //   console.log(movieBoxWrapper); //nodelist 배열 메소드 바로 사용 불가

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
  //   movieBoxWrapper.forEach(element => {
  //     const newMovieTexts = element.textContent.toLowerCase();
  //     if (newMovieTexts.includes(inputValueLowercase)) {
  //       element.style.display = '';
  //     } else {
  //       element.style.display = 'none';
  //     }
  //   });

  /* ----------------------------------- */

  // querySelectorAll returns a NodeList not an Array. You can convert it to an Array if you'd like to use Array methods.
  //array가 아닌 형태를 배열로 가져오는 방법
  // var items = document.querySelectorAll('li');
  // var itemsArray = Array.from(items);

  //   방법 (3)-1 filter()
  //   array가 아닌 형태를 배열로 가져옴.
  // const movieBoxWrapperArr = Array.from(movieBoxWrapper);
  // //filter()메소느는 Nodelist 배열 사용 불가하기 때문에 배열로 바꿔주는 작업 필요함.
  // const Filtered = movieBoxWrapperArr.filter((element) => {
  //   const newMovieTexts = element.textContent.toLowerCase();
  //   return newMovieTexts.includes(inputValueLowercase);
  // });
  // return이 빠졌기 때문에 filter() 작동 x
  /* ----------------------------------- */
  //   방법 (3)-2 filter()
  // const filtered = movie_list_values.filter((data) => {
  //   return data.title.toLowerCase().includes(inputValueLowercase);
  // });

  // filtered를 가지고 다시 html을 그려준다. 그리기 이전에는 html을 비워준다.
  // movieCardsBox.innerHTML = "";
  // filtered.forEach((element) => {
  //   document.querySelector(".movies").innerHTML += `
  //     <div class="movie__box-wrapper" id="${element.id}">
  //     <div class="movie__box"  >
  //         <div class="movie__contents">
  //             <div class="movie__content">
  //                 <img class="movie__img" src=${`https://image.tmdb.org/t/p/w400` + element.poster_path} >
  //                 <h3 class="movie__title" id="card-title">${element.original_title}</h3>
  //                 <p class="movie__sum">${element.overview}</p>
  //             </div>
  //             <div class="rate__box">
  //                 <span class="movie__rate">${`Rating : ` + element.vote_average}</span>
  //             </div>
  //         </div>
  //     </div>
  //     </div>
  //     `;
  // });
  // Filtered로 그림그리기
};

form.addEventListener("submit", onSubmit);

// //Enter 키 입력해도 값 처리하기
// const enterKey = () => {
//   if (window.event.keyCode === 13) {
//     form.submit();
//   }
// }

//1. 영화카드 선택 시 id값 들어간 alert 창 띄우기
//1-1. 영화 카드 id값 변수로 지정해주기
//1-2. 영화카드 누를 때 이벤트리스너 추가하기
//1-3. 배열을 순회하면서 각각의 버튼 클릭 이벤트 넣어줌.

//적용 안되는 이유는? : fetch()는 비동기 함수로, 이 이벤트를 실행할 시점에는 아직 html구조가 다 만들어지지 않은 상태여서 이벤트가 실행되지 않았던 것.
function movieCardClick(a) {
  if (a) {
    alert("영화 id : " + a);
  }
}

console.log(document.querySelectorAll(".movie__box-wrapper"));
document.querySelectorAll(".movie__box-wrapper").forEach((element) => {
  const id = element.getAttribute("id");
  console.log(id);
  element.addEventListener("click", () => movieCardClick(element.getAttribute(id)));
});
