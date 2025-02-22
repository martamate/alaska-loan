<template>
  <div class="loan-summary">
    <div class="success-message">
      <h2>¡Gracias por tu solicitud!</h2>
      <p>Hemos recibido los siguientes datos:</p>
    </div>
    <ul>
      <li><strong>Nombre:</strong> {{ user.name }} {{ user.surname }}</li>
      <li><strong>Email:</strong> {{ user.email }}</li>
      <li><strong>Teléfono:</strong> {{ user.phone }}</li>
      <li><strong>Edad:</strong> {{ user.age }}</li>
      <li><strong>Importe del préstamo:</strong> {{ loanAmount }} €</li>
      <li><strong>Fecha de préstamo:</strong> {{ loanDate }}</li>
      <li><strong>Tiempo de devolución:</strong> {{ loanWeeks }} semanas</li>
    </ul>
    <p>Nos pondremos en contacto contigo pronto.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: this.$route.query.name,
        surname: this.$route.query.surname,
        email: this.$route.query.email,
        phone: this.$route.query.phone,
        age: this.$route.query.age,
      },
      loanAmount: this.$route.query.loanAmount,
      loanDate: this.$route.query.loanDate,
      loanWeeks: this.$route.query.loanWeeks,
    };
  },
};
</script>

<style scoped>
.loan-summary {
  max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  background-color: #f8f8f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.success-message {
  text-align: center;
  background-color: #99b087;
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

h2 {
  font-size: 2rem;
  margin: 0;
  color: #3d5c47;
}

p {
  font-size: 1.1rem;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: 1rem;
  margin: 10px 0;
}

strong {
  font-weight: bold;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .loan-summary {
    padding: 20px;
  }

  h2 {
    font-size: 1.6rem;
  }

  p {
    font-size: 1rem;
  }

  li {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .loan-summary {
    padding: 15px;
  }

  h2 {
    font-size: 1.4rem;
  }

  p {
    font-size: 0.95rem;
  }

  li {
    font-size: 0.85rem;
  }
}
</style>
