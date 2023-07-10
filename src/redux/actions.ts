import { IAction } from "./reducer";


export const addToDoList = (payload: any) => {
    return {
        type: 'todoList/addTodo',
        payload: payload
    }
}