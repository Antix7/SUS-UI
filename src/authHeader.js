export default function authHeader() {
  const token = localStorage.getItem("token");
  return { 'x-access-token': token };
}