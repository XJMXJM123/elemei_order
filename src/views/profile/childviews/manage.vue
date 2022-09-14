<template>
	<div>
		<!-- 页头 -->
		<el-breadcrumb>
			<el-breadcrumb-item :to="{ path: '/profile' }" replace style="padding-left:15px">用户</el-breadcrumb-item>
			<el-breadcrumb-item>菜品管理</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 表单 -->
		<p class="text">菜品管理</p>
		<el-card>
			<el-table :data="tableData" stripe width="100%">
				<el-table-column label="菜品" align="center">
					<template scope="scope">
						<img :src="scope.row.pictureUrl" width="68" height="45" />
					</template>
				</el-table-column>
				<el-table-column prop="name" label="名称" align="center" min-width="70" />
				<!-- <el-table-column prop="introduction" label="描述" align="center"/> -->
				<el-table-column prop="price" label="价格" align="center" min-width="70" />
				<el-table-column label="操作" align="center" min-width="46">
					<template slot-scope="scope">

						<el-button @click="test(scope.$index)" type="text" size="small">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-drawer title="修改数据" :visible.sync="dialog" size="80%" custom-class="demo-drawer" ref="drawer">
			<div class="demo-drawer__content" style="margin: 10px;">

				<el-form ref="form" :model="obj" label-width="50px">

					<el-form-item label="图片">
						<el-upload ref="upload" action="http://192.168.1.123:8888/file" list-type="picture-card" :auto-upload="true"
							:on-success="handleSuccess">
							<i slot="default" class="el-icon-plus"></i>
							<div slot="file" slot-scope="{file}">
								<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
								<span class="el-upload-list__item-actions">
									<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
										<i class="el-icon-delete"></i>
									</span>
								</span>
							</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>

					<el-form-item label="名称">
						<el-input v-model="obj.name"></el-input>
					</el-form-item>
					<el-form-item label="价格">
						<el-input v-model="obj.price"></el-input>
					</el-form-item>
					<el-form-item label="描述">
						<el-input v-model="obj.orderDesc"></el-input>
					</el-form-item>
				</el-form>

				<div class="demo-drawer__footer">
					<el-button @click.native.prevent="changeData(index, tableData, obj)" type="primary">立即修改</el-button>
					<el-button @click.native.prevent="deleteRow(index, tableData)" type="danger">移除数据</el-button>
				</div>

			</div>
		</el-drawer>

		<div class="addBtn" @click="addFood">+</div>

		<el-drawer title="添加数据" :visible.sync="dialog2" size="80%" custom-class="demo-drawer" ref="drawer">
			<div class="demo-drawer__content" style="margin: 10px;">

				<el-form ref="form2" :model="addDishes" label-width="50px">

					<el-form-item label="图片">
						<el-upload ref="upload2" action="http://192.168.1.123:8888/file" list-type="picture-card"
							:auto-upload="true" :on-success="handleSuccess2">
							<i slot="default" class="el-icon-plus"></i>
							<div slot="file" slot-scope="{file}">
								<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
								<span class="el-upload-list__item-actions">
									<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove2(file)">
										<i class="el-icon-delete"></i>
									</span>
								</span>
							</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>

					<el-form-item label="名称">
						<el-input v-model="addDishes.name"></el-input>
					</el-form-item>
					<el-form-item label="价格">
						<el-input v-model="addDishes.price"></el-input>
					</el-form-item>
					<el-form-item label="描述">
						<el-input v-model="addDishes.orderDesc"></el-input>
					</el-form-item>
					<el-form-item label="类型">
						<el-radio-group v-model="addDishes.type">
							<el-radio label="1">菜品</el-radio>
							<el-radio label="2">主食</el-radio>
							<el-radio label="3">饮品</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>

				<div class="demo-drawer__footer">
					<el-button @click.native.prevent="addData(addDishes)" type="primary">立即添加</el-button>
					<el-button @click.native.prevent="clearForm2" type="danger">清空数据</el-button>
				</div>

			</div>
		</el-drawer>

	</div>
