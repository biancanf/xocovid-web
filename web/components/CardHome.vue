<template>
  <v-card :color="back" class="card d-flex align-center flex-column">
    <v-card-title class="card-title">{{title}}</v-card-title>
    <v-card-text class="card-text">{{text}}</v-card-text>
  
    <slot />
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true
    },
    text: {
      type: String,
      require: true
    },
    back:{
      type: String
    }
  }
};
</script>

<style>

.card {
  text-align: center;
  font-family: "Montserrat", sans-serif;
  color: #74848b;
  margin:  auto;
  padding: 20px 0px;
  height: 380px;
  width: 300px;
  box-shadow: inherit!important;
  justify-content: space-between;
  border-radius: 80px!important;
}
.card img{
  border-radius: 0px!important;
}
.card-title {
  font-weight: 500;
  font-size: 35px;
  text-align: center;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: #000d2f;
}

.card-text{
  width: 280px;
}

</style>