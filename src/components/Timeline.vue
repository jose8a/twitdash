<template>
    <div id='timeline'>
      <div class="data-actions">
        <button v-on:click="getTwits('def')">Default</button>
        <button v-on:click="getTwits('md')">5 Days</button>
        <button v-on:click="getTwits('mt')">600 Tweets</button>
        <!-- button v-on:click="getTwits('sid')">Since ID</button -->
        <button v-on:click="saveTwits">Save Tweets</button>
      </div>
      <div id="cached-list">
        <div class="subheading-4">Cached</div>
          <router-link v-for="tl in cachedItems" :to="listPath(tl)" class="cached-item" tag="div" replace>
            {{ tl }}
          </router-link>
      </div> <!-- end:cached-list -->
      <div class="cardlist">
          <div v-for="twit in filteredTwits" class="card timeline-el">
            <a v-bind:href="twit.url" class="twit-el" :id="twit.id">
              <div class="content">{{twit.content}}</div>
              <div class="content-sub">
                <div class="twit-owner">{{getDate(twit)}}</div>
                <div class="twit-date">{{twit.owner + ' -- @' + twit.ownerAlias}}</div>
              </div>
            </a>
          </div>
      </div><!-- end:cardlist -->
    </div><!-- end:#timeline -->
</template>

<script>
/* eslint-disable no-console */

import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5566/',
});

export default {
  name: 'timeline',
  data() {
    return {
      storageKey: 'savedTimelines',
      twits: [],
      savedTwits: {},
    };
  },
  mounted() {
    const listname = this.$route.params.listname;

    // ensure there is at least an empty 'timelines cache' available
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify({}));
    }

    // If there is a cached timeline for this route, display it's contents
    const savedTimelines = JSON.parse(localStorage.getItem(this.storageKey));
    if (savedTimelines[listname] && savedTimelines[listname].length > 0) {
      this.savedTwits = { ...savedTimelines };
      this.twits = this.savedTwits[listname].slice();
    }
  },
  computed: {
    cachedItems() {
      return Object.keys(this.savedTwits);
    },
    filteredTwits() {
      const fTwits = [];

      if (this.filterType === 'CLEAR') {
        console.log(this.twits);
        return this.twits;
      }

      // --- const regex = /design/i;
      const regex = new RegExp(this.filterType, 'i');
      this.twits.forEach((twit) => {
        if (regex.test(twit.content)) {
          fTwits.push(twit);
        }
      });
      console.log(fTwits);
      return fTwits;
    },
  },
  methods: {
    listPath(listname) {
      return { name: 'timeline', params: { listname: `${listname}` } };
    },
    getDate(twit) {
      const [weekDay, month, numDay, rest] = [...twit.createdAt.split(' ')];
      return `${weekDay} ${month} ${numDay} ${rest}`;
    },
    saveTwits() {
      const listname = this.$route.params.listname;

      const savedTimelines = JSON.parse(localStorage.getItem(this.storageKey));
      savedTimelines[listname] = this.twits.slice();
      this.savedTwits = { ...savedTimelines };

      const twits = JSON.stringify(this.savedTwits);
      console.log('Saving Twits ...');
      localStorage.setItem(this.storageKey, twits);

      Object.keys(this.savedTwits).forEach((item) => {
        console.log(`timeline: ${item}`);
      });
    },
    getTwits(type) {
      const listname = this.$route.params.listname;
      const base = `lists/${listname}`;
      let endpoint = base;

      if (type === 'mt') {
        endpoint = `${base}/mt/600`;
      }

      if (type === 'md') {
        endpoint = `${base}/md/5`;
      }

      console.log('SUCCESS: getting Timeline ...');
      // --- http.get(`lists/${listname}`)
      http.get(endpoint)
        .then((response) => {
          this.twits = response.data.data;
        })
        .catch((error) => {
          console.log('Error: getting timeline ...');
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>
