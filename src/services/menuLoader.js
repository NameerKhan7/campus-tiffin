import { menuItems } from '../data/menu.js';
import { readStorage } from '../utils/storage.js';

// Mock "server". It waits a little, then either returns the menu or fails.
// The demo flags are switched on/off from the Demo controls panel in the footer.
export function loadMenu() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (readStorage('ct_demo_fail', false)) {
        reject(new Error('The menu could not be loaded (simulated failure).'));
        return;
      }
      if (readStorage('ct_demo_empty', false)) {
        resolve([]);
        return;
      }
      let data = menuItems.map((item) => ({ ...item }));
      if (readStorage('ct_demo_lowstock', false)) {
        // Changed availability: m01 sold out, m02 only 1 left, m03 removed.
        data = data
          .filter((item) => item.id !== 'm03')
          .map((item) => {
            if (item.id === 'm01') return { ...item, stock: 0 };
            if (item.id === 'm02') return { ...item, stock: 1 };
            return item;
          });
      }
      resolve(data);
    }, 800);
  });
}
