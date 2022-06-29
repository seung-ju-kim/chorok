import {CommentModel} from "../schemas/comment";

class Comment {
  static async createComment(Comment) {
    const newComment = await CommentModel.create(Comment);
    return newComment;
  }

  static async findCommentById(commentId) {
    const comment = await CommentModel.findOne({_id: commentId});
    return comment;
  }

/**
 * comments 마지막 페이지 번호 반환
 */
    static async findLastPage({postId, perPage}) {
    const totalPost = await CommentModel.countDocuments({postId}); //postId 별로
    const lastPage = Math.ceil(totalPost / perPage);
    return lastPage;
  }

  static async findCommentsByPostId({postId, page, perPage}) {
    return CommentModel
    .find(postId ? { postId } :{})
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