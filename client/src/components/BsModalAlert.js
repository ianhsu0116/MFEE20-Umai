import React from "react";

// id: 控制modal開關用的， handleDelete: 按下確認刪除後要做的事
const BsModalAlert = (props) => {
  let { id, handleDelete } = props;
  return (
    <div
      class="modal fade"
      id={id}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              確定刪除？
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">刪除後無法恢復資料！</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleDelete}
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BsModalAlert;
