<template>
  <div class="demo">
    <a-card title="Grid 组件"
            :bordered="false">
      <Grid :config="config"
            ref="grid"
            :choices="choices"
            :queryval="isvalue"></Grid>
    </a-card>
  </div>
</template>
<script>
import Vue from 'vue'
import { getList, getSelect } from '../api/api.js'
import Child from './child'
Vue.component('child', Child)
export default {
  name: 'demo',
  data () {
    let self = this
    let table = {
      bordered: true,
      pageState: true,
      titleLayout: true,
      size: 'small',
      buttons: [
        {
          name: '改变自定义值',
          props: {
            type: 'primary'
          },
          click: function (row) {
            row.customInput = '123123'
          }
        },
        {
          name: '另一个btn',
          props: {
            type: 'danger'
          }
        }
      ],
      query: {
        labelWidth: '100px',
        layout: [
          {
            name: 'customInput',
            type: 'child',
            label: '我是自定义的',
            colspan: 5
          },
          {
            name: 'addSelect',
            type: 'select',
            label: '动态select',
            props: {
              showSearch: true
            },
            onChange: function (row, value) {
              console.log(row, value)
            }
          },
          {
            name: 'query1',
            type: 'str',
            label: 'input'
          },
          {
            name: 'query2',
            type: 'select',
            label: '下拉框',
            props: {
              options: [
                {
                  label: '静态selct1',
                  value: '0'
                },
                {
                  label: '静态selct2',
                  value: '1'
                }
              ]
            }
          },
          {
            name: 'date1',
            type: 'date',
            label: '单时间'
          },
          {
            name: 'date2',
            type: 'daterange',
            label: '区间时间'
          }
        ],
        defaultQuery: {
          query1: '默认值',
          customInput: '自定义value'
        }
      },
      pagingOptions: {
        showSizeChanger: true,
        showQuickJumper: true,
        size: 'small'
      },
      columns: [
        {
          dataIndex: 'data',
          title: '页',
          width: 50
        },
        {
          dataIndex: 'name',
          title: '名字',
        },
        {
          dataIndex: 'age',
          title: '年龄'
        },
        {
          dataIndex: 'gender',
          title: '性别',
          customRender: function (text, record, index) {
            return text ? '女' : '男'
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: 200,
          customRender: function (text, record, index) {
            const h = self.$createElement
            const btns = []
            btns.push(
              // btnModel,
              h('a-button', {
                domProps: {
                  innerHTML: '静态btn'
                },
                props: {
                  type: 'primary',
                  size: 'small'
                }
              }),
              h('a-button', {
                domProps: {
                  innerHTML: '存在事件btn'
                },
                style: {
                  margin: '0 0 0 10px'
                },
                props: {
                  type: 'primadashedry',
                  size: 'small'
                },
                on: {
                  click: function () {
                    self.openmsg()
                  }
                }
              })
            )
            return btns
          }
        }
      ],
      onloadData: async function (parmas, callback) {
        try {
          console.log(parmas)
          let data = {
            ...parmas
          }
          let { list, total } = await getList(data)
          callback(list, total)
        } catch (error) {
          callback([], 0)
        }
      }
    }
    return {
      config: table,
      choices: {},
      isvalue: {}
    }
  },
  created () {
    this.setSelect()
  },
  mounted () { },
  methods: {
    openmsg () {
      this.$message.error('点我干嘛！！！')
    },
    async setSelect () {
      let { list } = await getSelect()
      this.$set(this.choices, 'addSelect', list)
      this.$set(this.isvalue, 'addSelect', '0')
    },
    tabsChange (e) {
      this.$refs.grid.go(
        {
          tabs: e
        },
        1
      )
    }
  }
}
</script>
<style lang="less" scoped></style>
