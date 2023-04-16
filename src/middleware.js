import {withAuth} from "next-auth/middleware"

export default withAuth(
    async function middleware(req){
        // autorizacion de roles
    }
)


export const config = {
    matcher:[
        "/profile"
    ]
}