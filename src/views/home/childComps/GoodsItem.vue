<template>
  <div @click="click">
    <!-- 卡片元素 -->
    <el-card :body-style="{ padding: '0px', margin: '0px' }">
      <!-- 图片 -->
      <el-container>
        <el-aside style="width:120px;height: 80px;">
          <img :src="goodsItem.pictureUrl">
        </el-aside>

        <el-container>
          <!-- 内容 -->
          <el-header style="height:23px" v-html="goodsItem.name"></el-header>
          <el-main>描述：<span v-html="goodsItem.orderDesc" /></el-main>
          <el-divider /><!-- 分割线 -->
          <el-footer style="height: 20px">￥{{ goodsItem.price }}</el-footer>
        </el-container>

      </el-container>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    click() {
      if (this.$store.state.token != "") {
        this.$router.push({
          path: '/detail',
          query: {
            id: this.$props.goodsItem.id
          }
        })
      } else {
        this.$router.replace('/Profile')
        this.$notify({
          title: '用户信息错误',
          message: '您尚未登陆哦，登陆一下吧',
          position: 'top-left'
        });
      }
    }
  }
}
</script>

<style scoped>
.el-card {
  width: 98%;
  margin-top: 7px;
  margin-left: 1%;
  padding: 15px;
}

.el-aside {
  text-align: center;
  display: flex;
}

.el-aside img {
  align-self: center; 
  width: 80%;
  height: 100%;
}

.el-header {
  padding: 0;
  font-size: 18px;
}

.el-main {
  padding: 5px 0 0 5px;
  font-size: 13px;

  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical
}

.el-footer {
  padding-left: 3px;
  color: red;
}

.el-divider {
  width: 97%;
  margin: 8px 0px 0px 5px;
}
</style>
