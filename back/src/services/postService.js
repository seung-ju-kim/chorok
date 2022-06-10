import { Post } from "../db";

class postService {
    /**
     * Community : post 생성
     */
    static async addPost({user_id, category, author, title, content}) {
  
      //const createdAtKT = await PostService.getCurrentDate();
      const view = 0;
      const newPost = {user_id, category, title, content, author, view};
  
      // db에 저장
      const createdNewPost = await Post.createPost(newPost);
      createdNewPost.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
  
      return createdNewPost;
    }
  
    /**
     * Community : post 읽기
     */
    static async getPost(postId) {
      const post = await Post.findPostById(postId);
      return post; 
    }
  
  
    /**
     * Community : category별 post 목록 읽기(페이징)
     */
    static async getPostListPage({category, page, perPage}) {
      const postList = await Post.findPostPage({category, page, perPage});
      return postList;
    }
    
    /**
     * Community : 페이징 처리한 post 리스트의 마지막 페이지 번호 구하기
     */
    static async getFinalPage({category, perPage}) {
      const finalPage = await Post.findFinalPage({category, perPage})
      return finalPage;
    }
  
  
    /**
     * Community : post 수정
     */
      static async setPost({ postId, toUpdate }) {
          let post = await Post.findPostById(postId);
      
          if (!post) {
              const error = new Error(
                "수정할 게시글을 찾을 수 없습니다."
              );
              error.status = 404;
              throw error;
          }
      
          const myKeys = Object.keys(toUpdate);
      
          for (let i = 0; i < myKeys.length; i++) {
            if (toUpdate[myKeys[i]]!==null) {
              const fieldToUpdate = myKeys[i];
              const newValue = toUpdate[myKeys[i]];
              post = await Post.update({ postId, fieldToUpdate, newValue });
            }
          }
      
          return post;
        }
  
    /**
     * Community : post 삭제
     */
    static async deletePost(postId) {
      const isDataDeleted = await Post.deletePostById(postId);
      if (isDataDeleted === false) {
        const error = new Error(
          "삭제할 게시글을 찾을 수 없습니다."
        );
        error.status = 404;
        throw error;
      }
      return {status : '삭제 ok'};
    }
  
  }
  
  export {postService};