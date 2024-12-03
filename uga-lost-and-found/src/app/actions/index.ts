'use server'

import { signIn, signOut } from "@/auth";
import { redirect } from "next/dist/server/api-utils";

export async function doLogout() {
    await signOut({redirect:false});
}
type FormData = {
    email: string,
    password: string,
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
    
    const email = formData["email"] as string;
    const password = formData["password"] as string;
    
    try {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        return response;
    } catch (err: any) {
        console.log("Failure 2")
    }

}