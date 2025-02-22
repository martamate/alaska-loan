<template>
  <div class="loan-home">
    <h1>Bienvenido a Alaska Circular</h1>
    <p>Apoya la economía circular solicitando un préstamo para tu compra.</p>
    <router-link :to="'/prestamo/' + userId">Solicitar préstamo</router-link>
  </div>
</template>

<script>
export default {
  name: "LoanHome",
  data() {
    return {
      userId: null,
    };
  },
  methods: {
    async fetchUserData() {
      try {
        // Aquí se hace la llamada a la API para obtener los datos del usuario
        const response = await fetch(
          "https://api7.cloudframework.io/recruitment/fullstack/users?id=1",
          {
            headers: {
              "X-WEB-KEY": "Development",
            },
          }
        );
        const data = await response.json();

        if (data.status === 200 && data.data) {
          this.userId = data.data.id; // Usamos el id del usuario para redirigir en el router-link
        } else {
          console.error("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Hubo un error al obtener los datos:", error);
      }
    },
  },
  mounted() {
    // Llamamos a la función para obtener los datos del usuario cuando el componente se monta
    this.fetchUserData();
  },
};
</script>

<style scoped>
/* Estilos generales */
.loan-home {
  text-align: center;
  padding: 40px;
  background: #f5f5f0;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
  font-family: "Arial", sans-serif;
}

h1 {
  font-size: 2.5rem;
  color: #3a4d39;
  margin-bottom: 15px;
}

p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 25px;
}

/* Enlace "Solicitar préstamo" */
.router-link-active {
  color: #6d8b74;
  font-weight: bold;
}

router-link {
  display: inline-block;
  padding: 12px 30px;
  font-size: 1.1rem;
  text-decoration: none;
  background: #6d8b74;
  color: white;
  border-radius: 6px;
  transition: background 0.3s ease, transform 0.2s ease;
  margin-top: 10px;
}

router-link:hover {
  background: #5a7563;
  transform: scale(1.05);
}
</style>
