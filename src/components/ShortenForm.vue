<template>
  <v-card :class="$vuetify.breakpoint.mdAndUp ? 'mx-16' : ''">
    <v-card-title class="primary white--text"
      >URL Shortener <v-spacer></v-spacer>
      <v-btn
        @click="$emit('toggleMode')"
        color="orange darken-2"
        class="white--text"
        ><v-icon left>mdi-history</v-icon> History</v-btn
      ></v-card-title
    >

    <ApolloQuery
      :query="require('../graphql/shorten.gql')"
      :variables="{ url }"
    >
      <!-- Apollo watched Graphql query -->

      <template slot-scope="{ result: { loading, error, data } }">
        <v-card-text class="mt-0">
          <v-text-field
            v-model="url"
            :loading="loading"
            autofocus
            class="mb-4"
            autocomplete="off"
            :error="url !== '' && error ? true : false"
            :success="url !== '' && data && !error ? true : false"
            :hint="url == '' ? 'Type or paste a url to shorten it' : ''"
            :hide-details="url !== '' && data ? true : false"
            label="Shorten a url"
            placeholder="http://your-url.com/whatever"
          ></v-text-field>
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">
            <v-progress-linear
              color="deep-purple accent-4"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
          </div>

          <!-- Error -->
          <v-expand-transition>
            <div v-show="url && error">
              <v-alert outlined type="warning" icon="mdi-alert-circle"
                >Invalid URL</v-alert
              >
            </div>
          </v-expand-transition>

          <!-- Result -->

          <v-expand-transition>
            <div
              v-show="url && data && !error"
              style="display: flex; flex-direction: column"
            >
              <div>
                <v-text-field
                  readonly
                  :dark="$vuetify.theme.dark"
                  block
                  class="white--text"
                  solo-inverted
                  :value="data ? data.shortenURL : ''"
                  id="inputToCopy"
                  persistent-hint
                  hint="Try it out - Copy and paste into a browser"
                >
                  <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <!-- :color="on ? 'primary' : '#282828'" -->
                        <v-icon
                          @click="copyToClipboard"
                          :color="color"
                          v-on="on"
                          >mdi-content-copy</v-icon
                        >
                      </template>
                      {{ copyMessage }}
                    </v-tooltip>
                  </template>
                  <template
                    v-if="$vuetify.breakpoint.mdAndUp"
                    v-slot:append-outer
                  >
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <a
                          :href="data ? data.shortenURL : ''"
                          style="text-decoration: none"
                          target="_blank"
                        >
                          <v-icon v-on="on">mdi-open-in-new</v-icon>
                        </a>
                      </template>
                      Visit URL
                    </v-tooltip>
                  </template>
                </v-text-field>
              </div>
            </div>
          </v-expand-transition>

          <!-- No result -->
        </v-card-text>
        <v-divider
          v-if="url && data && !error && $vuetify.breakpoint.smAndDown"
        ></v-divider>
        <v-expand-transition>
          <v-card-actions
            v-show="url && data && !error && $vuetify.breakpoint.smAndDown"
          >
            <v-btn
              @click="copyToClipboard"
              v-if="$vuetify.breakpoint.mdAndDown"
              large
              class="mt-2"
              color="accent"
              block
              >{{ copyMessage }}<v-icon right>mdi-content-copy</v-icon></v-btn
            >
          </v-card-actions>
        </v-expand-transition>
      </template>
    </ApolloQuery>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      copyMessage: "Copy",
      color: "",
    };
  },
  methods: {
    copyToClipboard() {
      const copyText = document.querySelector("#inputToCopy");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      this.color = "primary";
      document.execCommand("copy");
      this.copyMessage = "Copied!";
      setTimeout(() => {
        this.copyMessage = "Copy To Clipboard";
        this.color = this.$vuetify.theme.dark ? "secondary" : "";
      }, 2000);
    },
  },
};
</script>

<style>
</style>