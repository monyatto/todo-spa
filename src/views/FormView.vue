<script>
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";

export default {
  props: {
    isNew: Boolean,
    memoId: String,
  },
  data: function () {
    return {
      memos: ref(useLocalStorage("memos", [])),
      memoContent: ref(""),
    };
  },
  methods: {
    addMemo: function () {
      const uid = self.crypto.randomUUID();
      const content = this.memoContent;
      const title = content.split(/\n/)[0];
      const memo = { id: uid, title: title, content: content };
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
    findMemo() {
      return this.memos.find((memo) => memo.id === this.memoId);
    },
  },
  created() {
    if (this.isNew) {
      this.memoContent = "";
    } else {
      this.memoContent = this.findMemo().content;
    }
  },
  watch: {
    memoId() {
      if (this.isNew) {
        this.memoContent = "";
      } else {
        this.memoContent = this.findMemo().content;
      }
    },
  },
};
</script>

<template>
  <div class="flex flex-col">
    <div v-if="isNew">
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
    <div v-else>
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
  </div>
</template>
