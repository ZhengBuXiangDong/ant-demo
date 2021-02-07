<template>
<div class="table-box">
  <table border="0" cellpadding="0" cellspacing="0" v-if="dataInit">
    <thead>
      <tr>
        <th v-for="item in tHeader" :key="item.dataIndex">{{item.title}}</th>
      </tr>
    </thead>
    <tbody v-for="(item, index) in list" :key="index" >
        <template v-for="(taskItem, taskIndex) in item.task_type_list">
          <template v-for="(teamItem, teamIndex) in taskItem.team_list">
            <template v-for="(cardItem, cardIndex) in teamItem.card_type_list">
              <tr :key="'' + index + taskIndex + teamIndex +  cardIndex ">
                <td v-if="taskIndex + teamIndex + cardIndex === 0" :rowspan="item.span">{{item.range}}</td>
                <td v-if="taskIndex + teamIndex + cardIndex === 0" :rowspan="item.span - 1">{{item.creator}}</td>
                <td v-if="teamIndex === 0 && cardIndex === 0" :rowspan="taskItem.taskSpan">{{taskItem.task_type_name}}</td>
                <td v-if="cardIndex === 0" :rowspan="teamItem.teamSpan">{{teamItem.team_name}}</td>
                <td v-if="cardIndex === 0" :rowspan="teamItem.teamSpan">{{teamItem.team_category}}</td>
                <td v-if="cardIndex === 0" :rowspan="teamItem.teamSpan">{{teamItem.team_id}}</td>
                <td>{{cardItem.card_type_name}}</td>
                <td>{{cardItem.total_cost}}</td>
                <td>{{cardItem.normal_sum}}</td>
                <td>{{cardItem.unrecognized_sum}}</td>
                <td>{{cardItem.step2_sum}}</td>
                <td>{{cardItem.step2_block_sum}}</td>
                <td>{{cardItem.step2_label_sum}}</td>
                <td>{{cardItem.step1_cost}}</td>
                <td>{{cardItem.step2_cost}}</td>
                <td>{{cardItem.input_cost}}</td>
                <td>{{cardItem.input_review_cost}}</td>
                <td>{{cardItem.step1_accuracy}}</td>
                <td>{{cardItem.step1_block_accuracy}}</td>
                <td>{{cardItem.step1_label_accuracy}}</td>
              </tr>
            </template>
            <tr :key="'' + index + taskIndex + teamIndex">
              <td colspan="4">{{teamItem.team_name}}汇总</td>
              <td>{{teamItem.team_summary.total_cost}}nihao</td>
              <td>{{teamItem.team_summary.normal_sum}}</td>
              <td>{{teamItem.team_summary.unrecognized_sum}}</td>
              <td>{{teamItem.team_summary.step2_sum}}</td>
              <td>{{teamItem.team_summary.step2_block_sum}}</td>
              <td>{{teamItem.team_summary.step2_label_sum}}</td>
              <td>{{teamItem.team_summary.step1_cost}}</td>
              <td>{{teamItem.team_summary.step2_cost}}</td>
              <td>{{teamItem.team_summary.input_cost}}</td>
              <td>{{teamItem.team_summary.input_review_cost}}</td>
              <td>{{teamItem.team_summary.step1_accuracy}}</td>
              <td>{{teamItem.team_summary.step1_block_accuracy}}</td>
              <td>{{teamItem.team_summary.step1_label_accuracy}}</td>
            </tr>
          </template>
          <tr :key="'' + index + taskIndex">
            <td colspan="5">{{taskItem.task_type_name}}汇总</td>
            <td>{{taskItem.task_type_summary.total_cost}}</td>
            <td>{{taskItem.task_type_summary.normal_sum}}</td>
            <td>{{taskItem.task_type_summary.unrecognized_sum}}</td>
            <td>{{taskItem.task_type_summary.step2_sum}}</td>
            <td>{{taskItem.task_type_summary.step2_block_sum}}</td>
            <td>{{taskItem.task_type_summary.step2_label_sum}}</td>
            <td>{{taskItem.task_type_summary.step1_cost}}</td>
            <td>{{taskItem.task_type_summary.step2_cost}}</td>
            <td>{{taskItem.task_type_summary.input_cost}}</td>
            <td>{{taskItem.task_type_summary.input_review_cost}}</td>
            <td>{{taskItem.task_type_summary.step1_accuracy}}</td>
            <td>{{taskItem.task_type_summary.step1_block_accuracy}}</td>
            <td>{{taskItem.task_type_summary.step1_label_accuracy}}</td>
          </tr>
        </template>
        <tr :key="index">
          <td colspan="6">创建人汇总</td>
          <td>{{item.creator_summary.total_cost}}</td>
          <td>{{item.creator_summary.normal_sum}}</td>
          <td>{{item.creator_summary.unrecognized_sum}}</td>
          <td>{{item.creator_summary.step2_sum}}</td>
          <td>{{item.creator_summary.step2_block_sum}}</td>
          <td>{{item.creator_summary.step2_label_sum}}</td>
          <td>{{item.creator_summary.step1_cost}}</td>
          <td>{{item.creator_summary.step2_cost}}</td>
          <td>{{item.creator_summary.input_cost}}</td>
          <td>{{item.creator_summary.input_review_cost}}</td>
          <td>{{item.creator_summary.step1_accuracy}}</td>
          <td>{{item.creator_summary.step1_block_accuracy}}</td>
          <td>{{item.creator_summary.step1_label_accuracy}}</td>
        </tr>
    </tbody>
  </table>
