import React, { useRef, useEffect } from "react";

export const Paypal = () => {

    const paypal = useRef();

    useEffect( () => {
        window.paypal.Buttons({

            createOrder: (data, actions, err)=>{
                return actions.order.create({

                    intent: "CAPTURE",
                    purchase_units: [
                        {  
                            description: "Buen Viaje",
                            amount: 
                            {
                                currency_code: "USD",
                                value: 1.00,
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