import { useState } from "react";
import "../styles/filterform.scss";

const FilterForm = (props) => {
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [bookings, setBookings] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const generateOptions = (arr) => {
    return arr.map((el) => <option key={el} value={el} />);
  };

  const generateUrl = () => {
    let url = props.searchQueryUrl;

    const countryFilter = country !== "" ? `&country=${country}` : "";
    const currencyFilter = currency !== "" ? `&currency=${currency}` : "";
    const cuisineFilter = cuisine !== "" ? `&cuisine=${cuisine}` : "";
    const priceFilter = maxPrice !== "" ? `&cost=${maxPrice}` : "";
    const ratingFilter = minRating !== "" ? `&rating=${minRating}` : "";
    const bookingsFilter = `&bookings=${bookings}`;
    const deliveryFilter = `&delivery=${delivery}`;

    url =
      url +
      bookingsFilter +
      deliveryFilter +
      countryFilter +
      currencyFilter +
      cuisineFilter +
      priceFilter +
      ratingFilter;

    return url;
  };

  const filterResults = async (e) => {
    e.preventDefault();
    const queryString = generateUrl();
    await props.findRestaurant(queryString);
    setCountry("");
    setCurrency("");
    setCuisine("");
    setMaxPrice("");
    setMinRating("");
    setBookings(false);
    setDelivery(false);
  };

  return (
    <form className="filterForm">
      <input
        className="form-control"
        list="countryOptions"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <datalist id="countryOptions">
        {generateOptions(props.filters.countries)}
      </datalist>
      <input
        className="form-control"
        list="currencyOptions"
        placeholder="Currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      />
      <datalist id="currencyOptions">
        {generateOptions(props.filters.currencies)}
      </datalist>
      <input
        className="form-control"
        list="cuisineOptions"
        placeholder="Cuisine"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      />
      <datalist id="cuisineOptions">
        {generateOptions(props.filters.cuisines)}
      </datalist>
      <div>
        <input
          type="number"
          className="form-control"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          className="form-control"
          placeholder="Min Rating"
          value={minRating}
          min="0"
          max="4"
          onChange={(e) => setMinRating(e.target.value)}
        />
      </div>
      <label className="form-check-label" htmlFor="bookings">
        <span>BOOKINGS</span>
        <input
          type="checkbox"
          id="bookings"
          checked={bookings}
          onChange={() => setBookings(!bookings)}
        />
      </label>
      <label className="form-check-label" htmlFor="delivery">
        <span>DELIVERY</span>
        <input
          type="checkbox"
          id="delivery"
          checked={delivery}
          onChange={() => setDelivery(!delivery)}
        />
      </label>
      <button className="btn btn-sm btn-success" onClick={filterResults}>
        Use
      </button>
    </form>
  );
};

export default FilterForm;
