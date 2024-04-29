const apiKey = 'd5d311862687a01f27ae09d3fcff8ddc';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWQzMTE4NjI2ODdhMDFmMjdhZTA5ZDNmY2ZmOGRkYyIsInN1YiI6IjY2Mjg2Y2RiNjNkOTM3MDE2NDczYmY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GUzdeMYC_A_-Ghz52xUS95SXKKzQk1wAf79RJyGuAS8'
    }
  };
  
  //처음 가져온 API 형태
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json()) //json으로 파싱. 데이터 주고 받을 떄 주로 사용.
    .then(response => console.log(response)) //파싱된 형태여서 js에서 사용 가능. 위의 then 함수에서의 이름과 구분하기 위해 인자 이름을 data로 변경해서 주로 사용함.
    .catch(err => console.error(err));


      
// fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//     .then(response => response.json()) //영화 리스트
//     .then(response => {
//       let movie_list = response['id'];
//       console.log(movie_list)
//       // console.log(response)
//     })
//     .catch(err => console.error(err));

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


      //배열 순회하면서 input값이 없는 text는 "display : none" 으로 바꿔주기
      for(let i = 0; i < movieBoxWrapper.length; i++) {
        const element = movieBoxWrapper[i]
        const newMovieTexts = element.textContent.toLowerCase();
        // const id = movieBoxWrapper[i].id;
  
        // const result = newMovieTitles.filter((inputValueLowercase) => {});
        if (newMovieTexts.includes(inputValueLowercase)) {
          movieBoxWrapper[i].style.display = '';
        } else {
          movieBoxWrapper[i].style.display = 'none';
        }
      }