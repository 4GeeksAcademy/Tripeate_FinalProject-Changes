const backendURL = process.env.BACKEND_URL

const getState = ({ getStore, getActions, setStore }) => {
	const storedUser = localStorage.getItem("currentUser")
	return {
		store: {
			userEmail: "",
			user: null,
			currentUser: storedUser ? JSON.parse(storedUser) : null,
			users: [],
			plans: [], 
			itemType: null

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
					return { error: true, msg: "Error en la solicitud" }; // Indica un error de red u otro tipo de error
				}
			},

			loginUser: async (email, password) => {
				try {
					const response = await fetch(backendURL + "/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${localStorage.getItem("token")}`
						},
						body: JSON.stringify({ email, password }),
					});

					if (response.ok) {
						const data = await response.json();
						console.log("Inicio de sesión exitoso:", data);
						console.log({ "Email del usuario": data.user.email });
						setStore({ currentUser: data.user, token: data.token })
						localStorage.setItem("currentUser", JSON.stringify(data.user));
						// Devuelve los datos recibidos, como el token y el ID de usuario
						return { success: true, token: data.token, userId: data.Id, is_admin: data.is_admin };
					} else {
						const errorData = await response.json();
						console.error("Error en el inicio de sesión:", errorData.msg);
						return { error: true, msg: errorData.msg }; // Retorna el mensaje de error si el login falla
					}
				} catch (error) {
					console.error("Error en la solicitud de inicio de sesión:", error);
					return { error: true, msg: "Error en la solicitud" }; // Indica un error de red u otro tipo de error
				}
			},

			getUsersList: async () => {
				let resp = await fetch(backendURL + "/users", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				});
				if (resp.ok) {
					let dataUsers = await resp.json();
					setStore({ users: dataUsers.users })
					console.log({ dataUsers })
				}
			},

			getPlansList: async () => {
				try {
					let resp = await fetch(backendURL + "/plans", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							// "Authorization": `Bearer ${localStorage.getItem("token")}`
						}
					});
					if (resp.ok) {
						const dataPlans = await resp.json();
						setStore({ plans: dataPlans.plans })
						console.log("Planes en el store:", getStore().plans);
						return dataPlans.plans

					} else {
						// Manejo de errores si la respuesta no es exitosa
						const errorData = await resp.json();
						console.error("Error al obtener planes:", errorData);
						setStore({ plans: [] });
					}
				} catch (error) {
					console.error("Error en la llamada a la API:", error);
					setStore({ plans: [] });
				}
			},
			managePlan: async (planId, action) => {
				try {

					console.log({planId, action})
					const bodyRequest = { "action": action }
					const headers = {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
					console.log(headers)
					let resp = await fetch(`${backendURL}/manage_plan/${planId}`, {
						method: "POST",
						body: JSON.stringify(bodyRequest),
						headers
					})
					if (!resp.ok) {
						console.error(resp.statusText)
						return false
					}
					return true
				} catch (error) {
					console.log(error)
				}
			},/*
			handlerDelete: async (id, type) => {
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`,
				};
			
				try {
					let resp;
					if (type === 'user') {
						resp = await fetch(`${backendURL}/delete_user/${id}`, {
							method: "DELETE",
							headers,
						});
					} else if (type === 'plan') {
						resp = await fetch(`${backendURL}/delete_plan/${id}`, {
							method: "DELETE",
							headers,
						});
					} else {
						console.error("Tipo no válido");
						return;
					}
			
					if (resp.status === 404) {
						console.log(`No se puede eliminar el ${type}`);
					} else if (resp.status === 200) {
						if (type === 'user') {
							let data = await resp.json();
							setStore({ users: data });
							console.log(`Usuario eliminado exitosamente`);
						} else if (type === 'plan') {
							let dataPlans = await resp.json();
							setStore({ plans: dataPlans });
							console.log(`Plan eliminado exitosamente`);
						}
					}
				} catch (error) {
					console.error("Error al eliminar:", error);
				}
			},*/
			deleteUser: async (id, type) => {
				let resp = await fetch(`${backendURL}/delete_user/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				});
				if (resp.status === 404) {
					console.log("No se puede eliminar el usuario");
					console.log(`No se puede eliminar el ${type}`);
				}
				if (resp.status === 200) {
					let data = await resp.json();
					console.log({ data });
					setStore({ users: data });
				}
			},
			deletePlan: async (id, type) => {
				let resp = await fetch(`${backendURL}/delete_plan/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				});
				if (resp.status === 404) {
					console.log("No se puede eliminar el Plan");
					console.log(`No se puede eliminar el ${type}`);
				}
				if (resp.status === 200) {
					let dataPlans = await resp.json();
					console.log({ dataPlans });
					setStore({ plans: dataPlans });
				}
			},
			/*logoutUser: async = () => {
				/*let store = getStore()
				setStore({ token: null, currentUser: null });
				localStorage.removeItem("currentUser"); // Elimina el usuario de localStorage
			},*/
		}
	};
};

export default getState;
