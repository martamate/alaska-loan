<template>
  <div class="loan-form">
    <h2>Solicitud de préstamo</h2>
    <p class="subtext">Completa el formulario con tus datos.</p>

    <div v-if="error" class="error-message">
      <p>Hubo un error al cargar los datos. Inténtalo de nuevo.</p>
    </div>

    <form v-if="user" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" v-model="user.name" readonly />
      </div>
      <div class="form-group">
        <label for="surname">Apellidos</label>
        <input type="text" v-model="user.surname" readonly />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="user.email" readonly />
      </div>
      <div class="form-group">
        <label for="phone">Teléfono</label>
        <input type="text" v-model="user.phone" required />
      </div>
      <div class="form-group">
        <label for="age">Edad</label>
        <input type="number" v-model="user.age" required />
      </div>
      <div class="form-group">
        <label for="loan_amount">Importe del préstamo (€)</label>
        <input
          type="number"
          v-model="loanAmount"
          min="10"
          max="1000"
          required
        />
      </div>
      <div class="form-group">
        <label for="loan_date">Fecha de préstamo</label>
        <input type="date" v-model="loanDate" :min="minDate" required />
      </div>
      <div class="form-group">
        <label for="loan_weeks">Años para devolver</label>
        <select v-model="loanWeeks" required>
          <option v-for="n in 20" :key="n" :value="n">{{ n }} años</option>
        </select>
      </div>
      <div class="form-group checkbox-group">
        <input type="checkbox" id="terms" v-model="termsAccepted" required />
        <label for="terms">
          Acepto los
          <a
            href="https://cloudframework.io/terminos-y-condiciones/"
            target="_blank"
          >
            términos y condiciones
          </a>
        </label>
      </div>
      <button type="submit">Enviar solicitud</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoanForm",
  data() {
    return {
      user: null,
      error: false,
      loanAmount: null,
      loanDate: null,
      loanWeeks: null,
      termsAccepted: false,
      minDate: new Date().toISOString().split("T")[0],
    };
  },
  methods: {
    async fetchUserData() {
      const id = this.$route.params.id;

      if (id !== "1" && id !== "2") {
        this.error = true;
        return;
      }

      try {
        const response = await fetch(
          `https://api7.cloudframework.io/recruitment/fullstack/users?id=${id}`,
          {
            headers: {
              "X-WEB-KEY": "Development",
            },
          }
        );
        const data = await response.json();

        if (data.status === 200 && data.data) {
          this.user = data.data;
        } else {
          this.error = true;
        }
      } catch (error) {
        this.error = true;
      }
    },
    submitForm() {
      // Enviar los datos al endpoint
      const formData = {
        phone: this.phone,
        age: this.age,
        loan_amount: this.loanAmount,
        loan_date: this.loanDate,
        loan_weeks: this.loanWeeks,
      };

      fetch(
        `https://api7.cloudframework.io/recruitment/fullstack/users/${this.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-WEB-KEY": "Development",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 201) {
            this.$router.push({
              name: "LoanSummary",
              query: {
                ...formData,
                name: this.user.name,
                surname: this.user.surname,
                email: this.user.email,
              },
            });
          } else {
            this.$router.push("/error");
          }
        })
        .catch(() => this.$router.push("/error"));
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>

<style scoped>
/* Estilos generales */
.loan-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
  background: #f5f5f0;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
  height: 100%;
  max-width: 900px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
  width: 80%;
  box-sizing: border-box;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-size: 0.9rem;
  color: #3a4d39;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d1c7;
  border-radius: 6px;
  background: #fafaf5;
  font-size: 1rem;
  transition: border 0.3s ease;
}

input:focus,
select:focus {
  border-color: #8c9a85;
  outline: none;
}

/* Estilo para los campos de solo lectura */
input[readonly] {
  background: #eaeaea;
  border-color: #ccc;
  cursor: not-allowed;
}

/* Checkbox */
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-group input {
  width: auto;
}

/* Estilo para el mensaje de error */
.error-message p {
  color: red;
  font-size: 1rem;
  font-weight: bold;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  text-align: center;
}

/* Botón */
button {
  background: #6d8b74;
  color: white;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
  background: #5a7563;
  transform: scale(1.02);
}

/* Responsive */
@media (max-width: 1024px) {
  .loan-form {
    padding: 15px;
    max-width: 80%;
  }

  h2 {
    font-size: 1.8rem;
  }

  .subtext {
    font-size: 1rem;
  }

  button {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .loan-form {
    padding: 10px;
    max-width: 90%;
  }

  h2 {
    font-size: 1.6rem;
  }

  .subtext {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.85rem;
  }

  .form-group label {
    font-size: 0.85rem;
  }

  .form-group input,
  .form-group select {
    font-size: 0.9rem;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .loan-form {
    padding: 8px;
    max-width: 95%;
  }

  h2 {
    font-size: 1.4rem;
  }

  .subtext {
    font-size: 0.8rem;
  }

  button {
    font-size: 0.8rem;
  }

  .form-group label {
    font-size: 0.8rem;
  }

  .form-group input,
  .form-group select {
    font-size: 0.85rem;
    padding: 7px;
  }
}
</style>
