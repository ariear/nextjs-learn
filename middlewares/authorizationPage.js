import cookies from "next-cookies"

export const unauthPage = (ctx) => {
    const cookie = cookies(ctx)
    
    if (cookie.token){ 
        return ctx.res.writeHead(302,{
            location: '/posts'
        }).end()
    }

    return 'unatorizated'
}

export const authPage = (ctx) => {
    const cookie = cookies(ctx)
    
    if (!cookie.token){ 
        return ctx.res.writeHead(302,{
            location: '/auth/login'
        }).end()
    }

    return cookie.token
}