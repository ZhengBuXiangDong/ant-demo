<template>
    <div class="trans">
        <div class="trans-left">
            <div class="source-list trans-box">
                <div class="header">
                    可选字段
                    <span class="g-pointer" @click.stop.prevent="selectAll">全部添加</span>
                </div>
                <div class="trans-search">
                    <a-input v-model="searchValue" placeholder="输入关键字按回车搜索">
                        <a-icon slot="prefix" type="search" />
                    </a-input>
                </div>
                <div class="content">
                    <div class="field-content">
                        <div v-for="option in filterUnselectd" :key="option.id" class="field-content-item">
                            <a-checkbox class="checkbox" v-model="option.selected" @change="toggleSelect(option)"></a-checkbox>
                            <span class="text">{{option.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="transfer">
            <a-icon type="swap" />
        </div>
        <div class="target-list trans-box">
            <div class="header">
                已选字段
                <span class="g-pointer" @click.stop.prevent="clearAll">清空</span>
            </div>
            <div class="content">
                <div v-for="option in selectedList" :key="option.id" class="select-field-item">
                    <span class="text">{{option.name}}</span>
                    <a-icon type="delete" @click="cancelSelectItem(option)"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            unSelectedList: [
                { id: 1, name: 'hello', selected: true },
                { id: 2, name: '你好', selected: true },
                { id: 3, name: '转身以后', selected: false },
                { id: 4, name: '我会炼成护体神功', selected: false },
                { id: 5, name: '提交记录', selected: false },
                { id: 6, name: '添加devops-model服务', selected: false }
            ],
            selectedList: [
                { id: 1, name: 'hello', selected: true },
                { id: 2, name: '你好', selected: true }
            ],
            searchValue: ''
        }
    },
    computed: {
        filterUnselectd () {
            if (this.searchValue) return this.unSelectedList.filter(item => item.name.indexOf(this.searchValue) !== -1)
            else return this.unSelectedList
        }
    },
    methods: {
        selectAll () {
            this.unSelectedList.forEach(item => {
                item.selected = true
            })
            if (!this.selectedList.length) {
                this.selectedList = JSON.parse(JSON.stringify(this.unSelectedList))
                return
            }
            // 去重存入
            this.unSelectedList.forEach(item => {
                const hasItem = this.selectedList.some(select => select.id === item.id)
                if (!hasItem) {
                    this.selectedList.push(item)
                }
            })
        },
        clearAll () {
            this.selectedList = []
            this.unSelectedList.forEach(item => {
                item.selected = false
            })
        },
        toggleSelect (row) {
            console.log(row)
            if (row.selected) {
                this.selectedList.push(row)
                return
            }
            this.selectedList = this.selectedList.filter(item => item.id !== row.id)
        },
        fillSelectState () {
            // 遍历未选列表，如果某条存在已选中，select为true
            this.unSelectedList.forEach(item => {
                const hasItem = this.selectedList.some(select => select.id === item.id)
                if (hasItem) item.selected = true
            })
        },
        cancelSelectItem (row) {
            this.selectedList = this.selectedList.filter(item => item.id !== row.id)
            this.unSelectedList.forEach(item => {
                if (item.id === row.id) {
                    item.selected = false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.trans {
    display: flex;
    position: relative;
    .field-content {
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        margin-right: 10px;
        &-item { // 表示.sys-content-item
            line-height: 32px;
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
            .checkbox {
                margin-right: 5px;
            }
            .text{
                vertical-align: middle;
            }
        }
    }
    .trans-search {
        border-bottom: 1px solid #dde4eb;
        /deep/ .ant-input{
            border: none!important;;
        }
    }

    &-left {
        flex: 1;
        overflow: hidden;
    }
    .trans-box {
        flex: 1;
        overflow: hidden;
        min-width: 200px;
        height: 400px;
        background-color: #fff;
        border-radius: 2px;
        border: 1px solid #dde4eb;
        overflow: hidden;

        .header {
            height: 43px;
            line-height: 43px;
            background-color: #fafbfd;
            border-bottom: 1px solid #dde4eb;
            padding: 0 20px;
            position: relative;

            span {
                position: absolute;
                right: 10px;
                font-size: 12px;
                color: #3a84ff;
                cursor: pointer;
            }
        }

        .content {
            height: calc(100% - 42px);
            overflow-y: auto;
            position: relative;
            padding: 0;
            .field-content {
                padding-right: 0;
                margin-right: 0;
                .field-content-item {
                    width: 195px;
                    max-width: 33%;
                }
            }

            .select-field-item {
                padding: 0 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: 36px;
                &:hover{
                    background-color: #f0f1f5;
                    color: #3a84ff;
                }
            }

            &-text {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .icon-wrap {
                flex: 22px 0 0;
                display: none;
                outline: none;

                i {
                    font-size: 22px;
                }
            }
        }
    }

    .transfer {
        width: 30px;
        height: 30px;
        position: absolute;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        top: 50%;
        left: 50%;
        text-align: center;
    }

    .target-list {
        margin-left: 33px;
    }
}
</style>