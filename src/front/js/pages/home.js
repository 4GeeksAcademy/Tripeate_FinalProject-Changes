import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { TripCards } from "../component/tripCards";
import tripArte from "../../img/arteTrips.png";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-center mt-3">

			<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>


				<div className="carousel-inner">


					<div className="carousel-item active">
						<img src="https://fastly.picsum.photos/id/15/1180/520.jpg?hmac=l3V9r2I2L2s9ASxJaLo_3FZ-PnqkMNJ13zaq8pJZCDs" className="d-block w-100" alt="..." />
						<div className="overlay"></div>
						<div className=" carousel-caption d-none d-md-block texto-fotos ">
							<h5>First slide label</h5>
							<p>Some representative placeholder content for the first slide.</p>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://fastly.picsum.photos/id/15/1180/520.jpg?hmac=l3V9r2I2L2s9ASxJaLo_3FZ-PnqkMNJ13zaq8pJZCDs" className="d-block w-100" alt="..." />
						<div className="overlay"></div>
						<div className="carousel-caption d-none d-md-block  texto-fotos">
							<h5>Second slide label</h5>
							<p>Some representative placeholder content for the second slide.</p>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://fastly.picsum.photos/id/15/1180/520.jpg?hmac=l3V9r2I2L2s9ASxJaLo_3FZ-PnqkMNJ13zaq8pJZCDs" className="d-block w-100" alt="..." />
						<div className="overlay"></div>
						<div class="carousel-caption d-none d-md-block texto-fotos">
							<h5>Third slide label</h5>
							<p>Some representative placeholder content for the second slide.</p>
						</div>
					</div>
				</div>




				<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>

			<div className="arteTrip">
				<img src={tripArte} className="img-fluid" />
			</div>

			<div className="container d-inline-flex justify-content-between">
				<h4>Trips</h4>
				<div className="btn-group dropend">
					<button type="button" className="rounded-pill btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						Categorias
					</button>
					<ul className="dropdown-menu">
						<li>Playa</li>
						<li>Montaña</li>
						<li>Ciudad</li>
						<li>Otros</li>
					</ul>
				</div>
			</div>

			<div className="container allCards">
				<div className="row ">
					<div className="col-md-12 ">
						<TripCards />
						<TripCards />
						<TripCards />
					</div>
				</div>
				<div className="row ">
					<div className="col-md-12 ">
						<TripCards />
						<TripCards />
						<TripCards />
					</div>
				</div>



			</div>


		</div>
	);
};
