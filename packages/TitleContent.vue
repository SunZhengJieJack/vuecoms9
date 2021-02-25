<template>
  <div class="title-content">
    <div
      class="header"
      :class="{ 'bg-header': bgshow, 'border-bottom-header': bbshow }"
    >
      <div
        class="title-font"
        :class="{ 'icon-line': !icon }"
        :style="{ 'font-size': titleSize + 'px' }"
      >
        <img v-if="icon" class="title-img" :src="icon" />
        <span>{{ title }}</span>
         <slot name='describe'></slot>
      </div>
      <slot name="header"></slot>
    </div>
    <div :class="[havePadding ? 'content' :'pad']">
      <slot name="content"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TitleContent',
  props: {
    titleSize: { // title 字体大小
      type: Number,
      default () {
        return 16
      }
    },
    title: {
      type: String,
      default: ''
    },
    bgshow: { // title背景色
      type: Boolean,
      default () {
        return false
      }
    },
    bbshow: { // title border-bottom
      type: Boolean,
      default () {
        return false
      }
    },
    icon: { // 图片路径
      type: String,
      default () {
        return null
      }
    },
    havePadding: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.title-content {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 8px 0px #ffffff;
  margin-top: 20px;
  .header {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-img {
      height: 24px;
      width: 24px;
    }
    &.bg-header {
      background: #f1f5fa;
    }
    &.border-bottom-header {
      border-bottom: 1px solid#eaeaea;
    }
    .title-font {
      font-weight: bold;
      display: flex;
    }
    .icon-line {
      font-family: PingFangSC-Medium;
      color: #101010;
      line-height: 32px;
      height: 32px;
      margin: 0;
      &::before {
        content: "";
        height: 16px;
        line-height: 32px;
        width: 3px;
        background-color:#0586fd;
        display: inline-block;
        margin-right: 6px;
        margin-top: 8px;
        vertical-align: middle;
        border-radius: 1.5px;
      }
    }
  }
  .pad{
    padding: 0;
  }
  .content {
    padding: 10px 20px;
  }
}
</style>
