import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "../../../firebase/server";

// Definir los tipos básicos para los parámetros
export async function checkUserRole(Astro: any, allowedRoles: string[]) {
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Verificación de la existencia de la cookie de sesión:
    const sessionCookie = Astro.cookies.get("__session")?.value;
    if (!sessionCookie) {
        console.log("No session cookie found, redirecting to signin");
        return Astro.redirect("/signin"); 
    }

    try {
        // Verificación de la cookie de sesión y recuperación de datos:
        const decodedClaims = await auth.verifySessionCookie(sessionCookie);
        const userDoc = await db.collection("users").doc(decodedClaims.uid).get();
        const userData = userDoc.data();

        // Verificación de los datos del usuario y redirección a la página de inicio de sesión si no se cumplen los requisitos:
        if (!userData || !allowedRoles.includes(userData.role)) {
       
            return Astro.redirect("/signin");
        }

        return userData;

    } catch (error) {
        console.error("Error verifying session cookie or fetching user data:", error);
        
        return Astro.redirect("/signin");
    }
}
