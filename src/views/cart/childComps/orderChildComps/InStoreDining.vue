<template>
  <div>
    <el-form>
      <el-form-item label="联系人：">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="性别：">			
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="2">女</el-radio>
        </el-form-item> -->
      <!-- <el-form-item label="联系电话：">
          <el-input v-model="phone"/>
        </el-form-item> -->
      <el-form-item label="桌号：">
        <el-input v-model="tableNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit" style="width:100%">确定下单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'

import { addOrder } from 'network/order'

export default {
	name: "InStoreDining",
  data() {
    return {
      name: '',
      tableNumber: 0
    }
  },
  methods: {
    onSubmit() {
      //判断信息是否都输入
      this.name = this.name.trim()//去掉无效空格
      if (this.name == '' || this.tableNumber == '') {
        this.$notify({
          title: '下单失败',
          message:'您的订单信息没有填写完全',
          position: 'top-left'
        });
      } else {
          const product = {};
          product.userId = this.$store.state.token.toString();
          product.orderName = this.name;
          product.createTime = time;
          product.tel = null;
          product.address = '';
          product.tableNum = this.tableNumber;
          product.orderAllPrice = Number(this.$store.state.priceSum.toFixed(2));
          product.managementId = this.$store.state.managementId;
          product.sum = this.$store.state.sum;

          addOrder(product).then(res => {
            console.log(res)
          })
          
          //删除购物车里的已经被结算的商品
          this.$store.commit('deleteCartList');
          this.$store.commit('renew');
          //更新storage数据
          this.$store.commit('renewStorage')

          this.$notify({
            title: '下单成功',
            message:'您可以在用户中心查看订单状态',
            position: 'top-left'
          });
          this.$router.back();
        
      }
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  background-color: #f6f6f6;
  height: 40px;
  margin-top: 12px;
  font-size: 16px;
  line-height: 2.5;
}
</style>
