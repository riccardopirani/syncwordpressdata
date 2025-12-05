# 🚀 Guida Rapida

## Setup Veloce (5 minuti)

### 1. Installa dipendenze
```bash
npm install
```

### 2. Configura credenziali
```bash
cp env.template .env
```

Poi modifica `.env` con i tuoi dati:
- **WORDPRESS_URL**: URL del tuo sito (es. `https://miosito.com`)
- **WORDPRESS_USERNAME**: Il tuo username WordPress
- **WORDPRESS_APP_PASSWORD**: Vedi sotto come ottenerla
- **SOURCE_API_URL**: URL dell'API da cui importare (es. `https://jsonplaceholder.typicode.com/posts`)

### 3. Ottieni WordPress Application Password

1. Vai su WordPress → **Utenti → Profilo**
2. Scorri fino a **"Application Passwords"**
3. Inserisci un nome (es. "Importer") 
4. Clicca **"Add New Application Password"**
5. Copia la password (formato: `xxxx xxxx xxxx xxxx`)
6. Incollala in `.env`

### 4. Testa con API di esempio

Per un test rapido, usa questa API pubblica:
```env
SOURCE_API_URL=https://jsonplaceholder.typicode.com/posts
```

### 5. Avvia l'importazione
```bash
npm start
```

## 📝 Personalizza la Trasformazione Dati

Se la tua API ha una struttura diversa, modifica `api-fetcher.js`:

```javascript
function transformSingleItem(item) {
  return {
    title: item.tuoCampoTitolo,
    content: item.tuoCampoContenuto,
    excerpt: item.tuoCampoRiassunto,
    // ...
  };
}
```

## 🎯 API Reali di OpenData

Esempi di API che puoi usare:

### Dati.gov.it
```
https://www.dati.gov.it/api/3/action/package_search?rows=10
```

### OpenDataSoft
```
https://data.opendatasoft.com/api/records/1.0/search/?dataset=...
```

### JSONPlaceholder (test)
```
https://jsonplaceholder.typicode.com/posts
```

## ⚠️ Risoluzione Problemi Comuni

### "Configurazione mancante"
→ Hai creato il file `.env`? Usa `cp env.template .env`

### "401 Unauthorized"
→ Verifica username e Application Password

### "Cannot connect to WordPress"
→ Controlla che l'URL sia corretto (senza `/` finale)

## 💡 Tips

- Usa `npm run dev` per modalità sviluppo
- I post duplicati vengono saltati automaticamente
- La categoria "openData" viene creata automaticamente
- Ogni importazione ha una pausa di 500ms tra i post

## 📞 Struttura File

- `index.js` - Script principale
- `wordpress.js` - Gestione WordPress API
- `api-fetcher.js` - Recupero dati esterni (← **personalizza qui**)
- `config.js` - Configurazione

Buon import! 🎉

