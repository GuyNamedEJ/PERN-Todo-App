import { useState } from "react";

function EditTodos({ todo }) {
  const [description, setDesc] = useState(todo.description);

  const updateDesc = async (e) => {
    e.preventDefault();
    try {
        const body = { description }
        const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }
        )

        window.location = "/"
    } catch (error) {
        console.error(error.message)
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id-${todo.todo_id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id-${todo.todo_id}`} onClick={() => setDesc(todo.description)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
              onClick={() => setDesc(todo.description)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <input
                value={description}
                type="text"
                className="form-control"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                onClick={e => updateDesc(e)}
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                Edit
              </button>

              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => setDesc(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditTodos;
