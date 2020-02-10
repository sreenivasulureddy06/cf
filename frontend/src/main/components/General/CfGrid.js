import React, { Component } from "react";
import * as CfGridUtils from "../../utils/CfGridUtils.js";

class CfGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div className="grid-div">
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr className="grid-title">
                            <td style={{paddingLeft: "5px"}} colSpan={this.props.headers.length}>{this.props.title}</td>
                        </tr>
                        <tr className="cfGridTr">
                            {this.props.headers.map(item=>
                                <th style={{width: ""+item.width+"%"}} className="cfGridTh">{item.label}</th>
                            )}
                        </tr>
                        {this.props.rowData !== undefined && this.props.rowData.length > 0 ? this.props.rowData.map(item=>
                            <tr>
                                {this.props.headers.map(header =>
                                    <td style={{width: ""+header.width+"%"}} className="cfGridTd">{item[header.key]}</td>
                                )}
                            </tr>
                        ) : 
                        <tr>
                            <td className="cfGridTd" colSpan={this.props.headers.length}>{this.props.noDataFound}</td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default CfGrid;