import React, { Component } from "react";
import Files from "react-files";

class FileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div className="file-component">
                <Files
                    className='files-dropzone'
                    onChange={this.props.onChange}
                    onError={this.props.onError}
                    //accepts={['image/png', 'image/jpg']}
                    maxFiles={3}
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                    >
                    {this.props.label}
                    </Files>
            </div>
        )
    }
}
export default FileComponent;