import { PostModel } from '../schemas/post'

class Post {
  
  
  /**
   * Post 객체 생성
   */
   static async createPost(Post) {
    const newPost = await PostModel.create(Post);
    return newPost;
  }

  /**
   * PostId(=_id)로 해당 post 찾아서 리턴
   */
  static async findPostById(postId) {
    const post = await PostModel.findOne({_id: postId});
    return post;
  }


  /**
   * 각 category(or 전체보기)의 마지막 페이지 번호 반환
   */
  static async findLastPage({category, perPage}) {
    //category가 null 이면 전체count
    const totalPost = await PostModel.countDocuments(category ? { category } : {}) 
    const finalPage = Math.ceil(totalPost / perPage);
    return finalPage;
  }

  /**
   * { category, page, perPage}
   * 각 category(or 전체보기)의 post 리스트를 perPage 단위로 페이징하여 반환
   */
  static async findPosts({category, page, perPage}) {

    const posts = 
      await PostModel
      .find(category ? { category } : {}) //category별 post 게시글을
      .sort({createdAt: -1}) //createAt 기준으로 최신순 정렬
      .limit(perPage) //한페이지에서 확인할 수 있는 post의 수
      .skip((page - 1) * perPage) //페이지에 따른 skip 기준
      .lean();

    return posts;
  }

  /**
   * 기존의 post를 수정하고 수정한 post를 return 하는 함수
   */
  static async update({postId, fieldToUpdate, newValue}) {
    const filter = {_id: postId};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false};

    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedPost;
  }

  /**
   * postId 와 매칭되는 데이터 삭제
   */
  static async deletePostById(postId) {
    const deleteResult = await PostModel.deleteOne({_id: postId});
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Post };