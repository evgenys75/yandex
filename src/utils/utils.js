export async function checkResponse(res) {
    return res.ok ? await res.json() : Promise.reject(
        `res.ok: ${res.ok}, res.status: ${res.status}`);
}