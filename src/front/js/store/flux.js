const backendURL = process.env.BACKEND_URL

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			users: [],
			plans: []

		},
		actions: {
			signupUser: async (name, last_name, email, password) => {
				try {
					const response = await fetch(backendURL + "/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							name: name,
							last_name: last_name,
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
					console.error("Error en el registro:", error);
					return null;
					console.error("Error en la solicitud:", error);
					return { error: true, msg: "Error en la solicitud" }; // Indica un error de red u otro tipo de error
				}
			},

			getUsersList: async () => {
				let resp = await fetch(backendURL + "/users", {
					method: "GET",
					headers: {
						"Content-Type": "aplication/json",
					}
				});
				if (resp.ok) {
					let dataUsers = await resp.json();
					console.log({ dataUsers })
					setStore({ users: dataUsers.users })
				}
			},

			getPlansList: async () => {
				let resp = await fetch(backendURL + "/plans", {
					method: "GET",
					headers: {
						"Content-Type": "aplication/json",
					}
				});
				if (resp.ok) {
					let dataPlans = await resp.json();
					console.log({ dataPlans })
					setStore({ plans: dataPlans.plans })
				}
			},
			deleteUser: async (id) => {
				let resp = await fetch(`${backendURL}/delete_user/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					}
				});
				if (resp.status === 404) {
					console.log("No se puede eliminar el usuario")
				}
				if (resp.status === 200) {
					let data = await resp.json();
					console.log({ data });
					setStore({ users: data });
				}
			},
			deletePlan: async (id) => {
				let resp = await fetch(`${backendURL}/delete_plan/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					}
				});
				if (resp.status === 404) {
					console.log("No se puede eliminar el Plan")
				}
				if (resp.status === 200) {
					let data = await resp.json();
					console.log({ data });
					setStore({ plans: data });
				}
			}
		}
	};
};

export default getState;
