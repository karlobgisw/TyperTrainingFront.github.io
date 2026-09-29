const formRegistro = document.getElementById("formulario");

formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = formRegistro.elements.username.value.trim();
    const email = formRegistro.elements.email.value.trim();
    const password = formRegistro.elements.password.value;
    const passwordConfirm = formRegistro.elements.passwordConfirm.value;

    let error = null;
    if (!expresiones.username.test(username)) {
        error = "El username debe tener entre 8 y 20 caracteres (letras, números, _ o -)";
    } else if (!expresiones.email.test(email)) {
        error = "Ingresa un email válido";
    } else if (!expresiones.password.test(password)) {
        error = "La contraseña debe tener mínimo 8 caracteres, una minúscula, una mayúscula, un número y un símbolo";
    } else if (password !== passwordConfirm) {
        error = "Las contraseñas deben coincidir";
    }

    if (error) {
        formRegistro.querySelectorAll(".inputs").forEach((input) => {
            input.dispatchEvent(new Event("blur"));
        });
        mostrarToast(error);
        return;
    }

    const boton = formRegistro.querySelector(".inputSignup");
    boton.disabled = true;
    try {
        const { ok, data } = await api("/api/registro", {
            method: "POST",
            body: JSON.stringify({ username, email, password, passwordConfirm })
        });
        if (ok) {
            location.href = "index.html";
        } else {
            mostrarToast(data?.msg || "No se pudo completar el registro");
        }
    } catch {
        mostrarToast("No se pudo conectar con el servidor");
    } finally {
        boton.disabled = false;
    }
});