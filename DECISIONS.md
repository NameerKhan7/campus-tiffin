# Frontend decisions

> The "Problem" lines are written to match the three problems this site fixes. Replace the wording with what YOU observed
> on your reference website, and add your own screenshots.

## Decision 1: Keep filters in shared state (interaction / state)
| Field | Content |
|---|---|
| Problem | Navigation resets filters or selections: after opening an item and going back, the list returns to its default view. |
| Decision | Search, category, diet and sort live in `App.jsx` state, not inside the menu page, so they stay when the user visits a details page and returns. The menu also says when order items are hidden by a filter. |
| Alternative | Store filters in the URL (`/menu?diet=veg`) so they can be shared and bookmarked. |
| Reason | Students compare many items. Keeping their filters saves repeated work. State was the simpler option and fits what we learned. |
| Tradeoff | Filters are lost on a full refresh, and App holds more state. Hidden order items need extra feedback to avoid confusion. |
| Code location | `src/App.jsx` (`filters`, `updateFilter`), `src/pages/MenuPage.jsx` (`hiddenInOrder`) |
| Evidence | Screenshot: filter Vegetarian, open an item, press Back. Filter is still applied. |

## Decision 2: Show everything needed to compare on the card (information hierarchy)
| Field | Content |
|---|---|
| Problem | Listings leave out information needed to compare options (calories, diet, stock). |
| Decision | Each card shows name, price (largest), then tags for calories, diet, spice, nuts and stock with text labels. Details page repeats them and adds what is included. |
| Alternative | Show only name and price on the card and put the rest on the details page. |
| Reason | Students on a budget decide by price and diet. Seeing stock and nut warnings early avoids opening or ordering unsuitable items. |
| Tradeoff | Cards are busier, so tags are kept short and the price stays visually dominant. |
| Code location | `src/components/ItemCard.jsx`, `src/pages/ItemDetailsPage.jsx` |
| Evidence | Screenshot of the menu at 390 px and 1280 px showing the tags. |

## Decision 3: Show delivery conditions before checkout, with a sticky bar on mobile (information hierarchy / mobile layout)
| Field | Content |
|---|---|
| Problem | Charges or restrictions appear late (minimum order or delivery fee only visible at the end). |
| Decision | The menu shows the delivery rules at the top, and a sticky bottom bar shows item count, subtotal and a live hint ("Add Rs 120 more to reach the delivery minimum"). The same rule function feeds the bar, cart, checkout and test. |
| Alternative | Show fees only on the checkout page, as many sites do. |
| Reason | Customers can reach Rs 800 or free delivery while browsing instead of being blocked at the end. |
| Tradeoff | The bar covers some screen space on mobile, so the page has bottom padding and the bar only appears when the order is not empty. |
| Code location | `src/components/CartBar.jsx`, `getDeliveryHint` in `src/rules/orderRules.js` |
| Evidence | Screenshot: add one Daal Chawal, bar says Rs 500 more needed; add more and it changes. |
