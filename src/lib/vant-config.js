import Vue from 'vue'
import '@vant/touch-emulator';
import 'vant/lib/index.css';

import {
  Dialog,
  Button,
  Tab,
  Tabs,
  List,
  Form,
  Field,
  ImagePreview,
  Icon,
  Radio,
  RadioGroup,
  Uploader,
  Image,
  Lazyload,
  Toast,
  progress,
  Circle,
  Search,
  CheckboxGroup,
  Checkbox,
  Step,
  Steps,
  Popup,
  Collapse,
  CollapseItem,
  DropdownMenu,
  DropdownItem,
  Cell,
  DatetimePicker,
  Loading,
  Notify,
  NavBar,
  Swipe,
  SwipeItem,
  Rate,
  Tabbar,
  TabbarItem,
  CellGroup,
  Grid,
  GridItem,
  IndexBar,
  IndexAnchor,
  NoticeBar,
  Skeleton,
} from 'vant'

const components = [
  Dialog,
  Button,
  Tab,
  Tabs,
  List,
  Form,
  Field,
  ImagePreview,
  Icon,
  Radio,
  RadioGroup,
  Uploader,
  Image,
  Lazyload,
  Toast,
  progress,
  Circle,
  Search,
  CheckboxGroup,
  Checkbox,
  Step,
  Steps,
  Popup,
  Collapse,
  CollapseItem,
  DropdownMenu,
  DropdownItem,
  Cell,
  DatetimePicker,
  Loading,
  Notify,
  NavBar,
  Swipe,
  SwipeItem,
  Rate,
  Tabbar,
  TabbarItem,
  CellGroup,
  Grid,
  GridItem,
  IndexBar,
  IndexAnchor,
  NoticeBar,
  Skeleton,
]

components.forEach(compoent => {
  Vue.use(compoent)
})
