export function generateToken() {
  const character =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefjhijklmnopqrstuvwxyz0123456789";
  const length = 20;
  let token = "";
  for (let i = 0; i < length; i++) {
    token += character.charAt(Math.floor(Math.random() * character.length));
  }
  return token;
}
