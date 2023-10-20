export class Todo {
    static lastId = 0;
    public id: number;
    public newTodo: string | undefined;
    public status: boolean | undefined;

    constructor() {
        this.id = Todo.lastId + 1;
        this.status = false;
        Todo.lastId++;
    }
}