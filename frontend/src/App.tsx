
import { useState } from 'react';
import {
  Search, Home, Bookmark, TrendingUp, Globe,
  Cpu, Briefcase, Trophy, Bell,
  ArrowUpRight, Clock, ChevronRight
} from 'lucide-react';
import './App.css';

const news = [
  {
    id: 1,
    category: 'TECHNOLOGY',
    title: 'Artificial Intelligence is transforming the future of work',
    description: 'Discover how AI is changing industries, creating opportunities and reshaping the global workforce.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    time: '2 hours ago',
    author: 'Alex Morgan'
  },
  {
    id: 2,
    category: 'BUSINESS',
    title: 'Global markets show strong growth as technology stocks rise',
    description: 'Investors are looking towards emerging technologies and new opportunities in global markets.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    time: '3 hours ago',
    author: 'Sarah Wilson'
  },
  {
    id: 3,
    category: 'SPORTS',
    title: 'The next generation of athletes is changing modern sports',
    description: 'Young athletes are bringing new energy, techniques and competition to international sports.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
    time: '4 hours ago',
    author: 'David Lee'
  },
  {
    id: 4,
    category: 'WORLD',
    title: 'Global innovation brings new opportunities for sustainable cities',
    description: 'Cities are adopting smarter infrastructure and sustainable solutions for the future.',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800',
    time: '5 hours ago',
    author: 'Emma Brown'
  }
];

const categories = [
  { name: 'All News', icon: Home },
  { name: 'Technology', icon: Cpu },
  { name: 'Business', icon: Briefcase },
  { name: 'Sports', icon: Trophy },
  { name: 'World', icon: Globe }
];

function App() {
  const [activeCategory, setActiveCategory] = useState('All News');
  const [search, setSearch] = useState('');
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [activePage, setActivePage] = useState('Home');

  const filteredNews = news.filter((item) => {
    const matchesCategory =
      activeCategory === 'All News' ||
      item.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesPage =
      activePage !== 'Bookmarks' || bookmarks.includes(item.id);

    return matchesCategory && matchesSearch && matchesPage;
  });

  const toggleBookmark = (id: number) => {
    setBookmarks((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">N</div>
          <span>News<span className="brand-highlight">Hub.</span></span>
        </div>

        <p className="menu-label">MENU</p>

        <button
          className={`nav-item ${activePage === 'Home' ? 'active' : ''}`}
          onClick={() => {
            setActivePage('Home');
            setActiveCategory('All News');
          }}
        >
          <Home size={19} /> Home
        </button>

        <button
          className={`nav-item ${activePage === 'Bookmarks' ? 'active' : ''}`}
          onClick={() => setActivePage('Bookmarks')}
        >
          <Bookmark size={19} /> Bookmarks
        </button>

        <div className="sidebar-divider" />

        <p className="menu-label">CATEGORIES</p>

        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.name}
              className={`nav-item ${activeCategory === category.name ? 'active' : ''}`}
              onClick={() => {
                setActivePage('Home');
                setActiveCategory(category.name);
              }}
            >
              <Icon size={19} />
              {category.name}
            </button>
          );
        })}

        <div className="sidebar-bottom">
          <div className="premium-card">
            <div className="premium-icon">✦</div>
            <h3>Go Premium</h3>
            <p>Enjoy an ad-free news experience.</p>
            <button onClick={() => alert('Premium subscription coming soon!')}>
              Explore Plans <ArrowUpRight size={15} />
            </button>
          </div>

          <p className="sidebar-footer">© 2026 NewsHub</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="date-text">FRIDAY, OCTOBER 30, 2026</p>
            <h2>Good afternoon, Reader 👋</h2>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <Search size={18} />
              <input
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="notification-button"
              onClick={() => alert('No new notifications')}
            >
              <Bell size={20} />
              <span />
            </button>

            <div className="avatar">R</div>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <span className="section-tag">YOUR DAILY NEWS SOURCE</span>
            <h1>
              Stay informed.
              <br />
              <span>Stay ahead.</span>
            </h1>
            <p>Explore the stories shaping our world today.</p>
          </div>

          <div className="welcome-decoration">N</div>
        </section>

        <section className="trending-strip">
          <div className="trending-label">
            <TrendingUp size={17} />
            TRENDING
          </div>

          <p>Artificial Intelligence continues to reshape the technology industry</p>
          <ChevronRight size={18} />
        </section>

        <section className="news-section">
          <div className="section-heading">
            <div>
              <span className="section-tag">DISCOVER</span>
              <h2>
                {activePage === 'Bookmarks'
                  ? 'Your Bookmarks'
                  : 'Latest Stories'}
              </h2>
            </div>

            <span className="article-count">
              {filteredNews.length} articles
            </span>
          </div>

          <div className="category-pills">
            {categories.map((category) => (
              <button
                key={category.name}
                className={
                  activeCategory === category.name
                    ? 'pill active-pill'
                    : 'pill'
                }
                onClick={() => {
                  setActivePage('Home');
                  setActiveCategory(category.name);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="news-grid">
            {filteredNews.map((item) => (
              <article className="news-card" key={item.id}>
                <div className="news-image">
                  <img src={item.image} alt={item.title} />

                  <span className="news-category">
                    {item.category}
                  </span>

                  <button
                    className={`bookmark-button ${
                      bookmarks.includes(item.id) ? 'saved' : ''
                    }`}
                    onClick={() => toggleBookmark(item.id)}
                    aria-label="Toggle bookmark"
                  >
                    <Bookmark
                      size={18}
                      fill={
                        bookmarks.includes(item.id)
                          ? 'currentColor'
                          : 'none'
                      }
                    />
                  </button>
                </div>

                <div className="news-info">
                  <div className="news-meta">
                    <span>{item.author}</span>
                    <span>
                      <Clock size={13} /> {item.time}
                    </span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <button
                    className="read-more"
                    onClick={() => alert('Full article integration coming soon!')}
                  >
                    Read Article <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="empty-state">
              <Search size={35} />
              <h3>No articles found</h3>
              <p>Try another search or category.</p>
            </div>
          )}
        </section>

        <footer className="main-footer">
          <span>NewsHub © 2026</span>
          <span>Stay curious. Stay informed.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
