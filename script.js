// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cursor && ring) {
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx - 4 + 'px';
        cursor.style.top = my - 4 + 'px';
    });

    function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx - 18 + 'px';
        ring.style.top = ry - 18 + 'px';
        requestAnimationFrame(animRing);
    }
    animRing();
}

// Scroll reveal
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0) translateX(0)';
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.bento-card, .tc, .wp, .pillar, .delivery-card, .t-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    io.observe(el);
});

// Navbar Scroll Effect
const mainNav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

    // Mobile nav toggle
    const nav = document.querySelector('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.getElementById('primary-navigation');

    if (navToggle && nav && primaryNav) {
        navToggle.addEventListener('click', (e) => {
            const isOpen = nav.classList.toggle('nav-open');
            document.body.classList.toggle('no-scroll', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            // update label
            navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
        });

        // close when clicking a link
        primaryNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                if (nav.classList.contains('nav-open')) {
                    nav.classList.remove('nav-open');
                    document.body.classList.remove('no-scroll');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.setAttribute('aria-label', 'Ouvrir le menu');
                }
            });
        });

        // click outside to close
        document.addEventListener('click', (e) => {
            if (!nav.classList.contains('nav-open')) return;
            if (!nav.contains(e.target)) {
                nav.classList.remove('nav-open');
                document.body.classList.remove('no-scroll');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Ouvrir le menu');
            }
        });

        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                document.body.classList.remove('no-scroll');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Ouvrir le menu');
            }
        });
    }