CSS 实现 table 表头固定 tbody 显示垂直滚动条并自定义滚动条样式

程序猿秃头之路 2020-05-10 10:58:02  1944  收藏 5
分类专栏： Web前端 文章标签： html css css3
版权

一、最终效果图



二、关键代码
html 代码：

<div class="table_info">
  <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
    <thead>
      <tr>
        <th>项目账号</th>
        <th>项目名称</th>
        <th>作业地址</th>
        <th>模拟结果</th>
      </tr>
    </thead>
    <tbody class="tbd">
      <!-- 这里的数据是请求后台拼接上去的-->
    </tbody>
  </table>
</div>
 

CSS 出现滚动条并使表格不变形：

  .tbd {
    display: block;
    color: #fff;
    text-align: center;
    height: 200px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;  /*滚动更流畅*/
  }

  .table_info table thead,
  .tbd tr{
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .table_info table thead {
    background-color: #004453;
    /* width: calc(100% - 6px); */  /*减去默认滚动条的宽度，让thead 与tbody 对齐*/
  }
CSS 修改滚动条样式：

  /* 滚动条样式 */
  table tbody::-webkit-scrollbar { 
    width: 6px;
  }
  table tbody::-webkit-scrollbar-thumb{
    background-color:#01F5F1;
    border-radius: 5px;
  }
  table tbody::-webkit-scrollbar-track{
    background-color:#004453;
  }
  table tbody::-webkit-scrollbar-thumb:hover {
    background-color:rgb(17, 177, 174)
  }
  table tbody::-webkit-scrollbar-thumb:active {
    background-color:rgb(9, 136, 134)
  }

滚动条样式
::-webkit-scrollbar 滚动条整体部分
::-webkit-scrollbar-thumb  滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
::-webkit-scrollbar-track  滚动条的轨道（里面装有Thumb）
::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）
::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处
::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件



————————————————
版权声明：本文为CSDN博主「程序猿秃头之路」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/zhang33565417/article/details/106032937/