import Vue from 'vue'
import { Cascader, RadioButton, RadioGroup, DatePicker, CheckboxGroup, Avatar, Switch, Table, TableColumn, Dropdown, DropdownMenu, DropdownItem, Tooltip, Form, FormItem, Button, Pagination, Dialog, Loading, MessageBox, Message, Menu, Submenu, MenuItem, Input, Checkbox, Select, Option , Row} from 'element-ui'
import '../styles/element-variables.scss'
import '../styles/element-ui.scss'

Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 2000 }

Vue
  .use(Button)
  .use(Pagination)
  .use(Dialog)
  .use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(Input)
  .use(Checkbox)
  .use(Select)
  .use(Option)
  .use(Form)
  .use(FormItem)
  .use(Tooltip)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Table)
  .use(TableColumn)
  .use(Switch)
  .use(Avatar)
  .use(Row)
  .use(CheckboxGroup)
  .use(DatePicker)
  .use(RadioGroup)
  .use(RadioButton)
  .use(Cascader)

Vue.prototype.$loading = Loading.service
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

