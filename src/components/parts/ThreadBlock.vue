<template>
  <li>
    <pre class="nk-forum-debug">
      {{thread}}
    </pre>
    <div class="nk-forum-icon">
      <span :class="icon"></span>
    </div>
    <div class="nk-forum-title">
      <span class="nk-badge" v-for='label in labels' :key='label.id' :style="{ 'background-color': `#${label.color}` }">{{label.name}}</span>
      <h3>
        <router-link :to='path'>{{title}}</router-link>
      </h3>
      <div class="nk-forum-title-sub">
         
        Last update at {{update}}
      </div>
    </div>
    <div class="nk-forum-count">
      {{postCount}} post
    </div>
    <div class="nk-forum-activity-avatar"><img :alt="author" :src="avatar"></div>
    <div class="nk-forum-activity">
      <div class="nk-forum-activity-title" :title="author">
        <a href="#">{{author}}</a>
      </div>
      <div class="nk-forum-activity-date">
        {{create}}
      </div>
    </div>
  </li>
</template>

<script type="text/javascript">
  export default {
    props: ['thread'],

    computed: {
      title() { return this.thread.title; },
      path() { return { name: 'Thread', params: { threadNumber: this.thread.number } } },
      icon() {
        if(this.thread.pull_request)
          return "ic-pull-request";

        return "ic-chat";
      },
      postCount() {
        return this.thread.comments;
      },
      labels() {
        return this.thread.labels;
      },
      update() {
        return this.thread.updated_at;
      },
      create() {
        return this.thread.created_at;
      },
      author() {
        return this.thread.user.login;
      },
      avatar() {
        return this.thread.user.avatar_url;
      }
    },
  }
</script>

<style type="text/css" scoped>
  .nk-forum-debug {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 450px;
    display: none;
  }
/*
  li:hover .nk-forum-debug {
    display: block;
  }*/
  .nk-badge {
    font-style: normal;
    font-size: 12px;
    padding: 3px 8px;
    height: auto;
    border-radius: 100px;
    margin-bottom: 10px;
    margin-right: 5px;
  }
</style>