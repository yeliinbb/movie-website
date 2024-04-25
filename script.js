const apiKey = 'd5d311862687a01f27ae09d3fcff8ddc';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWQzMTE4NjI2ODdhMDFmMjdhZTA5ZDNmY2ZmOGRkYyIsInN1YiI6IjY2Mjg2Y2RiNjNkOTM3MDE2NDczYmY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GUzdeMYC_A_-Ghz52xUS95SXKKzQk1wAf79RJyGuAS8'
    }
  };

let movie_list;
      
// fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//     .then(response => response.json()) //영화 리스트
//     .then(response => {
//       let movie_list = response['id'];
//       console.log(movie_list)
//       // console.log(response)
//     })
//     .catch(err => console.error(err));

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json()) // Promise -> resolve
    .then(data => {
      movie_list = data;
      const movie_list_keys = Object.keys(data) //data배열의 key값들을 가져오기
      const movie_list_values = data.results; //영화 정보가 담겨있는 results 값(배열) 가져오기
      // console.log(data.results[0].id);
      const movie_list_keys_id = []; //값을 담을 빈 배열을 만들어주기
      for (let element of movie_list_values) {
        //배열을 순회하면서 각 객체 안에 있는 id값 새로운 배열에 넣어주기
        movie_list_keys_id.push(element.id)
      }
      console.log(movie_list_keys_id);
      movie_list_values.forEach(element => {
        movieCardsBox.innerHTML += `
        <div class="movie__box-wrapper">
        <div class="movie__box" onclick="alert(${element.id})" >
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

      //배열을 순회하면서 각각의 버튼 클릭 이벤트 넣어줌.
      for(let i = 0; i < movieCards.length; i++) {
        movieCards[i].addEventListener("click", movieCardClick);
      }
      //forEach는 왜 적용이 안되는지?
      // movieCards.forEach(element => {
      //   movieCards[i].addEventListener("click", movieCardClick);
      // })

      function movieCardClick (element) {
          alert(element);
      }
      console.log(movie_list_values[i]);
    })

//외부에서 함수 안에 movie_list를 사용하는 건 가능
// movie_list = new Array(response);
// console.log(movie_list);

//1. 영화카드 선택 시 id값 들어간 alert 창 띄우기
//1-1. 영화 카드 id값 변수로 지정해주기
//1-2. 영화카드 누를 때 이벤트리스너 추가하기
const movieCards = document.querySelectorAll(".movie__box"); //박스들 가져오기?
//박스 각각의 id 값을 가져오기 
const movieCardsBox = document.querySelector(".movies");



// const createMovieCard = function(movie) {
//   movie = {id, title, overview, poster_path, vote_average};
// }
const createMovieCard = movie => {
  const {id, title, overview, poster_path, vote_average} = movie;
}

const card = document.createElement('div');
const img = document.createElement('img');
const titleElement = document.createElement('h3');
const overviewElement = document.createElement('p');
const voteAverageElement = document.createElement('span');

card.className = 'movie-card';
img.className = 'poster-image';
titleElement.className = 'title';
overviewElement.className = 'overview';
voteAverageElement.className = 'vote-average';

// movie_list_values.forEach(element => {
//     card.append(img);
//     card.append(titleElement);
//     card.append(overviewElement);
//     card.append(voteAverageElement);

//   return card;
// });




// let image;
// let title;
// let content;
// let rate;

// let temp_html = `            
//     <div class="movie__box-wrapper">
//     <div class="movie__box">
//         <div class="movie__contents">
//             <div class="movie__content">
//                 <img class="movie__img" src="${image}" >
//                 <h3 class="movie__title">${title}</h3>
//                 <p class="movie__sum">${content}</p>
//             </div>
//             <div class="rate__box">
//                 <span class="movie__rate">${rate}</span>
//             </div>
//         </div>
//     </div>
//     </div> 
// `;

// movieCardsBox.append(temp_html);

