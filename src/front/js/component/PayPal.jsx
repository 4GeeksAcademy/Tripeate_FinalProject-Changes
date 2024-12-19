import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export const Paypal = ({tripPrice, name, travelers}) => {

    const paypal = useRef();

    useEffect( () => {
        window.paypal.Buttons({

            createOrder: (data, actions, err)=>{
                return actions.order.create({

                    intent: "CAPTURE",
                    purchase_units: [
                        {  
                            description: name +" X"+ travelers ,
                            amount: 
                            {
                                currency_code: "USD",
                                value: tripPrice,
                            }
                        },
                    ]
                })
            },

            onApprove: async (data, actions) =>{

                const order = await actions.order.capture();
                console.log("Pago exitoso")

            },

            onError: (err) => {
                console.log(err)
            }
        })
        .render(paypal.current)

    },[])

    return (
    <div>
        <div ref={paypal}></div>
    </div>
    )
}