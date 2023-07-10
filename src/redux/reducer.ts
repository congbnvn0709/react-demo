import { AnyAction, Reducer } from "redux"

const initState = {
    search: '',
    toDoList: [
        { id: 1, name: 'Learn Reactjs' },
        { id: 2, name: 'Learn JS' },
        { id: 3, name: 'Learn Redux' },
    ]
}
export interface IAction {
    type: string,
    payload: any
}

const toDoReducer: Reducer<any, AnyAction> = (state: any = initState, action: any) => {
    switch (action.type) {
        case 'todoList/addTodo': {
            return {
                ...state,
                toDoList: [
                    ...state.toDoList,
                    action.payload
                ]
            }
        }
        default:
            return state
    }

}

export default toDoReducer;