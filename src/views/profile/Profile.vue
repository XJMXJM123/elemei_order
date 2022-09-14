<template>
	<div class="bg">
		<!-- 登陆页面 -->
		<router-view v-if="loginState"></router-view>
		<!-- 登陆成功后的页面 -->
		<div v-if="!loginState">
			<!-- 用户基础信息 -->
			<user-data />
			<!-- 功能页 -->
			<options />
			<!-- 退出登录 -->
			<logout />
		</div>
		<div v-if="loginState && loginPage" class="changeBtn">
			<router-link to="/userLogin"><span @click="changeLoginPage" style="color: #6eb6ff;">是管理员？点这里</span></router-link>
			<span style="font-size:20px;color: #aaa;"> | </span>
			<router-link to="/register"><span @click="changeLoginPage" style="color: #6eb6ff;">注册</span></router-link>
		</div>
		<div v-if="loginState && !loginPage" class="changeBtn">
			<router-link to="/manageLogin"><span @click="changeLoginPage" style="color: #6eb6ff;">点这里回去→</span></router-link>
		</div>
	</div>
</template>

<script>

import UserLogin from './childComp/UserLogin'
import ManageLogin from './childComp/ManageLogin'
import Register from './childComp/Register'
import Logout from './childComp/Logout.vue'
import Options from './childComp/Options'
import UserData from './childComp/UserData'

export default {
	name: "Profile",
	data() {
		return {
			loginPage: true
		}
	},
	components: {
		UserLogin,
		ManageLogin,
		Register,
		UserData,
		Options,
		Logout
	},
	computed: {
		loginState() {
			return !this.$store.state.token
		}
	},
	methods: {
		changeLoginPage() {
			this.loginPage = !this.loginPage
		}
	}
}
</script>

<style scoped>
.el-card {
	width: 96%;
	margin-left: 2%;
}

.bg {
	width: 100%;
	background-image: url(assets/img/resource/Background.png);
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: 0px 50px;
	background-size: 100%;
}

.changeBtn {
	position: fixed;
	bottom: 80px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
