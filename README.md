# react 拖动排序组件

---
    先看效果图
    ![GitHub](http://p94d2qxd7.bkt.clouddn.com/tuodong.gif)
---

    <img src="http://p94d2qxd7.bkt.clouddn.com/tuodong.gif" />


### 使用
- 引入moveSort组件
- 传入headerList（表头），list（数据源）
- 拖动后的回调move

### 原理 用了H5的drag API
1. 给元素绑定拖拽事件,draggable=true

```
<tr
    draggable="true"
    onDragEnd={this.dragEnd.bind(this)}
    onDragStart={this.dragStart.bind(this)}
>

</tr>
```
2. 记录拖拽元素，通过dragStart获得
3. 通过dragOver 获得拖拽经过的元素，比较两者的权重weight，判断拖拽方向
```
    const dgIndex = JSON.parse(this.dragged.dataset.item).weight;   //拖拽元素
    const taIndex = JSON.parse(e.target.dataset.item).weight;           //经过元素
    const animateName = dgIndex > taIndex ? "drag-up" : "drag-down";    //判断
```
4. dragEnd重新排序
```
     list = list.map((doc, index)=> {
        console.log(doc)
        doc.weight = len - index;
        return doc;
     })
```
