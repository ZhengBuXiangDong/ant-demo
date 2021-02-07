<template>
    <section class="charts-item">
        <h2>树图(echarts)</h2>
        <div id="chartBody" class="chart-body">
            <div id="chartGraph" class="chart-graph"></div>
        </div>
    </section>
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/tree')
require('echarts/lib/component/tooltip')
export default {
    data () {
        return {
            // 树图
            graphData: [],
            myChart: null,
            chartOption: null,
            chartBody: null,
            nodeHeight: 25, // 每个节点高度
            totalNodes: 10, // 总节点数
            minHeight: 100, // 最小高度
            initHeight: 100, // 初始化高度 = Math.max(nodeHeight * totalNodes, minHeight)
            ro: null
        }
    },
    mounted () {
        this.initCharts()
        this.getDerivedGraph()

        // 动态绘制chart
        this.ro = new ResizeObserver(() => {
            this.resizeGraph()
        })
        const tempBody = document.getElementById('chartBody')
        this.ro.observe(tempBody)
    },
    beforeDestroyed () {
        if (this.ro) {
            this.ro.disconnect()
            this.observer = null
        }
    },
  methods: {
    initCharts () {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('chartGraph'))
        this.chartOption = {
            tooltip: {
                show: true,
                trigger: 'item',
                triggerOn:'mousemove',
                formatter: (param) => {
                    let tempStr = ''
                    tempStr += param.data.name
                    return tempStr
                },
                extraCssText: 'max-width:250px; white-space:pre-wrap'
            },
            series: [{
                type: 'tree',
                name: 'series',
                edgeShape: 'curve', // 链接线是折线 curve 还是曲线 polyline
                data: this.graphData,
                top: '1%',
                left: '13%',
                right: '13%',
                symbolSize: 10,
                initialTreeDepth: -1, // 默认展开层级
                label: {
                    position: 'bottom',
                    verticalAlign: 'middle',
                    align: 'center',
                    padding: 3,
                    offset:[0,5],
                    formatter: function (params) {
                        let tempName
                        if (params.name.length > 7) {
                            tempName = params.name.substr(0, 7) + '..'
                        } else {
                            tempName = params.name
                        }
                        return tempName
                    }

                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }]
        }

        // 动态改变高度(当前无效，默认展开所有节点)
        // const temp = this.myChart
        // const that = this
        // const container = document.getElementById('chartGraph')
        // this.myChart.on('click', function (params) {
        //     if (params.componentType === 'series') {
        //         if (!params.value) {
        //             const elesArr = Array.from(new Set(temp._chartsViews[0]._data._graphicEls))
        //             const currentHeight = that.nodeHeight * (elesArr.length - 1) || that.nodeHeight
        //             const newHeight = Math.max(currentHeight, that.initHeight)
        //             container.style.height = newHeight + 'px'
        //             temp.resize()
        //         }
        //     }
        // })
    },
    refreshData (data) {
        const tempOption = this.chartOption
        tempOption.series[0].data = data
        this.myChart.setOption(tempOption)
    },
    resizeGraph () {
        this.myChart.resize()
    },
    // 获取衍生图数据
    getDerivedGraph () {
        // const param = {"fontWeight":"bolder","fontSize":"13","color":"rgb(107, 153, 255)"}
        const that = this
        setTimeout(() => { // 模拟异步请求接口
            let res = {
                "id" : 148937,
                "priority" : "中",
                "number" : "p2_5735",
                "name" : "qeq123",
                "state" : "待处理",
                "createUser" : "李伟剑",
                "children" : [ {
                "id" : 149011,
                "priority" : "中",
                "number" : "p2_5747",
                "name" : "ooo",
                "state" : "backlog",
                "createUser" : "郑怡",
                "children" : [ {
                    "id" : 149026,
                    "priority" : "中",
                    "number" : "p2_5759",
                    "name" : "任务1",
                    "state" : "backlog",
                    "createUser" : "admin",
                    "children" : [ ],
                    "maxNodeSize" : 1
                }, {
                    "id" : 149027,
                    "priority" : "中",
                    "number" : "p2_5760",
                    "name" : "那重新不",
                    "state" : "backlog",
                    "createUser" : "admin",
                    "children" : [ ],
                    "label" : {
                    "fontWeight" : "bolder",
                    "fontSize" : "13",
                    "color" : "rgb(107, 153, 255)"
                    },
                    "maxNodeSize" : 1
                } ],
                "maxNodeSize" : 1
                } ],
                "maxNodeSize" : 4
            }
            that.totalNodes = res.maxNodeSize
            that.graphData = [res]
            that.initHeight = Math.max(that.nodeHeight * that.totalNodes, that.minHeight)
            if (document.getElementById('chartGraph')) {
                document.getElementById('chartGraph').style.height = that.initHeight + 'px'
            }
            if (document.getElementById('chartBody')) {
                document.getElementById('chartBody').style.height = that.initHeight + 'px'
            }
            that.resizeGraph()
            that.refreshData(that.graphData)
        }, 1000)
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