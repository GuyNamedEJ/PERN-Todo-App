import { useEffect, useState } from "react";
import EditTodos from "./EditTodos";

function ListTodos() {
  const [todos, setTodos] = useState([]);
  const api = 'https://pern-todo-app-y75k.onrender.com'


  const getTodos = async () => {
    try {
      const response = await fetch(`${api}/todos`);
      const data = await response.json();

      setTodos(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`${api}/todos/${id}`,
        {
          method: "DELETE"
        }
      )

      setTodos(todos.filter(todo => todo.todo_id !== id))
    } catch (error) {
      console.error(error.message) 
    }
  }
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <table className="table text-center mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td><EditTodos todo={todo}/></td>
              <td>
                <button onClick={() => deleteTodo(todo.todo_id)}  className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default ListTodos;
