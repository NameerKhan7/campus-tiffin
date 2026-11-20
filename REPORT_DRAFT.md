# Assignment 02 Report: Campus Tiffin

## 1. Student and project details
- Student: Muhammad Nameer Khan
- Roll number: 22i-1695 | Section: C
- Course: CS4032 Web Programming | Assignment 02 | Fall 2026
- Repository: https://github.com/NameerKhan7/campus-tiffin
- Production: https://campus-tiffin.vercel.app
- Final submission commit: recorded in the exported PDF and SUBMISSION_COMMIT.txt accompanying the submission archive. This avoids embedding a self-referential Git hash inside its own commit.
- Verification date: 20 November 2026 (Asia/Karachi).

## 2. Business profile
Campus Tiffin is a fictional meal-prep business for university students in Islamabad. It offers 13 products: seven meals, two weekly bundles, and four sides/drinks. The customer task is to compare meals, build an order, choose pickup or delivery, complete a validated form and receive a simulated confirmation. The business goal is completed orders. Pickup is from an H-11 kitchen; delivery covers G-11, H-11, H-12, I-8 and F-10.

## 3. Operating rules
| Rule | Exact condition | Disclosure and enforcement | Boundary |
|---|---|---|---|
| Availability | Maximum 5 of one item; never more than stock | Card/details labels, disabled add/increase controls, saved-order correction notices | Stock 3 allows 3, blocks 4; maximum allows 5, blocks 6 |
| Eligibility | Nut allergy selected blocks products marked Contains nuts | Card tag, checkbox hint and checkout warning naming conflicting products | Almond Halwa with allergy selected cannot confirm |
| Pricing/fulfilment | Delivery minimum Rs 800; fee Rs 150; free at Rs 2000; pickup no minimum or fee; approved areas only | Home/menu, live cart hint, summary and checkout validation | Rs 799 blocked; Rs 800 allowed; Rs 2000 free |

## 4. Reference-site investigation
Source: https://bundukhan.pk/menu, reviewed 20 November 2026 in Chrome at 1280 x 900 and 390 x 844. Delivery branch DHA Lahore was selected using the site's branch dialog. No real order was submitted. Findings are limited to the captured branch dialog and listing, not all branches, all pages or the entire checkout.

### Problem 1: Budget and dietary comparison requires manual scanning
Task: find a suitable meal and compare prices. The captured desktop listing exposes category selection and search, but no visible diet or price-sort control. Possible business consequence: customers may spend longer comparing choices or miss suitable products; this is a design inference, not a measured abandonment rate. Campus Tiffin combines search, category, diet and sort, and retains them across detail-page navigation. Evidence: evidence/reference-menu-desktop.png, evidence/filters-1280.png, evidence/filters-390.png.

### Problem 2: Important comparison facts are absent from the captured cards
Task: assess soup options before adding one. The visible reference cards provide an image, name, starting price and add action, without calorie, dietary or explicit nut-allergen tags. Possible consequence: extra investigation is needed before choosing. Campus Tiffin puts calories, diet, spice, nut warnings and stock on cards and repeats them in details. Evidence: evidence/reference-menu-desktop.png, evidence/menu-1280.png, evidence/allergy-block-390.png. Campus Tiffin's nutritional and allergen values are fictional data.

### Problem 3: Delivery cost cannot be determined from the initial views
Task: estimate the delivered total before checkout. The captured branch dialog and menu viewport do not state a delivery fee or minimum-order threshold. This does not establish that the reference never discloses them later. Possible consequence: customers cannot budget from these early views. Campus Tiffin shows its exact delivery conditions early and a running shortfall/free-delivery hint while browsing. Evidence: evidence/reference-delivery-dialog.png, evidence/delivery-hint-390.png, evidence/delivery-block-390.png.

## 5. Frontend decisions


Reference: https://bundukhan.pk/menu; reviewed 20 November 2026 in Chrome at 1280 px and 390 px, delivery branch DHA Lahore. Findings below describe the captured menu and branch-selection views, not every page or every branch of the reference site.

## Decision 1: Combined filters in shared state
| Field | Content |
|---|---|
| Observed problem | The captured listing offers category selection and search, but no visible diet selector or price-sort control. Comparing suitable meals on a budget requires scanning cards. |
| Decision | Combine search, category, diet and sort. Keep them in App state so opening an item and returning preserves the comparison. |
| Alternative | URL query parameters for shareable, refresh-persistent filters. |
| Reason | Students can narrow meals by both budget and diet without repeatedly rebuilding a selection. |
| Tradeoff | Filters survive route navigation but reset on full refresh; App owns more state. |
| Code | src/App.jsx; src/components/FilterBar.jsx; src/utils/filterItems.js |
| Evidence | reference-menu-desktop.png; filters-1280.png; filters-390.png; browser-results.json |

## Decision 2: Comparison information on every card
| Field | Content |
|---|---|
| Observed problem | The captured soup cards show image, name, starting price and add action, with no visible calorie, dietary or explicit nut-allergen tags. |
| Decision | Show price, calories, diet, spice, nut warnings and stock as text labels on each Campus Tiffin card. Repeat facts in details. |
| Alternative | Put nutritional and availability facts only on item details. |
| Reason | Early comparison reduces repeated detail visits; a nut conflict is also enforced at checkout. |
| Tradeoff | Cards are taller. Nutrition and allergy values are fictional demo data, not verified restaurant data. |
| Code | src/components/ItemCard.jsx; src/pages/ItemDetailsPage.jsx; src/rules/orderRules.js |
| Evidence | reference-menu-desktop.png; menu-1280.png; menu-390.png; allergy-block-390.png |

