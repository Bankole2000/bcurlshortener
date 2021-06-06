<template>
  <div
    :style="{
      height: '100%',
      background: $vuetify.theme.dark
        ? 'url(' +
          require('@/assets/images/bg-hero.png') +
          '), url(' +
          require('@/assets/images/bgelements.svg') +
          '), url(' +
          require('@/assets/images/bgelements4.svg') +
          '), url(' +
          require('@/assets/images/bgelements1.svg') +
          ')'
        : 'url(' +
          require('@/assets/images/bgelements.svg') +
          '), url(' +
          require('@/assets/images/bgelements2.svg') +
          ')',
      backgroundPosition: $vuetify.theme.dark
        ? 'center center, center top'
        : 'center',
      backgroundRepeat: $vuetify.theme.dark
        ? 'no-repeat, no-repeat, no-repeat, repeat'
        : 'repeat',
      backgroundSize: $vuetify.theme.dark
        ? 'fit, fit, fit, contain'
        : 'contain',
      backgroundColor: $vuetify.theme.dark ? '' : '#f0f0f0',
    }"
  >
    <v-container>
      <v-row
        justify="center"
        align="center"
        style="min-height: calc(80vh - 64px)"
      >
        <v-col cols="12" :md="history ? '12' : '9'" :sm="history ? '12' : '9'">
          <v-expand-transition>
            <ShortenForm @toggleMode="history = !history" v-show="!history" />
          </v-expand-transition>
          <v-expand-transition>
            <History
              :historyMode="history"
              @toggleMode="history = !history"
              v-show="history"
            />
          </v-expand-transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import History from "./History.vue";
import ShortenForm from "./ShortenForm.vue";
export default {
  components: {
    ShortenForm,
    History,
  },
  data() {
    return {
      history: false,
    };
  },
};
</script>

<style>
</style>