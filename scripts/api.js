const API_URL = "http://localhost:3000"; // cambiar en producción

async function api(ruta, opciones = {}) {
    const res = await fetch(API_URL + ruta, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...opciones
    });
    let data = null;
    try { data = await res.json(); } catch {}
    return { ok: res.ok, status: res.status, data };
}