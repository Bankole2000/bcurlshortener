<template>
  <v-card
    :style="{ marginBottom: $vuetify.breakpoint.smAndDown ? '22vh' : '' }"
  >
    <v-card-title class="primary white--text"
      >Shrtnr History
      <v-spacer></v-spacer>

      <v-text-field
        v-model="searchText"
        full-width
        id="searchInput"
        clearable
        solo
        dense
        label="Search by URL / Link"
        placeholder="Search by URL / Link"
        class="px-4 mb-0"
        :color="$vuetify.theme.dark ? 'orange' : '#e91e63'"
        v-if="$vuetify.breakpoint.mdAndUp"
        hide-details
        autocomplete="off"
        append-icon="mdi-slash-forward-box"
        prepend-inner-icon="mdi-magnify"
      >
      </v-text-field>

      <v-spacer></v-spacer
      ><v-btn color="success" @click="$emit('toggleMode')"
        ><v-icon left>mdi-link-plus</v-icon> New
        <span v-if="$vuetify.breakpoint.mdAndUp">Shrtnr</span></v-btn
      ></v-card-title
    >

    <ApolloQuery
      :query="require('../graphql/shortenedUrls.gql')"
      :variables="{ searchText }"
      :pollInterval="3000"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Result -->
        <div v-if="data" class="result apollo">
          <v-data-table
            :headers="headers"
            :items="data ? data.shortenedURLs : []"
            :items-per-page="5"
            :sort-by="'originalUrl'"
            :page.sync="page"
            calculate-widths
            fixed-header
            hide-default-footer
            @page-count="pageCount = $event"
            :mobile-breakpoint="0"
          >
            <template v-slot:[`item.originalUrl`]="{ item }">
              <span style="word-break: break-word">
                {{ item.originalUrl }}
              </span>
            </template>
            <template v-slot:[`item.createdAt`]="{ item }">
              {{ timeAgo(item.createdAt) }}
            </template>
            <template v-slot:[`item.lastVisited`]="{ item }">
              {{ timeAgo(item.lastVisited) }}
            </template>
            <template v-slot:[`item.shortenedId`]="{ item }">
              <a
                :href="`${host}/${item.shortenedId}`"
                :style="{ color: $vuetify.theme.dark ? 'orange' : '#e91e63' }"
                target="_blank"
                >{{ item.shortenedId }}</a
              >
            </template>
            <template v-slot:[`item.clickCount`]="{ item }">
              <v-chip
                :color="
                  item.clickCount > 0
                    ? `${$vuetify.theme.dark ? 'orange' : '#e91e63'}`
                    : 'grey lighten--2'
                "
                dark
                >{{ item.clickCount }}</v-chip
              >
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <div style="display: flex">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="copyLink(item)"
                    >
                      <v-icon small> mdi-content-copy </v-icon>
                    </v-btn>
                  </template>
                  <span>Copy Short link</span>
                </v-tooltip>
                <v-btn icon @click="deleteItem(item)">
                  <v-icon small> mdi-delete </v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>

          <v-divider></v-divider>
          <v-pagination
            class="py-4"
            v-model="page"
            :length="pageCount"
          ></v-pagination>
        </div>
        <!-- Loading -->
        <v-progress-linear
          v-else-if="loading"
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
    <v-snackbar top right v-model="snackbar" :timeout="timeout">
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-divider v-if="$vuetify.breakpoint.smAndDown"></v-divider>
    <v-card-actions
      v-if="$vuetify.breakpoint.smAndDown"
      style="display: flex; align-items: center"
    >
      <v-text-field
        v-model="searchText"
        label="Search by URL / Link"
        placeholder="Search term"
        class="px-4 mb-4"
        hide-details
        autocomplete="off"
        prepend-inner-icon="mdi-magnify"
      >
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script>
import { timeAgo } from "../utils/timeAgo";
import URL_QUERY from "../graphql/shortenedUrls.gql";
import { gql } from "graphql-tag";
export default {
  props: {
    historyMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      timeAgo,
      page: 1,
      message: "",
      pageCount: 0,
      searchText: "",
      snackbar: false,
      timeout: 2000,
      host: "https://bcurlshrt.herokuapp.com",
      headers: [
        { text: "ID", value: "id" },
        {
          text: "Original URL",
          align: "start",
          sortable: true,
          value: "originalUrl",
        },
        {
          text: "Link",
          align: "start",
          value: "shortenedId",
        },
        { text: "Hits", align: "center", value: "clickCount" },
        {
          text: this.$vuetify.breakpoint.mdAndUp ? "Created At" : "Created",
          align: "start",
          value: "createdAt",
        },
        {
          text: this.$vuetify.breakpoint.mdAndUp ? "Last Visited" : "Visited",
          align: "start",
          value: "lastVisited",
        },
        {
          text: "Actions",
          value: "actions",
          align: "start",

          sortable: false,
        },
      ],
    };
  },
  methods: {
    deleteItem(item) {
      const { id } = item;
      this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation ($id: ID!) {
            deleteURL(id: $id) {
              id
            }
          }
        `,
        // Parameters
        variables: {
          id,
        },

        update: (
          store,
          {
            data: {
              deleteURL: { id },
            },
          }
        ) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: URL_QUERY,
            variables: {
              searchText: "",
            },
          });

          const indexToDelete = data.shortenedURLs.findIndex(
            (x) => x.id === id
          );
          data.shortenedURLs.splice(indexToDelete, 1);

          store.writeQuery({
            query: URL_QUERY,
            variables: {
              searchText: "",
            },
            data,
          });
          this.message = "❌ Shortlink Deleted";
          this.snackbar = true;
        },
      });
    },
    copyLink(item) {
      const dummy = document.createElement("textarea");

      document.body.appendChild(dummy);

      dummy.value = `${this.host}/${item.shortenedId}`;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      this.message = "✅ Short Link Copied!";
      this.snackbar = true;
    },
  },
  mounted() {
    document.addEventListener(
      "keypress",
      (e) => {
        const searchInput = document.querySelector("#searchInput");

        if (
          e.key == "/" &&
          this.historyMode &&
          document.activeElement.id !== "searchInput"
        ) {
          e.preventDefault();
          searchInput.focus();
        }
      },
      {
        capture: true,
      }
    );
  },
};
</script>

<style>
</style>