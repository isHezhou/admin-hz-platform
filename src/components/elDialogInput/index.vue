<template>
  <div class="el-dialog-input">
    <div
      :class="[
        'el-input',
        inputSize ? 'el-input--' + inputSize : '',
        {
          'el-input-group': true,
          'el-input-group--append': true,
          'el-input--suffix': clearable
        }
      ]"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <input v-model.trim="showValue" :placeholder="placeholder" readonly :disabled="disabled" class="el-input__inner" type="text">
      <input
        ref="input"
        style="display: none"
        :tabindex="tabindex"
        class="el-input__inner"
        v-bind="$attrs"
        :value="value"
        :type="showPassword ? (passwordVisible ? 'text': 'pwd') : type"
        :readonly="true"
        :autocomplete="autoComplete || autocomplete"
        :aria-label="label"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @clear="handleClear"
      >
      <!-- 后置内容 -->
      <span v-if="getSuffixVisible" class="el-input__suffix">
        <span class="el-input__suffix-inner">
          <i
            v-if="showClear"
            class="el-input__icon el-icon-circle-close el-input__clear"
            @mousedown.prevent
            @click="clear"
          />
        </span>
      </span>
      <!-- 后置元素 -->
      <div class="el-input-group__append" :class="{disabled: disabled}">
        <button
          type="button"
          :class="['el-button','el-button--default',inputSize ? 'el-button--' + inputSize : '',disabled?'disabled':'']"
          @click="handleSelect"
        >
          ...
        </button>
      </div>
    </div>
    <el-dialog
      title="选择"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      width="60%"
      @closed="closed"
    >
      <div v-if="dialogVisible" class="filter-container">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline">
          <el-form-item :label="queryAttrs.valueLabel">
            <el-input v-model.trim="listQuery.code" placeholder="请输入编号" clearable />
          </el-form-item>
          <el-form-item :label="queryAttrs.nameLabel">
            <el-input v-model.trim="listQuery.name" laceholder="请输入名称" clearable />
          </el-form-item>
          <el-form-item>
            <el-button @click="handleFilter">搜索
            </el-button>
            <el-button type="primary" @click="saveBack">确定
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <template v-if="isRadio">
        <el-table
          key="0"
          :data="list"
          border
          fit
          highlight-current-row
          @row-click="handleSelectionChange"
        >
          <el-table-column
            type="index"
            width="50"
            align="center"
            label="序号"
          />
          <el-table-column
            header-align="center"
            :label="queryAttrs.valueLabel"
            :property="queryAttrs.valueProperty"
            width="250"
          />
          <el-table-column header-align="center" :label="queryAttrs.nameLabel" :property="queryAttrs.nameProperty" />
        </el-table>
      </template>
      <template v-else>
        <el-table
          key="0"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" header-align="center" align="center" width="50" />
          <el-table-column
            type="index"
            width="50"
            align="center"
            label="序号"
          />
          <el-table-column
            header-align="center"
            :label="queryAttrs.valueLabel"
            :property="queryAttrs.valueProperty"
            width="250"
          />
          <el-table-column header-align="center" :label="queryAttrs.nameLabel" :property="queryAttrs.nameProperty" />
        </el-table>
      </template>
      <div class="pagination-container" style="margin-bottom:15px">
        <el-pagination
          :current-page="queryParam.pageNum"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="queryParam.pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          style="margin-top: 15px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import emitter from 'element-ui/src/mixins/emitter'
import Migrating from 'element-ui/src/mixins/migrating'
import { queryToString } from '@/utils/public'
import request from '@/utils/request'
import { isKorean } from 'element-ui/src/utils/shared'

