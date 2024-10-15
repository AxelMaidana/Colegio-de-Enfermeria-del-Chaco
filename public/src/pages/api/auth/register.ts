import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const dni = formData.get("dni")?.toString();
    const email = formData.get("email")?.toString().toLowerCase();
    const password = formData.get("password")?.toString();
    const birthdate = formData.get("birthdate")?.toString();
    const role = formData.get("role")?.toString();
    const matricula = formData.get("matricula")?.toString();
    const lugarDeOrigen = formData.get("lugarDeOrigen")?.toString();
    const infoExtra = formData.get("infoExtra")?.toString();
    

    if (!email || !password || !name || !role || !lastName || !dni || !birthdate || !matricula || !lugarDeOrigen || !infoExtra ) {
        return new Response(
            JSON.stringify({ error: "Datos faltantes" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    try {
        // Crear el usuario en Firebase Authentication (sin dni ni birthdate)
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: `${name} ${lastName}`,
        });

        // Guardar la información adicional en Firestore
        await db.collection("users").doc(userRecord.uid).set({
            email,
            name,
            lastName,
            dni,
            birthdate,
            role,
            profileImageUrl: null,
            matricula,
            lugarDeOrigen,
            infoExtra,
        });

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message || "Algo salió mal" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
};
