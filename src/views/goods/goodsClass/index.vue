<template>
  <d2-container>
    <template slot="header">
      <el-form :inline="true" :model="listQuery" class="el-form--inline el-form-item--mini">
        <el-form-item label="分类名称" class="el-form-item--mini">
          <el-input class="el-input--mini" v-model="listQuery.tcode" placeholder="分类名称"
                    @keyup.enter.native="handleQuery"/>
        </el-form-item>
        <el-form-item class="el-form-item--mini">
          <el-button class="el-button--mini" type="primary" @click="handleQuery">
            <i class="el-btn-icon-show el-icon-search" /> 搜索
          </el-button>
          <el-button class="el-button--mini" @click="handleReset">
            <i class="el-btn-icon-show el-icon-refresh-left" /> 重置
          </el-button>
        </el-form-item>
      </el-form>
      <div class="button-container">
        <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-plus" size="mini" /> 新增分类</el-button>
      </div>
    </template>
    <el-table
      height="100%"
      class="el-table--mini"
      :data="list"
      align="center"
      style="width: 100%">
      <el-table-column
        prop="cid"
        label="分类编号"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="img"
        label="分类图片"
        align="center"
        width="50">
        <template slot-scope="{row}">
          <el-image :src="row.img" />
        </template>
      </el-table-column>
      <el-table-column
        prop="level"
        label="分类级别"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="addDate"
        label="添加时间"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200">
        <div class="inline">
          <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-sell"/> 添加分类</el-button>
          <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-edit-outline"/> 编辑</el-button>
        </div>
        <div class="inline" style="padding-top: 5px">
          <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-copy-document"/> 查看下级</el-button>
          <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-delete"/> 删除</el-button>
        </div>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
export default {
  name: 'goodsClass',
  data () {
    return {
      list: [
        {
          cid: 1,
          img: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/a5764350035600.jpg',
          level: 1,
          addDate: '2021-12-11'
        },
        {
          cid: 2,
          img: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/a6238426492420.jpg',
          level: 1,
          addDate: '2020-12-11'
        },
        {
          cid: 3,
          img: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/a6281748980780.jpg',
          level: 1,
          addDate: '2019-12-11'
        }
      ],
      listQuery: {}
    }
  }
}
</script>
