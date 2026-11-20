function FilterBar({ filters, categories, onChange, onClear, shownCount, totalCount }) {
  return (
    <form className="filter-bar" role="search" aria-label="Search and filter the menu" onSubmit={(event) => event.preventDefault()}>
      <div className="field">
        <label htmlFor="search">Search the menu</label>
        <input id="search" type="search" value={filters.search} placeholder="Try biryani, daal or chai" onChange={(e) => onChange('search', e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" value={filters.category} onChange={(e) => onChange('category', e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="diet">Diet</label>
        <select id="diet" value={filters.diet} onChange={(e) => onChange('diet', e.target.value)}>
          <option value="All">All</option>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Contains chicken</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={filters.sort} onChange={(e) => onChange('sort', e.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="calories">Calories: low to high</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
      <div className="filter-footer">
        <p role="status">Showing {shownCount} of {totalCount} items</p>
        <button type="button" className="btn btn-secondary" onClick={onClear}>Clear filters</button>
      </div>
    </form>
  );
}

export default FilterBar;
