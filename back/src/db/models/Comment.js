import {CommentModel} from "../schemas/comment.js";

class Comment {
  static async createComment(Comment) {
    const newComment = await CommentModel.create(Comment);
    return newComment;
  }

  static async findCommentById(commentId) {
    const comment = await CommentModel.findOne({_id: commentId});
    return comment;
  }

  static async findCommentsByPostId(postId, page, perPage) {
    return CommentModel
    .find({ postId })
    .sort({createdAt: -1})
    .limit(perPage)
    .skip((page-1) * perPage)
    .lean();
  }

  static async update({commentId, fieldToUpdate, newValue}) {
    const filter = {_id: commentId};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false};

    const updatedComment = await CommentModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedComment;
  }

  static async deleteCommentById(commentId) {
    const deleteResult = await CommentModel.deleteOne({_id: commentId});
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export {Comment};