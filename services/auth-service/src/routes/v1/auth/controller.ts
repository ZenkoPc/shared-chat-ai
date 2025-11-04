export async function signIn(){
    
    try{
        throw new Error("Not Implemented");
    }catch(err: any){
        return {
            error: {
                message: err?.message || "Sign-In Failed",
                code: err?.cause || 500
            },
            token: null
        }
    }

}