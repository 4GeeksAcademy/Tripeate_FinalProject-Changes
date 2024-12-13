import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import"../../styles/tripCards.css";


export const TripCards = ({name, image, caption }) => {
    return (
        <div className="card tripsCard d-inline-flex mx-3">
					<img src={image || "https://fastly.picsum.photos/id/13/350/192.jpg?hmac=WL2y535NoIb9gWNgdcEs71DBlZXfkdfN6Lt7jypz_v4"} className="card-img-top" alt={name}/>
						<div className="card-body">
							<h5 className="card-title">{name}</h5>
							<p className="card-text">{caption}</p>
						<Link to="/detailTrip">						
								<p>Tripea más</p>
						</Link>	
						</div>		
				</div>

    )
};
TripCards.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string,
	caption: PropTypes.string
};