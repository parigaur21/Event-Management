document.addEventListener("DOMContentLoaded", () => {

/* ================= STORAGE ================= */
function getEvents() {
  return JSON.parse(localStorage.getItem("events")) || [];
}

function saveEvents(events) {
  localStorage.setItem("events", JSON.stringify(events));
}

// Enhanced sample events with beautiful images
function addSampleEvents() {
  const events = getEvents();
  if (events.length === 0) {
    const sampleEvents = [
      {
        id: 1,
        name: "✨ Tech Innovators Summit 2026",
        date: "2026-03-15",
        location: "San Francisco, CA",
        price: 299,
        capacity: 500,
        booked: 350,
        description: "Join the world's leading tech innovators for an unforgettable summit featuring keynote speeches from industry giants, hands-on workshops, and networking opportunities with fellow tech enthusiasts.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
        category: "Technology",
        featured: true
      },
      {
        id: 2,
        name: "🎵 Summer Beats Festival",
        date: "2026-07-20",
        location: "Miami, FL",
        price: 149,
        capacity: 1000,
        booked: 600,
        description: "Experience the ultimate summer music festival with top artists from around the world. Three days of non-stop music, amazing food, and unforgettable memories.",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600",
        category: "Music",
        featured: true
      },
      {
        id: 3,
        name: "🚀 Startup Founders Mixer",
        date: "2026-02-25",
        location: "New York, NY",
        price: 49,
        capacity: 200,
        booked: 150,
        description: "Connect with successful founders, angel investors, and venture capitalists in an intimate setting. Perfect for early-stage startups looking to make meaningful connections.",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600",
        category: "Business",
        featured: true
      },
      {
        id: 4,
        name: "🤖 AI & Future Tech Workshop",
        date: "2026-04-10",
        location: "Boston, MA",
        price: 199,
        capacity: 150,
        booked: 80,
        description: "Hands-on workshop covering the latest in AI, machine learning, and emerging technologies. Perfect for developers, data scientists, and tech enthusiasts.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
        category: "Technology",
        featured: false
      },
      {
        id: 5,
        name: "🧘 Wellness & Mindfulness Retreat",
        date: "2026-05-05",
        location: "Sedona, AZ",
        price: 399,
        capacity: 100,
        booked: 45,
        description: "Rejuvenate your mind, body, and soul in the beautiful red rocks of Sedona. Includes yoga sessions, meditation workshops, and healthy gourmet meals.",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600",
        category: "Wellness",
        featured: true
      },
      {
        id: 6,
        name: "🎨 Creative Design Conference",
        date: "2026-06-12",
        location: "Austin, TX",
        price: 249,
        capacity: 300,
        booked: 200,
        description: "A conference for designers, artists, and creative professionals. Learn from industry leaders, participate in workshops, and connect with fellow creatives.",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600",
        category: "Design",
        featured: false
      }
    ];
    saveEvents(sampleEvents);
  }
}
addSampleEvents();

/* ================= TOAST ================= */
function showToast(msg, type = 'success') {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.innerText = msg;
    toast.style.display = "block";
    toast.style.background = type === 'success' ? 'var(--gradient-1)' : 'var(--gradient-2)';
    setTimeout(() => toast.style.display = "none", 3000);
  }
}

/* ================= MODAL ================= */
function confirmAction(message, callback) {
  const modal = document.getElementById("modal");
  if (!modal) return;
  
  document.getElementById("modalMessage").innerText = message;
  modal.style.display = "flex";

  document.getElementById("confirmBtn").onclick = () => {
    modal.style.display = "none";
    callback();
  };

  document.getElementById("cancelBtn").onclick = () => {
    modal.style.display = "none";
  };
}

/* ================= DARK MODE ================= */
const toggle = document.getElementById("themeToggle");
if (toggle) {
  // Check for saved preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggle.innerText = "☀️";
  }

  toggle.onclick = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggle.innerText = isDark ? "☀️" : "🌙";
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };
}

/* ================= CREATE EVENT ================= */
const form = document.getElementById("eventForm");
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");

