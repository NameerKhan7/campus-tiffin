# Campus Tiffin

**Student:** Muhammad Nameer Khan | **Roll No:** 22i-1695 | **Section:** C
**Course:** CS4032 Web Programming, Assignment 02 (Fall 2026)

- GitHub: https://github.com/YOUR-USERNAME/campus-tiffin
- Deployment: https://YOUR-SITE-URL
- Final commit hash: `PASTE-HASH-HERE`

## Description
Campus Tiffin is a fictional meal-prep business for university students in Islamabad. Customers browse 13 meals,
bundles and sides, search and filter them, open a details page, build an order, fill a checkout form, review the
calculated total and see a confirmation. Everything is simulated (no payment, no real orders).

## Commands
```
npm install      # install dependencies
npm run dev      # development server
npm run build    # production build (creates dist/)
npm test         # runs: node --test
```

## Routes
| Route | Purpose |
|---|---|
| `/` | Home page with business info and delivery conditions |
| `/menu` | Browse, search, filter, sort, add to order |
| `/items/:id` | Item details (invalid id shows a helpful message) |
| `/cart` | Review and change the order |
| `/checkout` | Form, rule messages, calculated summary |
| `/confirmation` | Final confirmation of the simulated order |
| `*` | Not-found page |

## Features
Search + category + diet filter + sort working together; sticky order bar with delivery conditions;
cart with quantity changes; controlled checkout form with validation; three business rules; cart, form and last order saved in
localStorage; async mock loader with loading, error and retry; empty-dataset and no-match states.

## Business rules (see `src/rules/orderRules.js`)
1. **Availability:** max 5 of one item per order and never more than the stock left.
2. **Eligibility:** with "I have a nut allergy" ticked, items marked "Contains nuts" block the order.
3. **Pricing/fulfilment:** delivery needs Rs 800 minimum; fee Rs 150, free from Rs 2000; pickup has no minimum or fee; delivery only to G-11, H-11, H-12, I-8, F-10.

## Reproducing edge cases
Open the footer panel **Demo controls (for testing only)**, tick an option and press **Reload menu**.
- *Loading failure:* tick "Simulate loading failure", reload, open Menu. An error with a **Try again** button appears. Untick and press Try again.
- *Changed availability / restored selection:* add Chicken Karahi Box (x3), Daal Chawal (x3) and Aloo Keema to the order, tick "Change availability", reload. The order is corrected and a notice explains each change.
- *Empty menu:* tick "Simulate an empty menu", reload. The menu page shows the empty-dataset message.
- *No search matches:* search for `pizza`. A message and a **Clear all filters** button appear.
- *Invalid URL:* open `/items/zzz` or `/anything`.
- *Missing/long content:* "Mint Raita" has no description; the Chicken Weekly Bundle has a very long name; images show a labelled fallback.
- *Invalid form:* submit checkout empty, or with name `@@`, or notes over 100 characters. Other fields keep their values.

## Simulated operations and limitations
Orders, payment and stock are simulated; stock does not go down after an order. No real photos are included (emoji fallback is used).
The cart is saved per browser. Filters are kept while navigating but reset on a full page refresh.

## Concept map
| Concept | File | Component / function |
|---|---|---|
| Routing, URL params | `src/App.jsx`, `src/pages/ItemDetailsPage.jsx` | `Routes`, `useParams` |
| Shared state, functional updates | `src/App.jsx` | `addToCart`, `decreaseItem` |
| Props and callback props | `src/pages/MenuPage.jsx`, `src/components/ItemCard.jsx` | `onAdd`, `onFilterChange` |
| Controlled form | `src/pages/CheckoutPage.jsx` | `form`, `onFormChange` |
| Validation | `src/utils/validateForm.js` | `validateOrderForm` |
| Business rules | `src/rules/orderRules.js` | `checkQuantity`, `findNutConflicts`, `checkDelivery` |
| Derived values | `src/utils/cartHelpers.js` | `getCartLines`, `calculateSummary` |
| Search/filter/sort | `src/utils/filterItems.js` | `filterAndSort` |
| Async loading + errors | `src/services/menuLoader.js`, `src/App.jsx` | `loadMenu`, `fetchMenu` |
| useEffect + cleanup | `src/App.jsx` | loader effect (`ignore` flag), toast timer |
| localStorage | `src/utils/storage.js`, `src/App.jsx` | `readStorage`, `writeStorage` |
| Conditional rendering | `src/components/DataGate.jsx`, `EmptyState.jsx` | loading/error/empty |
| Automated test | `tests/orderRules.test.js` | `node --test` |
