<template>
    <span class="icon-flex tw-icon" :style="display">
        <span v-if="isSingle" class="g-flex svg-box" :style="top">
            <svg :width="size" :height="size" :style="{ fill: color }" @click="itemClick">
                <use v-bind="{ 'xlink:href': `#${name}` }"></use>
            </svg>
            <span v-if="label !== ''" style="margin-left: 10px">{{label}}</span>
        </span>
        <span v-else class="tw-svg-icon g-flex svg-box" :style="top">
            <i v-for="(icon, index) in icons" :key="index" v-bk-tooltips.top="icon.name">
                <svg :width="size" :height="size" :style="{ fill: color }" class="block">
                    <use v-bind="{ 'xlink:href': `#${icon.ico}` }"></use>
                </svg>
            </i>
        </span>
    </span>
</template>

<script>
    /**
     * 单个图标展示：:name="tw-bug"
     * 多个图标展示：:icons="icons"
     * icons: [
     *     {
     *         ico: 'tw-bug',
     *         name: 'bug'
     *     }
     * ]
     */
    export default {
        props: {
            name: {
                type: String,
                default: ''
            },
            icons: {
                type: Array,
                default: () => []
            },
            size: {
                type: [String, Number],
                default: 16
            },
            color: {
                type: String,
                default: 'currentColor'
            },
            display: {
                type: String,
                default: 'flex'
            },
            top: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
            }
        },
        computed: {
            isSingle () {
                return this.name !== ''
            }
        },
        methods: {
            itemClick (item, index, row) {
                this.$emit('item-click', item, index, row)
            }
        }
    }
</script>
<style lang="scss" scoped>
.tw-icon{
    &.icon-flex {display: inline-flex;}
    .svg-box {display: flex; align-items: center;position: relative;&:hover .nav-text{opacity: 1; visibility: visible;}}
    .tw-svg-icon i {margin-right: 5px;position: relative; &:hover .nav-text{opacity: 1; visibility: visible;}}
    .nav-text{position: absolute; top: -5px; left: 24px;z-index:10; white-space: nowrap; background-color: #191929; font-size: 12px; color: #fff; margin: 0; padding: 4px 10px; border-radius: 4px; transition:opacity .2s ease; opacity: 0; visibility: hidden;}
    .nav-text::after{content: ''; position: absolute; left: -3px; top: 9px; width: 8px; height: 8px; background-color: #191929; transform: rotate(45deg);}
    .block{display:block;}
}
</style>
