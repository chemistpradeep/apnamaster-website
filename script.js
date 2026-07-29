/* ==========================================================================
   APNAMASTER (apnamaster.in) - JAVASCRIPT LOGIC
   ========================================================================== */

/* 1. DATA STRUCTURES */
const coursesData = [
  {
    class: '6',
    title: 'Class 6th Foundation Program',
    board: 'CBSE / State Board Curriculum',
    features: ['Maths: Numbers, Geometry basics', 'Science: Basic Physical & Life Concepts', 'Weekly activity worksheets', 'Interactive doubt resolution']
  },
  {
    class: '7',
    title: 'Class 7th Advanced Foundation',
    board: 'CBSE / State Board Curriculum',
    features: ['Maths: Algebra & Fractions focus', 'Science: Experimental Physics & Chemistry', 'Regular chapter quizzes', 'Personalized academic feedback']
  },
  {
    class: '8',
    title: 'Class 8th Pre-Board Masterclass',
    board: 'CBSE / State Board Curriculum',
    features: ['Maths: Linear Equations, Mensuration', 'Science: Detailed Physics & Cell Biology', 'NTSE / Foundation exam orientation', 'Small batch size guaranteed']
  },
  {
    class: '9',
    title: 'Class 9th Academic Excellence',
    board: 'CBSE / State Board Curriculum',
    features: ['Maths: Coordinate Geometry, Polynomials', 'Science: Motion, Atoms & Molecules', 'Rigorous numerical problem solving', 'Monthly full-length tests']
  },
  {
    class: '10',
    title: 'Class 10th Board Booster Series',
    board: 'CBSE / State Board Curriculum',
    features: ['Maths: Complete NCERT + Exemplar Practice', 'Science: Physics Numericals & Biology Diagrams', '10+ Board Mock Test Papers', 'Dedicated Revision & Doubt Workshops']
  }
];

const blogData = [
  {
    id: 1,
    title: 'Top 5 Study Strategies for Class 10 Board Maths Preparation',
    date: 'Oct 24, 2026',
    category: 'Study Tips',
    snippet: 'Master step-wise writing, NCERT exemplar problems, and time management strategies for your upcoming Mathematics board exams.'
  },
  {
    id: 2,
    title: 'CBSE Science Syllabus Updates & Chapter Weights Announced',
    date: 'Oct 20, 2026',
    category: 'Syllabus Updates',
    snippet: 'Check the revised weightage breakdown for Physics, Chemistry, and Biology sections for secondary standard assessments.'
  },
  {
    id: 3,
    title: 'How to Solve Physics Numericals Without Fear: Class 9th & 10th Guide',
    date: 'Oct 15, 2026',
    category: 'Study Tips',
    snippet: 'A step-by-step breakdown method for understanding formulas, units, and vector direction calculations easily.'
  },
  {
    id: 4,
    title: 'Mid-Term Board Mock Examinations Schedule Released',
    date: 'Oct 10, 2026',
    category: 'Exam News',
    snippet: 'ApnaMaster announces dates for offline diagnostic mock exams for all Class 9 and 10 registered batches.'
  }
];

/* 2. MOBILE MENU */
document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Page Specific Inits
  if (document.getElementById('coursesGrid')) {
    renderCourses('all');
  }

  if (document.getElementById('blogGrid')) {
    renderBlog(blogData);
  }

  if (document.getElementById('homeNewsPreview')) {
    renderHomeNewsPreview();
  }
});

/* 3. COURSE RENDERING & FILTERING */
function renderCourses(filter = 'all') {
  const container = document.getElementById('coursesGrid');
  if (!container) return;
  container.innerHTML = '';

  const filtered = filter === 'all' ? coursesData : coursesData.filter(c => c.class === filter);

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div class="course-header">
        <span class="badge badge-primary">Class ${item.class}th</span>
        <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">${item.board}</span>
      </div>
      <div class="course-body">
        <h3>${item.title}</h3>
        <ul class="course-features">
          ${item.features.map(f => `<li><span>✓</span> ${f}</li>`).join('')}
        </ul>
        <div class="course-footer">
          <button class="btn btn-accent" style="width: 100%;" onclick="openEnrollModal('${item.title}')">
            Enroll / Inquire for Class ${item.class}th
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterCourses(classVal, btnElement) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderCourses(classVal);
}

/* 4. BLOG / NEWS RENDERING & SEARCH */
let activeCategory = 'all';

function renderBlog(articles) {
  const container = document.getElementById('blogGrid');
  if (!container) return;
  container.innerHTML = '';

  if (articles.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No updates found matching your filter criteria.</p>`;
    return;
  }

  articles.forEach(item => {
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.innerHTML = `
      <div class="blog-meta">
        <span class="badge badge-accent">${item.category}</span>
        <span>${item.date}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.snippet}</p>
      <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick="alert('Full article content coming soon!')">Read More →</button>
    `;
    container.appendChild(card);
  });
}

function renderHomeNewsPreview() {
  const container = document.getElementById('homeNewsPreview');
  if (!container) return;
  container.innerHTML = '';

  blogData.slice(0, 3).forEach(item => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <div class="blog-meta">
        <span class="badge badge-accent">${item.category}</span>
        <span>${item.date}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.snippet}</p>
    `;
    container.appendChild(card);
  });
}

function filterBlog(category, btnElement) {
  activeCategory = category;
  document.querySelectorAll('.filter-bar .filter-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  applyBlogFilters();
}

function searchBlog() {
  applyBlogFilters();
}

function applyBlogFilters() {
  const searchInput = document.getElementById('blogSearchInput');
  const query = searchInput ? searchInput.value.toLowerCase() : '';

  const filtered = blogData.filter(item => {
    const matchesCategory = (activeCategory === 'all' || item.category === activeCategory);
    const matchesSearch = item.title.toLowerCase().includes(query) || item.snippet.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  renderBlog(filtered);
}

/* 5. MODALS & INQUIRIES */
function openEnrollModal(courseName = 'General Inquiry') {
  const modal = document.getElementById('inquiryModal');
  const input = document.getElementById('modalCourseInput');
  if (input) input.value = courseName;
  if (modal) modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('inquiryModal');
  if (modal) modal.classList.remove('active');
}

function handleInquirySubmit(e) {
  e.preventDefault();
  alert('Thank you for contacting ApnaMaster! Our counseling team will reach out to your phone number shortly.');
  e.target.reset();
}

function handleModalSubmit(e) {
  e.preventDefault();
  alert('Your inquiry for ' + (document.getElementById('modalCourseInput')?.value || 'the course') + ' has been received! We will call you soon.');
  closeModal();
  e.target.reset();
}
