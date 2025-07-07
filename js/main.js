// Main JavaScript file for mio555 Casino

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Game Category Filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Filter games based on category
                gameCards.forEach(card => {
                    if (category === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        if (card.classList.contains(category)) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }
    
    // Sidebar Category Filtering
    const categoryItems = document.querySelectorAll('.categories li');
    
    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                categoryItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                
                // Get category from the text content
                const categoryText = this.querySelector('a').textContent.trim().toLowerCase();
                let filterCategory;
                
                // Map category text to game card classes
                if (categoryText.includes('hot')) {
                    filterCategory = 'slots'; // Assuming hot games are slots
                } else if (categoryText.includes('popular')) {
                    filterCategory = 'all'; // Show all games for popular
                } else if (categoryText.includes('mio555')) {
                    filterCategory = 'slots'; // Assuming mio555 games are slots
                } else if (categoryText.includes('fortune')) {
                    filterCategory = 'jackpots'; // Assuming fortune games are jackpots
                } else if (categoryText.includes('new')) {
                    filterCategory = 'all'; // Show all games for new
                } else {
                    filterCategory = 'all';
                }
                
                // Filter games based on category
                gameCards.forEach(card => {
                    if (filterCategory === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        if (card.classList.contains(filterCategory)) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
                
                // If there are tab buttons, update active state
                if (tabBtns.length > 0) {
                    tabBtns.forEach(btn => btn.classList.remove('active'));
                    document.querySelector(`[data-category="${filterCategory}"]`)?.classList.add('active');
                }
            });
        });
    }
    
    // Game Search Functionality
    const searchBox = document.querySelector('.search-box input');
    
    if (searchBox) {
        // Create search results container
        const searchResults = document.createElement('div');
        searchResults.className = 'search-results';
        searchResults.innerHTML = '<ul></ul>';
        searchBox.parentNode.appendChild(searchResults);
        
        const resultsContainer = searchResults.querySelector('ul');
        
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            // Check if we're on a page with categories sidebar
            const categoriesList = document.querySelector('.categories ul');
            if (categoriesList) {
                const categoryItems = categoriesList.querySelectorAll('li');
                
                // Filter sidebar categories based on search term
                categoryItems.forEach(item => {
                    const itemText = item.textContent.toLowerCase();
                    if (searchTerm === '' || itemText.includes(searchTerm)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // If search is empty or too short, don't show game results
                if (searchTerm.length < 2) {
                    searchResults.classList.remove('active');
                    return;
                }
            } else {
                // Original game search behavior
                if (searchTerm.length < 2) {
                    searchResults.classList.remove('active');
                    return;
                }
            }
            
            // Clear previous results
            resultsContainer.innerHTML = '';
            
            // Find matching games
            const matches = Array.from(gameCards).filter(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                return title.includes(searchTerm) || description.includes(searchTerm);
            });
            
            // Display results
            if (matches.length > 0) {
                matches.forEach(match => {
                    const title = match.querySelector('h4').textContent;
                    const li = document.createElement('li');
                    li.textContent = title;
                    li.addEventListener('click', function() {
                        // Hide all games
                        gameCards.forEach(card => card.classList.add('hidden'));
                        // Show only the selected game
                        match.classList.remove('hidden');
                        // Clear search and hide results
                        searchBox.value = '';
                        searchResults.classList.remove('active');
                        
                        // Scroll to the game
                        match.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    });
                    resultsContainer.appendChild(li);
                });
                searchResults.classList.add('active');
            } else {
                const li = document.createElement('li');
                li.textContent = 'No games found';
                resultsContainer.appendChild(li);
                searchResults.classList.add('active');
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchBox.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
        
        // Close search results when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchResults.classList.remove('active');
            }
        });
    }
    
    // Create Floating Background Elements
    createFloatingElements();
    
    // Initialize Winner Notifications
    initWinnerNotifications();
    
    // Initialize Sidebar Item Hover Effects
    initSidebarEffects();
    
    // Add hover effects for game cards with enhanced animations
    initGameCardAnimations();
    
    // Add animation classes to elements
    const animatePulse = document.querySelectorAll('.cta-btn, .play-btn, .claim-btn');
    animatePulse.forEach(element => {
        element.classList.add('pulse');
    });

    const animateFloat = document.querySelectorAll('.feature-card, .payment-card');
    animateFloat.forEach(element => {
        element.classList.add('float');
    });

    // Add shine effect to buttons on hover
    addShineEffectToButtons();
    
    // Add cursor trail effect
    initCursorTrailEffect();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handling ticker animation pause on hover
    const tickerWrap = document.querySelector('.ticker-wrap');
    const ticker = document.querySelector('.ticker');
    
    if (tickerWrap && ticker) {
        tickerWrap.addEventListener('mouseover', () => {
            ticker.style.animationPlayState = 'paused';
        });
        
        tickerWrap.addEventListener('mouseout', () => {
            ticker.style.animationPlayState = 'running';
        });
    }

    // Floating button visibility on scroll
    const floatingBtn = document.querySelector('.floating-btn');
    if (floatingBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.visibility = 'visible';
            } else {
                floatingBtn.style.opacity = '0';
                floatingBtn.style.visibility = 'hidden';
            }
        });
    }

    // Initialize any game image hover effects
    const gameImages = document.querySelectorAll('.game-image');
    gameImages.forEach(image => {
        image.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        image.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Implement a simple countdown timer for promotions if needed
    function startCountdown(targetDate, displayElement) {
        const countdownElement = document.getElementById(displayElement);
        
        if (!countdownElement) return;
        
        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(targetDate).getTime() - now;
            
            if (distance < 0) {
                clearInterval(intervalId);
                countdownElement.innerHTML = "EXPIRED";
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }
    
    // Example usage:
    // If there's a countdown element on the page
    if (document.getElementById('promo-countdown')) {
        // Set target date to 7 days from now for example
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 7);
        startCountdown(targetDate, 'promo-countdown');
    }

    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
            currentLocation.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/') {
            link.parentElement.classList.add('active');
        }
    });

    // Redirect all buttons to the specified URL
    document.querySelectorAll('a.cta-btn, a.play-btn, a.claim-btn, a.promo-btn, a.payment-btn, a.feature-btn, .signup-float-btn, .auth-buttons a').forEach(link => {
        if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
            link.setAttribute('href', 'https://negolous.com/8yMZcSCq');
        }
    });

    // Execute page load animations
    executePageLoadAnimations();
    
    function executePageLoadAnimations() {
        // Animate hero section elements
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const heroElements = heroSection.querySelectorAll('h1, h2, p, .cta-buttons');
            
            heroElements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                // Staggered animation
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 300 + (index * 150));
            });
        }
        
        // Animate feature cards with staggered effect
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 600 + (index * 100));
        });
        
        // Animate game cards with staggered effect
        const gameCards = document.querySelectorAll('.game-card');
        
        gameCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 800 + (index * 100));
        });
    }

    // Create confetti effect for big wins
    function createConfettiEffect() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '9998';
        document.body.appendChild(confettiContainer);
        
        // Create confetti particles
        const colors = ['#ffcb05', '#ff8f00', '#4CAF50', '#2196F3', '#9C27B0'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-particle';
            
            // Random properties
            const size = 5 + Math.random() * 10;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const duration = 3 + Math.random() * 2;
            const delay = Math.random() * 3;
            
            // Set styles
            confetti.style.position = 'absolute';
            confetti.style.left = `${left}%`;
            confetti.style.top = '-20px';
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.opacity = '0';
            
            confettiContainer.appendChild(confetti);
            
            // Animate
            setTimeout(() => {
                confetti.style.transition = `top ${duration}s ease, left ${duration}s ease, transform ${duration}s ease, opacity ${duration/3}s ease`;
                confetti.style.opacity = '0.8';
                confetti.style.top = '120%';
                confetti.style.left = `${left + (Math.random() * 20 - 10)}%`;
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, duration * 1000);
                
            }, delay * 1000);
        }
        
        // Remove container after all animations
        setTimeout(() => {
            confettiContainer.remove();
        }, 8000);
    }
    
    // Trigger confetti on big win notification
    document.addEventListener('click', function(e) {
        if (e.target.closest('.win-notification')) {
            createConfettiEffect();
        }
    });

    // Function to create floating background elements
    function createFloatingElements() {
        // Create container for floating elements
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-elements';
        document.body.appendChild(floatingContainer);
        
        // Define element types and their count
        const elements = [
            { type: 'coin', count: 8 },
            { type: 'card', count: 6 },
            { type: 'dice', count: 5 },
            { type: 'chip', count: 7 }
        ];
        
        // Create each element
        elements.forEach(element => {
            for (let i = 0; i < element.count; i++) {
                const el = document.createElement('div');
                el.className = `floating-element ${element.type}`;
                
                // Random position
                const randomX = Math.random() * 100; // % of screen width
                const randomDelay = Math.random() * 10; // seconds
                const randomDuration = 15 + Math.random() * 15; // 15-30 seconds
                
                // Set styles
                el.style.left = `${randomX}%`;
                el.style.animationDelay = `${randomDelay}s`;
                el.style.animationDuration = `${randomDuration}s`;
                
                floatingContainer.appendChild(el);
            }
        });
    }
    
    // Function to initialize winner notifications
    function initWinnerNotifications() {
        // Array of possible winners and games
        const winners = [
            { name: 'Arif', game: 'Sweet Bonanza', amount: '৳1.5M' },
            { name: 'Tasnim', game: 'mio555 Star Reels', amount: '৳950K' },
            { name: 'Kabir', game: 'Squid Trials', amount: '৳2.3M' },
            { name: 'Nusrat', game: 'Mega Moolah', amount: '৳3.1M' },
            { name: 'Jahid', game: 'Teen Patti Live', amount: '৳580K' },
            { name: 'Mim', game: 'Crazy Time', amount: '৳1.2M' },
            { name: 'Rakib', game: 'Lightning Roulette', amount: '৳840K' },
            { name: 'Priya', game: 'Gates of Olympus', amount: '৳1.7M' }
        ];
        
        // Create notification container
        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'win-notification';
        notificationContainer.innerHTML = `
            <div class="win-notification-header">
                <i class="fas fa-trophy"></i>
                <h4>BIG WIN ALERT!</h4>
            </div>
            <div class="win-notification-body">
                <img src="images/3.webp" alt="Winner">
                <div class="win-notification-text">
                    <span class="winner-name">Arif</span> just won <span class="win-notification-amount">৳1.5M</span> on <span class="game-name">Sweet Bonanza</span>!
                </div>
            </div>
        `;
        document.body.appendChild(notificationContainer);
        
        // Function to show a random winner notification
        function showRandomWinner() {
            // Get random winner
            const winner = winners[Math.floor(Math.random() * winners.length)];
            
            // Get random image number between 1-10
            const imageNumber = Math.floor(Math.random() * 10) + 1;
            
            // Update notification content
            notificationContainer.querySelector('.winner-name').textContent = winner.name;
            notificationContainer.querySelector('.win-notification-amount').textContent = winner.amount;
            notificationContainer.querySelector('.game-name').textContent = winner.game;
            notificationContainer.querySelector('img').src = `images/${imageNumber}.webp`;
            
            // Show notification
            notificationContainer.classList.add('show');
            
            // Hide notification after animation completes
            setTimeout(() => {
                notificationContainer.classList.remove('show');
            }, 6000);
        }
        
        // Show first notification after 5 seconds
        setTimeout(showRandomWinner, 5000);
        
        // Show notifications periodically (every 25-45 seconds)
        setInterval(() => {
            const randomDelay = 25000 + Math.random() * 20000;
            setTimeout(showRandomWinner, randomDelay);
        }, 45000);
    }
    
    // Function to initialize sidebar hover effects
    function initSidebarEffects() {
        const sidebarItems = document.querySelectorAll('.categories li');
        
        sidebarItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Add a subtle glow effect to the icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.textShadow = '0 0 10px rgba(255, 203, 5, 0.8)';
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                // Remove the glow effect
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.textShadow = '';
                    icon.style.transform = '';
                }
            });
            
            // Click effect
            item.addEventListener('click', function() {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.position = 'absolute';
                ripple.style.width = '100%';
                ripple.style.height = '100%';
                ripple.style.backgroundColor = 'rgba(255, 203, 5, 0.2)';
                ripple.style.borderRadius = '8px';
                ripple.style.transform = 'scale(0)';
                ripple.style.transition = 'all 0.5s ease';
                ripple.style.left = '0';
                ripple.style.top = '0';
                
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.style.transform = 'scale(2)';
                    ripple.style.opacity = '0';
                }, 1);
                
                setTimeout(() => {
                    ripple.remove();
                }, 500);
            });
        });
    }
    
    // Function to enhance game card animations
    function initGameCardAnimations() {
        const gameCards = document.querySelectorAll('.game-card');
        
        gameCards.forEach(card => {
            // Mouse enter animation
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                
                // Add glow to play button
                const playBtn = this.querySelector('.play-btn');
                if (playBtn) {
                    playBtn.style.boxShadow = '0 0 15px rgba(255, 203, 5, 0.7)';
                    playBtn.style.transform = 'scale(1.1)';
                }
                
                // Add tilt effect based on mouse position
                card.addEventListener('mousemove', handleTilt);
            });
            
            // Mouse leave animation
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                
                // Remove glow from play button
                const playBtn = this.querySelector('.play-btn');
                if (playBtn) {
                    playBtn.style.boxShadow = '';
                    playBtn.style.transform = '';
                }
                
                // Remove tilt effect
                card.removeEventListener('mousemove', handleTilt);
                card.style.transform = '';
            });
            
            // Handle card tilt based on mouse position
            function handleTilt(e) {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // Calculate rotation (max 10 degrees)
                const maxRotation = 5;
                const rotateY = (mouseX / cardRect.width) * maxRotation;
                const rotateX = -(mouseY / cardRect.height) * maxRotation;
                
                // Apply transform
                card.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    }
    
    // Function to add shine effect to buttons
    function addShineEffectToButtons() {
        const buttons = document.querySelectorAll('.btn, .cta-btn, .play-btn, .claim-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseover', function() {
                // Create shine overlay
                const shine = document.createElement('div');
                shine.className = 'button-shine';
                shine.style.position = 'absolute';
                shine.style.top = '0';
                shine.style.left = '0';
                shine.style.width = '100%';
                shine.style.height = '100%';
                shine.style.background = 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)';
                shine.style.transform = 'translateX(-100%)';
                shine.style.pointerEvents = 'none';
                
                // Add position relative to button if not already set
                if (getComputedStyle(this).position === 'static') {
                    this.style.position = 'relative';
                }
                
                // Add overflow hidden to button
                this.style.overflow = 'hidden';
                
                // Append shine to button
                this.appendChild(shine);
                
                // Animate shine across the button
                setTimeout(() => {
                    shine.style.transition = 'transform 0.6s ease';
                    shine.style.transform = 'translateX(100%)';
                }, 10);
                
                // Remove shine after animation
                setTimeout(() => {
                    shine.remove();
                }, 700);
            });
        });
    }
    
    // Function to create cursor trail effect
    function initCursorTrailEffect() {
        const cursorTrailContainer = document.createElement('div');
        cursorTrailContainer.className = 'cursor-trail-container';
        cursorTrailContainer.style.position = 'fixed';
        cursorTrailContainer.style.top = '0';
        cursorTrailContainer.style.left = '0';
        cursorTrailContainer.style.width = '100%';
        cursorTrailContainer.style.height = '100%';
        cursorTrailContainer.style.pointerEvents = 'none';
        cursorTrailContainer.style.zIndex = '9999';
        document.body.appendChild(cursorTrailContainer);
        
        document.addEventListener('mousemove', function(e) {
            // Create trail particle only 20% of the time (for performance)
            if (Math.random() > 0.8) {
                const particle = document.createElement('div');
                particle.className = 'cursor-trail-particle';
                particle.style.position = 'absolute';
                particle.style.top = `${e.clientY}px`;
                particle.style.left = `${e.clientX}px`;
                particle.style.width = '8px';
                particle.style.height = '8px';
                particle.style.backgroundColor = 'rgba(255, 203, 5, 0.7)';
                particle.style.borderRadius = '50%';
                particle.style.boxShadow = '0 0 10px rgba(255, 203, 5, 0.5)';
                particle.style.pointerEvents = 'none';
                
                // Random size
                const size = 4 + Math.random() * 8; // 4-12px
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Add to container
                cursorTrailContainer.appendChild(particle);
                
                // Animate and remove
                setTimeout(() => {
                    particle.style.transition = 'all 0.6s ease';
                    particle.style.opacity = '0';
                    particle.style.transform = `scale(${0.5 + Math.random()})`;
                    
                    setTimeout(() => {
                        particle.remove();
                    }, 600);
                }, 10);
            }
        });
    }
});