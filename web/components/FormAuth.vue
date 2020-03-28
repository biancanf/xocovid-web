<template>
  <v-container>
    <v-form @submit.prevent="$emit('login_user', form.values)" ref="form">
      <h3>{{title}}</h3>
      <p>{{validate}}</p>
      <v-text-field
        v-for="(input, i) in form.labels"
        :key="i"
        v-model="form.values[i]"
        :label="input"
      ></v-text-field>
      <v-btn type="submit" color="#103458" width="100%">{{btn_title}}</v-btn>
    </v-form>
    <slot />
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    validate: {
      required: true,
      type:String
    },
    form: {
      required: true,
      type: Object
    },
    btn_title: {
      required: true,
      type: String
    }
  }
};
</script>

<style>
button {
  font-weight: 500 !important;
  color: #fff !important;
  margin-bottom: 10px;
}
a {
  text-decoration: inherit !important;
}
h4 {
  color: #00000087;
  text-align: center;
  font-weight: normal;
}
form h3 {
  font-size: 30px;
  font-weight: 500;
}
</style>