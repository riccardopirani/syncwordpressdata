import dotenv from 'dotenv';

dotenv.config();

export const config = {
  wordpress: {
    url: process.env.WORDPRESS_URL,
    username: process.env.WORDPRESS_USERNAME,
    appPassword: process.env.WORDPRESS_APP_PASSWORD,
    categoryId: process.env.OPENDATA_CATEGORY_ID || null
  },
  sourceApi: {
    url: process.env.SOURCE_API_URL
  }
};

// Validazione configurazione
export function validateConfig() {
  const required = [
    'WORDPRESS_URL',
    'WORDPRESS_USERNAME',
    'WORDPRESS_APP_PASSWORD',
    'SOURCE_API_URL'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Configurazione mancante: ${missing.join(', ')}\nCopia .env.example in .env e completa i valori.`);
  }
}

