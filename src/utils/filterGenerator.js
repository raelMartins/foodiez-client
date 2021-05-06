export default class FilterList {
  constructor(array) {
    this.data = array;
    this.countries = [];
    this.currencies = [];
    this.cuisines = [];
  }

  show() {
    console.log(this.data);
  }
  generateCountries() {
    const countries = this.data.map((restaurant) => restaurant.country);

    this.countries = [...new Set(countries)];
  }
  generateCurrencies() {
    const currencies = this.data.map((restaurant) => {
      if (restaurant.currency !== undefined) {
        return restaurant.currency;
      }
    });

    this.currencies = [...new Set(currencies)];
  }
  generateCuisines() {
    let cuisines = [];
    this.data.forEach((restaurant) => {
      if (restaurant.cuisines !== undefined) {
        cuisines = [...cuisines, ...restaurant.cuisines];
      }
    });
    this.cuisines = [...new Set(cuisines)];
  }
}
