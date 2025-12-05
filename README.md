# WordPress API Importer

Software Node.js per importare post da una REST API a WordPress, inserendoli nella categoria "openData".

## 🚀 Caratteristiche

- ✅ Importa dati da qualsiasi REST API
- ✅ Crea automaticamente la categoria "openData" se non esiste
- ✅ Evita duplicati controllando i titoli esistenti
- ✅ Autenticazione sicura con WordPress Application Password
- ✅ Gestione errori e logging dettagliato
- ✅ Configurazione tramite file .env

## 📋 Requisiti

- Node.js 18+ 
- Un sito WordPress con REST API abilitata
- WordPress Application Password (per autenticazione)

## 🔧 Installazione

1. Installa le dipendenze:
```bash
npm install
```

2. Copia il file di esempio della configurazione:
```bash
cp .env.example .env
```

3. Modifica `.env` con i tuoi dati:
```env
WORDPRESS_URL=https://tuosito.com
WORDPRESS_USERNAME=tuo_username
WORDPRESS_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
SOURCE_API_URL=https://api.esempio.com/posts
```

## 🔑 Come ottenere la Application Password di WordPress

1. Accedi al tuo WordPress come amministratore
2. Vai su **Utenti → Profilo**
3. Scorri fino a **Application Passwords**
4. Inserisci un nome (es. "API Importer") e clicca **Add New Application Password**
5. Copia la password generata (formato: `xxxx xxxx xxxx xxxx xxxx xxxx`)
6. Incollala nel file `.env` come `WORDPRESS_APP_PASSWORD`

## 🎯 Utilizzo

Avvia l'importazione:
```bash
npm start
```

Oppure in modalità sviluppo (riavvio automatico):
```bash
npm run dev
```

## ⚙️ Personalizzazione

### Adattare la struttura dell'API sorgente

Modifica la funzione `transformSingleItem` in `api-fetcher.js` per mappare i campi della tua API:

```javascript
function transformSingleItem(item) {
  return {
    id: item.id,                    // ID univoco
    title: item.title,              // Titolo del post
    content: item.description,      // Contenuto principale
    excerpt: item.summary,          // Estratto (opzionale)
    source_url: item.link          // URL sorgente (opzionale)
  };
}
```

### Aggiungere campi personalizzati

Nel file `wordpress.js`, metodo `createPost`, puoi aggiungere custom fields:

```javascript
const wpPost = {
  title: postData.title,
  content: postData.content,
  status: 'publish',
  categories: [categoryId],
  meta: {
    custom_field: postData.customValue
  }
};
```

## 📁 Struttura del Progetto

```
softwaresync/
├── index.js           # Entry point principale
├── config.js          # Gestione configurazione
├── wordpress.js       # Client WordPress REST API
├── api-fetcher.js     # Recupero dati dalla API sorgente
├── package.json       # Dipendenze e script
├── .env.example       # Template configurazione
└── README.md          # Documentazione
```

## 🔍 Esempi di API Sorgente

### Esempio 1: API JSON semplice
```json
[
  {
    "id": 1,
    "title": "Primo Dataset",
    "description": "Descrizione del dataset",
    "url": "https://fonte.com/dataset1"
  }
]
```

### Esempio 2: API con struttura complessa
```json
{
  "data": [
    {
      "identifier": "DS001",
      "nome": "Dataset Popolazione",
      "descrizione": "Dati sulla popolazione",
      "metadata": {
        "source": "https://dati.gov.it/..."
      }
    }
  ]
}
```

Per strutture complesse, modifica `fetchDataFromAPI` per estrarre l'array corretto.

## 🛠️ Risoluzione Problemi

### Errore: "Configurazione mancante"
Assicurati di aver creato il file `.env` e compilato tutti i campi richiesti.

### Errore: "Impossibile connettersi a WordPress"
- Verifica che l'URL WordPress sia corretto (senza slash finale)
- Controlla username e Application Password
- Assicurati che le REST API siano abilitate su WordPress

### Errore 401 Unauthorized
- Rigenera la Application Password
- Verifica che l'utente abbia i permessi per creare post

### Post non appaiono
Controlla lo status del post in `wordpress.js`:
- `'publish'` = pubblicato immediatamente
- `'draft'` = salvato come bozza
- `'private'` = privato

## 📄 Licenza

MIT License - Sentiti libero di usare e modificare questo software.

## 🤝 Contributi

Contributi, issues e richieste di funzionalità sono benvenuti!

