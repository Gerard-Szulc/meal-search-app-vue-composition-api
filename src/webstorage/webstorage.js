export default {
  getFavourites: () => {
    return JSON.parse(localStorage.getItem("favouriteMeals")) || {};
  },
  getFavourite: function (prop) {
    return this.getFavourites()[prop];
  },
	setFavourite: function ({ key, value }) {
    let favourites = this.getFavourites();
    favourites[key] = value;
    localStorage.setItem("favouriteMeals", JSON.stringify(favourites));
    return localStorage.getItem("favouriteMeals");
  },
  remove: function (prop) {
    let favourites = this.getFavourites();
    delete favourites[prop];
    localStorage.setItem("favouriteMeals", JSON.stringify(favourites));

    return localStorage.getItem("favouriteMeals");
  },
};
