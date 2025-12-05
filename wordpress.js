import axios from 'axios';
import { config } from './config.js';

class WordPressClient {
  constructor() {
    this.baseUrl = `${config.wordpress.url}/wp-json/wp/v2`;
    this.auth = {
      username: config.wordpress.username,
      password: config.wordpress.appPassword
    };
  }

  /**
   * Trova o crea la categoria "openData"
   */
  async getOrCreateOpenDataCategory() {
    try {
      // Cerca se la categoria esiste già
      const response = await axios.get(`${this.baseUrl}/categories`, {
        params: { search: 'openData' },
        auth: this.auth
      });

      if (response.data.length > 0) {
        const category = response.data.find(cat => cat.slug === 'opendata' || cat.name === 'openData');
        if (category) {
          console.log(`✓ Categoria "openData" trovata (ID: ${category.id})`);
          return category.id;
        }
      }

      // Se non esiste, creala
      console.log('Creazione categoria "openData"...');
      const createResponse = await axios.post(
        `${this.baseUrl}/categories`,
        {
          name: 'openData',
          slug: 'opendata',
          description: 'Dati aperti importati da API esterne'
        },
        { auth: this.auth }
      );

      console.log(`✓ Categoria "openData" creata (ID: ${createResponse.data.id})`);
      return createResponse.data.id;

    } catch (error) {
      console.error('Errore gestione categoria:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Crea un nuovo post su WordPress
   */
  async createPost(postData, categoryId) {
    try {
      const wpPost = {
        title: postData.title,
        content: postData.content || postData.description || '',
        status: 'publish',
        categories: [categoryId],
        meta: {
          source_id: postData.id?.toString() || '',
          source_url: postData.source_url || ''
        }
      };

      // Aggiungi excerpt se disponibile
      if (postData.excerpt) {
        wpPost.excerpt = postData.excerpt;
      }

      const response = await axios.post(
        `${this.baseUrl}/posts`,
        wpPost,
        { auth: this.auth }
      );

      return response.data;

    } catch (error) {
      console.error('Errore creazione post:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Verifica se un post esiste già (basato sul titolo)
   */
  async postExists(title) {
    try {
      const response = await axios.get(`${this.baseUrl}/posts`, {
        params: { 
          search: title,
          per_page: 1
        },
        auth: this.auth
      });

      return response.data.some(post => post.title.rendered === title);

    } catch (error) {
      console.error('Errore verifica post:', error.message);
      return false;
    }
  }

  /**
   * Test connessione WordPress
   */
  async testConnection() {
    try {
      const response = await axios.get(`${config.wordpress.url}/wp-json`, {
        auth: this.auth
      });
      console.log(`✓ Connesso a WordPress: ${response.data.name}`);
      return true;
    } catch (error) {
      console.error('✗ Errore connessione WordPress:', error.message);
      return false;
    }
  }
}

export default WordPressClient;

