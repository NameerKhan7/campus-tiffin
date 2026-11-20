# Campus Tiffin viva guide

Student: Muhammad Nameer Khan / 22i-1695 / C

1. App.jsx owns menu loading, cart, filters, form and last order. Callback props let child pages request updates. Derived values such as totals are calculated, not stored in a second state variable.
2. useState triggers rendering when state changes. Functional updates use the latest previous state when changing arrays or objects.
3. useEffect loads the mock menu and saves browser state. The loader cleanup sets an ignore flag so a stale async result is not applied. Toast cleanup clears its timer.
4. Routes chooses a page by URL; useParams reads the item id. Vercel rewrites direct URLs to index.html so React Router can resolve them.
5. Item ids are stable React keys. Array indexes would be unreliable after sorting and filtering.
6. Controlled inputs get values from state and update through callbacks. A failed submission keeps values and displays field-specific messages, aria-invalid and an error summary.
7. Plain functions in orderRules.js are reused by menu/cart/checkout and node:test. MAX_PER_ITEM is 5; delivery minimum is 800; delivery fee is 150; free delivery begins at 2000. Change one constant, then run npm test and update affected boundary expectations.
8. Availability reconciliation removes sold-out/missing products and caps saved quantities to current stock and the per-item limit. Notices explain corrections.
9. Eligibility: nutAllergy plus any hasNuts product blocks confirmation and names the conflicting products.
10. localStorage is browser-only persistence, not a backend. The storage helper catches malformed JSON and access failures; the form loader also checks stored field types. Filters survive SPA navigation but are deliberately not persisted across refresh.
11. Demonstrate: filter Vegetarian + Meals + price ascending; open Daal and return; add one Daal and read the Rs 500 delivery shortfall; trigger loading failure and retry; simulate stock changes; place a pickup order.
12. Limitations: simulated orders and payment, no stock decrement, placeholder illustrations, fictional nutrition, English/digit nickname validation, browser-local storage. Allergy handling is a classroom rule and does not model cross-contamination.

Practice changes: add a menu item; add a sort choice; change the delivery minimum; explain how checkDelivery makes Rs 799 invalid and Rs 800 valid; explain why a production backend must revalidate all rules.
