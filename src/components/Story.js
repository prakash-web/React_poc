import React from 'react';
import '../App'
// import {render} from 'react-dom';

// const Storeblock = (props) => {
//     return <h2> Hello </h2>
// }

class Storeblock extends React.Component{
  render() {
    let time = new Date();
    let topics = [];
    return (
      <div>
        <h3>Stories App</h3>
        <p className ="lead"> Today's Date : {time.toDateString()}</p>
        <ul>
          {topics.map(item => <li>{item} </li>)}
        </ul>
        <CommentBox />
      </div>
    )
  }
}
class CommentBox extends React.Component {
  constructor(){
    super();
    this.state = {
      showComments : false,
      comments: [
        {id:1, author:'Morgan', body: " Hell!! noo.. You can't"},
        {id:2, author:'Watson', body: " Whaaat a greaat picture!!"}
      ]
    }
  }
  _deleteComment(comment){
    const comments = [...this.state.comments];
    const commentIndex = comments.indexOf(comment);
    comments.splice(commentIndex, 1);
    this.setState({comments});
  }
  _getComments(){
      return this.state.comments.map(comment => {
        return <Comment Author={comment.author} body={comment.body} key={comment.id} 
        onDelete={this._deleteComment.bind(this)}/>
      })
    };
  _getCommentLength(commentCount){
    if(commentCount === 0){
      return 'No Comment Yet';
    } else if (commentCount === 1){
      return '1 Comment';
    } else {
      return `${commentCount} comments`;
    }
  };
  render(){
    let commentNodes;
    let buttonText = 'Show comments';
    const comments = this._getComments();

    if(this.state.showComments){
      commentNodes = <div className='Comment-list'>{comments}</div>
      buttonText = 'Hide comments';
    }

    return(
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />

        <button onClick={this._handleClick.bind(this)}> {buttonText} </button>
        <h3> Comments </h3>
        <h4 className="comment-count"> {this._getCommentLength(comments.length)}</h4>
        {commentNodes}
      </div>
    )
  }
  _addComment(author, body){
    const comment ={
      id: this.state.comments.length + 1,
      author,
      body
    };
    this.setState({ comments: this.state.comments.concat([comment])})
  }
  _handleClick(){
    this.setState({
      showComments : !this.state.showComments
    })
  }
}
class Comment extends React.Component{
  render() {
    return (
      <div className="comment">
        <p className="comment-header"> {this.props.Author} </p>
        <p className="comment-body"> {this.props.body}  </p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>
            Delete Comment
          </a>
        </div>
      </div>
    )
  }
  _handleDelete(e){
    e.preventDefault();
    // if(confirm('Are you sure?')){
      this.props.onDelete(this.props.comment);
    // }
  }
}
class CommentForm extends React.Component{
  render(){
    return(
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label><h3> Join the discussion </h3></label>
        <div className="comment-form-fields">
          <input placeholder="Name:" ref={(input) => this._author = input}/>
          <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="comment-form-actions"> 
          <button type="submit"> Post comment </button>
        </div>
      </form>
    )
  }
  _handleSubmit(e){
    e.preventDefault(); //to make page doesn't reload on submit
    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }
}
export default Storeblock;