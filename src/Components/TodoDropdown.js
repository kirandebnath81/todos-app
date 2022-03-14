import React, { useState } from "react";

import { BiDotsHorizontal } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

export default function Dropdown(props) {
  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownList = () => {
    setShowDropDown((prevState) => !prevState);
  };

  return (
    <div className="dropdown">
      {showDropDown && (
        <div className="dropdown-content">
          <div className="dropdown-item" onClick={props.handleDeleteTodo}>
            delete <RiDeleteBin5Fill />
          </div>
          <div className="dropdown-item" onClick={props.handleEditTodo}>
            edit <FiEdit />
          </div>
          <div className="dropdown-item" onClick={props.handleStarTodo}>
            star <AiFillStar />
          </div>
        </div>
      )}
      <div className="dropdown-btn" onClick={dropDownList}>
        <BiDotsHorizontal />
      </div>
    </div>
  );
}
