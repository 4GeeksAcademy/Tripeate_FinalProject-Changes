import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import "../../styles/tripCards.css";
import "../../styles/detailTrip.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


export const TripCards = ({ name, image, caption }) => {

	function imageError(e) {
		e.target.src = "https://fastly.picsum.photos/id/13/350/192.jpg?hmac=WL2y535NoIb9gWNgdcEs71DBlZXfkdfN6Lt7jypz_v4"
	}

	return (
		<div className="card overflow-x-auto m-2" style={{ minHeight: "" }}>
			<img src={image} onError={imageError} className="card-img-top" alt={name} />
			<div className="card-body">
				<h5 className="card-title">{name}</h5>
				<p className="card-text">{caption}</p>
				<div className="d-flex justify-content-between" style={{ marginTop: "20px" }}>
					<Link to="detailTrip" className="btn btn-custom">
						Tripea más
					</Link>
					<button className="btn btn-danger"
						onClick={() => handlerClick({})}>
						<FontAwesomeIcon icon={faHeart} /></button>
				</div>
			</div>
		</div>

	)
};
TripCards.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string,
	caption: PropTypes.string
};