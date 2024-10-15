// Importar los tipos y funciones necesarias
import type { APIRoute } from "astro"; // Tipo para definir la ruta de la API
import { app } from "../../../firebase/server"; // Importar la configuración de Firebase
import { getAuth, type DecodedIdToken } from "firebase-admin/auth"; // Funciones para autenticación
import { getFirestore } from "firebase-admin/firestore"; // Función para acceder a Firestore

// Definición de la ruta GET para la autenticación
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
    const auth = getAuth(app); // Inicializa el servicio de autenticación de Firebase
    const db = getFirestore(app); // Inicializa el servicio Firestore de Firebase

    // Obtener el token de ID desde los encabezados de la solicitud
    const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!idToken) {
        // Si no se encuentra el token, devolver un error 401
        return new Response("No token found", { status: 401 });
    }

    let decodedToken: DecodedIdToken;
    try {
        // Verificar el token de ID para asegurarse de que es válido
        decodedToken = await auth.verifyIdToken(idToken);
    } catch (error) {
        // Si el token es inválido, devolver un error 401
        return new Response("Invalid token", { status: 401 });
    }

    const uid = decodedToken.uid; // Obtener el UID del token decodificado
    // Consultar Firestore para obtener la información del usuario usando el UID
    const userDoc = await db.collection("users").doc(uid).get();
    const userData = userDoc.data(); // Obtener los datos del documento del usuario

    if (!userData) {
        // Si no se encuentra el usuario en la base de datos, devolver un error 404
        return new Response(
            JSON.stringify({ error: "La cuenta no existe." }),
            { status: 404, headers: { "Content-Type": "application/json" } }
        );
    }

    // Crear y establecer la cookie de sesión con una duración de cinco días
    const fiveDays = 60 * 60 * 24 * 5 * 1000; // Duración de cinco días en milisegundos
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: fiveDays, // Establecer la expiración de la cookie
    });

    // Establecer la cookie de sesión en las cookies del navegador
    cookies.set("__session", sessionCookie, { path: "/" });

    // Redirigir al usuario al home
    return redirect("/");
};
   
