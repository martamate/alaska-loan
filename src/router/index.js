import Vue from "vue";
import Router from "vue-router";
import LoanHome from "@/views/LoanHome.vue";
import LoanError from "@/views/LoanError.vue";
import LoanForm from "@/components/LoanForm.vue";
import LoanSummary from "@/components/LoanSummary.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/prestamo/:id", // Ruta para el formulario
      name: "LoanForm",
      component: LoanForm,
    },
    {
      path: "/resumen", // Ruta para el resumen
      name: "LoanSummary",
      component: LoanSummary,
    },
    {
      path: "/home", // Ruta para la página principal
      name: "LoanHome",
      component: LoanHome,
    },
    {
      path: "/error", // Ruta para la página de error
      name: "LoanError",
      component: LoanError,
    },
    {
      path: "*", // Redirige cualquier ruta no encontrada al error
      redirect: "/error",
    },
  ],
});
