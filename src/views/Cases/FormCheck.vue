<template>
  <div>
      <a-input placeholder="Basic usage" v-moedl="name" @blur="check"/>
      <a-button type="primary" @click="confirm">
          确定
        </a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      nameCheckState: 'un'
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {

    },
    check (val) {
      this.nameCheckState = 'no'
      console.log(val)
      setTimeout(() => {
        this.nameCheckState = 'yes'
      }, 300)
    },
    confirm () {

    }
  },
};
</script>
<style lang="scss" scoped>
  .value-content {
    margin-top: 30px;
    p {
      line-height: 32px;
    }
  }
</style>