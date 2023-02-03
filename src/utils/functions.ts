export function GRK(name: string): string {
  let result = `${name}_`;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < name.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function shuffle(arr: any[]) {
  return arr.sort((a, b) => Math.random() - 0.5)
}