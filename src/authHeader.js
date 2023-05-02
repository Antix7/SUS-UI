export default function authHeader() {
  const token = sessionStorage.getItem("token");
  return { 'x-access-token': token };
}