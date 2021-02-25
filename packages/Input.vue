<template>
  <div>
    <a-input
      :placeholder="placeholder"
      :defaultValue="defaultValue"
      :id="id"
      :disabled="disabled"
      :maxLength="maxLength"
      :size="size"
      :allowClear="allowClear"
      @change="onChange"
      @pressEnter="pressEnter"
      v-bind="$attrs"
      :value="value"
    />
  </div>
</template>
<script>
export default {
  name:'v-input',
  props:{
    value:'',
    placeholder:{
      type: String,
      default:'请输入'
    },
    defaultValue:'',
    id:'',
    disabled: false,
    maxLength: 100,
    size:{},
    allowClear:{},
  },
  data(){
    return{
    }
  },
  computed: {
  },
  methods: {
    onChange(e){
      this.$emit('input',e.target.value)
    },
    pressEnter(e){
      this.$emit('input',e.target.value)
    }
  },
}
</script>

