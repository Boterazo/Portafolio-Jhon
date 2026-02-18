import {URL_END_POINT} from "./config.js";

export async function loginUser(email, password,url = (URL_END_POINT+"/login")) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    //console.log(response)
    if (!response.ok) {
        throw new Error("Error en la autenticación");
    }
    return response.json();
}

export async function RegistrarUser(username,email, password,url =  (URL_END_POINT+"/Registrar")) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username,email, password })
    });
    //console.log(response)
    if (!response.ok) {
        throw new Error("Error Al registrar");
    }
    return response.json();  
}

export async function Verificar_Token() {
    const token = localStorage.getItem("token"); // busco el token almacenado en localstorage
    
    if (!token) { // 1️⃣ Si no hay token → regresar al login
        window.location.href = "index.html";
        return;
    }
    try {
        const response = await fetch((URL_END_POINT+"/perfil"), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // 2️⃣ Si el token es inválido o expiró
        if (!response.ok) {
            localStorage.removeItem("token");
            console.log("Token Expiro o es invalido");
            window.location.href = "index.html";
            return;
        }

        const data = await response.json();
        console.log("Usuario autenticado:", data);
        return data

    } catch (error) {
        console.error("Error:", error);
        window.location.href = "index.html";
    }  
}

export async function Img_BD_POST(file,token,tipo_img = "Foto_Perfil") {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("tipo_imagen", tipo_img);  // 👈 dato adicional

    const response = await fetch((URL_END_POINT+"/Subir_Img"), {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    const url = await response.json();
    
    return url.URL
    
}

export async function Img_BD_GET(token) {

    const response = await fetch((URL_END_POINT+"/Obtener_Img"), {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    const URL = await response.json();
    console.log("ALMACENADA EN: ",URL)
    return URL
}