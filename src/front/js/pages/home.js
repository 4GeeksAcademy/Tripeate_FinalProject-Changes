import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { TripCards } from "../component/tripCards";
import tripArte from "../../img/arteTrips.png";

export const Home = () => {
	const { store, actions } = useContext(Context);
	// const { plans } = store
	const [acceptedPlans, setAcceptedPlans] = useState([]);
	const [favoritePlans, setFavoritePlans] = useState([]);
	const navigate = useNavigate();


	useEffect(() => {
		actions.getPlansList().then(plans => {
			setAcceptedPlans(plans.filter(plan => plan.status === 'Aceptado'))
		});
	}, []);

	useEffect(() => {
		const fetchFavorites = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const favorites = await actions.getFavorites();
					setFavoritePlans(favorites);
					console.log("Estos son los planes favoritos:", favorites);
				} catch (error) {
					console.error("Error al obtener favoritos:", error);
				}
			}
		};
	
		fetchFavorites();
	}, []);

	const filteredAcceptedPlans = acceptedPlans.filter(plan =>
		plan.name.toLowerCase()
	);

	const handleCardClick = (id) => {
		navigate(`/plans/${id}`);
	};

	const handleToggleFavorite = async (planId) => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href ="/loginuser";
			return;
		}
		const isFavorite = favoritePlans.some(favorite => favorite.id === planId);
		if (isFavorite){
			await actions.removeFavorite(planId);
			setFavoritePlans(prev => prev.filter(favorite => favorite.id != planId))
		} else {
			await actions.addFavorite(planId);
			const newFavorite = await actions.getPlan(planId);
			setFavoritePlans(prev => [...prev, newFavorite])
		}
    };

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
						<div className="carousel-caption d-none d-md-block texto-fotos">
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
					{filteredAcceptedPlans.length > 0 ? (
						filteredAcceptedPlans.map((plans) => (
							<div className="col-md-4" key={plans.id}>
								<TripCards
									name={plans.name}
									image={plans.image_location}
									caption={plans.caption}
									onClick={() => handleCardClick(plans.id)}
									isFavorite={favoritePlans.some(favorite => favorite.id === plans.id)}
                                    onToggleFavorite={() => handleToggleFavorite(plans.id)} />
							</div>
						))
					) : (
						<p>No hay planes disponibles.</p>
					)}

				</div>
			</div>
		</div>
	);
};
