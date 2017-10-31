/**
 * Created by Yoana on 10/31/2017.
 */


import React from "react";
import ReactDOM from "react-dom";
import request from 'superagent';

class StoryForm extends React.Component {
    constructor() {
        super();
        this.state = {
            characters: 0,
            uploadedFileCloudinaryUrl: '',
            uploadedFile: null
        };
    }

    componentDidMount() {
        console.log('I was triggered during componentDidMount')
    }

    render() {
        //  console.log("the render method ",this.state.uploadedFile);
        //console.log("the render method ",this.uploadedFileCloudinaryUrl);

        var imgStyle = {
            height: "200px",
            width: "200px",

        };

        var textareaStyle = {
            height: "90px",
            width: "400px",

        };

        return (

            <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <label>New Story </label><br></br>
                <div className="comment-form-fields">
                    <input placeholder="Title:" ref={c => this._title = c} /><br></br><br></br>

                    <Dropzone
                        multiple={false}
                        accept="image/*"
                        onDrop={this._onImageDrop.bind(this)}
                    >
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                    <br></br><br></br>

                    <div>
                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                            <div>
                                <p>{this.state.uploadedFile.name}</p>
                                <img style={imgStyle} src={this.state.uploadedFileCloudinaryUrl} />
                            </div>}
                    </div>

                    <br></br>
                    {/*Choose Picture: <input ref={c => this._image = c} id="fileupload" type="file" name="pic" /><br></br><br></br>*/}
                    {/*<input placeholder="Link:" ref={c => this._link = c} /><br></br><br></br>*/}
                    <br></br>
                    <textarea style={textareaStyle} placeholder="Description:" ref={c => this._description = c} onChange={this._getCharacterCount.bind(this)}></textarea>
                    Max characters: 255! <br></br>
                    <p>{this.state.characters} characters</p>
                    <textarea style={textareaStyle} placeholder="Link for the Story :" ref={c => this._link = c} ></textarea>
                </div>

                <div className="comment-form-actions">
                    <button type="submit">
                        Post story
                    </button>
                </div>
            </form>
        );
    }

    _getCharacterCount(e) {
        this.setState({
            characters: this._description.value.length
        });
    }

    _onImageDrop(files) {
        // this.setState({
        //     characters: this._description.value.length
        // });

        this.setState({
            uploadedFile: files[0]

        });
        //   console.log("the files are ",files);
        //  console.log("the files are ",files[0]);
        this._handleImageUpload(files[0]);
    }

    _handleImageUpload(file) {
        //  console.log(" ia m in _handleImageUpload method ");
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }


//

    _handleSubmit(event) {
        event.preventDefault();

        if(this.state.uploadedFileCloudinaryUrl)
        {
            if (!this._title.value || !this._description.value || this._description.value.length > 255 || !this._link.value ) {
                alert('Please enter title, description, link source and obey description limitations.');
                return;
            }

        }else {
            alert('Please upload a picture and wait to see it.');
            return;
        }


        var ImgLink = this.state.uploadedFileCloudinaryUrl;
        this.props.addComment(this._title.value, this._description.value, this._link.value, ImgLink );

        this._title.value = '';
        this._description.value = '';
        this._link.value = '';
        ImgLink = '';


        this.setState({ characters: 0  ,
            uploadedFileCloudinaryUrl: '',
            uploadedFile: null
        });
    }
}




class StoryBox extends React.Component {

    constructor()
    {
            super(); // super needs to be called first
            this.state = { data : [] }
    }

    componentWillMount()
    {
        this._fetchStories();
    }

    render()
    {

        const storiesdb = this._getStories();
       let  c =  <div className="comment-list">
            {storiesdb}
        </div>
        return(

             <div>
                <hr></hr>
                 {storiesdb}

             </div>

        );

    }


    _getStories()
    {
            return this.state.data.map((story) =>
            {
                console.log("the image stafff ",story);
                return(<Story
                    post_title={story.post_title}
                    post_url={story.post_url}
                    post_text={story.post_text}
                    key={story.hanesst_id}
                 />);


            });
    }

    //has to figure out with what to substitute localhost
    _fetchStories()
    {
            $.ajax({
                method: 'GET',
                url: 'http://172.18.0.1:3000/post/',
                success: (stories) =>
                {
                    console.log("the stories are ",stories);

                    // this.setState({ stories, showStories : true });
                    this.setState({ data : stories });
                }
            });
    }


}



class Story extends React.Component {
            constructor()
            {
                super();
            }

            render() {



                return (
                            <div>
                                <a href = {this.props.post_url}>{this.props.post_title}</a><br></br>
                                <p>{this.props.post_text}</p>
                              <hr></hr>
                            </div>
                        );

            }


}



const app = document.getElementById('content');

ReactDOM.render(<StoryBox/>, app);