const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

		},
		actions: {
			signupUser: async (nombre, apellido, email, password) => {
				try {
					const response = await fetch(`https://hidden-spider-5g49j5g447grc45x7-3001.app.github.dev/api/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							nombre: nombre,
							apellido: apellido,
							email: email,
							password: password,
						}),
					});

					if (response.ok) {
						const data = await response.json();
						console.log("Usuario registrado:", data.user);
						return data; // Devuelve los datos si el registro fue exitoso
					} else {
						const errorData = await response.json();
						console.error("Error en el registro:", errorData.msg);
						return { error: true, msg: errorData.msg }; // Devuelve un mensaje de error si falló
					}
				} catch (error) {
					console.error("Error en la solicitud:", error);
					return { error: true, msg: "Error en la solicitud" }; // Indica un error de red u otro tipo de error
				}
			},
		}
	};
};

export default getState;
