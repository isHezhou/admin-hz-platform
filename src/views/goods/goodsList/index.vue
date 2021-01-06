<template>
  <d2-container>
    <template slot="header">
        <el-form :inline="true" :model="listQuery" class="el-form--inline">
          <el-form-item label="编码" class="el-form-item--mini">
            <el-input class="el-input--mini" v-model="listQuery.tcode" placeholder="编码"
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
        <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-plus" size="mini" /> 发布商品</el-button>
        <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show fa fa-hand-rock-o" size="mini" /> 淘宝抓取</el-button>
        <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-sell" size="mini" /> 商品上架</el-button>
        <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-plus" size="mini" /> 设为新品</el-button>
        <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show fa fa-free-code-camp" size="mini" /> 设为热销</el-button>
        <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-plus" size="mini" /> 设为推荐</el-button>
        <el-button class="el-button--mini" @click="handleDeleteBatch"><i class="el-btn-icon-show el-icon-delete" /> 批量删除</el-button>
      </div>
    </template>
    <el-table
      height="100%"
      class="el-table--mini"
      :data="tableData"
      el-table-column
      tooltip-effect="dark"
      align="center"
      style="width: 100%">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        prop="productNumber"
        label="商品编码"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="imgUrl"
        label="商品图片"
        align="center"
        width="100">
        <template slot-scope="{row}">
          <el-image :src="row.imgUrl" />
        </template>
      </el-table-column>
      <el-table-column
        prop="productTitle"
        label="商品标题"
        align="center"
        width="250">
      </el-table-column>
      <el-table-column
        prop="productClass"
        label="商品分类"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="brandId"
        label="品牌"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="yPrice"
        label="价格"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="num"
        label="库存"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="status"
        label="商品状态"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="date"
        label="所属店铺"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="volume"
        label="销量"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="date"
        label="显示位置"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="上架时间"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200">
        <div class="inline">
          <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-edit-outline"/> 编辑</el-button>
          <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-delete"/> 删除</el-button>
        </div>
        <div class="inline" style="padding-top: 5px">
          <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-copy-document"/> 复制</el-button>
          <el-button class="el-button--mini" @click="handleCreate"><i class="el-btn-icon-show el-icon-sell"/> 上架</el-button>
        </div>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
export default {
  name: 'goodsList',
  data () {
    return {
      tableData: [{
        productNumber: '143',
        imgUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/a5764350035600.jpg',
        productTitle: '蛋蛋肖显瘦过膝弹力靴后系带SW5050细跟高跟长筒靴长靴女靴骑士靴',
        productClass: '女鞋',
        brandId: '宏观',
        yPrice: '389.00',
        num: '234',
        status: '待上架',
        volume: '0'
      }, {
        productNumber: '155',
        imgUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/a6238426492420.jpg',
        productTitle: '老爹鞋女鞋2021年新款春季透气网红百搭内增高厚底休闲运动ins潮',
        productClass: '女鞋',
        brandId: '宏观',
        yPrice: '389.00',
        num: '234',
        status: '待上架',
        volume: '0'
      }, {
        productNumber: '165',
        imgUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/a6281748980780.jpg',
        productTitle: 'Apple苹果iPhoneXRiphonexsmax手机双卡国行原装4Gxr苹果x',
        productClass: '女鞋',
        brandId: '宏观',
        yPrice: '389.00',
        num: '234',
        status: '待上架',
        volume: '0'
      },{
        productNumber: '143',
        imgUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/a5764350035600.jpg',
        productTitle: '蛋蛋肖显瘦过膝弹力靴后系带SW5050细跟高跟长筒靴长靴女靴骑士靴',
        productClass: '女鞋',
        brandId: '宏观',
        yPrice: '389.00',
        num: '234',
        status: '待上架',
        volume: '0'
      },{
        productNumber: '143',
        imgUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/a5764350035600.jpg',
        productTitle: '蛋蛋肖显瘦过膝弹力靴后系带SW5050细跟高跟长筒靴长靴女靴骑士靴',
        productClass: '女鞋',
        brandId: '宏观',
        yPrice: '389.00',
        num: '234',
        status: '待上架',
        volume: '0'
      },{
        productNumber: '143',
        imgUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/a5764350035600.jpg',
        productTitle: '蛋蛋肖显瘦过膝弹力靴后系带SW5050细跟高跟长筒靴长靴女靴骑士靴',
        productClass: '女鞋',
        brandId: '宏观',
        yPrice: '389.00',
        num: '234',
        status: '待上架',
        volume: '0'
      },{
        productNumber: '143',
        imgUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/a5764350035600.jpg',
        productTitle: '蛋蛋肖显瘦过膝弹力靴后系带SW5050细跟高跟长筒靴长靴女靴骑士靴',
        productClass: '女鞋',
        brandId: '宏观',
        yPrice: '389.00',
        num: '234',
        status: '待上架',
        volume: '0'
      },{
        productNumber: '143',
        imgUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/a5764350035600.jpg',
        productTitle: '蛋蛋肖显瘦过膝弹力靴后系带SW5050细跟高跟长筒靴长靴女靴骑士靴',
        productClass: '女鞋',
        brandId: '宏观',
        yPrice: '389.00',
        num: '234',
        status: '待上架',
        volume: '0'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      listQuery: {}
    }
  },
  methods: {
    /**
     * 打开新建表单
     */
    handleCreate () {
      console.log('add')
      // this.$refs.test1QianKunAdd.handleCreate()
    },
    /**
     * 查询
     */
    handleQuery () {
    },
    /**
     * 重置
     */
    handleReset () {
    }
  }
}
</script>
