import React from "react";
import { Link } from "react-router-dom";
import "../../styles/buyTrip.css"

export const BuyTrip = () => {

    return (
        <div className="container">


            <div className="container mt-5">
                <div className="row g-0">
                    <div className="col-md-6">
                        <div className="card buyCard ">
                            <div className="card-body  m-3">

                                <h4 className="card-title">Datos de la empresa</h4>
                                <div className="card-text mt-3">
                                    <i className="ms-3 fa-solid fa-phone"></i><span className="m-3">+58 414-9522501 / +58 412-5489535</span><br></br>
                                    <i className="ms-3 fa-solid fa-inbox"></i><span className="ms-3">tufulldayvenezuela@gmail.com</span><br></br>
                                    <i className="ms-3 fa-brands fa-instagram"></i><span className="ms-3">@tufulldayvenezuela</span><br></br>
                                    <i className="ms-3 fa-brands fa-facebook"></i><span className="ms-3">@tufulldayvenezuela</span>
                                </div>
                                <div className="alert alert-warning mt-3" role="alert">
                                    <strong>Para completar tu reserva</strong> <br></br>comunicate con el proveedor del servicio.
                                </div>

                            </div>
                            <div className="card-footer border-0 d-flex align-items-center justify-content-end">
                                <Link to="/">
                                    <a href="#" className="btn btn-outline-light rounded-pill">ir al Home</a>
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
                                        <div className="mt-5 d-flex align-items-center">
                                            <h5 className="card-subtitle me-3"><strong>Paquete:</strong></h5>
                                            <p className="me-3">Medio</p>
                                            <Link to="/detailTrip">
                                                <a href="#" className="btn btn-outline-primary rounded-pill btn-sm">cambiar plan</a>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy6U8APLewA6Lae1YGyu1dY8Vwe7BFt1ZbJA&s" className=" border-0 img-fluid img-thumbnail" alt="..." />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="card-text p-2 m-0 d-flex justify-content-between">
                                    <p>Fecha</p> <p>13/11/2024</p>
                                </div>
                                <div className="card-text p-2 mt-3 d-flex justify-content-between">
                                    <p>Hora de salida/llegada</p> <p>6:30 am / 6:30 pm</p>
                                </div>
                                <div className="card-text p-2 mt-3 d-flex justify-content-between">
                                    <p>Ubicación de salida/llegada</p> <p>Pza. Venezuela</p>
                                </div>
                                <div className="card-text p-2 mt-3 d-flex justify-content-between">
                                    <p>Viajeros</p> <p>+ 2 -</p>
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