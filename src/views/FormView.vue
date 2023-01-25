<script>
import { useLocalStorage } from "@vueuse/core";

export default {
  props: {
    memoId: String,
  },
  data: function () {
    return {
      memos: useLocalStorage("memos", []),
      memoContent: "",
    };
  },
  methods: {
    addMemo: function () {
      const uid = self.crypto.randomUUID();
      const content = this.memoContent;
      const title = content.split(/\n/)[0];
      const memo = { id: uid, title, content };
      this.memos.push(memo);
      this.memoContent = "";
    },
    editMemo() {
      this.memos.forEach((memo, i) => {
        if (memo.id === this.memoId) {
          const newMemo = {
            ...memo,
            title: this.memoContent.split(/\n/)[0],
            content: this.memoContent,
          };
          this.memos.splice(i, 1, newMemo);
        }
      });
    },
    deleteMemo() {
      const index = this.memos.indexOf(
        this.memos.find((memo) => memo.id === this.memoId)
      );
      this.memos.splice(index, 1);
      this.memoContent = "";
    },
    findMemo(id) {
      return this.memos.find((memo) => memo.id === id);
    },
  },
  created() {
    this.memoContent = this.memoId ? this.findMemo(this.memoId).content : "";
  },
  beforeRouteUpdate(to, from, next) {
    this.memoContent = this.findMemo(to.params.memoId).content;
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.memoContent = to.params.memoId
      ? this.findMemo(to.params.memoId).content
      : "";
    next();
  },
};
</script>

<template>
  <div class="flex flex-col">
    <div v-if="memoId">
      <div>
        <textarea
          class="textarea textarea-bordered w-full rounded-md"
          rows="18"
          v-model="memoContent"
        ></textarea>
      </div>
      <div class="flex justify-center">
        <button
          @click="editMemo"
          class="btn btn-wide btn-outline btn-primary mx-1"
        >
          保存
        </button>
        <button @click="deleteMemo" class="btn btn-outline btn-secondary mx-1">
          削除
        </button>
      </div>
    </div>
    <div v-else>
      <div>
        <textarea
          class="textarea textarea-bordered w-full rounded-md"
          rows="18"
          v-model="memoContent"
          placeholder="メモを入力してください"
        ></textarea>
      </div>
      <div class="flex justify-center mx-8">
        <button @click="addMemo()" class="btn btn-wide btn-outline btn-primary">
          保存
        </button>
      </div>
    </div>
  </div>
</template>
