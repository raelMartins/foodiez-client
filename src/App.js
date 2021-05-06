import { useEffect, useState } from "react";
import axios from "axios";
import FilterList from "./utils/filterGenerator";
import FilterForm from "./components/FilterForm";
import Card from "./components/Card";
import "./styles/App.scss";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    countries: [],
    currencies: [],
    cuisines: [],
  });
  const [search, setSearch] = useState({
    name: "",
    address: "",
    city: "",
    locality: "",
  });
  const [searchQueryUrl, setSearchQueryUrl] = useState(``);

  //API call
  const getRestaurants = async (query) => {
    const restaurants = await axios({
      method: "GET",
      url: `/restaurants?${query}`,
    });
    return restaurants.data;
  };

  //Used this function to generate list of possible filter options for some fields
  const getFilters = async () => {
    const restaurants = await getRestaurants();
    const filters = new FilterList(restaurants);
    filters.generateCountries();
    filters.generateCurrencies();
    filters.generateCuisines();

    setFilters({
      countries: filters.countries,
      currencies: filters.currencies,
      cuisines: filters.cuisines,
    });
  };

  const findRestaurant = async (url) => {
    const filteredRestaurants = await getRestaurants(url);
    setRestaurants(filteredRestaurants);
  };

  useEffect(() => {
    getFilters();
  }, []);

  useEffect(
    () =>
      setSearchQueryUrl(
        `name=${search.name}&address=${search.address}&city=${search.city}&locality=${search.locality}`
      ),
    [search]
  );

  const filteredRestaurantList = restaurants.map((restaurant) => (
    <Card key={restaurant.id} data={restaurant} />
  ));

  return (
    <main>
      <header>
        <h2> Foodiez </h2> <a href="/"> Login </a>{" "}
      </header>
      <section className="searchBar">
        <h4> Search for your favourite restaurant! </h4>
        <form>
          <input
            type="text"
            value={search.name}
            placeholder="Name(eg. Applebees)"
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
          />
          <input
            type="text"
            value={search.address}
            onChange={(e) => setSearch({ ...search, address: e.target.value })}
            placeholder="Address"
          />
          <input
            type="text"
            value={search.city}
            placeholder="City(eg. New York)"
            onChange={(e) => setSearch({ ...search, city: e.target.value })}
          />
          <input
            type="text"
            value={search.locality}
            onChange={(e) => setSearch({ ...search, locality: e.target.value })}
            placeholder="Locality"
          />
          <button
            className="btn btn-sm btn-success"
            onClick={(e) => {
              e.preventDefault();
              findRestaurant(searchQueryUrl);
            }}
          >
            Search
          </button>
        </form>
      </section>
      <div className="bottom">
        <section className="filters">
          <h5>FILTERS</h5>
          <FilterForm
            filters={filters}
            findRestaurant={findRestaurant}
            searchQueryUrl={searchQueryUrl}
          />
        </section>
        <div className="right">
          {restaurants.length < 1 && (
            <h5 style={{ color: "gray", textAlign: "center", padding: 40 }}>
              No Restaurants
            </h5>
          )}
          <section className="restaurantList">
            {restaurants.length >= 1 && filteredRestaurantList}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
