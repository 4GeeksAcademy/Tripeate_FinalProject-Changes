const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			
		},
		actions: {

			registerUser: async (userData) => {
				try {
				  const response = await fetch("", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json"
					},
					body: JSON.stringify(userData)
				  });
				  if (!response.ok) throw new Error("Error al registrar usuario");	
				  const data = await response.json();
				  console.log("Usuario registrado con éxito:", data);
				  // Actualiza el estado del usuario en el store
				  setStore({ user: data });
				  return data;
				} catch (error) {
				  console.error("Error en el registro:", error);
				  return null;
				}
			  },
		}
	};
};

export default getState;
