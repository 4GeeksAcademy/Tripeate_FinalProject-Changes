import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/buyTrip.css"
import { Paypal } from "../component/PayPal.jsx";
import { Context } from "../store/appContext";

export const BuyTrip = () => {
    const { planId } = useParams(); // 
    const { store, actions } = useContext(Context);
    const [plan, setPlan] = useState(null);
    const [numberOfTravelers, setNumberOfTravelers] = useState(1);




    useEffect(() => {
        if (planId) {
            const fetchPlan = async () => {
                const response = await actions.getPlan(planId);
                console.log("Respuesta del plan:", response)
                console.log("planId en BuyTrip:", planId);
                if (response) {
                    setPlan(response);
                }
            };
            fetchPlan();
        } else {
            console.error("planId es undefined");
        }
    }, [planId, actions]);

    if (!plan) {
        return <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando...</span>
        </div>;
    };

    function imageError(e) {
        e.target.src = "https://fastly.picsum.photos/id/13/350/192.jpg?hmac=WL2y535NoIb9gWNgdcEs71DBlZXfkdfN6Lt7jypz_v4"
    };



    return (
        <div className="container">
            <div className="container mt-5">
                <div className="row g-0">
                    <div className="col-md-6">
                        <div className="card buyCard">
                            <div className="card-body m-3">
                                <h4 className="card-title">Pago en linea</h4>
                                < Paypal
                                    name={plan.name}
                                    tripPrice={(plan.trip_price)}
                                    travelers={numberOfTravelers}
                                />

                                <h4 className="card-title">Datos de la empresa</h4>
                                <div className="card-text mt-3">
                                    <i className="ms-3 fa-solid fa-phone"></i>
                                    <span className="m-3">{plan.phone_company}</span><br />
                                    <i className="ms-3 fa-solid fa-inbox"></i>
                                    <span className="ms-3">{plan.user_email}</span><br />
                                    <i className="ms-3 fa-brands fa-instagram"></i>
                                    <span className="ms-3">@{plan.instagram_company}</span><br />
                                    <i className="ms-3 fa-brands fa-facebook"></i>
                                    <span className="ms-3">@{plan.facebook_company}</span>
                                </div>
                                <div className="alert alert-warning mt-3" role="alert">
                                    <strong>Comunicate con el proveedor del servicio.</strong> <br /> para otros métodos de pago.
                                </div>
                            </div>
                            <div className="card-footer border-0 d-flex align-items-center justify-content-end">
                                <Link to="/">
                                    <span href="#" className="btn btn-outline-light rounded-pill">ir al Home</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card buyCard">
                            <div className="card-body">
                                <div className="d-flex">
                                    <div className="card-body">
                                        <h2 className="card-title">{plan.name}</h2>
                                        <span className="card-subtitle mb-2 text-muted">
                                            <span href="#" className="card-link">{plan.company_name}</span>
                                        </span>
                                        <p className="card-text w-75"><strong>{plan.caption}</strong></p>
                                    </div>
                                    <div className="card-body w-50">
                                        <img src={plan.image_company} onError={imageError} className="border-0 img-fluid img-thumbnail" alt="..." />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="card-text p-2 m-0 d-flex justify-content-between">
                                    <p>Fecha</p> <p>{plan.date_trip}</p>
                                </div>
                                <div className="card-text p-2 mt-3 d-flex justify-content-between">
                                    <p>Hora de salida/llegada</p> <p>{plan.time_start} / {plan.time_end}</p>
                                </div>
                                <div className="card-text p-2 mt-3 d-flex justify-content-between">
                                    <div>
                                        <p>Ubicación de salida/llegada</p>
                                    </div>
                                    <div className="d-block">
                                        <span>{plan.location_start}</span> /<br /> <span>{plan.location_end}</span>
                                    </div>

                                </div>
                                <div className="card-text p-2 mt-3 d-flex justify-content-between">
                                    <div>
                                        <p>Viajeros</p>
                                    </div>
                                    <div className="d-flex">
                                        <i className="fa-solid fa-circle-plus me-2" onClick={() => setNumberOfTravelers(numberOfTravelers + 1)}></i>
                                        <p>{numberOfTravelers}</p>
                                        <i className="fa-solid fa-circle-minus ms-2" onClick={() => setNumberOfTravelers(Math.max(1, numberOfTravelers - 1))}></i>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer border-0 d-flex align-items-center justify-content-between">
                                <h4>Total</h4>
                                <h4>${plan.trip_price * numberOfTravelers}</h4> {/* Mostrar el precio total calculado */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};