import { UserAuth, UserOut } from '../models/models';

const userAuth: UserAuth = {
    email: "ppeetteerrsx@gmail.com",
    password: "fvsg2017"
}

const userRegister: UserOut = {
    name: "Peter Yuen",
    email: "ppeetteerrsx@gmail.com",
    password: "fvsg2017",
    accountType: "Admin"
}

export const CONFIG = {
    server_url: "http://private-server.peteryuenhohin.com/fvsg-server/",
    test: true,
    loginAccount: userAuth
}