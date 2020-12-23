<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template
      v-for="col in ['name', 'age', 'address']"
      :slot="col"
      slot-scope="text, record"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          v-model="record[col]"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record, index)">保存</a>
          <a-popconfirm title="确认取消?" @confirm="() => cancel(record)" ok-text="确定" cancel-text="取消">
            <a>取消</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record)">编辑</a>
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
    scopedSlots: { customRender: 'age' },
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%',
    scopedSlots: { customRender: 'address' },
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
export default {
  data() {
    return {
      data,
      columns,
      editingKey: '',
    };
  },
  methods: {
    edit(item) {
      this.targetCache = JSON.parse(JSON.stringify(item)) // 保存一份数据给取消重置
      this.editingKey = item.key;
      if (item) {
          this.$set(item, 'editable', true)
      }
    },
    save(item) {
        if (item) {
            this.$set(item, 'editable', false)
        }
        this.editingKey = '';
    },
    cancel(item) {
       Object.assign(item, this.targetCache)
      this.editingKey = ''
      if (item) {
          this.$set(item, 'editable', false)
        }
      
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
