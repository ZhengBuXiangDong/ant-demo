<template>
  <section>
      <div id="dateDiv">
          <table class="dataTable" cellspacing="0" border="0">
              <thead>
                  <tr>
                    <th v-for="(item, index) in WeekLabel" :key="index">{{item}}</th>
                  </tr>
              </thead>
              <tbody id="dateBody">
                  <tr v-for="(tr, trIndex) in dateArray" :key="trIndex">
                    <td v-for="(td, tdIndex) in tr" :key="tdIndex">
                        <label>
                            <input type="radio" name="date" :value="td" style="display: none;">
                            <span>{{td}}</span>
                        </label>
                    </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </section>
</template>
<script>
export default {
  data() {
    const WeekLabel = ["日", "一", "二", "三", "四", "五", "六"],
        PingDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        RunDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return {
        WeekLabel,
        PingDays,
        RunDays,
        dateArray: [[]]
    }
  },
  mounted () {
      this.init()
  },
  methods: {
      init () {
        let dateArray = this.getDateArray("2018/11/01","2019/12/01")
        let tbody = document.getElementById('dateBody')
        let arr = []
        for (let i = 0; i < dateArray.length / this.WeekLabel.length; i++) {
            let temp = dateArray.slice(i * this.WeekLabel.length, (i + 1) * this.WeekLabel.length);
            let tr = []
            temp.map(function(item) {
                tr.push(item)
            })
            arr.push(tr)
        }
        this.dateArray = arr
        tbody.addEventListener("mousemove", function(event) {
            var ev = event || window.event;
            ev.preventDefault();
            this.style["background-position"] = (ev.clientX - this.parentNode.offsetLeft - 46) + "px " +
                (ev.clientY - this.parentNode.offsetTop - 46 - 46) + "px";
        }, true);
        tbody.addEventListener("mouseout", function(event) {
            var ev = event || window.event;
            ev.preventDefault();
            this.style["background-position"] = "-92px -92px";
        }, true)
      },
      getDateArray (start_date, end_date) {
        // 对日期进行处理
        let startDate = new Date(start_date)
        let endDate = new Date(end_date)
        let s_year = startDate.getFullYear(),
            s_mon = startDate.getMonth() + 1,
            // s_day = startDate.getDate(),
            e_year = endDate.getFullYear(),
            // e_day = endDate.getDate()
            e_mon = endDate.getMonth() + 1
        // 计算当月月初和月末是周几
        let start_space, end_space, mid_days = []
        start_space = new Date(s_year + "/" + s_mon + "/" + "01").getDay()

        let curYear = s_year,curMon = s_mon
        while(curYear < e_year || (curYear == e_year && curMon <= e_mon)){
            if (curYear % 4 == 0 && curYear % 100 != 0 || curYear % 400 == 0) {
                mid_days.push(this.RunDays[curMon - 1]);
            } else {
                mid_days.push(this.PingDays[curMon - 1]);
            }
            curMon ++;
            if(curMon > 12){
                curYear++;
                curMon=1;
            }
        }
        console.log(start_space, mid_days, end_space)

        end_space = 6 - new Date(e_year + "/" + e_mon + "/" + mid_days[mid_days.length-1]).getDay()

        // 日期数组拼接
        var res = Array.from({ "length": start_space }, () => "")
        mid_days.forEach((item) => {
            res = res.concat(Array.from({ "length": item }, (v, k) => k + 1))
        })
        res = res.concat(Array.from({ "length": end_space }, () => ""))
        return res
      },
  }
}
</script>
<style lang="scss" scoped>
table.dataTable {
    background: rgb(59, 59, 59);
    color: white;
}

table.dataTable > thead {
    display: block;
}

table.dataTable > tbody::-webkit-scrollbar{
    display: none;
}

table.dataTable > tbody {
    display: block;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    background-size: 92px 92px;
    background-position: -92px -92px;
    background-repeat: no-repeat;
    height: 276px;
    overflow: auto;
}

table.dataTable > tbody > tr >td, table.dataTable > thead > tr > th {
    width: 40px;
    height: 40px;
    text-align: center;
    box-sizing: content-box;
    border: 1px solid rgb(59, 59, 59);
    vertical-align: middle;
    background-color: rgb(59, 59, 59);
    background-clip: content-box;
    padding: 2px;
}
table.dataTable > tbody > tr > td > label{
    display: block;
    width: 100%;
    height: 100%;
}
table.dataTable > tbody > tr > td > label > span{
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    line-height: 0;
    padding: 20px 0;
}
table.dataTable > tbody > tr > td > label > span:hover{
    box-shadow: 0 0  2px 2px #FFFFFF;
}

table.dataTable > tbody > tr > td > label > input:checked + span{
    border: 2px solid #3a84ff;
    padding: 18px 0;
}
</style>
