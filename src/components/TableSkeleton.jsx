import React from "react";

const TableSkeleton = () => {
  return (
    <td>
      <div class="box" style={{ height: "20px" }}>
        <div class="skeleton">
          <div class="skeleton-right">
            <div
              class="square"
              style={{ height: "20px", width: "100px", borderRadius: "7px" }}
            ></div>
          </div>
        </div>
      </div>
    </td>
  );
};

export default TableSkeleton;
