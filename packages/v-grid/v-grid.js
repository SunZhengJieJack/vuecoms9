import TitleContent from '../TitleContent.vue'
import vTabs from '../Tabs.vue'
export default {
  name: 'grid',
  components: {
    TitleContent, vTabs
  },
  props: {
    config: {
      type: [Object, Array],
      default: () => []
    },
    choices: {
      type: Object,
      default: () => { }
    },
    queryval: {
      type: Object,
      default: () => { }
    },
  },
  data() {
    return {
      isTable: {
        list: [],
        total: 0
      },
      query: {
      },
      pageval: {
        pageSize: 10,
        pageNo: 1
      },
      QueryState: ''
    }
  },
  computed: {},
  watch: {
    pageval: {
      handler: function (val, oldVal) {
        this.$_onload()
      },
      deep: true,
      immediate: true
    },
    choices: {
      handler: function (val, oldVal) {
        let { config: { query: { layout } } } = this
        if (JSON.stringify(val) != '{}') {
          for (let i of layout) {
            for (let j in val) {
              if (i.name == j) {
                if (i.props) {
                  i.props.options = val[j]
                } else {
                  // this.$set(i.props, 'options',val[j])
                  i.props = {
                    options: val[j]
                  }
                }
              }
            }
          }
        }
      },
      deep: true,
      immediate: true
    },
    queryval: {
      handler: function (val, oldVal) {
        let { query } = this
        for (let i in val) {
          if (!query[i]) {
            this.$set(query, i, val[i])
          } else {
            query[i] = val[i]
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  created(h) {
    this.$_initquery(h)
  },
  mounted(h) {
  },
  methods: {
    go(parmas, pages) {
      let { pageval: { pageNo }, query, config: { query: { defaultQuery = {} } } } = this
      this.pageval.pageNo = pages
      this.QueryState = 'query'
      let end = Object.assign(defaultQuery, query, parmas, this.$_getComQuery())
      this.$_onload(end)
    },
    $_queryOnload(h, type) {
      let { query, config: { query: { defaultQuery = {} } } } = this
      let copyVal = JSON.parse(JSON.stringify(defaultQuery))
      this.QueryState = type
      if (type == 'query') {
        this.$_onload({
          ...copyVal,
          ...query,
          ...this.$_getComQuery()
        })
      } else {
        this.$_onload(null, 'reset')
        this.$_initquery(h, 'reset')
      }
    },
    $_onload(query, type = 'query') {
      this.QueryState = type
      let { config: { onloadData } } = this
      let parmas = query ? query : this.$_getQueryVal()
      onloadData(parmas, this.$_setcallback)
    },
    $_setcallback(list, total) {
      let { isTable } = this
      this.$nextTick(() => {
        isTable.list = list
        isTable.total = total
      })
    },
    $_getQueryVal() {
      let { pageval, config: { query: { defaultQuery = {} } }, QueryState, queryval } = this, isquery
      let copyVal = JSON.parse(JSON.stringify(defaultQuery))
      if (QueryState == 'reset') {
        isquery = { ...copyVal, ...queryval }
        this.query = isquery
      } else {
        isquery = Object.assign(copyVal, this.query)
      }
      return {
        ...isquery,
        ...this.$_getComQuery()
      }
    },
    $_getComQuery() {
      let { pageval, QueryState } = this
      return {
        _query: QueryState,
        pageNo: QueryState == 'reset' ? 1 : pageval.pageNo,
        pageSize: QueryState == 'reset' ? 10 : pageval.pageSize,
      }
    },
    $_getTabs(h) {
      return (
        <div class="tabs-container">
          <v-tabs scopedSlots={this.$scopedSlots}></v-tabs>
        </div>
      )
    },
    $_getTitleContent(h) {
      const { config, config: { titleLayout } } = this
      return (
        <div class="title-content-container">
          { titleLayout ? <title-content props={titleLayout} scopedSlots={this.$scopedSlots} ></title-content> : ''}
        </div>
      )
    },
    $_getQuery(h) {
      const { config: { query: { layout, layoutOut } } } = this
      const buttons = this.$_getButtons(h)
      const getQueryCol = this.$_getQueryCol(h)
      return (
        <div style={{ 'padding': '10px 0 ', 'background': '#FFF' }}>
          <a-row type="flex" gutter={0} >
            {getQueryCol}
          </a-row >
          <a-row type="flex" style="padding-top:10px">
            <a-col span={21} order={4}>
              {buttons}
            </a-col>
            <a-col span={3} order={4}>
              <a-button type='primary' style={{ 'margin-right': '10px' }} onClick={() => { this.$_queryOnload(h, 'query') }}>查询</a-button>
              <a-button onClick={() => { this.$_queryOnload(h, 'reset') }}>重置</a-button>
            </a-col>
          </a-row >
        </div>
      )
    },
    $_getTable(h) {
      const { isTable: { list }, config, config: { titleLayout } } = this
      const tableProps = { ...this.$attrs, ...this.$props, ...config, dataSource: list, pagination: false }
      return (
        <div style={{ 'background': '#fff' }}>
          {this.$_getTabs(h)}
          {this.$_getTitleContent(h)}
          <a-table bordered props={tableProps} scopedSlots={this.$scopedSlots} rowKey={(record, index) => { return index }}></a-table>
        </div>
      )
    },
    $_getPage(h) {
      const { config, config: { pagingOptions, pageState }, isTable, isTable: { total }, } = this
      const columns = config.columns.map((item) => {
        return Object.assign(item, {
          key: item.dataIndex,
        })
      })
      const paginProps = { ...pagingOptions, total, columns }
      return (
        pageState ? <a-pagination props={paginProps} style={{ 'padding': '20px 0 10px', 'text-align': 'right' }} onchange={this.$_pageChange} onshowSizeChange={this.$_onshowSizeChange} v-model={this.pageval.pageNo} /> : ""
      )
    },
    $_pageChange(page, pageSize) {
      let { pageval } = this
      pageval.pageNo = page
      pageval.pageSize = pageSize
    },
    $_onshowSizeChange(page) {
      let { pageval } = this
      pageval.pageNo = page
    },
    $_getButtons(h) {
      let { config: { buttons }, query } = this
      let btns = buttons.map(item => {
        return h('v-button', {
          style: {
            'margin-right': '10px',
            ...item.style
          },
          attrs: item.attrs ? item.attrs : [],
          on: {
            'input': function () {
              item.click(query)
            }
          },
          props: {
            ...item.props,
            isName: item.name
          }
        }, ''
        )
      })
      return (btns)
    },
    $_getQueryCol(h) {
      let { config, config: { query: { labelWidth = '100px', layout } } } = this
      const cols = layout.map((row, i) => {
        return <a-col span={row.colspan ? row.colspan : 6} style={{
          'display': 'grid',
          'grid-template-columns': '100px auto',
          'padding': '10px 70px 10px 10px',
        }}>
          <label style={{ 'width': labelWidth, 'display': 'inline-block', 'text-align': 'right', 'padding-right': '10px', 'line-height': '32px' }} class="col-label">{`${row.label}:`}</label>
          {/* <div style={{ 'width': "calc(100% - " + labelWidth + ")" }} class="col-box"> */}
          <div>
            {this.$_getComponents(h, row)}
          </div>
        </a-col>
      })
      return (cols)
    },
    // $_getDefaltQueryVal(h, row) { 
    //   let { query, config: { query: { defaultQuery } }, QueryState } = this;
    //   let obj = JSON.parse(JSON.stringify(defaultQuery))
    //   if (QueryState == 'query') {
    //     return query[row.name] ? query[row.name] : obj[row.name] ? obj[row.name] : ""
    //   } else {
    //     return obj[row.name] ? obj[row.name] : ""
    //   }
    // },
    $_initquery(h, type) {
      if (type == 'reset') this.query = {}
      let { config: { query: { defaultQuery = {} } }, queryval } = this
      this.query = { ...JSON.parse(JSON.stringify(defaultQuery)), ...queryval }
    },
    $_getComponents(h, row) {
      const { on = {}, attrs = {}, style = {}, props = {} } = row;
      const { query } = this;
      return h(this.$_getName(row.type),
        {
          style,
          attrs,
          on: {
            ...on,
            'input': (e) => {
              this.$set(query, row.name, e)
              if (row.onChange) row.onChange(e, query)
            }
          },
          props: {
            ...props,
            // value: this.$_getDefaltQueryVal(h,row)
            value: query[row.name]
          }
        }, '')
    },
    $_getName(e) {
      switch (e) {
        case 'select':
          return 'vSelect'
        default:
          return e
      }
    }
  },
  render(h) {
    const table = this.$_getTable(h)
    const page = this.$_getPage(h)
    const query = this.$_getQuery(h)
    return (
      <div class="v-grid" style={{ 'padding': '20px' }}>
        { query}
        { table}
        { page}
      </div>
    )
  },
}