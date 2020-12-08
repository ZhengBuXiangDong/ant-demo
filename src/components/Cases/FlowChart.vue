<template>
    <section class="flow-wrapper">
        <div :style="wrapperStyle" class="flax-content">
            <canvas :id="'normal' + index" :width="width" :height="height" v-for="(item, index) in flow" :key="index"></canvas>
            <canvas :id="'active' + index" v-show="calShow(item.id)" :width="width" :height="height" v-for="(item, index) in flow" :key="index"></canvas>
            <div :style="maskStyle"></div>
            <div v-for="(item, index) in flow" :key="index" class="flow-text-box" :style="textStyle" :class="calClass(item.id)" @click="handleClick(item.id)">
                <span>{{item.name}}</span>
            </div>
        </div>
    </section>
</template>

<script>
    import { draw } from '@/utils/flow'
    export default {
        props: {
            flow: {
                type: Array,
                default: () => [
                    {
                        id: 1,
                        name: '开始',
                        nextNode: [2]
                    },
                    {
                        id: 2,
                        name: '组件',
                        nextNode: [1, 3]
                    },
                    {
                        id: 3,
                        name: '你好你好',
                        nextNode: [1, 4]
                    },
                    {
                        id: 4,
                        name: '结束',
                        nextNode: []
                    }
                ]
            }
        },
        data () {
            return {
                nodeMap: new Map(),
                directMap: new Map(),
                indexMap: new Map(),
                width: '',
                height: '',
                widthNumber: '',
                heightNumber: '',
                rightCount: 0,
                leftCount: 0,
                nodeId: 0,
                textStyle: {
                    marginLeft: ''
                }
            }
        },
        computed: {
            wrapperStyle () {
                return {
                    width: this.width,
                    height: this.height
                }
            },
            maskStyle () {
                return {
                    width: this.width,
                    height: this.height,
                    zIndex: 1,
                    position: 'absolute'
                }
            }
        },
        created () {
            this.init()
        },
        mounted () {
            draw.call(this)
        },
        methods: {
            init () {
                this.initMapData()
                this.calLineNunber()
                this.initStyle()
            },
            initMapData () {
                for (const i in this.flow) {
                    this.flow[i].leftOrder = 0
                    this.flow[i].rightOrder = 0
                    this.flow[i].index = parseInt(i)
                    this.flow[i].derection = i % 2 === 0
                    this.nodeMap.set(this.flow[i].id, this.flow[i])
                    this.directMap.set(this.flow[i].id, i % 2 === 0)
                    this.indexMap.set(parseInt(i), this.flow[i].id)
                }
            },
            calLineNunber () {
                const flow = JSON.parse(JSON.stringify(this.flow))
                const leftSet = new Set()
                const rightSet = new Set()
                const processNode = new Set()
                let index = 0
                
                let parent = {}
                let node = flow[index]
                let next = flow[index + 1]
                while (index < flow.length) {
                    const toNodes = node.nextNode.filter((id) => { // 过滤上下直接相连的节点
                        return id !== parent.id && id !== next.id
                    })
                    toNodes.forEach((id) => { // 遍历流向的节点
                        // 判断节点流向
                        if (processNode.has(id)) { // 向上流动使用自身泳道: left | right
                            // 根据父节点判断自身泳道方向 right: true
                            if (this.directMap.get(id)) {
                                rightSet.add(node.id)
                            } else {
                                leftSet.add(node.id)
                            }
                        } else { // 向下流动，使用流向节点的泳道
                            const direction = this.directMap.get(node.id)
                            if (direction) {
                                rightSet.add(id)
                            } else {
                                leftSet.add(id)
                            }
                        }
                    })

                    processNode.add(node.id)
                    parent = node
                    node = next
                    next = (++index + 1) !== flow.length ? flow[index + 1] : { id: 0 }
                }
                this.leftCount = leftSet.size
                this.rightCount = rightSet.size
                const leftArr = Array.from(leftSet.values()).sort((n1, n2) => {
                    return n1.index - n2.index
                })
                for (const i in leftArr) {
                    this.nodeMap.get(leftArr[i]).leftOrder = parseInt(i)
                }
                const rightArr = Array.from(rightSet.values()).sort((n1, n2) => {
                    return n1.index - n2.index
                })
                for (const i in rightArr) {
                    this.nodeMap.get(rightArr[i]).rightOrder = parseInt(i)
                }
            },
            initStyle () {
                const textWidth = 170
                const colInterval = 40
                const maxCount = this.leftCount > this.rightCount ? this.leftCount : this.rightCount
                this.widthNumber = ((maxCount + 1) * colInterval + textWidth / 2) * 2 + 40
                this.width = this.widthNumber + 'px'
                this.textStyle.marginLeft = this.widthNumber / 2 - 85 + 'px'

                const textHeight = 40
                const textInterval = 45
                this.heightNumber = (textHeight + textInterval) * this.flow.length
                this.height = this.heightNumber + 'px'
            },
            calClass (id) {
                if (this.nodeId === 0) {
                    return { 'normal': true }
                }
                if (this.nodeId === id) {
                    return { 'select': true }
                } else {
                    const node = this.nodeMap.get(this.nodeId)
                    if (node.nextNode.indexOf(id) >= 0) {
                        return { 'active': true }
                    } else {
                        return { 'normal': true }
                    }
                }
            },
            handleClick (id) {
                this.nodeId = this.nodeId !== id ? id : 0
            },
            calShow (id) {
                return id === this.nodeId
            }
        }
    }
</script>

<style lang="scss" scoped>
.flow-wrapper {width: 100%;height: calc(100% - 33px);overflow-y: scroll;display: flex;justify-content: center;padding-top: 30px;}
.flow-wrapper .flax-content {position: relative;display: flex;flex-direction: column;/*align-items: center*/}
.flow-wrapper canvas {position: absolute;left: 0;right:0}
.flow-wrapper .flow-text-box {border: solid 1px;cursor: pointer;border-radius: 4px;width: 170px;height: 40px;text-overflow: ellipsis;margin-bottom: 45px;text-align: center;z-index: 3}
.flow-wrapper .normal {background:#FFF;border: solid 1px #DCDEE5; color: #313238;}
.flow-wrapper .select {background:#6997FF;border: solid 1px #6997FF; color: #FFF;}
.flow-wrapper .active {background:#FFF;border: solid 2px #6997FF; color: #6997FF;}
.flow-text-box span {line-height: 40px;font-size: 14px;font-weight: 500;}
</style>
