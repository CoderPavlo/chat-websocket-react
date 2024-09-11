import IUser from "./IUser";

export default interface IMessage {
    id: string,
    user?: IUser;
    content: string;
    date: Date;
}