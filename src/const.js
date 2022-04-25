const API_URL = "http://" + window.location.host.toString().replace("3000", "8000");
const EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
export { API_URL, EMAIL_REGEX };