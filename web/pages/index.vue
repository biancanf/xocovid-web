<template>
  <v-container fluid >
    <header class="d-flex flex-column align-center">
      <v-img class="mt-4 mb-4" :src="require('../assets/logo.png')" width="140px" />
      <h2>
        <v-col md="7" style="margin:auto">
          O aplicativo para você visualizar a
          situação do coronavírus na sua cidade
        </v-col>
      </h2>
    </header>
    <v-row justify="space-between" class="pl-8 pr-8">
      <v-col xs="12">
        <card-home
          :back="back[0]"
          title="Mapa"
          text="Temos um mapa para você visualizar 
se existem pessoas próximas a você 
com suspeita e casos positivo do 
Covid-19"
        >
          <img :src="require('../assets/mapa.png')" width="180px" />
        </card-home>
      </v-col>
      <v-col xs="12">
        <card-home
          :back="back[1]"
          title="Cadastro"
          text="Para outras funções você pode se cadastrar"
        >
          <img :src="require('../assets/cadastrar.png')" width="220px" />
        </card-home>
      </v-col>
      <v-col xs="12">
        <card-home
          :back="back[2]"
          title="Sintomas"
          text="E saber o seu estado de saúde.
Mas atenção, ele não será 
um diagnóstico"
        >
          <img :src="require('../assets/sintomas.png')" width="170px" />
        </card-home>
      </v-col>
    </v-row>
    <div class="d-flex flex-column align-center">
      <v-progress-linear
        color="#fd0057"
        height="7"
        v-model="progress"
        style="width:230px"
        class="mb-3"
      />
    </div>
  </v-container>
</template>
<script>
import CardHome from "../components/CardHome.vue";

export default {
  components: {
    CardHome,
    
  },
  data() {
    return {
      count: 2,
      back: ["rgba(196, 196, 196, 0.2)", "#fff", "#fff"],
      progress: 100 / 3,
    };
  },
  methods: {
    show_cards: function() {
      if (this.count === 2) {
        this.back[1] = "rgba(196, 196, 196, 0.2)";
        this.back[0] = "#fff";
      } else if (this.count === 3) {
        this.back[2] = "rgba(196, 196, 196, 0.2)";
        this.back[1] = "#fff";
      } else  if(this.count === 4){
        window.location.href = "/Logon"
      }
      this.count++;
      this.progress += 100 / 3;
    }
  },
  mounted() {
    // check for cdGeolocation support
    if (navigator.geolocation) {
      console.log("Geolocation is supported!");
    } else {
      console.log("Geolocation is not supported for this Browser/OS.");
    }
    var startPos;
    var geoSuccess = function(position) {
      startPos = position.coords;
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
    setInterval(this.show_cards, 2500);

  }
};
</script>
<style>
* {
    font-family: 'Montserrat';
}
h2 {
  font-size: 20px;
  font-weight: inherit;
  text-align: center;
  line-height: 25px;
  letter-spacing: 0.5px;
  color: #74848b;
}

h3 {
  font-size: 30px;
  font-weight: 500;
}
</style>
