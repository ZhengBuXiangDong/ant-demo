<template>
  <div>
    <a-date-picker :value="dateValue ? moment(dateValue, dateFormat) : null" :format="dateFormat" @change="dateChange"/>
    <button @click="show">点击</button>
    <div class="value-content">
      <p>日期的值：{{dateValue}}</p>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      dateValue: '',
      dateFormat: 'YYYY-MM-DD',
    }
  },
  created () {
    this.init()
  },
  methods: {
    moment,
    init () {
      this.dateValue = '2020-02-02'
    },
    show () {
      console.log(this.dateValue)
    },
    dateChange (date, dateString) {
      console.log(date, dateString);
      this.dateValue = dateString
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