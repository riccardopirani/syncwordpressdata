#!/usr/bin/env node

import { validateConfig, config } from './config.js';
import WordPressClient from './wordpress.js';
import { fetchDataFromAPI, transformData } from './api-fetcher.js';

async function main() {
  console.log('=== WordPress API Importer ===\n');

  try {
    // Valida configurazione
    validateConfig();

    // Inizializza client WordPress
    const wp = new WordPressClient();

    // Test connessione
    console.log('1. Test connessione WordPress...');
    const connected = await wp.testConnection();
    if (!connected) {
      throw new Error('Impossibile connettersi a WordPress');
    }

    // Trova o crea categoria openData
    console.log('\n2. Gestione categoria openData...');
    let categoryId = config.wordpress.categoryId;
    if (!categoryId) {
      categoryId = await wp.getOrCreateOpenDataCategory();
    }

    // Recupera dati dalla API sorgente
    console.log('\n3. Recupero dati dalla API sorgente...');
    const rawData = await fetchDataFromAPI();

    // Trasforma i dati
    console.log('\n4. Trasformazione dati...');
    const posts = transformData(rawData);
    console.log(`✓ ${posts.length} post pronti per l'importazione`);

    // Importa i post
    console.log('\n5. Importazione post su WordPress...');
    let imported = 0;
    let skipped = 0;
    let errors = 0;

    for (const post of posts) {
      try {
        // Verifica se il post esiste già
        const exists = await wp.postExists(post.title);
        
        if (exists) {
          console.log(`  ⊘ Saltato: "${post.title}" (già esistente)`);
          skipped++;
          continue;
        }

        // Crea il post
        const result = await wp.createPost(post, categoryId);
        console.log(`  ✓ Importato: "${result.title.rendered}" (ID: ${result.id})`);
        imported++;

        // Pausa breve tra un post e l'altro per non sovraccaricare il server
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`  ✗ Errore: "${post.title}" - ${error.message}`);
        errors++;
      }
    }

    // Riepilogo
    console.log('\n=== Riepilogo ===');
    console.log(`Post importati: ${imported}`);
    console.log(`Post saltati (duplicati): ${skipped}`);
    console.log(`Errori: ${errors}`);
    console.log(`\n✓ Processo completato!`);

  } catch (error) {
    console.error('\n✗ Errore fatale:', error.message);
    process.exit(1);
  }
}

// Esegui il programma
main();

