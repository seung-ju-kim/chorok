import {CommentModel} from "../schemas/comment.js";

class Comment {
  static async createComment(Comment) {
    const newComment = await CommentModel.create(Comment);
    return newComment;
  }

  static async findCommentById(commentID) {
    const comment = await CommentModel.findOne({_id: commentID});
    return comment;
  }

  static async findCommentsByPostId(postID) {
    const commentList = await CommentModel.find({postID});
    return commentList;
  }

  static async update({commentID, fieldToUpdate, newValue}) {
    const filter = {_id: commentID};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false};

    const updatedComment = await CommentModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedComment;
  }

  static async deleteCommentById(commentID) {
    const deleteResult = await CommentModel.deleteOne({_id: commentID});
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export {Comment};