</template>

<script>
import { getHomeData } from 'network/home'
import { uploadData, deleteData } from 'network/profile'


export default {
	name: "manage",
	data() {
		return {
			tableData: [],
			dialog: false,
			dialog2: false,
			index: 0,
			dialogImageUrl: '',
			dialogVisible: false,
			disabled: false,
			obj: {},
			addDishes: {
				pictureUrl: '',
				name: '',
				price: '',
				orderDesc: '',
				type: ''
			}
		}
	},
	methods: {
		getMangeData(a, b, c) {
			getHomeData(a).then(res => {
				this.tableData.push(...res)
				getHomeData(b).then(res => {
					this.tableData.push(...res)
					getHomeData(c).then(res => {
						this.tableData.push(...res)
					})
				})
			})
		},
		test(index) {
			this.index = index;
			this.obj = JSON.parse(JSON.stringify(this.tableData[index])); //对象深拷贝，修改不影响之前的
			let product = {};
			product.name = this.tableData[index].name;
			this.dialog = true;
		},
		//删除某一项
		deleteRow(index, tableData) {
			deleteData(tableData[index].id).then(res => {
				console.log('删除成功');
			})
			tableData.splice(index, 1);

			this.dialog = false;
		},
		//修改数据
		changeData(index, rows, obj) {
			// this.$refs.upload.submit();
			if (obj.name !== '' && obj.price !== '' && obj.orderDesc !== '') {
				// 改变数组并实时更新
				// Vue.set(target, key, value) 或 this.$set(target, key, value) 接受三个参数:
				// target：表示数据源，即是你要操作的数组或者对象
				// key：要操作的的字段
				// value：更改的数据
				this.$set(rows, index, obj);
				uploadData(obj).then(res => {
					console.log('修改成功');
				})
				this.dialog = false;
			} else {
				this.$notify({
					title: '修改失败哦',
					message: '所填信息不能为空',
					duration: 0,
					position: 'top-left'
				});
			}
		},
		addFood() {
			this.dialog2 = true
		},
		//添加数据
		addData(addList) {
			if (addList.name !== '' && addList.price !== '' && addList.orderDesc !== '' && addList.type != '') {
				this.$refs.upload2.submit();
				uploadData(addList).then(res => {
					console.log('添加成功');
					this.tableData.push(addList)
					this.addDishes = {
						pictureUrl: '',
						name: '',
						price: '',
						orderDesc: '',
						type: ''
					}
				})
				this.dialog2 = false;
			} else {
				this.$notify({
					title: '修改失败哦',
					message: '所填信息不能为空',
					duration: 0,
					position: 'top-left'
				})
			}
		},
		clearForm2() {
			this.addDishes = {
				pictureUrl: '',
				name: '',
				price: '',
				orderDesc: '',
				type: ''
			}
		},
		handleRemove(file) {
			this.$refs.upload.handleRemove(file)
		},
		handleRemove2(file) {
			this.$refs.upload2.handleRemove(file)
		},
		handleSuccess(res) {
			this.obj.pictureUrl = res
		},
		handleSuccess2(res) {
			this.addDishes.pictureUrl = res
		}
	},
	mounted() {
		if (this.$store.state.condition == "") {
			this.$router.replace('/Profile')
		}
		this.getMangeData('1', '2', '3')
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

.el-card {
	width: 96%;
	margin-left: 2%;
	margin-top: 10px;
}

.text {
	font-size: 30px;
	text-align: center;
	margin-top: 20px;
}

.el-table th.el-table__cell>.cell {
	text-align: center;
}

.el-table td.el-table__cell div {
	text-align: center;
}

.addBtn {
	position: fixed;
	bottom: 60px;
	left: 50%;
	transform: translateX(-50%);
	height: 40px;
	width: 40px;
	background-color: #6eb6ff;
	border-radius: 100px;
	text-align: center;
	line-height: 40px;
	font-size: 30px;
	color: #fff;
	z-index: 9;
}
</style>
