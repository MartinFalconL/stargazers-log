fetch("events.json")
  .then((response) => response.json())
  .then((events) => {
    const list = document.querySelector("#starred");
    events.forEach((event) => {
      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    });
  });
document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('#starred');
  if (!list) return; // nothing to do if list not present

  // Show a loading state while we fetch
  const loadingItem = document.createElement('li');
  loadingItem.textContent = 'Loading…';
  loadingItem.className = 'loading';
  list.appendChild(loadingItem);

  fetch('events.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((events) => {
      // Clear loading state
      list.innerHTML = '';

      if (!Array.isArray(events) || events.length === 0) {
        const empty = document.createElement('li');
        empty.textContent = 'No starred repositories found.';
        empty.className = 'empty';
        list.appendChild(empty);
        return;
      }

      const frag = document.createDocumentFragment();
      events.forEach((event) => {
        const item = document.createElement('li');

        const name = event && event.name ? String(event.name) : 'Unknown repository';
        const starred = typeof (event && event.starred) !== 'undefined'
          ? String(event.starred)
          : '—';

        // If you have an accessible URL in the data (e.g., event.html_url),
        // prefer creating a link for keyboard users:
        // if (event && event.html_url) {
        //   const a = document.createElement('a');
        //   a.href = event.html_url;
        //   a.textContent = name;
        //   a.target = '_blank';
        //   a.rel = 'noopener noreferrer';
        //   item.appendChild(a);
        //   item.appendChild(document.createTextNode(` — starred ${starred}`));
        // } else {
        //   item.textContent = `${name} — starred ${starred}`;
        // }
        item.textContent = `${name} — starred ${starred}`;
        frag.appendChild(item);
      });
      list.appendChild(frag);
    })
    .catch((err) => {
      console.error('Failed to load starred events:', err);
      list.innerHTML = '';
      const errorItem = document.createElement('li');
      errorItem.textContent = "Couldn't load starred repositories. Please try again later.";
      errorItem.className = 'error';
      list.appendChild(errorItem);
    });
});
