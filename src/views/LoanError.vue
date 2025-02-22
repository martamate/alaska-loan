<template>
  <div class="loan-error">
    <h2>Error</h2>
    <p>
      Hubo un problema con tu solicitud. Por favor, verifica el ID o intenta de
      nuevo más tarde.
    </p>
    <!-- Botón para redirigir al home -->
    <router-link to="/home">Volver al inicio</router-link>
  </div>
</template>

<script>
export default {
  name: "LoanError",
};
</script>

<style scoped>
.loan-error {
  text-align: center;
  padding: 50px;
}

h2 {
  color: red;
  font-size: 2rem;
}

p {
  margin: 20px 0;
}

router-link {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
