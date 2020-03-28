<template>
  <v-container fluid>
    <form-auth
      @login_user="login_user"
      title="Login"
      :form="form[0]"
      btn_title="Entrar"
      :validate="validate"
    >
      <p style="font-size:14px;">
        <n-link to="/forgot_password">Esqueci minha senha!</n-link>
      </p>
      <h4>
        Não tem conta?
        <b>
          <n-link to="/register">CADASTRE-SE</n-link>
        </b>
      </h4>
    </form-auth>
    <!-- <form-auth
      :class="form[1].visibility"
      title="Cadastre-se"
      :text_field="form[1].text_field"
      btn_title="Cadastrar"
    />
    <form-auth
      :class="form[2].visibility"
      title="Recuperação de senha"
      :text_field="form[2].text_field"
      btn_title="Enviar"
    />-->
  </v-container>
</template>

<script>
import FormAuth from "../components/FormAuth.vue";
import axios from "axios";

export default {
  components: {
    FormAuth
  },
  data() {
    return {
      validate: "",
      form: [
        {
          labels: ["Email", "Senha"],
          values: ["", ""]
        }
      ]
    };
  },
  methods: {
    login_user: function(values) {
      const user = {
        email: values[0],
        password: values[1]
      };

      axios
        .post("http://localhost:3333/session", user)
        .then(function(res) {
          if (res.status === 204) {
            return (window.location.href = "/dashboard");
          }
          console.log(res)
          return this.validate = "Email ou senha inválido";
        })
        .catch(function(error) {
          console.log(error);
        });

    }
  }
};
</script>

<style>
* {
  font-family: "Montserrat";
}
a {
  color: #00000090 !important;
}
</style>