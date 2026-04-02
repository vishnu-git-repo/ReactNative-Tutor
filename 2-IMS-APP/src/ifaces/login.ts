export interface ILoginService {
    email : string,
    password : string
}

export interface IUser {
    id: number,
    name: string,
    email: string,
    gender: string,
    address: string,
    phone: string,
    role: number,
    status: number
}