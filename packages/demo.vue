<template>
  <div>
    <Grid :config="config"
          ref="grid">
      <div slot="header">
        <a-button>添加一个按钮</a-button>
      </div>
      <span slot="action"
            slot-scope="text, record">
        <a-button type="primary"
                  @click="open(text, record)">btn1 </a-button>
        <a-button>btn2</a-button>
      </span>
    </Grid>
    <br />
    <Build></Build>
  </div>
</template>
<script>
import { gridArr } from "./v-grid/api.js";
export default {
  name: "v-table",
  components: { Grid, Build },
  data () {
    let self = this;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
      },
      onSelect: (record, selected, selectedRows) => {
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
      }
    };
    let table = {
      bordered: true,
      pageState: true,
      "row-selection": rowSelection,
      titleLayout: {
        title: '设置一个标题',
        titleSize: 20,
        bgshow: true,
        bbshow: true
      },
      query: {
        labelWidth: "100px",
        layout: [
          {
            name: "querytest1",
            type: "v-input",
            label: "查询1",
            props: {
              placeholder: "定义placeholder"
            },
            colspan: 5,
            on: {
              input: function (h) {
              }
            }
          },
          {
            name: "querytest2",
            type: "v-input",
            label: "查询2",
            props: {
              placeholder: "定义placeholder"
            },
            colspan: 5,
            on: {
              input: function (h) {
              }
            }
          },
          {
            name: "age",
            type: "v-select",
            label: "性别",
            style: {
              width: "100%"
            },
            colspan: 3,
            props: {
              options: [{ value: "0", label: "男" }, { value: "1", label: "女" }]
            }
          }
        ]
      },
      pagingOptions: {
        showSizeChanger: true,
        showQuickJumper: true,
        size: "small"
      },
      columns: [
        {
          title: "页码",
          dataIndex: "data"
        },
        {
          title: "名字",
          dataIndex: "name"
        },
        {
          title: "年纪",
          dataIndex: "age"
        },
        {
          title: "性别",
          dataIndex: "gender",
          customRender: function (value, record, index) {
            return value == 0 ? "男" : "女";
          }
        },
        {
          title: "操作",
          width: 200,
          scopedSlots: { customRender: "action" }
        }
      ],
      onloadData: async function (parmas, callback) {
        try {
          let { list, total } = await gridArr(parmas);
          callback(list, total);
        } catch (error) {
          callback([], 0);
        }
      }
    };
    return {
      config: table
    };
  },
  created () { },
  mounted () { },
  methods: {
    open (text, record) {
      this.$refs.grid.$_onload()
    }
  }
};
</script>
