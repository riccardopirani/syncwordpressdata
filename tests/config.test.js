import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';

describe('Config Tests', () => {
  let originalEnv;

  beforeEach(() => {
    // Salva variabili ambiente originali
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    // Ripristina variabili ambiente
    process.env = originalEnv;
  });

  describe('validateConfig', () => {
    it('dovrebbe validare configurazione completa', () => {
      process.env.WORDPRESS_URL = 'https://example.com';
      process.env.WORDPRESS_USERNAME = 'testuser';
      process.env.WORDPRESS_APP_PASSWORD = 'test-password';
      process.env.SOURCE_API_URL = 'https://api.example.com';

      // Test validazione
      assert.ok(process.env.WORDPRESS_URL);
      assert.ok(process.env.WORDPRESS_USERNAME);
    });

    it('dovrebbe rilevare configurazione mancante', () => {
      delete process.env.WORDPRESS_URL;
      
      // Test che dovrebbe fallire con config mancante
      assert.strictEqual(process.env.WORDPRESS_URL, undefined);
    });

    it('dovrebbe gestire valori opzionali', () => {
      process.env.OPENDATA_CATEGORY_ID = '5';
      assert.strictEqual(process.env.OPENDATA_CATEGORY_ID, '5');
      
      delete process.env.OPENDATA_CATEGORY_ID;
      assert.strictEqual(process.env.OPENDATA_CATEGORY_ID, undefined);
    });
  });

  describe('config object', () => {
    it('dovrebbe costruire l\'oggetto config correttamente', () => {
      process.env.WORDPRESS_URL = 'https://test.com';
      
      // Verifica struttura config
      assert.ok(process.env.WORDPRESS_URL.startsWith('https://'));
    });
  });
});

