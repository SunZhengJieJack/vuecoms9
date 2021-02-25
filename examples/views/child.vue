<template>
  <div>
    <a-input placeholder="新的组件" :value="value" @change="onchange"/>
  </div>
</template>
<script>
export default {
  name: 'Child',
  props:{
    value: ''
  },
  methods:{
    onchange(e) {
      this.$emit('input',e.target.value)
    },
  }
}
</script>