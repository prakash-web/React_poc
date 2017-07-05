import React from 'react';
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
        <p className ="lead"> Current Time : {time.toTimeString()}</p>
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
      showComments : false
    }
  }
  _getComments(){
      const commentList = [
        {id:1, author:'Morgan', body: " Hell!! noo.. You can't"},
        {id:2, author:'Watson', body: " Whaaat a greaat picture!!"}
      ];
      return commentList.map(comment => {
        return <Comment Author={comment.author} body={comment.body} key={comment.id} />
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
        <button onClick={this._handleClick.bind(this)}> {buttonText} </button>
        <h3> Comments </h3>
        <h4 className="comment-count"> {this._getCommentLength(comments.length)}</h4>
        {commentNodes}
      </div>
    )
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
          <a href="#" className="comment-footer-delete">
            Delete Comment
          </a>
        </div>
      </div>
    )
  }
}
export default Storeblock;