<template>
	<div>

		<el-card :body-style="{ padding: '0px',margin:'0px'}">

			<div class="allChecked" @click="allChecked">
				<el-checkbox v-model="checked" disabled>全选</el-checkbox>
			</div>

			<div @click="goOrder">
				<div style="float:right">
					<el-button type="success">去结算({{cartNum}})</el-button>
				</div>
				<div class="priceSum">
					合计：￥<strong style="color:red">{{cartPriceSum}}</strong>
				</div>
			</div>

		</el-card>

	</div>
</template>

<script>

export default {
	name: "CartBottom",
	data() {
		return {
			managementId: [],
			sum:[]
		}
	},
	computed: {
		checked() {
			return this.$store.state.allChecked
		},
		cartNum() {
			return this.$store.state.num
		},
		cartPriceSum() {
			return this.$store.state.priceSum.toFixed(2)
		}
	},
	methods: {
		allChecked() {
			this.$store.commit('allChecked')
			this.$store.commit('renew')
		},
		goOrder() {
			if(this.$store.state.num == 0) {
				this.$notify({
					title: '还没有选择商品噢',
					position: 'top-left'
				});
			} else {
				for(let item of this.$store.state.cartList){
					if(item.checked == true) {
						this.managementId.push(Number(item.id))
						this.sum.push(Number(item.count))
					}
				}
				let product = [];
				product[0] = this.managementId;
				product[1] = this.sum;
				// 将用户餐品信息存入store
				this.$store.commit('addFoodList', product)
				// console.log(this.$store.state.managementId);
				this.$router.push('/order')
			}
		}
	}
}
</script>

<style scoped>
.el-card {
	position: fixed;
	bottom: 50px;
	width: 100%;
	z-index: 9;
}

.allChecked {
	position: absolute;
	margin-top: 8px;
	margin-left: 5px
}

.priceSum {
	float: right;
	margin-top: 8px;
	margin-right: 5px;
}
</style>
