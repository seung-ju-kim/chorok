import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommunityInfoCommentAddModal from "./CommunityInfoCommentAddModal";

const CommunityInfoCommentDummy = () => {
  // const { id } = useParams();
  // console.log(id);
  const [openAddComment, setOpenAddComment] = useState(true);
  return (
    <div>
      <CommunityInfoCommentAddModal
        openAddComment={openAddComment}
        setOpenAddComment={setOpenAddComment}
      />
    </div>
  );
};

export default CommunityInfoCommentDummy;
