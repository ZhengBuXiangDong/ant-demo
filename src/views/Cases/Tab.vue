<template>
    <section>
        <ul class="issue-nav-tabs">
            <li
                class="tab-item"
                v-for="(item,index) in data"
                :key="index"
                @click="tabChanged(item)"
            >
                <a class="tab-link g-pointer" :class="item.active ? 'active' : ''">{{item.name}}</a>
            </li>
        </ul>
        <slot name="tab-content"></slot>
    </section>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                required: true
            }
        },
        methods: {
            tabChanged (item) {
                this.$emit('tab-changed', item)
            }
        }

    }
</script>

<style lang="scss" scoped>
.issue-nav-tabs {
    padding: 0;
    margin: 0 -15px 10px -15px;
    display: flex;
    flex-wrap: wrap;

    .tab {
        &-item {
            &:last-child {
                .tab-link::before {
                    display: none;
                }
            }
        }
        &-link {
            padding: 3px 15px;
            position: relative;

            &.active {
                color: #313238;
                font-weight: bold;
            }

            &::before {
                position: absolute;
                right: 0;
                top: 4px;
                bottom: 4px;
                width: 1px;
                background: #dcdee5;
                content: "";
            }
        }
    }
}
</style>
