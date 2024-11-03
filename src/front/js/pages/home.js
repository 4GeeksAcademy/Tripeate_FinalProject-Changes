import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

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
					<div class="carousel-item">
						<img src="https://fastly.picsum.photos/id/15/1180/520.jpg?hmac=l3V9r2I2L2s9ASxJaLo_3FZ-PnqkMNJ13zaq8pJZCDs" class="d-block w-100" alt="..." />
						<div className="overlay"></div>
						<div class="carousel-caption d-none d-md-block  texto-fotos">
							<h5>Second slide label</h5>
							<p>Some representative placeholder content for the second slide.</p>
						</div>
					</div>
					<div class="carousel-item">
						<img src="https://fastly.picsum.photos/id/15/1180/520.jpg?hmac=l3V9r2I2L2s9ASxJaLo_3FZ-PnqkMNJ13zaq8pJZCDs" class="d-block w-100" alt="..." />
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


		</div>
	);
};
