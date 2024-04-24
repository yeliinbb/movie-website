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
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => {
        return response.json(); // Promise -> resolve
    }).then(data => {
      movie_list = data;
      console.log(movie_list);
    })