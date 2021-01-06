<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    :before-close="handleClose"
  >
    <el-table
      ref="table"
      :key="tableKey"
      :data="list"
      border
      size="mini"
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="65"
        fixed="left"
        align="center"
        label="序号"
      />
      <template v-for="item in tableItem">
        <el-table-column
          header-align="center"
          align="center"
          :prop="item.prop"
          :label="item.label"
        />
      </template>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page.sync="queryParam.pageNum"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="queryParam.pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 15px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <span slot="footer" class="dialog-footer" />
  </el-dialog>
</template>

<script>
import { queryToString } from '@/utils/public'
import request from '@/utils/request'

export default {
  name: 'ElDialogTable',
  componentName: 'ElDialogTable',
  props: {
    show: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: '查看'
    },
    width: {
      type: String,
      default: '40%'
    },
    dataUrl: {
      type: String,
      require: true
    },
    tableItem: {
      type: Array,
      default: () => {}
    },
    queryParams: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: this.show.able,
      listQuery: {},
      list: [],
      total: 0,
      tableKey: 0,
      queryParam: {
        pageNum: 1,
        pageSize: 20,
        sortBy: 'id',
        sortOrder: 'desc',
        q: ''
      },
      curDataDialogVisible: false,
      curDataIsEdit: false
    }
  },
  watch: {
    show() {
      this.dialogVisible = this.show.able
      this.initTable()
    }
  },
  created() {
    this.initTable()
  },
  methods: {
    initTable() {
      const args = Object.assign({}, this.queryParam)
      args.q = queryToString(this.listQuery)
      if (args.q) {
        args.q = args.q + ';' + this.queryParams
      } else {
        args.q = this.queryParams
      }
      this.$store.dispatch('ToggleShowLoading', true)
      request({
        url: this.dataUrl,
        method: 'get',
        params: args
      }).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },

    handleCurrentChange(val) {
      this.queryParam.pageNum = val
      this.initTable()
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
      this.initTable()
    },
    handleClose() {
      this.dialogVisible = false
      this.show.able = false
    }
  }
}

</script>

<style scoped>

</style>
