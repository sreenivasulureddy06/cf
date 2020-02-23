import React, { Component } from "react";

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: this.props.pagination.pageSize,
            pageNumber: this.props.pagination.pageNumber
        }
        this.onChangePageSize = this.onChangePageSize.bind(this);
        this.onChangePageNumber = this.onChangePageNumber.bind(this);
        this.onClickFirstPage = this.onClickFirstPage.bind(this);
        this.onClickLastPage = this.onClickLastPage.bind(this);
        this.onClickPreviousPage = this.onClickPreviousPage.bind(this);
        this.onClickNextPage = this.onClickNextPage.bind(this);
    }
    onChangePageSize(event) {
        let numberRex = /^\d+$/;
        if(event.target.value !== undefined && event.target.value !== "" && event.target.value.match(numberRex)) {
            this.setState({pageSize: event.target.value});
            let tempPagination = this.props.pagination;
            tempPagination.pageSize = event.target.value;
            tempPagination.pageNumber = 1;
            this.props.onChangePagination(tempPagination);
        } else {
            this.setState({pageSize: this.state.pageSize});
        }
    }
    onChangePageNumber(event) {
        let value = event.target.value;
        let tempPagination = this.props.pagination;
        tempPagination.pageNumber = value;
        this.setState({pageNumber: value});
        this.props.onChangePagination(tempPagination);
    }
    onClickFirstPage() {
        let tempPagination = this.props.pagination;
        tempPagination.pageNumber = 1;
        this.setState({pageNumber: 1});
        this.props.onChangePagination(tempPagination);
    }
    onClickLastPage() {
        let tempPagination = this.props.pagination;
        tempPagination.pageNumber = this.props.pagination.noOfPages;
        this.setState({pageNumber: this.props.pagination.noOfPages});
        this.props.onChangePagination(tempPagination);
    }
    onClickNextPage() {
        let tempPagination = this.props.pagination;
        let pageNumber = tempPagination.pageNumber;
        if(pageNumber < tempPagination.noOfPages) {
            pageNumber = pageNumber+1;
            tempPagination.pageNumber = pageNumber;
            this.setState({pageNumber: pageNumber});
            this.props.onChangePagination(tempPagination);
        }
        
    }
    onClickPreviousPage() {
        let tempPagination = this.props.pagination;
        let pageNumber = tempPagination.pageNumber;
        if(pageNumber > 1) {
            pageNumber = pageNumber-1;
            tempPagination.pageNumber = pageNumber;
            this.setState({pageNumber: pageNumber});
            this.props.onChangePagination(tempPagination);
        }
        
    }
    render() {
        let totalPages = 1;
        if(this.props.pagination !== null && this.props.pagination !== undefined) {
            totalPages = this.props.pagination.noOfPages;
        }
        let selOptions = [];
        if(totalPages >= 1) {
            for(var i=1;i<=totalPages;i++) {
                selOptions.push(i);
            }
        }
        return(
            <div className="pagination-div">
                <table id={this.props.id}>
                    <tbody>
                        <tr>
                            <td className="pagination-page-size">Page Size <input style={{width: "25%", paddingLeft: "3px"}} className="formField" type="text" value={this.state.pageSize} onChange={this.onChangePageSize}/></td>
                            <td className="pagination-arrow" onClick={this.onClickFirstPage}> ❮❮ </td>
                            <td className="pagination-arrow" onClick={this.onClickPreviousPage}>❮</td>
                            <td className="pagination-arrow" onClick={this.onClickNextPage}>❯</td>
                            <td className="pagination-arrow" onClick={this.onClickLastPage}> ❯❯ </td>
                            <td className="pagination-page">Page 
                                <select className="formField" value={this.state.pageNumber} style={{width: "70px", marginLeft: "5px"}} onChange={this.onChangePageNumber}>
                                    {selOptions.map(v=>
                                        <option value={v}>{v}</option>
                                    )}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Pagination;