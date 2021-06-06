<template>
  <v-app>
    <v-app-bar app color="primary" height="64px" dark>
      <div class="d-flex align-center">
        <a href="/" style="text-decoration: none; color: white"
          ><h1><v-icon>mdi-link-variant</v-icon> Shrtnr</h1></a
        >
      </div>

      <v-spacer></v-spacer>
      <v-switch color="yellow" hide-details v-model="$vuetify.theme.dark">
        <template v-slot:label>
          <v-icon>{{
            $vuetify.theme.dark ? "mdi-weather-night" : "mdi-weather-sunny"
          }}</v-icon>
        </template>
      </v-switch>
      <v-btn
        :class="$vuetify.breakpoint.mdAndUp ? 'ml-4' : 'ml-0'"
        href="https://github.com/Bankole2000/bcurlshortener"
        target="_blank"
        text
      >
        <span v-if="$vuetify.breakpoint.mdAndUp">View on Github</span>
        <v-icon :right="$vuetify.breakpoint.mdAndUp"> mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <shorten-card />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import ShortenCard from "./components/ShortenCard.vue";

export default {
  name: "App",

  components: {
    ShortenCard,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
<style>
main {
  overflow-y: auto;
}
</style>