if (form) {
  // Initialize form elements
  const name = document.getElementById("name");
  const date = document.getElementById("date");
  const location = document.getElementById("location");
  const price = document.getElementById("price");
  const capacity = document.getElementById("capacity");
  const booked = document.getElementById("booked");
  const description = document.getElementById("description");
  const category = document.getElementById("category");

  // Set min date to today
  if (date) {
    const today = new Date().toISOString().split('T')[0];
    date.min = today;
  }

  if (imageInput) {
    imageInput.addEventListener("change", function() {
      const reader = new FileReader();
      reader.onload = e => {
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
        previewImage.classList.add('float');
      };
      if (this.files[0]) {
        reader.readAsDataURL(this.files[0]);
      }
    });
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const event = {
      id: Date.now(),
      name: name.value,
      date: date.value,
      location: location.value,
      price: Number(price.value) || 0,
      capacity: Number(capacity.value) || 0,
      booked: Number(booked.value) || 0,
      description: description.value,
      category: category ? category.value : 'Other',
      image: previewImage.src || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
      featured: false,
      createdAt: new Date().toISOString()
    };

    const events = getEvents();
    events.push(event);
    saveEvents(events);

    showToast("✨ Event Created Successfully!");
    form.reset();
    previewImage.style.display = "none";
    
    // Redirect to events page after 1.5 seconds
    setTimeout(() => {
      window.location.href = "events.html";
    }, 1500);
  });
}

/* ================= EVENTS PAGE ================= */
const container = document.getElementById("eventsContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const categoryFilter = document.getElementById("categoryFilter");

if (container) {
  let events = getEvents();
  render(events);

  function render(data) {
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = '<div class="no-events">🎉 No events yet. <a href="create.html">Create your first event!</a></div>';
      return;
    }

    data.forEach(ev => {
      const seatsLeft = ev.capacity - ev.booked;
      const availabilityClass = seatsLeft < 10 ? 'low-stock' : '';
      const availabilityText = seatsLeft === 0 ? 'Sold Out' : `${seatsLeft} seats left`;
      
      container.innerHTML += `
      <div class="card" data-category="${ev.category}">
        <img src="${ev.image}" class="card-img" alt="${ev.name}" loading="lazy">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="background: var(--gradient-1); padding: 5px 15px; border-radius: 50px; font-size: 12px;">${ev.category || 'Event'}</span>
          <span style="color: ${seatsLeft === 0 ? '#ef4444' : '#22c55e'}; font-weight: 600;">${availabilityText}</span>
        </div>
        <h3 style="font-size: 22px; margin-bottom: 10px;">${ev.name}</h3>
        <p style="margin: 5px 0;"><span style="opacity: 0.7;">📅</span> ${formatDate(ev.date)}</p>
        <p style="margin: 5px 0;"><span style="opacity: 0.7;">📍</span> ${ev.location}</p>
        <p style="margin: 15px 0 20px; font-size: 24px; font-weight: 700; background: var(--gradient-1); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">$${ev.price}</p>
        <div style="display: flex; gap: 10px;">
          <button onclick="viewDetails(${ev.id})" class="btn small-btn" style="flex: 1;">View Details</button>
          <button onclick="deleteEvent(${ev.id})" class="btn-outline small-btn" style="flex: 1;">Delete</button>
        </div>
      </div>
      `;
    });
  }

  window.viewDetails = id => {
    localStorage.setItem("viewId", id);
    window.location.href = "details.html";
  };

  window.deleteEvent = id => {
    confirmAction("Delete this event permanently?", () => {
      let events = getEvents().filter(e => e.id !== id);
      saveEvents(events);
      render(events);
      showToast("🗑️ Event Deleted Successfully");
    });
  };

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      const searchTerm = e.target.value.toLowerCase();
      const filtered = events.filter(ev =>
        ev.name.toLowerCase().includes(searchTerm) ||
        ev.location.toLowerCase().includes(searchTerm) ||
        ev.description.toLowerCase().includes(searchTerm) ||
        (ev.category && ev.category.toLowerCase().includes(searchTerm))
      );
      render(filtered);
    });
  }

  // Sort functionality
  if (sortSelect) {
    sortSelect.addEventListener("change", e => {
      let sorted = [...events];
      switch (e.target.value) {
        case "date":
          sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "price":
          sorted.sort((a, b) => a.price - b.price);
          break;
        case "name":
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "popular":
          sorted.sort((a, b) => b.booked - a.booked);
          break;
      }
      render(sorted);
    });
  }

  // Category filter
  if (categoryFilter) {
    categoryFilter.addEventListener("change", e => {
      const category = e.target.value;
      if (category === 'all') {
        render(events);
      } else {
        const filtered = events.filter(ev => ev.category === category);
        render(filtered);
      }
    });
  }
}

/* ================= DETAILS PAGE ================= */
const detailsContainer = document.getElementById("detailsContainer");

