<template>
  <div>
    <!-- <a-select 
      style="width: 100%"
      @blur="onblur"
      @change="onchange"
      @deselect="ondeselect"
      @focus="onfocus"
      @inputKeydown="oninputKeydown"
      @mouseenter="onmouseenter"
      @mouseleave="onmouseleave"
      @popupScroll="onpopupScroll"
      @search="onsearch"
      @select="onselect"
      @dropdownVisibleChange="ondropdownVisibleChange"
      :placeholder="placeholder"
    >
      <a-select-option  v-for="(item,index) in options" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
    </a-select> -->
        <a-select 
      style="width: 100%"
      @blur=""
      @change="onchange"
      @deselect=""
      @focus="onfocus"
      @inputKeydown=""
      @mouseenter="onmouseenter"
      @mouseleave="onmouseleave"
      @popupScroll=""
      @search=""
      @select=""
      @dropdownVisibleChange=""
      :placeholder="placeholder"
      :show-search="showSearch"
      :filter-option="filterOption"
      v-bind="$attrs"
      :value="value"
    >
      <a-select-option  v-for="(item,index) in options" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  name:'v-select',
  props:{
    value:'',
    placeholder:{
      type: String,
      default:'请选择'
    },
    options:{
      type:[Object,Array],
      default:()=>[]
    },
    'showSearch':{
      type: Boolean,
      default:()=> false
    }
  },
  data(){
    return {
    }
  },
  wtach: {},
  created() {
  },
  methods: {
    onblur(e){},
    onchange(value, option){
      this.setval(value, option)
    },
    ondeselect(){},
    onfocus(){},
    oninputKeydown(){},
    onmouseenter(){},
    onmouseleave(){},
    onpopupScroll(){},
    onsearch(){},
    onselect(){},
    ondropdownVisibleChange(){},
    setval(e){
      this.$emit('input',e)
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  },
}
</script>

