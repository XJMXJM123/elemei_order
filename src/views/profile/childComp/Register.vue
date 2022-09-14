<template>
	<div>
		<el-card>
			<div>
				<p>REGISTER</p>
			</div>
			<el-input style="margin-bottom:8px" placeholder="请输入账号" v-model="userName" />
			<el-input style="margin-bottom:8px" placeholder="请输入密码" v-model="password" show-password />
			<el-input placeholder="请输入手机号" v-model="phone" />
			<el-button type="success" round class="button" @click="register">注册</el-button>
		</el-card>
	</div>
</template>

<script>
import { RegisterToken } from 'network/login'

export default {
	name: "Register",
	data() {
		return {
			userName: '',
			password: '',
			phone: ''
		}
	},
	methods: {
		//登录
		register() {
			const user = {}
			user.userid = this.userName
			user.password = this.password
			user.phone = this.phone

			if (this.userName == '' || this.password == '' || this.phone == '') {
				this.$notify({
					title: '注册失败哦',
					message: '注册内容不能为空哦',
					duration: 0,
					position: 'top-left'
				});
			} else {
				RegisterToken(user).then(res => {
					console.log(res);
					if (res == '注册成功') {
						this.$router.push('/userLogin')
						this.$notify({
							title: '注册成功哦',
							message: '',
							duration: 0,
							position: 'top-left'
						});
					}
				})
			}
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
