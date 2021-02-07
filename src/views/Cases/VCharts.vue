<template>
    <section class="charts">
        <h2>堆叠面积图</h2>
        <ve-line :data="chartData" :settings="chartSettings" :extend="extend"></ve-line>
        <e-tree></e-tree>
    </section>
</template>
<script>
import eTree from '@/components/Echarts/tree.vue'
export default {
    components: {eTree},
    data () {
        this.chartSettings = {
            area: true
        }
        this.extend = {
        'series.0.smooth': 0
        }
        return {
            chartData: {
                columns: ['日期', '访问用户'], // 第一个参数代表X轴，y轴根据具体值自动生成
                rows: [
                    { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                    { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                    { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                    { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                    { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                    { '日期': '1/6', '访问用户': 4593, '下单用户': 4093, '下单率': 0.78 }
                ]
            }
        }
    }
}

</script>
<style lang='scss' scoped>
.charts {
    height: 100%;
    overflow: auto;
}
</style>