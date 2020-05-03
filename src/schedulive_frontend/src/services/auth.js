export const usuarioAutenticado = () => localStorage.getItem("usuario-schedulive") !== null;

export const parseJWT = () => {
    var base64Url = localStorage.getItem("usuario-schedulive").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    return JSON.parse(window.atob(base64));
}