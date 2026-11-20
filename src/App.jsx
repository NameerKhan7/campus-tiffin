import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import DataGate from './components/DataGate.jsx';
import HomePage from './pages/HomePage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import ItemDetailsPage from './pages/ItemDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ConfirmationPage from './pages/ConfirmationPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { loadMenu } from './services/menuLoader.js';
import { readStorage, writeStorage } from './utils/storage.js';
import { getCartLines, calculateSummary } from './utils/cartHelpers.js';
import { checkQuantity } from './rules/orderRules.js';

const defaultFilters = { search: '', category: 'All', diet: 'All', sort: 'featured' };
const defaultForm = { nickname: '', method: 'pickup', area: '', slot: '', nutAllergy: false, notes: '' };

// Read the saved cart and keep only entries that look valid.
function loadSavedCart() {
  const saved = readStorage('ct_cart', []);
  if (!Array.isArray(saved)) return [];
  return saved.filter((entry) => entry && typeof entry.id === 'string' && Number.isInteger(entry.qty) && entry.qty > 0);
}

function App() {
  // ---- Shared state (lives here so every page sees the same data) ----
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [error, setError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);
  const [cart, setCart] = useState(loadSavedCart);
  const [filters, setFilters] = useState(defaultFilters); // kept here so filters survive page changes
  const [form, setForm] = useState(() => ({ ...defaultForm, ...readStorage('ct_form', {}) }));
  const [lastOrder, setLastOrder] = useState(() => readStorage('ct_last_order', null));
  const [cartNotices, setCartNotices] = useState([]);
  const [message, setMessage] = useState('');

  // ---- Load menu data with the async mock loader (re-runs when Retry is pressed) ----
  useEffect(() => {
    let ignore = false; // cleanup flag: ignore the result if the component is gone

    async function fetchMenu() {
      setStatus('loading');
      try {
        const data = await loadMenu();
        if (!ignore) {
          setItems(data);
          setStatus('ready');
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
          setStatus('error');
        }
      }
    }

    fetchMenu();
    return () => {
      ignore = true;
    };
  }, [reloadCount]);

  // ---- Check the cart against the current menu (handles sold out / removed / lower stock) ----
  useEffect(() => {
    if (status !== 'ready' || items.length === 0 || cart.length === 0) return;

    const notices = [];
    const fixedCart = [];

    cart.forEach((entry) => {
      const item = items.find((menuItem) => menuItem.id === entry.id);
      if (!item) {
        notices.push('An item in your saved order is no longer on the menu, so it was removed.');
      } else if (item.stock === 0) {
        notices.push(item.name + ' is sold out, so it was removed from your order.');
      } else if (!checkQuantity(entry.qty, item.stock).valid) {
        const newQty = Math.min(entry.qty, item.stock, 5);
        notices.push(item.name + ': only ' + newQty + ' can be ordered now, so the quantity was changed from ' + entry.qty + ' to ' + newQty + '.');
        fixedCart.push({ id: entry.id, qty: newQty });
      } else {
        fixedCart.push(entry);
      }
    });

    if (notices.length > 0) {
      setCart(fixedCart);
      setCartNotices((prev) => [...prev, ...notices]);
    }
  }, [items, cart, status]);

  // ---- Save to localStorage when things change ----
  useEffect(() => {
    writeStorage('ct_cart', cart);
  }, [cart]);

  useEffect(() => {
    writeStorage('ct_form', form);
  }, [form]);

  useEffect(() => {
    writeStorage('ct_last_order', lastOrder);
  }, [lastOrder]);

  // ---- Hide the small status message after 4 seconds (cleanup clears the timer) ----
  useEffect(() => {
    if (message === '') return;
    const timer = setTimeout(() => setMessage(''), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  // ---- Callbacks passed down to child components ----
  function addToCart(id) {
    const item = items.find((menuItem) => menuItem.id === id);
    if (!item) return;
    const existing = cart.find((entry) => entry.id === id);
    const newQty = existing ? existing.qty + 1 : 1;

    const result = checkQuantity(newQty, item.stock); // Rule 1
    if (!result.valid) {
      setMessage(item.name + ': ' + result.message);
      return;
    }

    if (existing) {
      setCart((prev) => prev.map((entry) => (entry.id === id ? { ...entry, qty: entry.qty + 1 } : entry)));
    } else {
      setCart((prev) => [...prev, { id, qty: 1 }]);
    }
    setMessage(item.name + ' added to your order.');
  }

  function decreaseItem(id) {
    setCart((prev) => prev.map((entry) => (entry.id === id ? { ...entry, qty: entry.qty - 1 } : entry)).filter((entry) => entry.qty > 0));
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((entry) => entry.id !== id));
  }

  function updateFilter(field, value) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  function updateForm(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function placeOrder(lines, summary) {
    const order = {
      id: 'CT-' + Date.now().toString().slice(-6),
      lines: lines.map((line) => ({ id: line.item.id, name: line.item.name, qty: line.qty, lineTotal: line.lineTotal })),
      summary,
      method: form.method,
      area: form.area,
      slot: form.slot,
      nickname: form.nickname.trim(),
      notes: form.notes.trim(),
      nutAllergy: form.nutAllergy,
    };
    setLastOrder(order);
    setCart([]);
    setForm((prev) => ({ ...prev, nickname: '', notes: '' }));
  }

  // ---- Derived values (calculated from state, never stored separately) ----
  const lines = getCartLines(cart, items);
  const summary = calculateSummary(lines, form.method);
  const gate = { status, error, onRetry: () => setReloadCount((count) => count + 1) };

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header cartCount={summary.itemCount} />
      <main id="main">
        <div className="toast-area" role="status">
          {message && <p className="toast">{message}</p>}
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/menu"
            element={
              <DataGate {...gate}>
                <MenuPage
                  items={items}
                  filters={filters}
                  onFilterChange={updateFilter}
                  onClearFilters={() => setFilters(defaultFilters)}
                  cart={cart}
                  summary={summary}
                  onAdd={addToCart}
                  notices={cartNotices}
                  onDismissNotices={() => setCartNotices([])}
                />
              </DataGate>
            }
          />
          <Route
            path="/items/:id"
            element={
              <DataGate {...gate}>
                <ItemDetailsPage items={items} cart={cart} onAdd={addToCart} onDecrease={decreaseItem} />
              </DataGate>
            }
          />
          <Route
            path="/cart"
            element={
              <DataGate {...gate}>
                <CartPage
                  lines={lines}
                  summary={summary}
                  form={form}
                  onAdd={addToCart}
                  onDecrease={decreaseItem}
                  onRemove={removeFromCart}
                  notices={cartNotices}
                  onDismissNotices={() => setCartNotices([])}
                />
              </DataGate>
            }
          />
          <Route
            path="/checkout"
            element={
              <DataGate {...gate}>
                <CheckoutPage lines={lines} summary={summary} form={form} onFormChange={updateForm} onPlaceOrder={placeOrder} />
              </DataGate>
            }
          />
          <Route path="/confirmation" element={<ConfirmationPage order={lastOrder} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer onReload={() => setReloadCount((count) => count + 1)} />
    </>
  );
}

export default App;
