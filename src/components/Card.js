import "../styles/card.scss";
import Modal from "react-modal";
import { useState } from "react";

const Card = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "whitesmoke",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  return (
    <div className="r-card">
      <h5 className="name">{data.name}</h5>
      <h6 className="location text-muted">
        {data.city}, {data.country}
      </h6>
      <p>
        Rating: {data.aggregate_rating}, {data.rating_text}
      </p>
      <a href="#" onClick={() => setModalOpen(true)} className="card-link">
        More
      </a>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
        <button onClick={() => setModalOpen(false)}>x</button>
        <h5 className="name">{data.name}</h5>
        <h6 className="location text-muted">
          {data.city}, {data.country}
        </h6>
        <p>Address: {data.address}</p>
        <p>
          Location: {data.locality_verbose}, {data.country}
        </p>
        <p>
          Rating: <b>{data.aggregate_rating}</b>, <i>({data.votes} votes)</i>,{" "}
          {data.rating_text}
        </p>
        <p>Table Booking: {data.has_table_booking ? "YES" : "NO"}</p>
        <p>Currency: {data.currency}</p>
        <p>Average Cost(for 2): {data.average_cost_for_two}</p>
      </Modal>
    </div>
  );
};

export default Card;
