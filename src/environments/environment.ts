export const environment = {
  production: true,
  medidasAPI: process.env.API_MEDIDAS || 'http://localhost:3000/medidas',
  usuariosAPI: process.env.API_USUARIOS || 'http://localhost:3000/usuarios',
  GOOGLE_PROVIDER_ID: process.env.GOOGLE_PROVIDER_ID || '359998324820-o21gal2e6nglh96u39j0u1r2qud8eqg0.apps.googleusercontent.com'
};