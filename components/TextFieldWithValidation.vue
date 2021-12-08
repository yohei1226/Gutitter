<template>
  <validation-provider v-slot="{ errors }" :rules="rules" :name="fieldname">
    <input
       v-model="innerValue"
      :placeholder="fieldname"
    />
    <p v-show="errors.length" class="help is-danger">
      {{ errors[0] }}
    </p>
  </validation-provider>
</template>

<script>
export default {
  name: 'TextFieldWithValidation',
  props: {
    rules: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true
    },
    fieldname: {
      type: String,
      required: true
    }
  },
  computed: {
    innerValue: {
      get () {
        return this.$props.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>