</div>
</template>
<script>

const list = [
        {
            "range": "时间段",
            "creator": "创建者",
            "creator_summary": {
                "total_cost": "创建人汇总信息",
                "normal_sum": "1",
                "unrecognized_sum": "1",
                "step2_sum": "1",
                "step2_block_sum": "1",
                "step2_label_sum": "1",
                "step1_cost": "1",
                "step2_cost": "1",
                "input_cost": "1",
                "input_review_cost": "1",
                "step1_accuracy": "1",
                "step1_block_accuracy": "1",
                "step1_label_accuracy": "1"
            },
            "task_type_list": [
                {
                    "task_type_name": "大类-全文标注",
                    "task_type_summary": {
                        "total_cost": "全文标注-大类汇总信息",
                        "normal_sum": "2",
                        "unrecognized_sum": "2",
                        "step2_sum": "2",
                        "step2_block_sum": "2",
                        "step2_label_sum": "2",
                        "step1_cost": "2",
                        "step2_cost": "2",
                        "input_cost": "2",
                        "input_review_cost": "2",
                        "step1_accuracy": "2",
                        "step1_block_accuracy": "2",
                        "step1_label_accuracy": "2"
                    },
                    "team_list": [
                        {
                            "team_name": "组名-平台A组",
                            "team_category": "组类型-平台",
                            "team_id": "int，组ID-001",
                            "team_summary": {
                                "total_cost": "平台A组组汇总信息",
                                "normal_sum": "3",
                                "unrecognized_sum": "3",
                                "step2_sum": "3",
                                "step2_block_sum": "3",
                                "step2_label_sum": "3",
                                "step1_cost": "3",
                                "step2_cost": "3",
                                "input_cost": "3",
                                "input_review_cost": "3",
                                "step1_accuracy": "3",
                                "step1_block_accuracy": "3",
                                "step1_label_accuracy": "3"
                            },
                            "card_type_list": [
                                {
                                    "card_type_name": "小类-小流程1",
                                    "total_cost": "总成本",
                                    "normal_sum": "正常完成张数",
                                    "unrecognized_sum": "不可识别张数",
                                    "step2_sum": "质检张数",
                                    "step2_block_sum": "质检框数",
                                    "step2_label_sum": "质检标签数",
                                    "step1_cost": "预检成本",
                                    "step2_cost": "质检成本",
                                    "input_cost": "录入成本",
                                    "input_review_cost": "录入质检成本",
                                    "step1_accuracy": "预检张正确率",
                                    "step1_block_accuracy": "预检框正确率",
                                    "step1_label_accuracy": "预检标签正确率"
                                },
                                {
                                    "card_type_name": "小类-小流程2",
                                    "total_cost": "总成本",
                                    "normal_sum": "正常完成张数",
                                    "unrecognized_sum": "不可识别张数",
                                    "step2_sum": "质检张数",
                                    "step2_block_sum": "质检框数",
                                    "step2_label_sum": "质检标签数",
                                    "step1_cost": "预检成本",
                                    "step2_cost": "质检成本",
                                    "input_cost": "录入成本",
                                    "input_review_cost": "录入质检成本",
                                    "step1_accuracy": "预检张正确率",
                                    "step1_block_accuracy": "预检框正确率",
                                    "step1_label_accuracy": "预检标签正确率"
                                },
                            ]
                        },
                        {
                            "team_name": "组名-平台B组",
                            "team_category": "组类型-平台",
                            "team_id": "int，组ID-002",
                            "team_summary": {
                                "total_cost": "平台B组组汇总信息",
                                "normal_sum": "3",
                                "unrecognized_sum": "3",
                                "step2_sum": "3",
                                "step2_block_sum": "3",
                                "step2_label_sum": "3",
                                "step1_cost": "3",
                                "step2_cost": "3",
                                "input_cost": "3",
                                "input_review_cost": "3",
                                "step1_accuracy": "3",
                                "step1_block_accuracy": "3",
                                "step1_label_accuracy": "3"
                            },
                            "card_type_list": [
                                {
                                    "card_type_name": "小类-小流程3",
                                    "total_cost": "总成本",
                                    "normal_sum": "正常完成张数",
                                    "unrecognized_sum": "不可识别张数",
                                    "step2_sum": "质检张数",
                                    "step2_block_sum": "质检框数",
                                    "step2_label_sum": "质检标签数",
                                    "step1_cost": "预检成本",
                                    "step2_cost": "质检成本",
                                    "input_cost": "录入成本",
                                    "input_review_cost": "录入质检成本",
                                    "step1_accuracy": "预检张正确率",
                                    "step1_block_accuracy": "预检框正确率",
                                    "step1_label_accuracy": "预检标签正确率"
                                },
                                {
                                    "card_type_name": "小类-小流程4",
                                    "total_cost": "总成本",
                                    "normal_sum": "正常完成张数",
                                    "unrecognized_sum": "不可识别张数",
                                    "step2_sum": "质检张数",
                                    "step2_block_sum": "质检框数",
                                    "step2_label_sum": "质检标签数",
                                    "step1_cost": "预检成本",
                                    "step2_cost": "质检成本",
                                    "input_cost": "录入成本",
                                    "input_review_cost": "录入质检成本",
                                    "step1_accuracy": "预检张正确率",
                                    "step1_block_accuracy": "预检框正确率",
                                    "step1_label_accuracy": "预检标签正确率"
                                },
                            ]
                        },
                    ]
                },
                {
                    "task_type_name": "大类-表格线标注",
                    "task_type_summary": {
                        "total_cost": "大类汇总信息",
                        "normal_sum": "2",
                        "unrecognized_sum": "2",
                        "step2_sum": "2",
                        "step2_block_sum": "2",
                        "step2_label_sum": "2",
                        "step1_cost": "2",
                        "step2_cost": "2",
                        "input_cost": "2",
                        "input_review_cost": "2",
                        "step1_accuracy": "2",
                        "step1_block_accuracy": "2",
                        "step1_label_accuracy": "2"
                    },
                    "team_list": [
                        {
                            "team_name": "组名",
                            "team_category": "组类型",
                            "team_id": "int，组ID",
                            "team_summary": {
                                "total_cost": "组汇总信息",
                                "normal_sum": "3",
                                "unrecognized_sum": "3",
                                "step2_sum": "3",
                                "step2_block_sum": "3",
                                "step2_label_sum": "3",
                                "step1_cost": "3",
                                "step2_cost": "3",
                                "input_cost": "3",
                                "input_review_cost": "3",
                                "step1_accuracy": "3",
                                "step1_block_accuracy": "3",
                                "step1_label_accuracy": "3"
                            },
                            "card_type_list": [
                                {
                                    "card_type_name": "小类",
                                    "total_cost": "总成本",
                                    "normal_sum": "正常完成张数",
                                    "unrecognized_sum": "不可识别张数",
                                    "step2_sum": "质检张数",
                                    "step2_block_sum": "质检框数",
                                    "step2_label_sum": "质检标签数",
                                    "step1_cost": "预检成本",
                                    "step2_cost": "质检成本",
                                    "input_cost": "录入成本",
                                    "input_review_cost": "录入质检成本",
                                    "step1_accuracy": "预检张正确率",
                                    "step1_block_accuracy": "预检框正确率",
                                    "step1_label_accuracy": "预检标签正确率"
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    ]

export default {
  data() {
    const tHeader = [
      {
        title: '时间段',
        dataIndex: 'range',
      },
      {
        title: '创建人',
        dataIndex: 'creator',
      },
      {
        title: '大类',
        dataIndex: 'task_type_name',
      },
      {
        title: '组名',
        dataIndex: 'team_name',
      },
      {
        title: '组类型',
        dataIndex: 'team_category',
      },
      {
        title: '组ID',
        dataIndex: 'team_id',
      },
      {
        title: '小类',
        dataIndex: 'card_type_name',
      },
      {
        title: '总成本',
        dataIndex: 'total_cost',
      },
      {
        title: '正常完成张数',
        dataIndex: 'normal_sum',
      },
      {
        title: '不可识别张数',
        dataIndex: 'unrecognized_sum',
      },
      {
        title: '质检张数',
        dataIndex: 'step2_sum',
      },
      {
        title: '框数',
        dataIndex: 'step2_block_sum',
      },
      {
        title: '标签数',
        dataIndex: 'step2_label_sum',
      },
      {
        title: '预检成本',
        dataIndex: 'step1_cost',
      },
      {
        title: '质检成本',
        dataIndex: 'step2_cost',
      },
      {
        title: '录入成本',
        dataIndex: 'input_cost',
      },
      {
        title: '录入质检成本',
        dataIndex: 'input_review_cost',
      },
      {
        title: '张正确率',
        dataIndex: 'step1_accuracy',
      },
      {
        title: '框正确率',
        dataIndex: 'step1_block_accuracy',
      },
      {
        title: '标签正确率',
        dataIndex: 'step1_label_accuracy',
      }
    ];
    return {
      tHeader,
      list: [...list],
      dataInit: false
      // columns,
    };
  },
  created () {
    this.dataInit = false
    this.initList()
    this.dataInit = true
    console.log(this.list)
  },
  methods: {
    initList () {
      this.list.forEach(item => {
        item.task_type_list.forEach(taskItem => {
          // 小类行合并：小类条数
          taskItem.team_list.forEach(teamItem => {
            teamItem.teamSpan = teamItem.card_type_list.length
          })
            // 大类行合并：n 个【小类行合并 + 1（小类汇总）】
          taskItem.taskSpan = taskItem.team_list.reduce((pre, item) => pre + ( item.teamSpan + 1 ), 0)
        })
        //时间段合并: n 个【大类行合并 + 1（大类汇总）】+ 1（创建人汇总）
        item.span = item.task_type_list.reduce((pre, item) => pre + ( item.taskSpan + 1 ), 0) + 1
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.table-box{
  width: 100%;
  height: 100%;
  overflow: auto;
}
table
{
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
    width: 100%;
}
table td, table th
{
    border: 1px solid #cad9ea;
    color: #666;
    height: 30px;
}
table thead th
{
    background-color: #CCE8EB;
}
</style>