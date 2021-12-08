<template>
  <section class="section">
    <div class="columns is-mobile">
      <validation-observer v-slot="{ invalid }">
      <div class="field">
        <label class="label">お名前</label>
          <div class="control">
            <text-field-with-validation v-model="textValue" rules="required" fieldname="お名前" />
        </div>
      </div>
      <div class="field">
        <label class="label">メールアドレス</label>
          <div class="control">
            <text-field-with-validation v-model="emailValue" rules="required|email" fieldname="メールアドレス" />
        </div>
      </div>
      <div class="field">
          <div class="control">
            <button class="button is-link" :disabled="invalid">送信する</button>
            <p v-show="invalid" class="help is-danger">
             全ての必須項目を入力すると「新規追加」ボタンが有効化されます。
            </p>
        </div>
      </div>
      <v-btn @click="addNameInput">追加</v-btn>
    </validation-observer>
    </div>
  </section>
</template>

<script>
import TextFieldWithValidation from '@/components/TextFieldWithValidation'

export default {
  name: 'HomePage',
  components: {
    TextFieldWithValidation
  },
  data () {
    return {
      textValue: '',
      emailValue: '',
      items: [],
    }
  },
  methods:{
    addNameInput(){
      this.items.push({id:null})
    }
  }
}
</script>