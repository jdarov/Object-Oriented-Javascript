function myBind(func, context, ...boundArgs) {
  return function(...args) {
    return func.apply(context, [...boundArgs, ...args]);
  }
}

const movies = {
  movie_title : 'help wanted',
  log_movies() {
    return [1, 2].map(number => `${this.movie_title} ${number}`);
  },
};

const show_movies = myBind(movies.log_movies, movies);

console.log(show_movies());