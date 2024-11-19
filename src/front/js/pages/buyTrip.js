import React from "react";
import { Link } from "react-router-dom";
import "../../styles/buyTrip.css"

export const BuyTrip = () => {

    return (
        <div className="container">


            <div className="container mt-5">
                <div className="row g-0">
                    <div className="col-md-6">
                        <div className="card buyCard">
                            <div className="card-body">
                                <h4 className="card-title">Datos de la empresa</h4>
                                <div class="alert alert-warning" role="alert">
                                    <strong>Para completar tu reserva</strong> <br></br>comunicate con el proveedor del servicio.
                                </div>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            </div>
                            <div className="card-footer border-0 d-flex align-items-center justify-content-end">
                                <Link to="/">
                                    <a href="#" className="btn btn-outline-primary rounded-pill">ir al Home</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card buyCard">
                            <div className="card-body">
                                <div className="d-flex">
                                    <div className="card-body">
                                        <h2 className="card-title">Full-day a Cayo sombrero</h2>
                                        <span className="card-subtitle mb-2 text-muted">
                                            <a href="#" className="card-link text-black">por  TuFullDayVenezuela</a>
                                        </span>
                                        <div className="mt-3 d-flex align-items-center">
                                            <h5 className="card-subtitle me-3">Paquete:</h5>
                                            <p className="me-3">Medio</p>
                                            <Link to="/detailTrip">
                                                <a href="#" className="btn btn-outline-primary rounded-pill btn-sm">cambiar plan</a>
                                            </Link>
                                        </div>
                                    </div>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy6U8APLewA6Lae1YGyu1dY8Vwe7BFt1ZbJA&s" className="img-fluid" alt="..." />
                                </div>


                            </div>
                            <div className="card-footer border-0 d-flex align-items-center justify-content-between">
                                <h4>Total</h4>
                                <h4>$140,00</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}
{/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy6U8APLewA6Lae1YGyu1dY8Vwe7BFt1ZbJA&s" className="card-img" alt="..." /> */ }