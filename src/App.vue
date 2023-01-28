<script>
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";

export default {
  data: function () {
    return {
      memos: ref(useLocalStorage("memos", [])),
    };
  },
};
</script>

<template>
  <div class="flex mb-4">
    <div class="w-1/4 h-12 mx-8 my-8">
      <ul v-if="this.memos.length">
        <li v-for="memo in this.memos" v-bind:key="memo.id" class="my-1">
          <router-link :to="`/memos/${memo.id}`">{{ memo.title }}</router-link>
        </li>
      </ul>
      <p v-else>メモはありません</p>
      <router-link class="link link-primary" to="/memos/new">＋</router-link>
    </div>
    <div class="w-3/4 h-12 mx-8 my-8">
      <router-view />
    </div>
  </div>
</template>