if (detailsContainer) {
  const id = localStorage.getItem("viewId");
  const event = getEvents().find(e => e.id == id);

  if (event) {
    const seatsLeft = event.capacity - event.booked;
    const availabilityStatus = seatsLeft > 0 
      ? `<span style="color: #22c55e;">✓ Available (${seatsLeft} seats left)</span>`
      : `<span style="color: #ef4444;">✗ Sold Out</span>`;

    const bookedPercentage = (event.booked / event.capacity * 100).toFixed(1);

    detailsContainer.innerHTML = `
    <div class="card" style="max-width: 900px; margin: 0 auto; padding: 40px;">
      <img src="${event.image}" class="card-img" style="height: 400px; object-fit: cover;" alt="${event.name}">
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0;">
        <span style="background: var(--gradient-1); padding: 8px 20px; border-radius: 50px; font-size: 14px;">${event.category || 'Event'}</span>
        <span style="font-size: 32px; font-weight: 700; background: var(--gradient-1); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">$${event.price}</span>
      </div>
      
      <h2 style="font-size: 42px; margin-bottom: 20px;">${event.name}</h2>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 20px;">
        <div>
          <p><span style="opacity: 0.7;">📅</span> <strong>Date:</strong></p>
          <p style="font-size: 18px;">${formatDate(event.date)}</p>
        </div>
        <div>
          <p><span style="opacity: 0.7;">📍</span> <strong>Location:</strong></p>
          <p style="font-size: 18px;">${event.location}</p>
        </div>
        <div>
          <p><span style="opacity: 0.7;">👥</span> <strong>Capacity:</strong></p>
          <p style="font-size: 18px;">${event.capacity} people</p>
        </div>
        <div>
          <p><span style="opacity: 0.7;">🎟️</span> <strong>Booked:</strong></p>
          <p style="font-size: 18px;">${event.booked} seats (${bookedPercentage}%)</p>
        </div>
      </div>
      
      <div style="margin: 30px 0;">
        <h3 style="font-size: 24px; margin-bottom: 15px;">About This Event</h3>
        <p style="opacity: 0.9; line-height: 1.8; font-size: 16px;">${event.description}</p>
      </div>
      
      <div style="background: rgba(255,255,255,0.03); padding: 30px; border-radius: 20px; margin: 30px 0;">
        <h3 style="font-size: 20px; margin-bottom: 15px;">Availability</h3>
        <div style="height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden;">
          <div style="width: ${bookedPercentage}%; height: 100%; background: var(--gradient-1);"></div>
        </div>
        <p style="margin-top: 15px; font-size: 18px; font-weight: 600;">${availabilityStatus}</p>
      </div>
      
      <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px;">
        <button onclick="bookEvent(${event.id})" class="btn" style="padding: 15px 50px; font-size: 18px;" ${seatsLeft === 0 ? 'disabled' : ''}>
          ${seatsLeft === 0 ? 'Sold Out' : '🎟️ Book Now'}
        </button>
        <a href="events.html" class="btn-outline" style="padding: 15px 30px;">← Back to Events</a>
      </div>
    </div>`;

    window.bookEvent = (id) => {
      const events = getEvents();
      const eventIndex = events.findIndex(e => e.id === id);
      if (eventIndex !== -1 && events[eventIndex].booked < events[eventIndex].capacity) {
        events[eventIndex].booked += 1;
        saveEvents(events);
        showToast("🎉 Ticket Booked Successfully!");
        setTimeout(() => window.location.reload(), 1500);
      }
    };
  } else {
    detailsContainer.innerHTML = `
    <div class="card" style="text-align: center; padding: 80px;">
      <h3 style="font-size: 32px; margin-bottom: 20px;">🔍 Event Not Found</h3>
      <p style="margin-bottom: 30px;">The event you're looking for doesn't exist or has been removed.</p>
      <a href="events.html" class="btn">Browse All Events</a>
    </div>`;
  }
}

