<template>
    <section class="casestemp">
        <nav class="nav">
            <h2 class="title">实用案例</h2>
            <ul>
                <li :class="{'active': activeLi === key}"  v-for="(value, key) in lis" :key="key" class="g-hover" @click="activeLi = key">{{value}}</li>
            </ul>
        </nav>
        <div class="content">
            <div class="content-top">
                <div>
                    <span>{{lis[activeLi]}}</span>
                </div>
                <div>
                    <button><router-link to="/">返回首页</router-link></button>
                </div>
            </div>
            <main class="content-main">
                <component :is="activeLi"></component>
            </main>
        </div>
    </section>
</template>
<script>
import transfer from '@/components/Cases/Transfer';
import flowChart from '@/components/Cases/FlowChart';
import treeTable from '@/components/Cases/TreeTable';
import bgSvg from '@/components/Cases/BgSvg';
import highlight from '@/components/Cases/Highlight';
import formCheck from '@/components/Cases/FormCheck';
import gridHover from '@/components/Cases/GridHover';
export default {
    components: { 
        transfer,
        flowChart,
        treeTable,
        bgSvg,
        highlight,
        formCheck,
        gridHover
    },
    data () {
        return {
            lis: {
                transfer: '穿梭框',
                flowChart: '使用canvas画流程图',
                treeTable: '树形结构的增删改查',
                bgSvg: '使用svg或图片当背景图',
                highlight: '查找高亮',
                formCheck: '表单异步校验',
                gridHover: '日历滑动渐变'
            },
            activeLi: 'transfer'

        }
    }
}
</script>
<style lang="scss" scoped>
.casestemp {
    width: 100%;
    height: 100%;
    display: flex;
    .nav {
        width: 300px;
        height: 100%;
        border-right: 1px solid #ccc;
        padding-top: 15px;
        .title {
            text-align: center;
        }
        li.active {
            color: #3a84ff;
        }
        .nav-item {
            padding: 10px;
        }

    }
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        &-top{
            padding: 0 15px;
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
        }
        &-main{
            flex: 1;
            padding: 15px;
        }
    }
    
}
</style>