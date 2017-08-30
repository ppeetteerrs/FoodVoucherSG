// import { UserAuth, UserOut } from '../models/models';

// const userAuth: UserAuth = {
//     email: "ppeetteerrsx@gmail.com",
//     password: "fvsg2017"
// }

// const userRegister: UserOut = {
//     name: "Peter Yuen",
//     email: "ppeetteerrsx@gmail.com",
//     password: "fvsg2017",
//     accountType: "Admin"
// }

var PRIVATE_CONFIG = {
    test_mode: true, //Whether to save to test db
    dev_mode: true, //Whether it is on production server
}

function getURL() {
    let url, server_url;
    if(PRIVATE_CONFIG.dev_mode){
        url = "https://food-voucher-server-ppeetteerrs.c9users.io:8081/";

    } else {
        url = "http://private-server.peteryuenhohin.com/fvsg-server/";
    };
    if(PRIVATE_CONFIG.test_mode) {
        server_url = url + "test/"; 
    } else {
        server_url = url + "prod/"; 
    };
    let config = {
        test_mode: PRIVATE_CONFIG.test_mode,
        dev_mode: PRIVATE_CONFIG.dev_mode,
        server_url: server_url
    };
    return config;
}

export const CONFIG = getURL();