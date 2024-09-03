export async function getMoneroPrice() {
    const options = {
        method: 'GET',
        headers: {'X-API-KEY': 'hfnxl3iLutIJnTq2NDOZAD/gL+5YREqQzHLZ2Bl+Cnw='}
      };
      
      const res = await fetch('https://openapiv1.coinstats.app/coins/price/avg?coinId=monero&timestamp=1725364458', options)
      const dejsonifyedres = res.json()
      return dejsonifyedres
}

export function generateRandomId16() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
  }
  return code;
}