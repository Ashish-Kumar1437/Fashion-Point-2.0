import { useState, useEffect, useCallback, useRef } from 'react';
import './AsyncDropdown.scss';

const useDebounce = (value:any, delay:number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const AsyncDropdown = ({ data, fetchItems, minChars = 3, debounceDelay = 300, onSelect }:any) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef:any = useRef(null);
  const [skipOpen,setSkipOpen] = useState(false);;

  const debouncedQuery = useDebounce(query, debounceDelay);

  const performSearch = useCallback(async () => {
    if (debouncedQuery.length >= minChars && !skipOpen) {
      setLoading(true);
      if (data) {
        const filteredItems = data.filter((item:any) =>
          item.label.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setItems(filteredItems);
      } else if (fetchItems) {
        try {
          const fetchedItems = await fetchItems(debouncedQuery);
          setItems(fetchedItems);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      }
      setLoading(false);
      setDropdownOpen(true);
    } else {
      setSkipOpen(false);    
      setItems([]);
      setDropdownOpen(false);
    }
  }, [debouncedQuery, data, fetchItems, minChars]);

  useEffect(() => {
    performSearch();
  }, [debouncedQuery, performSearch]);

  const handleSelect = (item:any) => {
    setQuery(item.label);
    setSkipOpen(true);
    setDropdownOpen(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  const handleClickOutside = (event:any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="async-dropdown" ref={dropdownRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        onFocus={() => query.length >= minChars && setDropdownOpen(true)}
      />
      {loading && <div className="loading">Loading...</div>}
      {dropdownOpen && items.length > 0 && (
        <ul>
          {items.map((item:any, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
