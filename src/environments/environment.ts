export const environment = {
  production: true,
  medidasAPI: process.env.API_MEDIDAS || 'http://localhost:3000/medidas',
  usuariosAPI: process.env.API_USUARIOS || 'http://localhost:3000/usuarios',
  GOOGLE_PROVIDER_ID: process.env.GOOGLE_PROVIDER_ID || ''
};