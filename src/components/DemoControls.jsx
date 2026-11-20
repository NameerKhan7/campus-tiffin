import { useState } from 'react';
import { readStorage, writeStorage } from '../utils/storage.js';

// Labelled demonstration controls for the edge-case checks (loading failure, changed availability, empty menu).
function DemoControls({ onReload }) {
  const [flags, setFlags] = useState({
    ct_demo_fail: readStorage('ct_demo_fail', false),
    ct_demo_lowstock: readStorage('ct_demo_lowstock', false),
    ct_demo_empty: readStorage('ct_demo_empty', false),
  });

  function toggle(key) {
    const newValue = !flags[key];
    writeStorage(key, newValue);
    setFlags((prev) => ({ ...prev, [key]: newValue }));
  }

  return (
    <details className="demo">
      <summary>Demo controls (for testing only)</summary>
      <p>Tick a box, then press "Reload menu" to see how the app behaves.</p>
      <div className="demo-options">
        <label>
          <input type="checkbox" checked={flags.ct_demo_fail} onChange={() => toggle('ct_demo_fail')} />
          Simulate loading failure
        </label>
        <label>
          <input type="checkbox" checked={flags.ct_demo_lowstock} onChange={() => toggle('ct_demo_lowstock')} />
          Change availability (Karahi sold out, Daal Chawal 1 left, Keema removed)
        </label>
        <label>
          <input type="checkbox" checked={flags.ct_demo_empty} onChange={() => toggle('ct_demo_empty')} />
          Simulate an empty menu
        </label>
      </div>
      <button type="button" className="btn btn-secondary" onClick={onReload}>Reload menu</button>
    </details>
  );
}

export default DemoControls;
