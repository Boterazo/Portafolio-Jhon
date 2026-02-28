import { loginUser,RegistrarUser } from "./End_Points.js";

document.addEventListener("DOMContentLoaded", async () => { // “Ejecuta este código cuando el HTML haya terminado de cargarse”
    
  localStorage.removeItem("token");
    const token = localStorage.getItem("token");
    console.log("Token: ",token)
   
});


const login = document.querySelector(".LOGIN");
const registrar = document.querySelector(".REGISTRAR");

const Formulario_Login = document.querySelector("#Formulario-Login");
const Formulario_Registro = document.querySelector("#Formulario-Registro")

const MSM_error_registro = document.querySelector(".error_registro");
const MSM_error_login = document.querySelector(".error_login");

const titulo = document.getElementById("titulo");

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
function Cambiar_Login() {
  login.classList.add("active");
  registrar.classList.remove("active");

  Formulario_Login.classList.remove("hidden");
  Formulario_Registro.classList.add("hidden");

  MSM_error_registro.classList.add("hidden")

  titulo.textContent = "LOGIN";
}
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
function Cambiar_Registrar() {
  registrar.classList.add("active");
  login.classList.remove("active");

  Formulario_Login.classList.add("hidden");
  Formulario_Registro.classList.remove("hidden");

   MSM_error_login.classList.add("hidden")

  titulo.textContent = "REGISTRAR";
}
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
login.addEventListener("click", function(e) {
  e.preventDefault();

  Cambiar_Login();
});

registrar.addEventListener("click", function(e) {
  e.preventDefault();

  Cambiar_Registrar();
});
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Obtener datos de los formularios
Formulario_Login.addEventListener("submit",async  function(e) {
    e.preventDefault(); // evita que la página se recargue

    const datos = new FormData(this);

    const email = datos.get("email");
    const password = datos.get("password");

    console.log("Email: ",email);
    console.log("Password: ",password);

    Swal.fire({
            title: 'Iniciando sesión...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
            Swal.showLoading(); // activa el spinner
        }
    });
    // Aquí Envio los datos a un servidor
    try {
        const respuesta = await loginUser(email, password);

        console.log("Respuesta del backend:", respuesta);

        if (respuesta["INF"] === "Email NO REGISTRADO") {
          MSM_error_login.textContent = "Error: Email no registrado";
            MSM_error_login.classList.remove("hidden");
            Swal.close();
            return;
        }
        if (respuesta["INF"] === "CONTRASEÑA INCORRECTA") {
          MSM_error_login.textContent = "Error: Contraseña Incorrecta";
          MSM_error_login.classList.remove("hidden");
          Swal.close();
          return;
        }

        Swal.close();
        // Guardar token
        localStorage.setItem("token", respuesta.access_token);
        const token = localStorage.getItem("token");
        console.log("Token guardado en Local_Storage \n",token);


        // Redirigir
        window.location.href = "perfil.html";

    } catch (error) {
        Swal.close();
        console.error("Error:", error);
    }
});
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Formulario_Registro.addEventListener("submit",async function(e) {
    e.preventDefault();

    const datos = new FormData(this);

    const username = datos.get("username")
    const email = datos.get("email");
    const password = datos.get("password");

    console.log("Username: ",username);
    console.log("Email: ",email);
    console.log("Password: ",password);

    Swal.fire({
            title: 'Iniciando Registro...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
            Swal.showLoading(); // activa el spinner
        }
    });
    // Aquí Envio los datos a un servidor
    try {
        const respuesta = await RegistrarUser(username,email, password);

        console.log("Respuesta del backend:", respuesta);

        // Redirigir
        if (respuesta["INFO"] === "Email ya reguistrado en la base de datos") {
            console.log("Usuario ya registrado");
            MSM_error_registro.classList.remove("hidden");
            Swal.close();
        } else {
            Swal.close();
            Cambiar_Login();
        }

    } catch (error) {
        Swal.close();
        console.error("Error:", error);
    }
});
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX






