# Rc-calendar 设置语言-日期-环境问题

在实际开发中，遇到一下几个问题：

## 语言和国际化

Rc-calendar 支持不同的语言（支持国际化 en_US and zh_CN）

组件一部分的翻译是组件内部提供，另一部分的翻译是 moment 提供，所以需要同时引入两个翻译文件

~~~js
// 引入日历组件翻译
var Calendar =require('rc-calendar');
var zhCN = require('rc-calendar/lib/locale/zh_CN');

// 引入 moment 部分的翻译
import moment from 'moment';
require('moment/locale/zh-cn');
~~~



## 时间库

设置时区：`use moment.utcOffset to set timezone`

不使用 moment：因为 moment 比较重，可以使用 dayjs 替代，其他的样式和翻译也需要处理



## 问题：早期版本开发环境

早期 rc-calendar 使用了 rc-tools 集成工具开发，封装的是 gulp 3 版本，这个版本只能和 node 10 一下兼容，如果是 node14 或者 node16 就无法启动开发环境。

具体问题和解决办法，参考这里：https://blog.csdn.net/weixin_41697143/article/details/126764263



## 问题：多个子项目开发

如果一个大项目中，不同子项目使用不同版本的 rc-calendar 那么可能造成时间或者翻译有问题。

因为不同版本的 calendar 依赖不同版本的时间库，同时使用会显示错误。

解决就是全部统一使用一个版本。



## 详细参数

| name                 | type                                            | description                                                  |
| -------------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| prefixCls            | String                                          | prefixCls of this component                                  |
| className            | String                                          | additional css class of root dom node                        |
| style                | Object                                          | additional style of root dom node                            |
| dateRender           | (current, value) => React.Node                  | date cell                                                    |
| renderSidebar        | () => React.Node                                | side bar                                                     |
| renderFooter         | (mode) => React.Node                            | extra footer                                                 |
| value                | moment                                          | current value like input's value                             |
| defaultValue         | moment                                          | defaultValue like input's defaultValue                       |
| locale               | Object                                          | calendar locale                                              |
| format               | String \| String[]                              | use to format/parse date(without time) value to/from input. When an array is provided, all values are used for parsing and first value for display. |
| disabledDate         | Function(current:moment):Boolean                | whether to disable select of current date                    |
| disabledTime         | Function(current:moment):Object                 | a function which return a object with member of disabledHours/disabledMinutes/disabledSeconds according to rc-time-picker |
| showDateInput        | Boolean                                         | whether to show input on top of calendar panel               |
| showWeekNumber       | Boolean                                         | whether to show week number of year                          |
| showToday            | Boolean                                         | whether to show today button                                 |
| showOk               | Boolean                                         | whether has ok button in footer                              |
| timePicker           | React Element                                   | rc-timer-picker/lib/module/panel element                     |
| onSelect             | Function(date: moment)                          | called when a date is selected from calendar                 |
| onClear              | Function()                                      | called when a date is cleared from calendar                  |
| onChange             | Function(date: moment)                          | called when a date is changed inside calendar (next year/next month/keyboard) |
| onOk                 | Function(date: moment)                          | called when ok button is pressed, only if it's visible       |
| dateInputPlaceholder | String                                          | date input's placeholder                                     |
| mode                 | enum('time', 'date', 'month', 'year', 'decade') | control which kind of panel should be shown                  |
| onPanelChange        | Function(date: moment, mode)                    | called when panel changed                                    |
| clearIcon            | ReactNode                                       | specific the clear icon.                                     |

## 实际案例

~~~js
import moment from 'moment';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';

import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
const zhCN = require('rc-calendar/lib/locale/zh_CN');
const enUS = require('rc-calendar/lib/locale/en_US');

const format = 'YYYY-MM-DD HH:mm:ss';
const now = moment();
const defaultCalendarValue = now.clone();

class {
  translateCalendar = (locale) => {
    let language = enUS;
    if (locale) {
      switch (locale) {
        case 'zh-ch':
          language = zhCN;
          break;
        case 'en':
          language = enUS;
          break;
        case 'fr':
          language = frFR;
          break;
        case 'de':
          language = deDE;
          break;
      }
    }
    return language;
  }
  
  render() {
    const locale = this.translateCalendar(this.props.locale);
    const calendar = (
      <Calendar
      	...
        locale={locale}
      />
    );
  }
}
~~~
