<template>
  <section>
    <a-button type="primary" class="mb10" @click="add">
      添加
    </a-button>
    <a-table :columns="columns"  high
        :data-source="data"
    >
        <!-- slot-scope="text, record, index" -->
        <div slot="operation" slot-scope="text, record">
            <a class="mr10" @click="() => edit(record)"><a-icon type="form" /></a>
            <a class="mr10" @click="() => createson(record)"><a-icon type="plus-circle" /></a>
            <a @click="() => del(record)"><a-icon type="delete" /></a>
        </div>
    </a-table>
    <!-- 新增/编辑框 -->
    <a-modal v-model="addEdit.visible" :title="addEdit.title" @ok="handleOk">
        <!--  :label-col="labelCol" :wrapper-col="wrapperCol" -->
        <a-form-model :model="form" ref="ruleForm" :rules="rules">
          <a-form-model-item label="Name" prop="name">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="Age" prop="age">
            <a-input-number style="width: 100%;" v-model="form.age" :min="1" :max="200"/>
          </a-form-model-item>
          <a-form-model-item label="Address">
            <a-input v-model="form.address" type="textarea"/>
          </a-form-model-item>
          <a-form-model-item label="Instant delivery">
            <a-switch v-model="form.delivery"/>
          </a-form-model-item>
        </a-form-model>
    </a-modal>
  </section>
</template>
<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '100px',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    width: '150px',
    scopedSlots: { customRender: 'operation' },
  }
];
const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default {
  data() {
    return {
      data,
      columns,
      rowSelection,
      current: '', //当前行
      // 添加/编辑弹窗的变量
      // labelCol: { span: 4 },
      // wrapperCol: { span: 14 },
      addEdit: {
          visible: false,
          type: 'create',
          title: '添加'
      },
      form: {
        key: '',
        name: '',
        age: '',
        address: '',
        delivery: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
      }
    };
  },
  watch: {
    form: {
      handler (val) {
        if (val) {
          console.log('form的变化',val)
        }
      },
      deep: true
    },
    'addEdit.visible': {
      handler (val) {
        if (val) {
          this.$nextTick(() => {
            console.log('打开页面之后', this.form)
            this.$refs.ruleForm.resetFields()
          })
        } else {
          console.log('关闭页面之后', this.$options.data().form)
          this.form = this.$options.data().form
        }
      }
    }
  },
  methods: {
    add () {
      this.current = ''
      this.addEdit = {
          visible: true,
          type: 'create',
          title: '添加'
      }
    },
    edit (record) {
      this.current = record
      this.getForm(record)
      this.addEdit = {
          visible: true,
          type: 'edit',
          title: '编辑'
      }
    },
    createson (record) {
      this.current = record
      console.log(this.form)
      this.addEdit = {
          visible: true,
          type: 'createSon',
          title: '添加子节点'
      }
    },
    getForm (val) {
      for ( let key in this.form) {
        this.form[key] = val[key]
        console.log(val[key])
      }
      console.log(val, this.form)
    },
    handleOk () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const from = JSON.parse(JSON.stringify(this.form))
          if (this.addEdit.type === 'create') {
            from.key = this.randomId()
            this.data.unshift(from)
          } else if (this.addEdit.type === 'createSon') {
            from.key = this.randomId()
            if (!this.current.children) {
              this.$set(this.current, 'children', [])
            }
            this.current.children.unshift(from)
            console.log('创建子节点', this.current, this.data)
          } else if (this.addEdit.type === 'edit') {
            Object.assign(this.current, from)
          }
          this.addEdit.visible = false
        }
      })
      
    },
    randomId () {
      return Math.floor(Math.random() * 100)
    }
  }
};
</script>
