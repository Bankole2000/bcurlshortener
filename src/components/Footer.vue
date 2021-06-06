<template>
  <v-footer padless absolute>
    <v-card flat tile class="primary text-center" style="width: 100%">
      <v-card-text>
        <a :href="links[i]" v-for="(icon, i) in icons" :key="i">
          <v-btn target="_blank" class="mx-4 white--text" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </a>
      </v-card-text>

      <v-card-text class="pt-0" v-if="$vuetify.breakpoint.mdAndUp">
        <p class="mb-0 white--text">
          <strong>Shrtnr</strong> is a simple <em>URL shortener</em> built with
          <a href="https://vuejs.org" class="footer-link" target="_blank"
            ><v-icon small>mdi-vuejs</v-icon> Vue</a
          >,
          <a href="https://vuetifyjs.com" class="footer-link" target="_blank">
            <v-icon small>mdi-vuetify</v-icon> Vuetify</a
          >,
          <a
            href="https://apollographql.com"
            class="footer-link"
            target="_blank"
          >
            <v-icon small>mdi-graphql</v-icon> Apollo Graphql</a
          >,
          <a href="https://prisma.io" class="footer-link" target="_blank">
            <v-icon small>mdi-triangle</v-icon> Prisma </a
          >, and
          <a
            href="https://www.postgresql.org/"
            target="_blank"
            class="footer-link"
            ><v-icon small>mdi-database</v-icon> Postgres</a
          >. The
          <a
            href="https://bcurlshrt.herokuapp.com/graphql"
            class="footer-link"
            target="_blank"
            >Backend Api</a
          >
          deployed to
          <a href="heroku.com" class="footer-link" target="_blank">Heroku</a>.
          <br />Please clear up any useless/broken links after use, thanks 👋
        </p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <a
          class="footer-link"
          href="https://bankole2000.github.io/webpieces"
          target="_blank"
          ><strong>Bankole Esan</strong></a
        >
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-github"],
    links: [
      "https://web.facebook.com/esan.bankole/",
      "https://twitter.com/codinginneon",
      "https://www.linkedin.com/in/bankoleesan/",
      "https://github.com/bankole2000",
    ],
  }),
};
</script>

<style scoped>
a.footer-link {
  color: white;
  text-decoration: none;
  border-bottom: 2px solid yellow;
  padding: 0px 4px;
}
a.footer-link:hover {
  background-color: yellow;
  color: #282828;
}

a.footer-link:hover .v-icon {
  color: #282828;
}
</style>
