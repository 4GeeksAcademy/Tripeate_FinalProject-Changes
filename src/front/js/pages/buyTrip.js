import React, {useContext, useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/buyTrip.css"
import { Paypal } from "../component/PayPal.jsx";
import { Context } from "../store/appContext";

export const BuyTrip = () => {
    const { planId } = useParams(); // 
        const { store, actions } = useContext(Context);
        const [plan, setPlan] = useState(null);

        


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
                            <div className="card buyCard ">
                                <div className="card-body m-3">
                                    < Paypal />
                                    <h4 className="card-title">Datos de la empresa</h4>
                                    <div className="card-text mt-3">
                                        <i className="ms-3 fa-solid fa-phone"></i>
                                        <span className="m-3">+58 414-9522501 / +58 412-5489535</span><br />
                                        <i className="ms-3 fa-solid fa-inbox"></i>
                                        <span className="ms-3">tufulldayvenezuela@gmail.com</span><br />
                                        <i className="ms-3 fa-brands fa-instagram"></i>
                                        <span className="ms-3">@tufulldayvenezuela</span><br />
                                        <i className="ms-3 fa-brands fa-facebook"></i>
                                        <span className="ms-3">@tufulldayvenezuela</span>
                                    </div>
                                    {/* <div className="alert alert-warning mt-3" role="alert"> 
                                        <strong>Para completar tu reserva</strong> <br /> comunicate con el proveedor del servicio.  /////// Esto era en caso de que no se integrara paypal
                                    </div> */}
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
                                                <span href="#" className="card-link text-black">por TuFullDayVenezuela</span>
                                            </span>
                                            <div className="mt-5 d-flex align-items-center">
                                                <h5 className="card-subtitle me-3"><strong>Paquete:</strong></h5>
                                                <p className="me-3">{plan.package}</p>
                                                <Link to="/detailTrip">
                                                    <span href="#" className="btn btn-outline-primary rounded-pill btn-sm">cambiar plan</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <img src={plan.image} onError={imageError} className="border-0 img-fluid img-thumbnail" alt="..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="card-text p-2 m-0 d-flex justify-content-between">
                                        <p>Fecha</p> <p>{plan.date}</p>
                                    </div>
                                    <div className="card-text p-2 mt-3 d-flex justify-content-between">
                                        <p>Hora de salida/llegada</p> <p>{plan.departureTime} / {plan.arrivalTime}</p>
                                    </div>
                                    <div className="card-text p-2 mt-3 d-flex justify-content-between">
                                        <p>Ubicación de salida/llegada</p> <p>{plan.location}</p>
                                    </div>
                                    <div className="card-text p-2 mt-3 d-flex justify-content-between">
                                        <p>Viajeros</p> <p>{plan.travelers}</p>
                                    </div>
                                    
                                </div>
                                <div className="card-footer border-0 d-flex align-items-center justify-content-between">
                                    <h4>Total</h4>
                                    <h4>${plan.price}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };