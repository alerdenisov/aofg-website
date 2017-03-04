<template>
  <li>
    <div class="nk-forum-topic-author">
      <img :alt="author" :src="avatar">
      <div class="nk-forum-topic-author-name" :title="author">
        <a href="#">{{author}}</a>
      </div>
      <!-- <div class="nk-forum-topic-author-role">
        Keymaster
      </div>
      <div class="nk-forum-topic-author-since">
        Member since January 13, 2016
      </div> -->
    </div>
    <div class="nk-forum-topic-content">
      <git-marked :content='body' />
      <!-- <textarea v-model='comment.body' style='width: 100%; height: 180px;'/> -->
      <!-- <div class="nk-forum-topic-attachments">
        <h4 class="h5">Attachments</h4><a href="#">godlike-free.zip</a><br>
        (14.86 MiB) Downloaded 185 times
      </div> -->
    </div>
    <div class="nk-forum-topic-footer">
      <span class="nk-forum-topic-date">{{created}}</span> 
      <span class="nk-forum-action-btn">
        <a class="nk-anchor" href="#forum-reply"><span class="ic-reply"></span> Reply</a>
      </span> 
      <span class="nk-forum-action-btn">
        <a href="#"><span class="ic-spam"></span> Spam</a>
      </span> 

      <!-- <span class="nk-forum-action-btn">
        <a href="#"><span class="ic-heart-empty"></span> Like</a>
      </span> -->

      <span class="nk-forum-reactions">
        <b class="nk-action-reaction none" v-if='!reactions'>👍🏻</b><reaction :count='likes' type='likes' /><reaction :count='dislikes' type='dislikes' /><reaction :count='happy' type='happy' /><reaction :count='sad' type='sad' /><reaction :count='hearts' type='hearts' /><reaction :count='hooray' type='hooray' />

        <!-- <b class="nk-action-reaction" :class='{ zero : !likes }'>
          <i class="nk-badge bg-main-3" v-if='likes'>{{likes}}</i> 
          👍
        </b>
        <b class="nk-action-reaction" :class='{ zero : !dislikes }'>
          <i class="nk-badge bg-main-3" v-if='dislikes'>{{dislikes}}</i> 
          👎
        </b>

        <b class="nk-action-reaction" :class='{ zero : !happy }'>
          <i class="nk-badge bg-main-3" v-if='happy'>{{happy}}</i> 
          😄
        </b>

        <b class="nk-action-reaction" :class='{ zero : !sad }'>
          <i class="nk-badge bg-main-3" v-if='sad'>{{sad}}</i> 
          😔
        </b>

        <b class="nk-action-reaction" :class='{ zero : !hearts }'>
          <i class="nk-badge bg-main-3" v-if='hearts'>{{hearts}}</i> 
          ❤️
        </b>

        <b class="nk-action-reaction" :class='{ zero : !hooray }'>
          <i class="nk-badge bg-main-3" v-if='hooray'>{{hooray}}</i> 
          🎉
        </b> -->
      </span>
    </div>
  </li>
</template>

<script type="text/javascript">
  // import marked from 'marked'
  import GitMarked from '@/components/misc/GitMarked'
  import Reaction from '@/components/elements/Reaction'

  export default {
    props: ['comment'],

    computed: {
      body() {
        return this.comment.body;
      },

      avatar() {
        return this.comment.user.avatar_url;
      },

      author() {
        return this.comment.user.login;
      },

      created() {
        return "25 Jul" || this.comment.created_at;
      },

      updated() {
        return this.comment.updated_at;
      },

      reactions() {
        return this.comment.reactions.total_count;
      },
      likes() {
        return this.comment.reactions["+1"]
      },
      dislikes() {
        return this.comment.reactions["-1"]
      },
      happy() {
        return this.comment.reactions.laugh
      },
      sad() {
        return this.comment.reactions.confused
      },
      hearts() {
        return this.comment.reactions.heart
      },
      hooray() {
        return this.comment.reactions.hooray
      },

    },

    components: {
      GitMarked,
      Reaction
    }
  }
</script>