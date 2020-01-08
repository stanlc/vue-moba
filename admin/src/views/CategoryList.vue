<template>
    <div>
        <h1>分类列表</h1>
        <el-table :data="tableData">
            <el-table-column prop="name" label="类名" width="140">
            </el-table-column>
            <el-table-column prop="_id" label="id" width="220">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220">
                <template slot-scope="scope"> 
                    <el-button size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
                    <el-button size="small" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData:[],
            }
        },
        created(){
            this.getList()
        },
        methods: {
            async getList() {
                const res= await this.$http.get('rest/categories')
                this.tableData = res.data
            },
            async remove(row){
                this.$confirm( `是否要删除分类"${row.name}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(async () => {
                    const res = await this.$http.delete(`rest/categories/${row._id}`)
                    if(res.data){
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })
                        this.getList()
                    }
                })
                
                
            }
            
        },
    }
</script>

<style lang="scss" scoped>

</style>