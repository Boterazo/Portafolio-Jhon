import { loginUser,RegistrarUser, Verificar_Token,Img_BD_GET,Img_BD_POST } from "./End_Points.js";
import{IMG_PERFIL, URL_END_POINT } from "./config.js";


const Input_img = document.querySelector(".input_img");
const BTN_Subir_foto_perfil = document.querySelector(".BTN_Subir_foto_perfil");
const img_perfil = document.querySelector(".fotoPerfil");

const Email_ET = document.querySelector(".Email_ET");
const Tiempo_ET = document.querySelector(".Tiempo_ET");

const btn_proyectos = document.querySelector(".btn_proyectos");
const btn_API_Docs = document.querySelector(".btn_API_Docs");

const API_D = document.querySelector(".API_DOCS");
const proyecto_ = document.querySelector(".proyectos-contenido");

document.addEventListener("DOMContentLoaded", async () => { // “Ejecuta este código cuando el HTML haya terminado de cargarse”
    const data = await  Verificar_Token();
    const iframe = document.querySelector("#API_doc");
    iframe.src = URL_END_POINT+"/docs"
   
});

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
window.addEventListener("load", async () => { // “Ejecuta este código cuando el HTML haya terminado de cargarse”
    const data = await  Verificar_Token();
    /*
    console.log(data["usuario"]);
    email.textContent = `EMAIL: ${data["usuario"].sub}`;
    const tiempo_date = new Date(data["usuario"].exp * 1000);
    Tiempo.textContent = `Expira: ${tiempo_date.toLocaleString()}`;
    */
   const token = localStorage.getItem("token");
   console.log("Tokne: ",token)
   Email_ET.textContent = data["usuario"].sub;
   const tiempo_date = new Date(data["usuario"].exp * 1000);
   Tiempo_ET.textContent = `Expira: ${tiempo_date.toLocaleString()}`;
   
    try{
        const url = await Img_BD_GET(token);
        if(url[0] === "No hay URL DE IMAGEN"){
            img_perfil.src = IMG_PERFIL;
            console.log("usando foto de perfil por defecto");
        }
        else {
            img_perfil.src = url;
            console.log("usando foto URL");
        }
        
    }
    catch{
        img_perfil.src = IMG_PERFIL;
        console.log("no se encontro imagen");
    }

});

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXX Boton cargar imagen XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
BTN_Subir_foto_perfil.addEventListener("click", function(e) {
    e.preventDefault();
    Input_img.click(); // 🔥 abre el explorador de archivos
});

Input_img.addEventListener("change", async  function(e) {
  e.preventDefault();
    const token = localStorage.getItem("token");

    const file = Input_img.files[0];

    if (!file) {
        alert("Selecciona una imagen");
        return;
    }
    const url = await Img_BD_POST(file,token);

    img_perfil.src = url;
});

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

btn_API_Docs.addEventListener("click", function(e) {
  e.preventDefault();
    

    btn_API_Docs.classList.add("active");
    btn_proyectos.classList.remove("active");
    
    API_D.classList.remove("hidden");
    proyecto_.classList.add("hidden"); 
});

btn_proyectos.addEventListener("click", function(e) {
  e.preventDefault();
    btn_API_Docs.classList.remove("active");
    btn_proyectos.classList.add("active");
    

    proyecto_.classList.remove("hidden");
    API_D.classList.add("hidden"); 
});