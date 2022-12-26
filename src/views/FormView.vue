<script>
import { useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';

export default {
  props: {
    isNew: Boolean,
    memoId: {
      type: String,
    },
    memoContent: String,
  },
  data: function() {
    return {
      memos: ref(useLocalStorage('memos',[])),
      memoText: ref(this.memoContent),
    }
  },
  methods:{
    addMemo:function(){
      const uid = self.crypto.randomUUID();
      const content = this.memoText;
      const title = content.split(/\n/)[0]
      const memo = { id: uid ,title: title, content: content };
      this.memos.push(memo);
    },
    editMemo() {
      this.memos.forEach((memo, i) => {
        if (memo.id === this.memoId){
          const newMemo = {
            ...memo,
            title: this.memoText.split(/\n/)[0],
            content: this.memoText,
          }
          this.memos.splice(i, 1, newMemo)
        }
      });
    },
    deleteMemo() {
      const index = (this.memos.indexOf(this.memos.find((memo) => memo.id === this.memoId)))
      this.memos.splice(index, 1)
    },
    findMemo() {
      return this.memos.find((memo) => memo.id === this.memoId)
    },
  },
}
</script>

<template>
  <h2>入力フォーム</h2>
  <div v-if="isNew">
    <p>newやで</p>
    <textarea v-model="memoText" placeholder="メモを入力してください"></textarea>
    <button @click="addMemo()">保存</button>
  </div>
  <div v-else>
  <p>newちゃうで</p>
  <textarea v-model="memoText" ></textarea>
  <button @click='editMemo'>保存</button>
  <button @click='deleteMemo'>削除</button>
  {{memoId}}
</div>

</template>
