import  Api from 'api/api'
import getData from 'api/dataHandler'
import {STORAGE_KEY} from 'store/keys'
import { useJwt } from "react-jwt";
module.exports = {
    login: async (loginData) => {
        const info = {
            username: "a",
            key: STORAGE_KEY
        }
        const {decodedToken, isExpired} = useJwt(info);
        return decodedToken
    }
}
