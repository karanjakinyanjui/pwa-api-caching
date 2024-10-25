import './style.css'
import { api } from './src/apiClient.js'

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registration successful');
    }).catch(err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>PWA API Cache Demo</h1>
    <div class="card">
      <button id="getData">Get Data</button>
      <button id="postData">Post Data</button>
      <button id="putData">Put Data</button>
    </div>
    <pre id="result"></pre>
  </div>
`

const resultEl = document.querySelector('#result');

// Example usage
document.querySelector('#getData').addEventListener('click', async () => {
  try {
    const data = await api.get('/posts/1');
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultEl.textContent = `Error: ${error.message}`;
  }
});

document.querySelector('#postData').addEventListener('click', async () => {
  try {
    const data = await api.post('/posts', {
      title: 'New Post',
      body: 'Content',
      userId: 1
    });
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultEl.textContent = `Error: ${error.message}`;
  }
});

document.querySelector('#putData').addEventListener('click', async () => {
  try {
    const data = await api.put('/posts/1', {
      title: 'Updated Post',
      body: 'Updated Content',
      userId: 1
    });
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultEl.textContent = `Error: ${error.message}`;
  }
});