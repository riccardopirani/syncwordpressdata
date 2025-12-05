import axios from 'axios';
import { config } from './config.js';

/**
 * Recupera i dati dalla API sorgente
 */
export async function fetchDataFromAPI() {
  try {
    console.log(`Recupero dati da: ${config.sourceApi.url}`);
    
    const response = await axios.get(config.sourceApi.url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'WordPress-Importer/1.0'
      }
    });

    console.log(`✓ Recuperati ${response.data.length || 1} elementi`);
    return response.data;

  } catch (error) {
    console.error('Errore recupero dati API:', error.message);
    throw error;
  }
}

/**
 * Trasforma i dati dell'API nel formato per WordPress
 * Questa funzione va personalizzata in base alla struttura dell'API sorgente
 */
export function transformData(rawData) {
  // Se rawData è un array
  if (Array.isArray(rawData)) {
    return rawData.map(item => transformSingleItem(item));
  }
  
  // Se rawData è un oggetto singolo
  return [transformSingleItem(rawData)];
}

function transformSingleItem(item) {
  // Adatta questi campi alla struttura della tua API
  return {
    id: item.id || item._id || null,
    title: item.title || item.name || item.titolo || 'Untitled',
    content: item.content || item.body || item.description || item.descrizione || '',
    excerpt: item.excerpt || item.summary || item.abstract || '',
    source_url: item.url || item.link || item.source || ''
  };
}

