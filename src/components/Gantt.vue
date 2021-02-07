<template>
  <div ref="gantt"></div>
</template>
 
<script>
import {gantt} from 'dhtmlx-gantt';
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
export default {
  name: 'gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {
          data: [],
          links: []
        }
      }
    }
  },
 
  mounted: function () {
    gantt.i18n.setLocale("cn"); //使用中文

    // config
    gantt.config.xml_date = "%Y-%m-%d"; // 日期格式:年-月-日

    // gantt.config.duration_unit ="day";

    // gantt.config.scale_unit = "year";
    // gantt.config.step = 1; 
    // gantt.config.date_scale = "%Y";
    // gantt.config.subscales = [
    //     { unit: "day", step: 1, date: "%j" },
    //     { unit: "month", step: 1, date: "%m" }
    // ];

    // gantt.config.work_time = true;
    // gantt.config.correct_work_time = true; // 跳过节假日:比如你选择的包含周六日,他会自动延长时间或者缩短,延长或者缩短是因为包含节假日,要增加或者减少天数
    // gantt.config.inherit_scale_class = true;
    
    // 高度和宽度
    // gantt.config.scale_height = 80; // 甘特图右侧表头的高度
    // gantt.config.min_column_width = 30;

        // 开启tooltip
    gantt.plugins({ 
        tooltip: true,
        marker: true 
    });

    var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
    var today = new Date();
    gantt.addMarker({
      start_date: today,
      css: "status_line",
      text: "今天",
      title: "今天: " + dateToStr(today)
    });

    gantt.config.scale_height = 50;
    gantt.config.scales = [
      {unit: "day", step: 1, format: "%j, %D"},
      {unit: "month", step: 1, format: "%F, %Y"},
    ];



    // 实现工作时间突出周末颜色
    gantt.templates.task_cell_class = (item,date) => {
        // debugger;
        if(date.getDay()== 0 || date.getDay()== 6){
            return"weekend";
        }
    };

    // 列数据
    gantt.config.columns=[
        {name:"text",       label:"标题",  tree:true, width:'*' },
        {name:"start_date", label:"开始事件", align: "center", template:(val) => val.start_date ? val.start_date : '--'},
        {name:"duration",   label:"持续时间", align: "center", template:(val) => val.duration ? val.duration : '--'},
        {name:"progress",   label:"进度", align: "center", template:(val) => val.progress ? Math.round((+val.progress) * 100) + '%' : '--'},
    ];

    // 事件
    gantt.attachEvent('onTaskSelected', (id) => {
          let task = gantt.getTask(id);
          this.$emit('task-selected', task);
    });
 
    gantt.attachEvent('onTaskIdChange', (id, new_id) => {
       if (gantt.getSelectedId() == new_id) {
         let task = gantt.getTask(new_id);
         this.$emit('task-selected', task);
        }
     });

    // 初始化
    gantt.init(this.$refs.gantt);

    // 自定义事件
    gantt.createDataProcessor((entity, action, data, id) => {
      this.$emit(`${entity}-updated`, id, action, data);
   });
    gantt.parse(this.$props.tasks);
  },
  methods: {
      updateDayView () {
        gantt.config.scales = [                         
          {unit: "day", step: 1, format: "%d %M, %D"} 
        ];                                              
        gantt.templates.scale_cell_class = function(date){
            if(date.getDay()==0||date.getDay()==6){
                return "weekend";
            }
        };
        gantt.render()
      },
      updateMonthView () {
        gantt.config.scales = [
          {unit: "month", step: 1, format: "%F, %Y"},
        ];
        gantt.render()
      },
      updateWeekView () {
        gantt.config.scales = [
          {unit: "week", step: 1, format: function (date) {
              return "Week #" + gantt.date.getWeek(date);
          }},
          
        ];
        gantt.render()
      }

  }
}
</script>
<style scoped lang="scss">
/deep/ .status_line {
  background-color: #ff9c01!important;
}
.weekend {
    background: #f4f7f4;
}

.gantt_selected .weekend {
    background: #f7eb91;
}
</style>