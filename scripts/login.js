const form = document.getElementById("form-login");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.elements.username.value.trim();
    const password = form.elements.password.value;

    if (!username || !password) {
        mostrarToast(!username ? "Ingresa un username" : "Ingresa una contraseña");
        return;
    }

    const boton = form.querySelector(".inputLogin");
    boton.disabled = true;
    try {
        const { ok, data } = await api("/api/login", {
            method: "POST",
            body: JSON.stringify({ username, password })
        });
        if (ok) {
            location.href = "index.html";
        } else {
            mostrarToast(data?.msg || "No se pudo iniciar sesión");
        }
    } catch {
        mostrarToast("No se pudo conectar con el servidor");
    } finally {
        boton.disabled = false;
    }
});

(async () => {
    try {
        const { ok } = await api("/api/me");
        if (ok) location.href = "index.html";
    } catch {}
})();