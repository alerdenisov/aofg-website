<template>
  <router-link :to="path" class="nk-repository-block">
    <div class="nk-repository-path">{{gitPath}}</div>
    <h2 class="nk-repository-title">{{title}}</h2>
    <p class="nk-repository-description">{{description}}</p>
    <div style='flex-grow: 1'></div>
    <div class="nk-repository-meta">
      <div class="nk-repository-stars">{{starsCount}} <span class="ic-star"></span></div>
      <div class="nk-repository-contributors">{{contibutorCount}} <span class="ic-user"></span></div>
      <div class="nk-repository-threads">{{threadsCount}} <span class="ic-user"></span></div>
    </div>
  </router-link>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'
  export default {
    props: {
      repository: {
        type: Object,
        required: true
      }
    },

    mounted() {
    },

    computed: {
      title() {
        return this.repository.name;
      },

      description() {
        return this.repository.description;
      },
      gitPath() { return this.repository.full_name },
      path() { return `/repo/${this.title}` },

      starsCount() {
        return this.repository.stargazers_count || 0;
      },

      threadsCount() {
        return this.repository.open_issues_count;
      }
    },

    asyncComputed: {
      contibutors: {
        async get() {
          const _contibutorsCall = await axios.get(this.repository.contributors_url);
          return _contibutorsCall.data;
        },
        default: null
      },

      contibutorCount: {
        async get() {
          return this.contibutors ? this.contibutors.length : '...';
        }
      },
    }
  }
</script>

<style type="text/css">
  /* layout */
  .nk-repository-block {
    position: relative;
    display: block;
    height: 265px;
    overflow: hidden;
    padding: 30px;
  }

  .nk-repository-meta {
    position: absolute;
    bottom: 30px;
    left: 30px;
    right: 30px;
  }

  .nk-repository-description {
    max-height: 80px;
    overflow: hidden;
  }


  /* decor */
  .nk-repository-block {
    border: 1px solid rgba(224, 136, 33, 0.48);
    margin-bottom: 30px;
    color: white;
    text-decoration: none;
    background-color: #0e0e0e;
    transition: background-color 0.2s ease, border 0.2s ease;
  }

  .nk-repository-block:hover {
    border: 1px solid rgba(224, 136, 33, 0.8);
    background-color: rgba(14, 14, 14, 0.54);
    color: white;
    text-decoration: none;
  }

  h2.nk-repository-title {
    white-space: nowrap;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .nk-repository-stars,
  .nk-repository-contributors,
  .nk-repository-threads {
    display: inline-block;
    padding: 0 10px;
    background-color: #0e0e0e;
  }
</style>