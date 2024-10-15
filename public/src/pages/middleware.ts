// src/middleware.ts

// Importar las funciones necesarias de Firebase Admin SDK
import { getAuth } from "firebase-admin/auth"; // Para manejar la autenticación de usuarios
import { getFirestore } from "firebase-admin/firestore"; // Para interactuar con Firestore
import { app } from "../firebase/server"; // Importar la instancia de la aplicación Firebase configurada

// Inicializar las instancias de autenticación y Firestore
const auth = getAuth(app); // Instancia de autenticación
const db = getFirestore(app); // Instancia de Firestore

// Función para verificar la autenticación del usuario
export const checkAuth = async (cookies: { get: (arg0: string) => { (): any; new(): any; value: any; }; }) => {
    // Intentar obtener la cookie de sesión desde las cookies
    const sessionCookie = cookies.get("__session")?.value; // Obtener la cookie de sesión
    if (!sessionCookie) return null; // Si no hay cookie de sesión, devolver null

    try {
        // Verificar y decodificar la cookie de sesión
        const decodedCookie = await auth.verifySessionCookie(sessionCookie);
        return decodedCookie; // Devolver los datos del usuario autenticado
    } catch (error) {
        return null; // Si hay un error, devolver null (no es un usuario autenticado)
    }
};

// Función para verificar el rol del usuario
export const checkRole = async (cookies: { get: (arg0: string) => { (): any; new(): any; value: any; }; }, requiredRole: any) => {
    // Verificar la autenticación del usuario
    const user = await checkAuth(cookies); // Llamar a checkAuth para obtener el usuario
    if (!user) return null; // Si el usuario no está autenticado, devolver null

    const uid = user.uid; // Obtener el UID del usuario autenticado
    // Obtener el documento del usuario en Firestore usando el UID
    const userDoc = await db.collection("users").doc(uid).get();
    const userData = userDoc.data(); // Obtener los datos del usuario desde el documento

    // Devolver true si el rol del usuario coincide con el rol requerido, de lo contrario false
    return userData?.role === requiredRole; // Utiliza el operador de encadenamiento opcional para evitar errores
};
