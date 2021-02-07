<template>
    <div>
        <button @click="updateView">更新视图</button>
        <div style="height:600px;" ref="gantt"></div>
    </div>
</template>
 
<script>
import {gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css"
export default {
  name: "gantt",
  data() {
    return {
      tasks: {
        data: [
          {
            id: 1,
            text: "Task #1",
            start_date: "15-04-2020",
            personName: "阿瓦达，林岚",
            duration: 7,
            progress: 0.6
          },
          {
            id: 2,
            text: "Task #2",
            start_date: "18-04-2020",
            personName: "建军节",
            duration: 25,
            progress: 0.4
          },
          {
            id: 3,
            text: "Task #2-1",
            start_date: "20-04-2020",
            personName: "李珊珊",
            duration: 7,
            progress: 0.4,
            parent: 2
          },
          {
            id: 4,
            text: "Task #2-1",
            start_date: "20-04-2020",
            personName: "周五",
            duration: 5,
            progress: 0.6,
            parent: 2
          }
        ]
      },
      lists: [
        {
          icon: "mdi-account",
          text: "个人中心",
          src: "/user/info"
        }
      ]
    };
  },
 
  mounted: function() {
    gantt.config.columns = [
      { name: "text", label: "项目", tree: true, width: "*" },
      { name: "personName", label: "负责人", align: "center" },
      { name: "start_date", label: "开始日期", align: "center",width: "*" }
    ];
    gantt.config.scale_unit = "year";
    gantt.config.step = 1; 
    gantt.config.date_scale = "%Y";
    gantt.config.subscales = [
        { unit: "day", step: 1, date: "%j" },
        { unit: "month", step: 1, date: "%m" }
    ];
    // 当右侧不止显示年份时，可以添加展示月日，添加一个就加一行
    gantt.config.scale_height = 80;
    // 甘特图右侧表头的高度
    gantt.config.min_column_width = 25;
    //下面日期的宽度，会随时间长短宽度变化。但是设置最小宽度后，当时间跨度到达一定长度，就会展示最小宽度
    gantt.i18n.setLocale("cn");
    //使用中文
    gantt.config.work_time = true;
    gantt.config.correct_work_time = true;
    // 跳过节假日：比如你选择的包含周六日，他会自动延长时间或者缩短，延长或者缩短是因为包含节假日，要增加或者减少天数
    gantt.config.inherit_scale_class = true;
    gantt.init(this.$refs.gantt);
    // 初始化
    gantt.parse(this.tasks);
  },
  methods: {
      updateView () {
          gantt.refreshData();
      }
  }
};
</script>