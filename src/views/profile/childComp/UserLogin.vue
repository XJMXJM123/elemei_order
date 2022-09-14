<template>
	<div>
		<el-card>
			<div>
				<p>USER</p>
			</div>
			<el-input style="margin-bottom:8px" placeholder="请输入账号" v-model="userName" />
			<el-input placeholder="请输入密码" v-model="password" show-password />
			<el-button type="success" round class="button" @click="login">登录</el-button>
		</el-card>
	</div>
</template>

<script>
import { userLoginToken } from 'network/login'

export default {
	name: "UserLogin",
	data() {
		return {
			userName: '',
			password: '',
		}
	},
	methods: {
		//登录
		login() {
			const user = {}
			user.userid = this.userName
			user.password = this.password
			this.$store.state.nickName = this.userName
			userLoginToken(user).then(res => {
				if (res == '用户名或密码输入错误') {
					this.$notify({
						title: '没有登陆成功哦',
						message: '可能是账号或密码错啦',
						duration: 0,
						position: 'top-left'
					});
					return;
				}

				//登陆成功
				if (res = this.userName) {
					//记录当前的用户token
					//用于判断当前是哪个用户
					const product = {};
					product.token = res;
					product.condition = false;

					this.$store.commit('changeToken', product)

				} else {
					this.$notify({
						title: '没有登陆成功哦',
						message: '可能是账号或密码错啦',
						duration: 0,
						position: 'top-left'
					});
				}
			})
		}
	},
	mounted() {

	}
}
</script>

<style scoped>
p {
	text-align: center;
	font-size: 18px;
	color: #999;
	font-weight: 600;
	margin-bottom: 10px;
}

.el-input {
	width: 90%;
	margin-left: 5%;
}

.el-checkbox {
	margin-left: 7%;
	margin-top: 5px;
}

.el-card {
	width: 96%;
	margin-left: 2%;
	margin-top: 10px;
	background: rgba(255, 255, 255, .9);
}

.button {
	width: 90%;
	margin-left: 5%;
	margin-top: 25px;
}
</style>
