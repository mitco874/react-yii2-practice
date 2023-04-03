import { User } from "../interfaces";

export const getUsers = async(): Promise<User[]>=> {
    let users: User[] = []
    const RegistersRoute = './data/mockdata_usuarios.json';
    const req = await fetch(RegistersRoute);
    const res = await req.json()
    users = users.concat(res);
    return users;
}