/* ================= DASHBOARD ================= */
if (document.getElementById("totalEvents")) {
  const events = getEvents();
  const today = new Date();

  // Update stats with animations
  animateNumber("totalEvents", 0, events.length);
  animateNumber("upcoming", 0, events.filter(e => new Date(e.date) >= today).length);
  animateNumber("past", 0, events.filter(e => new Date(e.date) < today).length);
  
  const totalRevenue = events.reduce((sum, e) => sum + (e.price * e.booked), 0);
  animateNumber("totalRevenue", 0, totalRevenue, true);

  // Recent events list with categories
  const list = document.getElementById("dashboardList");
  if (list) {
    const recentEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
    
    if (recentEvents.length === 0) {
      list.innerHTML = '<p class="no-events">No events yet. <a href="create.html">Create your first event!</a></p>';
    } else {
      recentEvents.forEach(ev => {
        const bookedPercentage = (ev.booked / ev.capacity * 100).toFixed(1);
        list.innerHTML += `
        <div class="card" onclick="viewDetails(${ev.id})" style="cursor: pointer;">
          <img src="${ev.image}" class="card-img" style="height: 150px;" alt="${ev.name}">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="background: var(--gradient-1); padding: 3px 10px; border-radius: 50px; font-size: 11px;">${ev.category || 'Event'}</span>
            <span style="color: #22c55e;">${bookedPercentage}% booked</span>
          </div>
          <h4>${ev.name}</h4>
          <p style="font-size: 14px;">📅 ${formatDate(ev.date)}</p>
          <p style="font-size: 14px;">💰 $${ev.price}</p>
        </div>`;
      });
    }
  }

  // Category distribution
  const categoryStats = document.getElementById("categoryStats");
  if (categoryStats) {
    const categories = {};
    events.forEach(e => {
      categories[e.category] = (categories[e.category] || 0) + 1;
    });
    
    Object.entries(categories).forEach(([category, count]) => {
      categoryStats.innerHTML += `
        <div style="display: flex; justify-content: space-between; margin: 10px 0;">
          <span>${category}</span>
          <span style="font-weight: 600;">${count} events</span>
        </div>
      `;
    });
  }
}

/* ================= CALENDAR ================= */
const grid = document.getElementById("calendarGrid");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const monthYear = document.getElementById("monthYear");

if (grid) {
  let currentDate = new Date();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function renderCalendar() {
    grid.innerHTML = "";
    
    // Add weekday headers with gradient
    weekdays.forEach(day => {
      grid.innerHTML += `<div class="weekday">${day}</div>`;
    });

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    monthYear.innerText = currentDate.toLocaleString("default", { month: "long" }) + " " + year;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const events = getEvents();

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      grid.innerHTML += "<div></div>";
    }

    // Fill in the days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
      const dayEvents = events.filter(e => e.date === dateStr);
      const hasEvent = dayEvents.length > 0;

      let eventNames = '';
      if (hasEvent) {
        eventNames = dayEvents.map(e => e.name).join('\n');
      }

      grid.innerHTML += `
        <div class="day ${hasEvent ? 'event-day' : ''}" title="${eventNames}" onclick="showDayEvents('${dateStr}')">
          <strong>${d}</strong>
          ${hasEvent ? `<small style="display: block; font-size: 10px; margin-top: 5px;">${dayEvents.length} event(s)</small>` : ''}
        </div>
      `;
    }
  }

  window.showDayEvents = (date) => {
    const events = getEvents().filter(e => e.date === date);
    if (events.length > 0) {
      let message = `Events on ${formatDate(date)}:\n\n`;
      events.forEach(e => {
        message += `• ${e.name} - $${e.price}\n`;
      });
      alert(message);
    }
  };

  if (prevMonth) {
    prevMonth.onclick = () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    };
  }

  if (nextMonth) {
    nextMonth.onclick = () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    };
  }

  renderCalendar();
}

/* ================= FEATURED EVENTS ON HOMEPAGE ================= */
const featuredContainer = document.getElementById("featuredEvents");
if (featuredContainer) {
  const events = getEvents();
  const featured = events.filter(e => e.featured).slice(0, 3);
  
  featured.forEach(event => {
    featuredContainer.innerHTML += `
      <div class="card" onclick="window.location.href='details.html?id=${event.id}'" style="cursor: pointer;">
        <img src="${event.image}" class="card-img" alt="${event.name}">
        <span style="background: var(--gradient-2); padding: 5px 15px; border-radius: 50px; font-size: 12px; position: absolute; top: 20px; right: 20px;">Featured</span>
        <h3>${event.name}</h3>
        <p>📅 ${formatDate(event.date)}</p>
        <p>📍 ${event.location}</p>
        <p style="margin-top: 15px; font-size: 24px; font-weight: 700; background: var(--gradient-1); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">$${event.price}</p>
      </div>
    `;
  });
}

/* ================= HELPER FUNCTIONS ================= */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function animateNumber(elementId, start, end, isCurrency = false) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  let current = start;
  const increment = (end - start) / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.innerText = isCurrency ? '$' + Math.round(current).toLocaleString() : Math.round(current);
  }, 20);
}

// Make functions globally available
window.showToast = showToast;
window.confirmAction = confirmAction;
window.formatDate = formatDate;
window.viewDetails = (id) => {
  localStorage.setItem("viewId", id);
  window.location.href = "details.html";
};

});