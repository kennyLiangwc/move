import React, { Component } from "react"

export default class MoveSort extends Component {
    constructor(props) {
        super(props);
        this.state = {...props};
    }

    dragStart(e) {
        // e.preventDefault();
        const { list } = this.state;
        if(list.length < 2) return;
        this.dragged = e.currentTarget;
        let item = JSON.parse(this.dragged.dataset.item);
        const dragId = item.id        //储存拖拽id
        const me = item.weight       //记录拖拽的weight
        this.setState({
            dragId,
            me
        })
    }
    dragEnd(e) {
        this.dragged.style.visibility = "visible";

        e.target.classList.remove("drag-up");
        this.over.classList.remove("drag-up");

        e.target.classList.remove("drag-down");
        this.over.classList.remove("drag-down");

        let list = this.state.list;
        let from = Number(this.dragged.dataset.id);
        let to = Number(this.over.dataset.id);
        list.splice(to, 0, list.splice(from, 1)[0]);
        let len = list.length;
        // // list = list.map((doc, index)=> {
        // //     // console.log(doc)
        // //     doc.weight = len - index;
        // //     return doc;
        // // })
        //
        this.setState({ list });


        let { dragId, me } = this.state, prev, after;
        list.map((item,index) => {
            const { id } = item;
            if(dragId == id ) {

                if(index == 0) {        //拖拽到首位
                    prev = -1;
                    after = list[index+1].weight
                }else if(index == (len -1 )) {      //拖到末尾
                    after = -1;
                    prev = list[index-1].weight;
                }else {
                    after = list[index+1].weight;
                    prev = list[index-1].weight;
                }
                this.props.move({me,dragId,prev,after})
            }
        })

    }

    dragOver(e) {
        e.preventDefault();

        if(e.target.tagName == "TD") e.target = e.target.parentNode;
        else if(e.target.tagName !== "TR") return;

        this.dragged.style.visibility = "hidden";
        // //判断当前拖拽target 和 经过的target 的 weight
        const dgIndex = JSON.parse(this.dragged.dataset.item).weight;
        const taIndex = JSON.parse(e.target.dataset.item).weight;       //拖拽后前一条数据的weight
        const animateName = dgIndex > taIndex ? "drag-up" : "drag-down";

        if (this.over && e.target.dataset.item !== this.over.dataset.item) {
            this.over.classList.remove("drag-up", "drag-down");
        }
        if(!e.target.classList.contains(animateName)) {
            e.target.classList.add(animateName);
            this.over = e.target;
        }
    }
    render() {
        const { headerList, list } = this.state;
        const listItems = list.map((item, i) => {       //渲染表身
            return (
                <tr
                    data-id={i}
                    key={i}
                    draggable={list.length < 2 ? "false" : "true"}
                    onDragEnd={this.dragEnd.bind(this)}
                    onDragStart={this.dragStart.bind(this)}
                    data-item={JSON.stringify(item)}
                >
                    {
                        headerList.map((c,i) => {
                            return <td key={i} draggable="false">
                                {c.dataIndex == "render" ? item[c.dataIndex](item) : item[c.dataIndex] }
                            </td>
                        })
                    }
                </tr>
            )
        });
        const headList = headerList.map((item,i) => {       //渲染表头
            return <th key={i}>
                {item.title}
            </th>
        })
        return (
            <table className="table">
                <thead>
                    <tr>
                        {headList}
                    </tr>
                </thead>
                <tbody onDragOver={this.dragOver.bind(this)}>
                    {listItems}
                </tbody>
            </table>
        )
    }
}