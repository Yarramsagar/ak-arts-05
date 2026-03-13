const categories = [
  'All',
  'Blood Arts',
  'Sketch Arts',
  'Pencil Arts',
  'Paintings',
  'Portraits',
];

const CategoryFilter = ({ active, onSelect }) => (
  <div className="filter-row">
    {categories.map((cat) => (
      <button
        key={cat}
        className={active === cat ? 'chip active' : 'chip'}
        onClick={() => onSelect(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
