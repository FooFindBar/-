import Vue from 'vue';
import {Loading,Pagination,Avatar,Tag, TableColumn, Table, Message, DatePicker, TimeSelect, Option, FormItem, Form, Dialog, Input, Button, Select, Container, Aside, Header, Main, Menu, MenuItem, menuItemGroup, Submenu, Card, Breadcrumb, BreadcrumbItem, Row, Col } from 'element-ui';

Vue.use(Pagination)
Vue.use(Avatar)
Vue.use(Tag)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(Option)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(menuItemGroup)
Vue.use(Submenu)
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Col)

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;