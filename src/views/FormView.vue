<script>
import { useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';

export default {
  props: {
    isNew: Boolean,
    memoId: String,
  },
  data: function() {
    return {
      memos: ref(useLocalStorage('memos',[])),
      memoText: ref('')
    }
  },
  methods:{
    addMemo:function(){
      const uid = self.crypto.randomUUID();
      const content = this.memoText;
      const title = content.split(/\n/)[0]
      const memo = { id: uid ,title: title, content: content };
      this.memos.push(memo);
      this.memoText = ''
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
          this.memoText = ''
        }
      });
    },
    deleteMemo() {
      const index = (this.memos.indexOf(this.memos.find((memo) => memo.id === this.memoId)))
      this.memos.splice(index, 1)
      this.memoText = ''
    },
    findMemo() {
      return this.memos.find((memo) => memo.id === this.memoId)
    },
  },
  created() {
    if(!this.isNew) {
      this.memoText = this.findMemo().content
    }
  },
  watch: {
    memoId() {
      if(!this.isNew) {
        this.memoText = this.findMemo().content
      }else{
        this.memoText = ''
      }
    }
  }
}
</script>

<template>
  <div v-if="isNew">
    <textarea v-model="memoText" placeholder="メモを入力してください"></textarea>
    <button @click="addMemo()">保存</button>
  </div>
  <div v-else>
    <textarea v-model="memoText"></textarea>
    <button @click='editMemo'>保存</button>
    <button @click='deleteMemo'>削除</button>
  </div>

</template>