export default {
  name: 'ElDialogInput',
  componentName: 'ElDialogInput',
  mixins: [emitter, Migrating],
  inheritAttrs: false,
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    queryParams: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    resize: {
      type: String,
      default: ''
    },
    form: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    readonly: Boolean,
    isRadio: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
          console.warn('[Element Warn][Input]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.')
        return true
      },
      default: ''
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: String,
      default: ''
    },
    dataUrl: {
      type: String,
      require: true,
      default: ''
    },
    options: {
      type: Object,
      default: function() {
        return {
          valueLabel: '编号',
          valueProperty: 'code',
          nameLabel: '名称',
          nameProperty: 'name',
          returnProperty: 'code',
          returnShow: ''
        }
      }
    },
    orgId: {
      type: [String, Number],
      default: ''
    },
    deptId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false,
      dialogVisible: false,
      checkedList: [],
      showList: [],
      templateSelection: '',
      list: [],
      showValue: '',
      total: 0,
      listQuery: {},
      queryParam: {
        pageNum: 1,
        pageSize: 10,
        sortBy: 'id',
        sortOrder: 'desc',
        q: ''
      },
      queryAttrs: Object.assign({
        valueLabel: '编号',
        valueProperty: 'code',
        nameLabel: '名称',
        nameProperty: 'name',
        returnProperty: 'code',
        returnShow: ''
      }, this.options),
      // 被选中当前行信息
      getCheckedRowInfo: '',
      tableLoading: false
    }
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : ''
    },
    needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false
    },
    validateIcon() {
      return {
        validating: 'el-icon-loading',
        success: 'el-icon-circle-check',
        error: 'el-icon-circle-close'
      }[this.validateState]
    },
    inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value)
    },
    showClear() {
      return this.clearable &&
          !this.readonly &&
          this.nativeInputValue &&
          (this.focused || this.hovering)
    },
    showPwdVisible() {
      return this.showPassword &&
          !this.readonly &&
          (!!this.nativeInputValue || this.focused)
    },
    isWordLimitVisible() {
      return this.showWordLimit &&
          this.$attrs.maxlength &&
          this.type === 'text' &&
          !this.readonly &&
          !this.showPassword
    },
    upperLimit() {
      return this.$attrs.maxlength
    },
    textLength() {
      if (typeof this.value === 'number') {
        return String(this.value).length
      }

      return (this.value || '').length
    }
  },
  watch: {
    value(val) {
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [val])
      }
      if (this.value) {
        const args = Object.assign({}, this.queryParam)
        args.q = this.queryAttrs.returnProperty + '=' + this.value
        request({
          url: this.dataUrl,
          method: 'get',
          params: args
        }).then(response => {
          const data = response.data
          if (data.total > 0) {
            if (data.total > 1) {
              this.showValue = ''
              for (let i = 0; i < data.list.length; i++) {
                if (i === 0) {
                  this.showValue = data.list[i][this.queryAttrs.returnShow ? this.queryAttrs.returnShow : this.queryAttrs.returnProperty]
                } else {
                  this.showValue = ' | ' + data.list[i][this.queryAttrs.returnShow ? this.queryAttrs.returnShow : this.queryAttrs.returnProperty]
                }
              }
            } else {
              this.showValue = data.list[0][this.queryAttrs.returnShow ? this.queryAttrs.returnShow : this.queryAttrs.returnProperty]
            }
          } else {
            this.showValue = ''
          }
        })
      } else {
        this.showValue = ''
      }
    },
    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    nativeInputValue() {
      this.setNativeInputValue()
    },
    // when change between <input>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue()
        this.updateIconOffset()
      })
    },
    queryParams() {
      this.initTable()
    }
  },

  created() {
    this.$on('inputSelect', this.select)
    if (this.value) {
      const args = Object.assign({}, this.queryParam)
      args.q = this.queryAttrs.returnProperty + '=' + this.value
      this.$store.dispatch('ToggleShowLoading', true)
      request({
        url: this.dataUrl,
        method: 'get',
        params: args
      }).then(response => {
        const data = response.data
        if (data.total > 0) {
          if (data.total > 1) {
            this.showValue = ''
            for (let i = 0; i < data.list.length; i++) {
              if (i === 0) {
                this.showValue = data.list[i][this.queryAttrs.returnShow ? this.queryAttrs.returnShow : this.queryAttrs.returnProperty]
              } else {
                this.showValue = ' | ' + data.list[i][this.queryAttrs.returnShow ? this.queryAttrs.returnShow : this.queryAttrs.returnProperty]
              }
            }
          } else {
            this.showValue = data.list[0][this.queryAttrs.returnShow ? this.queryAttrs.returnShow : this.queryAttrs.returnProperty]
          }
        }
      })
    }
  },
  mounted() {
    this.setNativeInputValue()
    this.updateIconOffset()
  },
  updated() {
    this.$nextTick(this.updateIconOffset)
  },
  methods: {
    handleClear() {
      this.$emit('on-clear')
    },
    focus() {
      this.getInput().focus()
    },
    blur() {
      this.getInput().blur()
    },
    handleBlur(event) {
      this.focused = false
      this.$emit('blur', event)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.value])
      }
    },
    select() {
      this.getInput().select()
    },
    setNativeInputValue() {
      const input = this.getInput()
      if (!input) return
      if (input.value === this.nativeInputValue) return
      input.value = this.nativeInputValue
    },
    handleFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    handleCompositionStart() {
      this.isComposing = true
    },
    handleCompositionUpdate(event) {
      const text = event.target.value
      const lastCharacter = text[text.length - 1] || ''
      this.isComposing = !isKorean(lastCharacter)
    },
    handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false
        this.handleInput(event)
      }
    },
    handleInput(event) {
      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (this.isComposing) return

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return
      this.$emit('input', event.target.value)

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      this.$nextTick(this.setNativeInputValue)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    calcIconOffset(place) {
      const elList = [].slice.call(this.$el.querySelectorAll(`.el-input__${place}`) || [])
      if (!elList.length) return
      let el = null
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i]
          break
        }
      }
      if (!el) return
      el.removeAttribute('style')
    },
    updateIconOffset() {
      this.calcIconOffset('prefix')
      this.calcIconOffset('suffix')
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
      this.focus()
    },
    getInput() {
      return this.$refs.input
    },
    getSuffixVisible() {
      return this.showClear
    },
    handleSelect() {
      if (this.disabled) {
        return
      }
      this.dialogVisible = true
      if (this.total === 0) {
        this.initTable()
      }
    },
    saveBack() {
      let value = ''
      if (!this.isRadio) {
        if (this.checkedList.length) {
          value = this.checkedList.join('|')
          if (this.checkedList.length === 1) {
            value += '|'
          }
        }
        this.showValue = this.showList.join('|')
      } else {
        if (this.checkedList.length) {
          value = this.checkedList.join('|')
        }
        this.showValue = this.showList
      }
      this.$emit('input', value)
      this.$emit('change', value)
      this.$emit('on-ok', this.getCheckedRowInfo)
      this.$set(this.listQuery, 'code', '')
      this.$set(this.listQuery, 'name', '')
      this.dialogVisible = false
    },
    initTable() {
      this.list = []
      const args = Object.assign({}, this.queryParam)
      const params = { orgId: this.orgId, deptId: this.deptId }
      args.q = queryToString({ ...this.listQuery, ...params })
      if (this.queryParams !== '') {
        if (args.q === '') {
          args.q = this.queryParams
        } else {
          args.q += ';' + this.queryParams
        }
      }
      this.tableLoading = true
      request({
        url: this.dataUrl,
        method: 'get',
        params: args
      }).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    handleFilter() {
      this.initTable()
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
      this.initTable()
    },
    handleCurrentChange(val) {
      this.$set(this.queryParam, 'pageNum', val)
      console.log(this.queryParam.pageNum)
      this.initTable()
    },
    handleSelectionChange(val) {
      if (this.isRadio) {
        this.$set(this, 'getCheckedRowInfo', val)
        // this.templateSelection = val.id
        this.checkedList = []
        this.showList = []
        this.showList.push(val[this.queryAttrs.returnShow ? this.queryAttrs.returnShow : this.queryAttrs.returnProperty])
        this.checkedList.push(val[this.queryAttrs.returnProperty])
        const set = new Set(this.checkedList)
        this.checkedList = Array.from(set)
        const setShow = new Set(this.showList)
        this.showList = Array.from(setShow)
      } else {
        this.checkedList = []
        this.showList = []
        val.forEach((item) => {
          this.checkedList.push(item[this.queryAttrs.returnProperty])
          this.showList.push(val[this.queryAttrs.returnShow ? this.queryAttrs.returnShow : this.queryAttrs.returnProperty])
        })
        const set = new Set(this.checkedList)
        this.checkedList = Array.from(set)
        const setShow = new Set(this.showList)
        this.showList = Array.from(setShow)
      }
    },
    closed() {
      this.$set(this.listQuery, 'code', '')
      this.$set(this.listQuery, 'name', '')
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-input-group__append {
    padding: 0 15px 3px;
    width: 35px;
  }

  .el-input__suffix {
    right: 38px
  }
  /*.el-input__inner{*/
  /*  border: none;*/
  /*  padding: 0;*/

  /*}*/

  .el-form-item__content .el-input-group {
    vertical-align: middle;
  }

  .el-radio {
      display: none;
  }
.el-dialog-input {
  input[disabled="disabled"], .disabled {
    background-color: #F5F7FA;
    border-color: #dfe4ed;
    color: #C0C4CC;
    cursor: not-allowed;
  }
}
</style>
