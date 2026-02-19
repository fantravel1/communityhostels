/* =====================================================
   COMMUNITYHOSTELS — MAIN JAVASCRIPT
   Lightweight, performant, no dependencies
   ===================================================== */

(function () {
    'use strict';

    /* ===================== HEADER SCROLL EFFECT ===================== */
    const header = document.getElementById('site-header');

    function handleHeaderScroll() {
        if (!header) return;
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    /* ===================== MOBILE MENU TOGGLE ===================== */
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function () {
            const isActive = mobileMenu.classList.contains('active');

            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', !isActive);
            mobileMenu.setAttribute('aria-hidden', isActive);

            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? '' : 'hidden';
        });

        // Close menu when clicking a link
        var mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }

    /* ===================== SCROLL REVEAL ANIMATIONS ===================== */
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -60px 0px',
            }
        );

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* ===================== SCORE BAR ANIMATIONS ===================== */
    var scoreFills = document.querySelectorAll('.score-fill');

    if ('IntersectionObserver' in window && scoreFills.length > 0) {
        var scoreObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var score = entry.target.getAttribute('data-score');
                        if (score) {
                            entry.target.style.width = score + '%';
                        }
                        scoreObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        scoreFills.forEach(function (el) {
            scoreObserver.observe(el);
        });
    }

    /* ===================== SMOOTH SCROLL FOR ANCHOR LINKS ===================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var headerHeight = header ? header.offsetHeight : 0;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });

    /* ===================== HIDE SCROLL INDICATOR ON SCROLL ===================== */
    var scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        var scrollHideHandler = function () {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s ease';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        };
        window.addEventListener('scroll', scrollHideHandler, { passive: true });
    }

    /* ===================== CITY SEARCH FILTERING ===================== */
    var citySearchInput = document.getElementById('city-search');
    var citiesGrid = document.getElementById('cities-grid');

    if (citySearchInput && citiesGrid) {
        var cityCards = citiesGrid.querySelectorAll('.city-card');

        citySearchInput.addEventListener('input', function () {
            var searchTerm = this.value.toLowerCase().trim();

            cityCards.forEach(function (card) {
                var cityName = card.querySelector('.city-card-name');
                var cityRegion = card.querySelector('.city-card-region');
                var tagline = card.querySelector('.city-card-tagline');

                var text = '';
                if (cityName) text += cityName.textContent.toLowerCase();
                if (cityRegion) text += ' ' + cityRegion.textContent.toLowerCase();
                if (tagline) text += ' ' + tagline.textContent.toLowerCase();

                if (searchTerm === '' || text.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    /* ===================== HOSTEL SEARCH & FILTERING ===================== */
    var hostelSearchInput = document.getElementById('hostel-search');
    var hostelVibeFilter = document.getElementById('hostel-vibe-filter');
    hostelsGrid = document.getElementById('hostels-grid');

    if (hostelsGrid) {
        var hostelCards = hostelsGrid.querySelectorAll('.hostel-card');

        var vibeKeywords = {
            'social': ['Social', 'Community', 'Music', 'Dance', 'Food', 'Social Impact'],
            'quiet': ['Quiet', 'Zen', 'Spiritual', 'Mindful'],
            'creative': ['Art', 'Creative', 'Design', 'Craft', 'Music'],
            'educational': ['Educational', 'Learning', 'Spiritual', 'Fair Trade'],
            'sustainable': ['Eco', 'Sustainable', 'Fair Trade', 'Social Enterprise']
        };

        function updateHostelDisplay() {
            var searchTerm = hostelSearchInput ? hostelSearchInput.value.toLowerCase().trim() : '';
            var selectedVibe = hostelVibeFilter ? hostelVibeFilter.value : '';

            hostelCards.forEach(function (card) {
                var hostelTitle = card.querySelector('.hostel-card-body h3');
                var hostelLocation = card.querySelector('.hostel-location');
                var hostelDescription = card.querySelector('.hostel-description');
                var tags = card.querySelectorAll('.tag');
                var cardTags = Array.from(tags).map(function (tag) {
                    return tag.textContent.trim();
                });

                // Build searchable text
                var text = '';
                if (hostelTitle) text += hostelTitle.textContent.toLowerCase();
                if (hostelLocation) text += ' ' + hostelLocation.textContent.toLowerCase();
                if (hostelDescription) text += ' ' + hostelDescription.textContent.toLowerCase();
                cardTags.forEach(function (tag) {
                    text += ' ' + tag.toLowerCase();
                });

                // Check search match
                var searchMatches = searchTerm === '' || text.includes(searchTerm);

                // Check vibe filter match
                var vibeMatches = true;
                if (selectedVibe !== '') {
                    var keywords = vibeKeywords[selectedVibe] || [];
                    vibeMatches = cardTags.some(function (tag) {
                        return keywords.some(function (keyword) {
                            return tag.toLowerCase().includes(keyword.toLowerCase());
                        });
                    });
                }

                // Show card only if both search and vibe match
                if (searchMatches && vibeMatches) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        }

        if (hostelSearchInput) {
            hostelSearchInput.addEventListener('input', updateHostelDisplay);
        }

        if (hostelVibeFilter) {
            hostelVibeFilter.addEventListener('change', updateHostelDisplay);
        }
    }

    /* ===================== NEWSLETTER FORM HANDLING ===================== */
    var forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            // If form action is coming-soon.html, let it redirect naturally
            var action = form.getAttribute('action');
            if (action === 'coming-soon.html') return;

            // Otherwise prevent default and show feedback
            e.preventDefault();
            var emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                var btn = form.querySelector('button[type="submit"]');
                if (btn) {
                    var originalText = btn.textContent;
                    btn.textContent = 'Thank you!';
                    btn.style.background = '#2d8a4e';
                    btn.disabled = true;

                    setTimeout(function () {
                        btn.textContent = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                        emailInput.value = '';
                    }, 3000);
                }
            }
        });
    });

    /* ===================== HOSTEL REVIEWS TOGGLE ===================== */
    var toggleButtons = document.querySelectorAll('.toggle-reviews-btn');

    toggleButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var reviewsSection = btn.closest('.hostel-reviews-section');
            if (!reviewsSection) return;

            var expandedReviews = reviewsSection.querySelector('.reviews-expanded');
            if (!expandedReviews) return;

            var isExpanded = btn.classList.contains('expanded');

            if (!isExpanded) {
                expandedReviews.classList.remove('hidden');
                btn.classList.add('expanded');
                btn.setAttribute('aria-expanded', 'true');
            } else {
                expandedReviews.classList.add('hidden');
                btn.classList.remove('expanded');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    /* ===================== BOOKING MODAL ===================== */
    // Create booking modal if it doesn't exist
    if (!document.getElementById('booking-modal')) {
        var bookingModal = document.createElement('div');
        bookingModal.id = 'booking-modal';
        bookingModal.className = 'booking-modal hidden';
        bookingModal.innerHTML = '<div class="booking-modal-content">' +
            '<button class="modal-close-btn" aria-label="Close booking modal">×</button>' +
            '<div class="modal-body">' +
            '<h2>Book Your Stay</h2>' +
            '<p id="modal-hostel-info"></p>' +
            '<form id="booking-form">' +
            '<div class="form-group">' +
            '<label for="check-in">Check-in Date:</label>' +
            '<input type="date" id="check-in" name="checkIn" required>' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="check-out">Check-out Date:</label>' +
            '<input type="date" id="check-out" name="checkOut" required>' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="guests">Number of Guests:</label>' +
            '<input type="number" id="guests" name="guests" min="1" max="6" value="1" required>' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="booking-email">Email:</label>' +
            '<input type="email" id="booking-email" name="email" placeholder="your@email.com" required>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary" style="width: 100%;">Continue to Booking</button>' +
            '</form>' +
            '</div>' +
            '</div>';

        document.body.appendChild(bookingModal);
    }

    // Booking modal functionality
    var bookingModal = document.getElementById('booking-modal');
    var bookNowButtons = document.querySelectorAll('.book-now-btn');
    var closeModalBtn = document.querySelector('.modal-close-btn');
    var bookingForm = document.getElementById('booking-form');

    bookNowButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var hostelName = btn.getAttribute('data-hostel');
            var city = btn.getAttribute('data-city');

            var infoText = 'Booking ' + hostelName + ' in ' + city;
            document.getElementById('modal-hostel-info').textContent = infoText;

            // Set today as minimum check-in date
            var today = new Date().toISOString().split('T')[0];
            document.getElementById('check-in').min = today;
            document.getElementById('check-out').min = today;

            bookingModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function () {
            bookingModal.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    // Close modal when clicking outside
    bookingModal.addEventListener('click', function (e) {
        if (e.target === bookingModal) {
            bookingModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // Handle booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var checkIn = document.getElementById('check-in').value;
            var checkOut = document.getElementById('check-out').value;
            var guests = document.getElementById('guests').value;
            var email = document.getElementById('booking-email').value;
            var hostelInfo = document.getElementById('modal-hostel-info').textContent;

            if (new Date(checkOut) <= new Date(checkIn)) {
                alert('Check-out date must be after check-in date');
                return;
            }

            // Simulate booking submission
            var submitBtn = bookingForm.querySelector('button[type="submit"]');
            var originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.textContent = 'Booking Confirmed!';
                submitBtn.style.background = '#2d8a4e';

                setTimeout(function () {
                    alert('Thank you! A confirmation email has been sent to ' + email + '.\n\n' +
                          hostelInfo + '\nGuests: ' + guests + '\nCheck-in: ' + checkIn + '\nCheck-out: ' + checkOut);

                    // Reset form
                    bookingForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;

                    // Close modal
                    bookingModal.classList.add('hidden');
                    document.body.style.overflow = '';
                }, 1000);
            }, 1500);
        });
    }

    // Keyboard shortcut to close modal (Escape key)
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !bookingModal.classList.contains('hidden')) {
            bookingModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    /* ===================== INTERACTIVE MAP ===================== */
    var mapEl = document.getElementById('hostel-map');

    if (mapEl && typeof L !== 'undefined') {
        var map = L.map('hostel-map', {
            center: [20, 10],
            zoom: 2,
            minZoom: 2,
            maxZoom: 15,
            scrollWheelZoom: false,
            zoomControl: true
        });

        // Use OpenStreetMap tiles (free, no API key)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Enable scroll zoom only after clicking the map
        map.once('click', function () {
            map.scrollWheelZoom.enable();
        });

        // Custom marker icons by tier
        function createMarkerIcon(tier) {
            var colors = {
                'tier-a': '#E05A2B',
                'tier-b': '#2d8a4e',
                'tier-c': '#3b82f6'
            };
            var color = colors[tier] || '#E05A2B';

            return L.divIcon({
                className: 'custom-map-marker',
                html: '<div style="background:' + color + ';width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);position:relative;"><div style="width:10px;height:10px;background:white;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"></div></div>',
                iconSize: [28, 28],
                iconAnchor: [14, 28],
                popupAnchor: [0, -30]
            });
        }

        // All 30 hostels with coordinates
        var hostels = [
            { name: 'Casa Amiga', city: 'Oaxaca, Mexico', lat: 17.0732, lng: -96.7266, tier: 'tier-a', rating: '4.8', reviews: '385', region: 'americas', img: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=400&h=200&fit=crop&q=70', desc: 'Family-run hostel with cooking classes, mezcal tasting, and indigenous art workshops.' },
            { name: 'Tea & Silk Lodge', city: 'Chengdu, China', lat: 30.5728, lng: 104.0668, tier: 'tier-a', rating: '4.9', reviews: '367', region: 'asia', img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=200&fit=crop&q=70', desc: 'Traditional courtyard hostel with tea ceremonies and calligraphy workshops.' },
            { name: 'Mesa Hostel', city: 'Joshua Tree, USA', lat: 34.1347, lng: -116.3131, tier: 'tier-b', rating: '4.7', reviews: '342', region: 'americas', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=200&fit=crop&q=70', desc: 'Desert retreat with stargazing nights, hiking groups, and campfire storytelling.' },
            { name: 'Tierra Verde', city: 'Monteverde, Costa Rica', lat: 10.3052, lng: -84.8255, tier: 'tier-a', rating: '4.8', reviews: '356', region: 'americas', img: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&h=200&fit=crop&q=70', desc: 'Cloud forest eco-lodge with canopy tours, wildlife spotting, and farm-to-table dining.' },
            { name: 'Taller Hostel', city: 'Medellín, Colombia', lat: 6.2476, lng: -75.5658, tier: 'tier-b', rating: '4.7', reviews: '298', region: 'americas', img: 'https://images.unsplash.com/photo-1531968455001-5c5272a67c71?w=400&h=200&fit=crop&q=70', desc: 'Art studio hostel in Comuna 13 with local artist collaborations and mural tours.' },
            { name: 'Urban Belongs', city: 'Detroit, USA', lat: 42.3314, lng: -83.0458, tier: 'tier-c', rating: '4.6', reviews: '287', region: 'americas', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=200&fit=crop&q=70', desc: 'Revitalized warehouse hostel in Corktown with urban gardening and music sessions.' },
            { name: 'Bosphorus Stories', city: 'Istanbul, Turkey', lat: 41.0082, lng: 28.9784, tier: 'tier-a', rating: '4.8', reviews: '347', region: 'europe', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop&q=70', desc: 'Rooftop hostel with Turkish tea ceremonies, prayer observation, and bazaar tours.' },
            { name: 'Casa del Albaicín', city: 'Granada, Spain', lat: 37.1773, lng: -3.5986, tier: 'tier-b', rating: '4.8', reviews: '334', region: 'europe', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop&q=70', desc: 'Moorish courtyard hostel with flamenco nights and Alhambra garden walks.' },
            { name: 'Spice Island Collective', city: 'Stone Town, Zanzibar', lat: -6.1622, lng: 39.1921, tier: 'tier-b', rating: '4.7', reviews: '315', region: 'africa', img: 'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=400&h=200&fit=crop&q=70', desc: 'Historic spice merchant house with cooking classes and dhow sailing trips.' },
            { name: 'Milonga Casa', city: 'Buenos Aires, Argentina', lat: -34.6037, lng: -58.3816, tier: 'tier-a', rating: '4.9', reviews: '389', region: 'americas', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=200&fit=crop&q=70', desc: 'Tango-infused hostel with nightly milongas, asado cookouts, and poetry readings.' },
            { name: 'Angkor Spirit Home', city: 'Siem Reap, Cambodia', lat: 13.3633, lng: 103.8564, tier: 'tier-b', rating: '4.7', reviews: '321', region: 'asia', img: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=400&h=200&fit=crop&q=70', desc: 'Temple-adjacent retreat with meditation sessions and traditional Khmer craft workshops.' },
            { name: 'Matcha & Moon', city: 'Kyoto, Japan', lat: 35.0116, lng: 135.7681, tier: 'tier-a', rating: '4.8', reviews: '367', region: 'asia', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=200&fit=crop&q=70', desc: 'Machiya townhouse hostel with tea ceremonies, zen garden, and temple visits.' },
            { name: 'Backstreet Beats', city: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792, tier: 'tier-c', rating: '4.6', reviews: '293', region: 'africa', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=200&fit=crop&q=70', desc: 'Afrobeat-powered hostel with live music, street food tours, and dance workshops.' },
            { name: 'Pachamama Lodge', city: 'Cusco, Peru', lat: -13.5319, lng: -71.9675, tier: 'tier-b', rating: '4.7', reviews: '312', region: 'americas', img: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&h=200&fit=crop&q=70', desc: 'Andean hostel with weaving workshops, coca leaf ceremonies, and Inca trail hikes.' },
            { name: 'Casa Lusitânia', city: 'Lisbon, Portugal', lat: 38.7223, lng: -9.1393, tier: 'tier-a', rating: '4.8', reviews: '356', region: 'europe', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=200&fit=crop&q=70', desc: 'Tiled townhouse hostel with fado nights, pastry workshops, and surf day trips.' },
            { name: 'Ubuntu House', city: 'Cape Town, South Africa', lat: -33.9249, lng: 18.4241, tier: 'tier-a', rating: '4.8', reviews: '334', region: 'africa', img: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=200&fit=crop&q=70', desc: 'Community arts hostel with township tours, braai nights, and Table Mountain hikes.' },
            { name: 'Modernista Collective', city: 'Barcelona, Spain', lat: 41.3874, lng: 2.1686, tier: 'tier-b', rating: '4.7', reviews: '378', region: 'europe', img: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=400&h=200&fit=crop&q=70', desc: 'Art Nouveau hostel with Gaudí tours, market cooking classes, and rooftop tapas.' },
            { name: 'Cairo Conversations', city: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357, tier: 'tier-c', rating: '4.6', reviews: '289', region: 'africa', img: 'https://images.unsplash.com/photo-1553913861-c0a880cfc540?w=400&h=200&fit=crop&q=70', desc: 'Nile-view hostel with storytelling evenings, calligraphy workshops, and pyramid tours.' },
            { name: 'Bohemian Haven', city: 'Prague, Czech Republic', lat: 50.0755, lng: 14.4378, tier: 'tier-b', rating: '4.7', reviews: '301', region: 'europe', img: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=200&fit=crop&q=70', desc: 'Underground jazz cellar hostel with brewery tours and literary walking groups.' },
            { name: 'Riad Saffron', city: 'Marrakech, Morocco', lat: 31.6295, lng: -7.9811, tier: 'tier-b', rating: '4.7', reviews: '328', region: 'africa', img: 'https://images.unsplash.com/photo-1548018560-c7196e6e49c1?w=400&h=200&fit=crop&q=70', desc: 'Traditional riad hostel with hammam visits, souk navigating, and tagine classes.' },
            { name: 'Acropoli Social', city: 'Athens, Greece', lat: 37.9838, lng: 23.7275, tier: 'tier-a', rating: '4.8', reviews: '369', region: 'europe', img: 'https://images.unsplash.com/photo-1555992457-b8fefdd09a6b?w=400&h=200&fit=crop&q=70', desc: 'Rooftop hostel with philosophy sessions, taverna crawls, and island ferry trips.' },
            { name: 'Ubud Conscious', city: 'Ubud, Bali', lat: -8.5069, lng: 115.2625, tier: 'tier-a', rating: '4.9', reviews: '384', region: 'asia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=200&fit=crop&q=70', desc: 'Rice terrace yoga hostel with Balinese ceremony participation and organic farming.' },
            { name: 'Lucha Libre Collective', city: 'Mexico City, Mexico', lat: 19.4326, lng: -99.1332, tier: 'tier-c', rating: '4.6', reviews: '302', region: 'americas', img: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&h=200&fit=crop&q=70', desc: 'Luchador-themed hostel with wrestling nights, street food tours, and mural walks.' },
            { name: 'Hanok Heritage', city: 'Seoul, South Korea', lat: 37.5665, lng: 126.978, tier: 'tier-a', rating: '4.8', reviews: '341', region: 'asia', img: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=200&fit=crop&q=70', desc: 'Traditional hanok house with K-culture workshops, temple stays, and street food runs.' },
            { name: 'Kreuzberg Kunsthaus', city: 'Berlin, Germany', lat: 52.52, lng: 13.405, tier: 'tier-b', rating: '4.7', reviews: '318', region: 'europe', img: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=200&fit=crop&q=70', desc: 'Artist squat-turned-hostel with gallery nights, techno history tours, and vinyl sessions.' },
            { name: 'Amsterdam Wheel House', city: 'Amsterdam, Netherlands', lat: 52.3676, lng: 4.9041, tier: 'tier-a', rating: '4.8', reviews: '356', region: 'europe', img: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5b80?w=400&h=200&fit=crop&q=70', desc: 'Canal-side cycling hostel with bike tours, cheese workshops, and art museum visits.' },
            { name: "Gondolier's Guild", city: 'Venice, Italy', lat: 45.4408, lng: 12.3155, tier: 'tier-b', rating: '4.7', reviews: '324', region: 'europe', img: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=200&fit=crop&q=70', desc: 'Artisan quarter hostel with mask-making, cicchetti tours, and lagoon kayaking.' },
            { name: 'Favela Vibes', city: 'Rio de Janeiro, Brazil', lat: -22.9068, lng: -43.1729, tier: 'tier-b', rating: '4.7', reviews: '299', region: 'americas', img: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=200&fit=crop&q=70', desc: 'Community-led favela hostel with samba circles, capoeira classes, and beach sessions.' },
            { name: 'Keep Portland Weird', city: 'Portland, USA', lat: 45.5152, lng: -122.6784, tier: 'tier-c', rating: '4.6', reviews: '287', region: 'americas', img: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&h=200&fit=crop&q=70', desc: 'DIY punk hostel with zine library, coffee roasting workshops, and forest hikes.' },
            { name: 'Borges Library House', city: 'Montevideo, Uruguay', lat: -34.9011, lng: -56.1645, tier: 'tier-c', rating: '4.8', reviews: '352', region: 'americas', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=200&fit=crop&q=70', desc: 'Literary hostel with reading rooms, mate ceremonies, and rambla sunset walks.' }
        ];

        // Region bounds
        var regionBounds = {
            world: [[[-50, -170], [70, 180]]],
            americas: [[[-55, -140], [55, -30]]],
            europe: [[[35, -12], [60, 35]]],
            asia: [[[-10, 60], [50, 145]]],
            africa: [[[-35, -20], [37, 52]]]
        };

        // Create marker layers
        var allMarkers = [];
        var markerLayers = {
            'all': L.layerGroup(),
            'tier-a': L.layerGroup(),
            'tier-b': L.layerGroup(),
            'tier-c': L.layerGroup()
        };

        hostels.forEach(function (h) {
            var popupHtml = '<div class="map-popup">' +
                '<img class="map-popup-img" src="' + h.img + '" alt="' + h.name + '" loading="lazy">' +
                '<div class="map-popup-body">' +
                '<h4>' + h.name + '</h4>' +
                '<p class="map-popup-location">' + h.city + '</p>' +
                '<p class="map-popup-description">' + h.desc + '</p>' +
                '<div class="map-popup-meta">' +
                '<span class="map-popup-badge ' + h.tier + '">' + h.tier.replace('-', ' ').replace(/\b\w/g, function (l) { return l.toUpperCase(); }) + '</span>' +
                '<span class="map-popup-rating">★ ' + h.rating + ' (' + h.reviews + ')</span>' +
                '</div>' +
                '<button class="map-popup-btn" onclick="document.querySelector(\'[data-hostel=&quot;' + h.name.replace(/'/g, "\\'") + '&quot;]\').click()">Book Now</button>' +
                '</div>' +
                '</div>';

            var marker = L.marker([h.lat, h.lng], {
                icon: createMarkerIcon(h.tier),
                title: h.name
            }).bindPopup(popupHtml, { maxWidth: 280, closeButton: true });

            marker._hostelData = h;
            allMarkers.push(marker);

            markerLayers['all'].addLayer(marker);
            markerLayers[h.tier].addLayer(marker);
        });

        markerLayers['all'].addTo(map);

        var currentFilter = 'all';
        var currentRegion = 'world';

        // Filter buttons
        var filterBtns = document.querySelectorAll('.map-filter-btn');
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                currentFilter = btn.getAttribute('data-filter');
                updateMap();
            });
        });

        // Region buttons
        var regionBtns = document.querySelectorAll('.map-region-btn');
        regionBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                regionBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                currentRegion = btn.getAttribute('data-region');
                updateMap();

                var bounds = regionBounds[currentRegion];
                if (bounds) {
                    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 6 });
                }
            });
        });

        function updateMap() {
            // Remove all markers
            allMarkers.forEach(function (m) {
                map.removeLayer(m);
            });

            var count = 0;
            allMarkers.forEach(function (m) {
                var data = m._hostelData;
                var matchesTier = (currentFilter === 'all') || (data.tier === currentFilter);
                var matchesRegion = (currentRegion === 'world') || (data.region === currentRegion);

                if (matchesTier && matchesRegion) {
                    m.addTo(map);
                    count++;
                }
            });

            var countEl = document.getElementById('visible-count');
            if (countEl) countEl.textContent = count;
        }

        // Fix map rendering when it becomes visible (lazy load)
        var mapObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    map.invalidateSize();
                    mapObserver.disconnect();
                }
            });
        }, { threshold: 0.1 });

        mapObserver.observe(mapEl);
    }
})();
