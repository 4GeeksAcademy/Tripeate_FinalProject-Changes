import React from "react";
import { Link, useParams } from "react-router-dom";
import"../../styles/tripCards.css";


export const TripCards = () => {


    return (

        <div className="card tripsCard d-inline-flex mx-3">
					<img src="https://fastly.picsum.photos/id/13/350/192.jpg?hmac=WL2y535NoIb9gWNgdcEs71DBlZXfkdfN6Lt7jypz_v4" className="card-img-top" alt="..."/>
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcor</p>
						<Link to="/detailTrip">						
								<a href="#" className="rounded-pill mt-3 btn btn-primary">Tripea más</a>
						</Link>	
						</div>		
				</div>

    )
}