## Decision 3: Delivery conditions before checkout
| Field | Content |
|---|---|
| Observed problem | Neither the captured initial branch-selection dialog nor the captured menu viewport states a delivery fee or minimum-order threshold. The cost cannot be calculated from those views. |
| Decision | State the Rs 800 delivery minimum, Rs 150 fee and Rs 2000 free-delivery threshold on home/menu. A fixed order bar shows the current subtotal and remaining amount. |
| Alternative | Reveal all fulfilment conditions at checkout. |
| Reason | A customer can adjust an order before reaching a checkout block. |
| Tradeoff | The fixed bar consumes mobile space. Extra footer clearance keeps lower controls reachable. |
| Code | src/components/CartBar.jsx; src/rules/orderRules.js; src/styles/global.css |
| Evidence | reference-delivery-dialog.png; delivery-hint-390.png; delivery-block-390.png |


## 6. Implementation and evidence
React 18 components are routed with React Router. App owns shared state and passes data and callbacks to pages. Cart lines, fees and totals are derived by pure helpers. Form fields are controlled; validation preserves input values and presents specific errors. useEffect handles async loading, storage and toast cleanup. A stale loader response is ignored after cleanup. localStorage access is guarded and saved form types are normalized.

| Concept | Code |
|---|---|
| Routing and URL parameters | src/App.jsx; src/pages/ItemDetailsPage.jsx |
| Shared state and callbacks | src/App.jsx; src/components/ItemCard.jsx |
| Search/filter/sort | src/utils/filterItems.js; src/components/FilterBar.jsx |
| Controlled inputs and validation | src/pages/CheckoutPage.jsx; src/utils/validateForm.js |
| Pure business rules | src/rules/orderRules.js |
| Derived totals | src/utils/cartHelpers.js |
| Async loading and cleanup | src/services/menuLoader.js; loader effect in src/App.jsx |
| Persistence | src/utils/storage.js; form and cart effects in src/App.jsx |
| Conditional states | src/components/DataGate.jsx; EmptyState.jsx |

Screenshots are provided at both required widths for home, menu, combined filters, details, cart, checkout errors, valid checkout, confirmation, loading failure, no matches, empty dataset, stock reconciliation, allergy conflict, invalid routes and content fallbacks. The PDF presents selected readable excerpts; full screenshots remain in evidence/.

## 7. Verification
- npm test: 13 passed, 0 failed, using node:test and the same functions imported by the app.
- npm run build: successful Vite production build.
- Chrome automation: 36 main checks plus 6 extra checks, all passed, at 1280 px and 390 px. The main run recorded zero uncaught page errors. Main screenshot checks found no document-level horizontal overflow.
- Public production: all seven requested routes returned HTTP 200 and the application. Unknown paths intentionally return the app's not-found view through the SPA rewrite. Direct /items/m01 refresh rendered Chicken Karahi Box.

| Case | Action | Observed |
|---|---|---|
| Loading failure | Enable failure; reload; disable; Try again | Error visible; retry restores 13 cards |
| Changed availability | Karahi x3, Daal x3, Keema; enable changes | Karahi removed, Daal reduced to 1, Keema removed; notices explain |
| Empty results | Search pizza | No matches and clear-filters action |
| Empty dataset | Enable empty menu and reload | Distinct empty-menu message |
| Invalid item | Open /items/zzz | Helpful not-found item state |
| Invalid form | Submit empty checkout | Specific errors; invalid inputs exposed via aria-invalid |
| Delivery boundaries | Test pure checkDelivery at 799, 800, 2000 | 799 blocked; 800 allowed; 2000 free |
| Browser delivery | Submit Rs 900 order to H-11 | Rs 150 fee; Rs 1050 total; confirmation |
| Below minimum | Submit one Rs 300 Daal with delivery | Stays on checkout; asks for Rs 500 more |
| Nut allergy | Add Almond Halwa and select allergy | Warning names item; confirmation blocked |
| Quantity | Raise Daal to 5 | Add action disabled for sixth |
| Persistence | Refresh cart and confirmation | Cart quantity and confirmation retained |
| Malformed saved form | Store wrong field types and refresh | Safe default values restored, no crash |
| Keyboard | Tab from page | Focus reaches an interactive control; visible focus style present in CSS |
| Content fallbacks | Open Mint Raita and long bundle title | Missing-description message; long name wraps |

Improvement verification: (1) combine diet/category/search/sort, open Daal, return: selection remains; (2) menu tags and nut warning make comparison and conflict explicit; (3) Rs 300 cart displays Rs 500 shortfall before checkout, then delivery is blocked consistently. Exact Rs 799/800 boundaries are unit-tested because the menu's fixed item prices do not form Rs 799.

Fixes from verification: rejected unsupported saved fulfilment methods, areas and slots; normalized malformed saved form fields; replaced a hardcoded reconciliation maximum with MAX_PER_ITEM; added mobile footer clearance after the fixed order bar obstructed Reload menu.

## 8. Delivery and limitations
Git history preserves the supplied baseline, then records actual fixes and evidence/documentation work. Production was deployed using the Vercel CLI. Automatic GitHub deployment linking was rejected because the Vercel account needs a GitHub Login Connection; the current public deployment works. Future updates can deploy through the authenticated CLI.

The app simulates orders and payment. Stock does not decrease after confirmation. Illustrations are emoji fallbacks, not product photos. Nutrition/allergy data is fictional; the allergy rule does not model cross-contamination. Cart, form and last order are browser-local. Filters reset on a full refresh. Nicknames accept English letters, numbers and spaces. Keyboard verification was a focus smoke check, not a full assistive-technology audit. No performance or sales uplift was measured. Student preparation for the viva remains necessary; VIVA_GUIDE.md explains the concepts and suggested changes.
