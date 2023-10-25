export class User {
    id: number | undefined;
    username: string | undefined;
	password: string | undefined;
    roles: string[] | undefined;

    constructor() {
        this.id = undefined;
        this.username = undefined;
        this.password = undefined;
        this.roles = undefined;
    }

}
