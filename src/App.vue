<script>
import { RouterLink, RouterView } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';

export default {
  data: function() {
    return {
      memos: ref(useLocalStorage('memos',[])),
      memoContent:ref('')
    }
  },
}

</script>

<template>
  <h1>メモアプリ</h1>

  <h2>メモ一覧</h2>
  <ul v-if="this.memos.length">
    <li v-for="memo in this.memos" v-bind:key="memo.id">
      <router-link :to="`/memos/${memo.id}`" v-on:click="memoContent=memo.content">{{ memo.title }}</router-link>
    </li>
  </ul>
  <p v-else>メモはありません</p>
  <RouterLink to="/memos/new">＋</RouterLink>
  <RouterView :memoContent="memoContent" />

</template>
