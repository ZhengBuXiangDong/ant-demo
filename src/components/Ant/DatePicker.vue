<template>
  <div>
    <a-date-picker :value="moment(dateValue, dateFormat)" :format="dateFormat" @change="dateChange"/>
    <button @click="show">点击</button>
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
      this.dateValue = dateString
    }
  },
};
</script>