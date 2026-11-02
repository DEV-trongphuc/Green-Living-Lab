/**
 * ECOLIFE SIGNATURE
 * Luxury Real Estate Landing Page Interactive Engine
 * Developed with Vanilla JS & Modern Browser APIs
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================================================
    // 1. Navigation & Header Scroll State
    // ==========================================================================
    const header = document.getElementById('main-header') || document.querySelector('.site-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('float-backtop');

    const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;

        // Header glassmorphism & shrink
        if (header) {
            if (scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Floating Back to Top Button
        if (backToTopBtn) {
            if (scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Parallax background in Dark Section
        const parallaxBg = document.getElementById('parallax-bg');
        const masterplanSec = document.getElementById('masterplan');
        if (parallaxBg && masterplanSec) {
            const rect = masterplanSec.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (window.innerHeight - rect.top) * 0.15;
                parallaxBg.style.transform = `translateY(${offset}px)`;
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Hero Video & Interactive Amenity Thumbnail Slider Engine
    const heroVideoLayer = document.getElementById('hero-video-layer');
    const heroSlideLayer = document.getElementById('hero-slide-layer');
    const heroSlideImg = document.getElementById('hero-slide-img');
    const heroSlideCaption = document.getElementById('hero-slide-caption-text');
    const heroSlideCounter = document.getElementById('hero-slide-counter');
    const heroBackVideoBtn = document.getElementById('hero-back-video-btn');
    const heroSlideZoomBtn = document.getElementById('hero-slide-zoom-btn');
    const heroSlidePrev = document.getElementById('hero-slide-prev');
    const heroSlideNext = document.getElementById('hero-slide-next');
    const heroThumbsTrack = document.getElementById('hero-thumbs-track');
    const heroThumbsPrev = document.getElementById('hero-thumbs-prev');
    const heroThumbsNext = document.getElementById('hero-thumbs-next');
    const heroThumbItems = Array.from(document.querySelectorAll('#hero-thumbs-track .hero-thumb-item'));
    const heroSlideThumbs = heroThumbItems.filter(btn => btn.getAttribute('data-mode') === 'slide');

    let currentHeroSlideIdx = 0;
    let heroSlideTimer = null;

    const stopHeroSlideAuto = () => {
        if (heroSlideTimer) {
            clearInterval(heroSlideTimer);
            heroSlideTimer = null;
        }
    };

    const scrollHeroThumbIntoView = (btn) => {
        if (!heroThumbsTrack || !btn) return;
        const targetLeft = Math.max(0, btn.offsetLeft - (heroThumbsTrack.clientWidth / 2) + (btn.clientWidth / 2));
        heroThumbsTrack.scrollTo({ left: targetLeft, behavior: 'smooth' });
    };

    const showHeroVideoMode = () => {
        stopHeroSlideAuto();
        if (heroSlideLayer) {
            heroSlideLayer.classList.remove('active');
            heroSlideLayer.setAttribute('aria-hidden', 'true');
        }
        if (heroVideoLayer) {
            heroVideoLayer.classList.add('active');
        }
        heroThumbItems.forEach(b => b.classList.toggle('active', b.getAttribute('data-mode') === 'video'));
        const videoThumb = heroThumbItems.find(b => b.getAttribute('data-mode') === 'video');
        scrollHeroThumbIntoView(videoThumb);
    };

    const showHeroSlideIndex = (idx, startAuto = true) => {
        if (heroSlideThumbs.length === 0) return;
        if (idx < 0) idx = heroSlideThumbs.length - 1;
        if (idx >= heroSlideThumbs.length) idx = 0;
        currentHeroSlideIdx = idx;

        const targetBtn = heroSlideThumbs[currentHeroSlideIdx];
        const rawSrc = targetBtn.getAttribute('data-src') || targetBtn.querySelector('img')?.src || '';
        const caption = targetBtn.getAttribute('data-caption') || targetBtn.querySelector('.hero-thumb-label')?.textContent || '';

        if (heroSlideLayer && !heroSlideLayer.classList.contains('active')) {
            heroSlideLayer.classList.add('active');
            heroSlideLayer.setAttribute('aria-hidden', 'false');
        }

        if (heroSlideImg && rawSrc) {
            heroSlideImg.style.opacity = '0.35';
            setTimeout(() => {
                heroSlideImg.src = rawSrc;
                heroSlideImg.alt = caption;
                heroSlideImg.style.opacity = '1';
            }, 90);
        }
        if (heroSlideCaption) heroSlideCaption.textContent = caption;
        if (heroSlideCounter) heroSlideCounter.textContent = `${currentHeroSlideIdx + 1} / ${heroSlideThumbs.length}`;

        heroThumbItems.forEach(b => b.classList.toggle('active', b === targetBtn));
        scrollHeroThumbIntoView(targetBtn);

        if (startAuto) {
            stopHeroSlideAuto();
            heroSlideTimer = setInterval(() => {
                showHeroSlideIndex(currentHeroSlideIdx + 1, false);
            }, 3500);
        }
    };

    heroThumbItems.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            if (mode === 'video') {
                showHeroVideoMode();
            } else {
                const slideIdx = parseInt(btn.getAttribute('data-slide-idx') || '0', 10);
                showHeroSlideIndex(slideIdx, true);
            }
        });
    });

    if (heroBackVideoBtn) {
        heroBackVideoBtn.addEventListener('click', showHeroVideoMode);
    }
    if (heroSlidePrev) {
        heroSlidePrev.addEventListener('click', () => showHeroSlideIndex(currentHeroSlideIdx - 1, true));
    }
    if (heroSlideNext) {
        heroSlideNext.addEventListener('click', () => showHeroSlideIndex(currentHeroSlideIdx + 1, true));
    }
    if (heroThumbsPrev && heroThumbsTrack) {
        heroThumbsPrev.addEventListener('click', () => {
            heroThumbsTrack.scrollBy({ left: -220, behavior: 'smooth' });
        });
    }
    if (heroThumbsNext && heroThumbsTrack) {
        heroThumbsNext.addEventListener('click', () => {
            heroThumbsTrack.scrollBy({ left: 220, behavior: 'smooth' });
        });
    }

    const openHeroSlideLightbox = () => {
        stopHeroSlideAuto();
        const heroCombo = heroSlideThumbs.map(b => ({
            src: b.getAttribute('data-src') || b.querySelector('img')?.src || '',
            title: b.querySelector('.hero-thumb-label')?.textContent || 'Tiện Ích EcoLife Signature',
            desc: b.getAttribute('data-caption') || ''
        })).filter(it => it.src);
        if (heroCombo.length > 0 && typeof openLightboxWithItems === 'function') {
            openLightboxWithItems(heroCombo, currentHeroSlideIdx);
        }
    };

    if (heroSlideZoomBtn) {
        heroSlideZoomBtn.addEventListener('click', openHeroSlideLightbox);
    }
    if (heroSlideImg) {
        heroSlideImg.addEventListener('click', openHeroSlideLightbox);
    }

    // Mobile Menu Toggle & Dropdown Accordions
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            mobileToggle.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Mobile Accordion Toggle on Dropdown Click
        const dropdownToggles = navMenu.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    const parentItem = toggle.closest('.has-dropdown');
                    if (parentItem) {
                        const isCurrentlyOpen = parentItem.classList.contains('mobile-open');
                        // Close other open mobile dropdowns
                        navMenu.querySelectorAll('.has-dropdown.mobile-open').forEach(item => {
                            if (item !== parentItem) item.classList.remove('mobile-open');
                        });
                        parentItem.classList.toggle('mobile-open', !isCurrentlyOpen);
                        toggle.setAttribute('aria-expanded', !isCurrentlyOpen ? 'true' : 'false');
                    }
                }
            });
        });

        // Close mobile menu on regular link or dropdown link click
        const menuLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    navMenu.classList.remove('open');
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    navMenu.querySelectorAll('.has-dropdown.mobile-open').forEach(item => item.classList.remove('mobile-open'));
                }
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                navMenu.querySelectorAll('.has-dropdown.mobile-open').forEach(item => item.classList.remove('mobile-open'));
            }
        });
    }

    // Smooth Scroll for Internal Anchor Links with header offset & tab trigger support
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });

                // If dropdown link triggers a specific tab
                const tabTrigger = this.getAttribute('data-tab-trigger');
                if (tabTrigger) {
                    setTimeout(() => {
                        const targetTabBtn = document.querySelector(`.com-tab-btn[data-apt="${tabTrigger}"]`);
                        if (targetTabBtn) {
                            targetTabBtn.click();
                        }
                    }, 350);
                }
            }
        });
    });

    // Back to Top Click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active Link Spy via IntersectionObserver (Mapped to Compact Dropdowns)
    const sections = document.querySelectorAll('section[id], header[id]');
    const parentMenuMap = {
        'hero': '#hero',
        'commercial': '#commercial',
        'metrics': '#commercial',
        'concept': '#concept',
        'four-pillars': '#concept',
        'masterplan': '#concept',
        'progress': '#progress',
        'gallery': '#progress',
        'video-showcase': '#progress',
        'location': '#location'
    };

    if ('IntersectionObserver' in window && sections.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    const targetParentHref = parentMenuMap[currentId] || `#${currentId}`;

                    document.querySelectorAll('.nav-link').forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === targetParentHref) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-25% 0px -55% 0px'
        });

        sections.forEach(sec => navObserver.observe(sec));
    }


    // ==========================================================================
    // 2. Scroll Reveal Animations (IntersectionObserver)
    // ==========================================================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const checkInitialVisibility = () => {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 80) {
                el.classList.add('is-visible');
            }
        });
    };

    if ('IntersectionObserver' in window && animateElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.02,
            rootMargin: '0px 0px 60px 0px'
        });

        animateElements.forEach(el => revealObserver.observe(el));
        checkInitialVisibility();
    } else {
        animateElements.forEach(el => el.classList.add('is-visible'));
    }


    // ==========================================================================
    // 3. KPI Animated Counters
    // ==========================================================================
    const kpiNumbers = document.querySelectorAll('.kpi-number[data-target]');
    let hasCounted = false;

    const runCounters = () => {
        kpiNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const prefix = counter.getAttribute('data-prefix') || '';
            const suffix = counter.getAttribute('data-suffix');
            const isPercent = target === 100;
            const isFourThousand = target === 4000;
            const duration = 2000; // ms
            const frameRate = 1000 / 60;
            const totalFrames = Math.round(duration / frameRate);
            let currentFrame = 0;

            const easeOutQuad = t => t * (2 - t);

            const formatVal = (val, isFinal = false) => {
                if (suffix !== null) {
                    const numStr = val >= 1000 ? val.toLocaleString('vi-VN') : String(val);
                    return `${prefix}${numStr}${suffix}`;
                }
                if (isFourThousand) return isFinal ? '4.000+' : (val.toLocaleString('vi-VN') + '+');
                if (isPercent) return val + '%';
                return val + '+';
            };

            const updateCounter = () => {
                currentFrame++;
                const progress = easeOutQuad(currentFrame / totalFrames);
                const currentValue = Math.round(target * progress);
                counter.textContent = formatVal(currentValue, false);

                if (currentFrame < totalFrames) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = formatVal(target, true);
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    const heroKpiSection = document.querySelector('.hero-kpi-bar');
    if (heroKpiSection && 'IntersectionObserver' in window) {
        const kpiObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCounted) {
                    hasCounted = true;
                    runCounters();
                }
            });
        }, { threshold: 0.2 });

        kpiObserver.observe(heroKpiSection);
    } else {
        runCounters();
    }


    // ==========================================================================
    // iOS-Style Segmented Control Engine (Physics Spring Animation)
    // ==========================================================================
    function setupIosSegmentedControl(container, options = {}) {
        if (!container) return null;
        const buttons = Array.from(container.querySelectorAll('.ios-tab-item, button'));
        if (buttons.length === 0) return null;

        // Create or locate the sliding indicator pill
        let indicator = container.querySelector('.ios-segmented-indicator');
        if (!indicator) {
            indicator = document.createElement('span');
            indicator.className = 'ios-segmented-indicator';
            container.prepend(indicator);
        }

        let currentIndex = buttons.findIndex(b => b.classList.contains('active'));
        if (currentIndex === -1) {
            currentIndex = 0;
            buttons[0].classList.add('active');
        }

        const moveIndicator = (btn, animate = true) => {
            if (!btn || !indicator) return;
            if (!animate) {
                indicator.style.transition = 'none';
            } else {
                indicator.style.transition = '';
            }

            const left = btn.offsetLeft;
            const top = btn.offsetTop;
            const width = btn.offsetWidth;
            const height = btn.offsetHeight;

            indicator.style.transform = `translate3d(${left}px, ${top}px, 0)`;
            indicator.style.width = `${width}px`;
            indicator.style.height = `${height}px`;

            if (!animate) {
                // Trigger synchronous reflow then restore transition
                indicator.offsetHeight;
                indicator.style.transition = '';
            }
        };

        // Position immediately and again on next frame
        moveIndicator(buttons[currentIndex], false);
        requestAnimationFrame(() => {
            moveIndicator(buttons[currentIndex], false);
        });

        // Re-align on resize and font load
        const handleResize = () => {
            const activeBtn = container.querySelector('.ios-tab-item.active, button.active') || buttons[0];
            moveIndicator(activeBtn, false);
        };
        window.addEventListener('resize', handleResize);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(handleResize);
        }

        // Attach click and iOS tactile bounce interactions
        buttons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                const oldIndex = currentIndex;
                const newIndex = index;
                const direction = newIndex >= oldIndex ? 'right' : 'left';
                currentIndex = newIndex;

                buttons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                moveIndicator(btn, true);

                if (typeof options.onSwitch === 'function') {
                    options.onSwitch({ btn, index: newIndex, oldIndex, direction });
                }
            });
        });

        return {
            switchTo: (targetIndex) => {
                if (buttons[targetIndex]) buttons[targetIndex].click();
            },
            refresh: () => {
                const activeBtn = container.querySelector('.ios-tab-item.active, button.active') || buttons[0];
                moveIndicator(activeBtn, false);
            }
        };
    }

    // ==========================================================================
    // 1. Commercial Apartments (2PN / 3PN / Shophouse) Switcher & Image Swapper
    // ==========================================================================
    const comTabsContainer = document.querySelector('.commercial-tabs');
    const comPanels = document.querySelectorAll('.commercial-panel');

    if (comTabsContainer) {
        setupIosSegmentedControl(comTabsContainer, {
            onSwitch: ({ btn, direction }) => {
                const apt = btn.getAttribute('data-apt');
                comPanels.forEach(panel => {
                    panel.classList.remove('ios-slide-in-right', 'ios-slide-in-left');
                    if (panel.id === `panel-${apt}`) {
                        panel.classList.add('active');
                        panel.classList.add(direction === 'right' ? 'ios-slide-in-right' : 'ios-slide-in-left');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            }
        });
    }

    // Helper to resolve theme relative asset paths safely on WordPress & Static HTML
    const resolveAssetUrl = (rawPath, fallbackImgEl) => {
        if (fallbackImgEl && (fallbackImgEl.currentSrc || fallbackImgEl.src)) {
            return fallbackImgEl.currentSrc || fallbackImgEl.src;
        }
        if (!rawPath) return '';
        if (/^https?:\/\//i.test(rawPath) || rawPath.startsWith('/')) return rawPath;
        const themeBase = window.ecolifeData?.themeUrl ? window.ecolifeData.themeUrl.replace(/\/$/, '') + '/' : '';
        return themeBase + rawPath.replace(/^\/+/, '');
    };

    // Thumbnail Image Swap for Commercial Apartments (Zero Broken Images!)
    document.querySelectorAll('.thumb-swap').forEach(thumb => {
        thumb.addEventListener('click', function () {
            const panel = this.closest('.com-grid');
            if (!panel) return;
            const mainImg = panel.querySelector('.com-main-img');
            const largeSrc = resolveAssetUrl(this.getAttribute('data-large'), this);
            if (mainImg && largeSrc) {
                mainImg.style.opacity = '0.4';
                setTimeout(() => {
                    mainImg.src = largeSrc;
                    mainImg.style.opacity = '1';
                }, 120);
            }
            panel.querySelectorAll('.thumb-swap').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Interactive Sub-Model Pills inside Commercial Panels (A1/A2 in 2PN; B1/B2/B6/B3 in 3PN)
    const subModelSpecs = {
        a1: {
            badge: 'Mẫu A1 • 66,0 m² • Phong Cách Nhật Bản Tối Giản (Japandi)',
            title: 'Căn Hộ 2PN Mẫu A1 (66,0 m² – 2PN, 2WC, Ban Công & Lô Gia Riêng)',
            lead: 'Thiết kế theo phong cách Nhật Bản tối giản (Japandi) với chất liệu gỗ sồi sáng ấm cúng, trục phòng khách – bàn ăn liên hoàn thông thoáng và hệ tủ kịch trần tối ưu lưu trữ.',
            area: '66,0 m² (Thông thủy)',
            func: '2 PN • 2 WC • Ban công & Lô gia',
            link: 'can-ho-2pn-view-bien.html?layout=2pn-a1',
            thumbs: [
                { src: 'images/noi_that/layouts/can_a1_02.webp', alt: 'Phòng khách Japandi Căn 2PN Mẫu A1 (66,0m²)' },
                { src: 'images/noi_that/layouts/can_a1_03.webp', alt: 'Không gian khách ăn kết nối ban công Mẫu A1' },
                { src: 'images/noi_that/layouts/can_a1_01.webp', alt: 'Phòng ngủ Master gỗ sồi sáng Mẫu A1' },
                { src: 'images/noi_that/layouts/can_a1_07.webp', alt: 'Phòng ngủ phụ hệ phản Tatami thông minh Mẫu A1' }
            ]
        },
        a2: {
            badge: 'Mẫu A2 • 68,9 m² • Đen Nhám Tương Phản Đá Trắng Vân Mây',
            title: 'Căn Hộ 2PN Mẫu A2 (68,9 m² – Giường Tầng Đôi & Bàn Học Kép)',
            lead: 'Nổi bật với tông đen nhám cá tính tương phản cùng bề mặt đá trắng vân mây sang trọng; phòng ngủ phụ tích hợp hệ giường tầng đôi liền bàn học kép thông minh cho gia đình trẻ.',
            area: '68,9 m² (Thông thủy)',
            func: '2 PN • 2 WC • Ban công & Lô gia',
            link: 'can-ho-2pn-view-bien.html?layout=2pn-a2',
            thumbs: [
                { src: 'images/noi_that/layouts/can_a2_04.webp', alt: 'Mặt bằng bóc tách 3D Căn 2PN Mẫu A2 (68,9m²)' },
                { src: 'images/noi_that/layouts/can_a2_02.webp', alt: 'Phòng khách đá trắng vân mây Căn 2PN Mẫu A2' },
                { src: 'images/noi_that/layouts/can_a2_01.webp', alt: 'Phòng ngủ Master sang trọng Mẫu A2' },
                { src: 'images/noi_that/layouts/can_a2_08.webp', alt: 'Phòng ngủ giường tầng đôi liền bàn học kép Mẫu A2' }
            ]
        },
        b1: {
            badge: 'Căn Góc B1 • 77,8 m² • Gỗ Óc Chó Phối Đá Vân Khói',
            title: 'Căn Góc 3PN Mẫu B1 (77,8 m² – 3PN, 2WC, Ban Công & Lô Gia)',
            lead: 'Căn góc 3 phòng ngủ sở hữu tông nâu trầm gỗ óc chó phối đá vân khói sang trọng, tối ưu diện tích và tầm nhìn thoáng rộng cho gia đình đa thế hệ.',
            area: '77,8 m² (Thông thủy)',
            func: '3 PN • 2 WC • Ban công & Lô gia',
            link: 'can-ho-2pn-view-bien.html?layout=3pn-b1',
            thumbs: [
                { src: 'images/noi_that/layouts/can_b1_01.webp', alt: 'Phòng khách gỗ óc chó Căn Góc 3PN Mẫu B1 (77,8m²)' },
                { src: 'images/noi_that/layouts/can_b1_02.webp', alt: 'Bàn ăn & không gian sinh hoạt chung Căn Góc B1' },
                { src: 'images/noi_that/layouts/can_b1_06.webp', alt: 'Phòng ngủ Master Căn Góc B1' },
                { src: 'images/noi_that/layouts/can_b1_10.webp', alt: 'Phòng ngủ phụ thoáng sáng Căn Góc B1' }
            ]
        },
        b2: {
            badge: 'Mẫu B2 • 87,3 m² • 2 Ban Công Trải Dài & Lô Gia',
            title: 'Căn Hộ 3PN Mẫu B2 (87,3 m² – 3PN, 2WC, 2 Ban Công & Lô Gia)',
            lead: 'Thiết kế 3 phòng ngủ với tông ghi đen cùng hệ vách lam hiện đại, nổi bật với 2 ban công trải dài đón trọn luồng khí tươi và ánh sáng tự nhiên.',
            area: '87,3 m² (Thông thủy)',
            func: '3 PN • 2 WC • 2 Ban công & Lô gia',
            link: 'can-ho-2pn-view-bien.html?layout=3pn-b2',
            thumbs: [
                { src: 'images/noi_that/layouts/can_b2_01.webp', alt: 'Phòng khách Căn 3PN Mẫu B2 (87,3m²)' },
                { src: 'images/noi_that/layouts/can_b2_02.webp', alt: 'Không gian khách ăn liên hoàn Mẫu B2' },
                { src: 'images/noi_that/layouts/can_b2_07.webp', alt: 'Phòng ngủ Master có ban công riêng Mẫu B2' },
                { src: 'images/noi_that/layouts/can_b2_13.webp', alt: 'Phòng ngủ thứ 2 rộng thoáng Mẫu B2' }
            ]
        },
        b6: {
            badge: 'Mẫu B6 • 87,1 m² • 3 Phòng Ngủ & 3 Phòng Vệ Sinh Riêng Tư',
            title: 'Căn Hộ 3PN Mẫu B6 (87,1 m² – 3PN, 3WC Khép Kín, Organic Modern)',
            lead: 'Sở hữu tông kem gỗ sáng cùng đường nét nội thất bo cong mềm mại, đặc biệt bố trí tới 3 phòng vệ sinh riêng tư đáp ứng trọn vẹn nhu cầu sinh hoạt của gia đình đa thế hệ.',
            area: '87,1 m² (Thông thủy)',
            func: '3 PN • 3 WC riêng tư • Ban công rộng',
            link: 'can-ho-2pn-view-bien.html?layout=3pn-b6',
            thumbs: [
                { src: 'images/noi_that/layouts/can_b6_01.webp', alt: 'Phòng khách Organic Modern Căn 3PN Mẫu B6 (87,1m²)' },
                { src: 'images/noi_that/layouts/can_b6_07.webp', alt: 'Khu bàn ăn & sofa da Cognac Mẫu B6' },
                { src: 'images/noi_that/layouts/can_b6_03.webp', alt: 'Phòng ngủ Master có WC khép kín Mẫu B6' },
                { src: 'images/noi_that/layouts/can_b6_06.webp', alt: 'Phòng ngủ phụ bàn học đôi Mẫu B6' }
            ]
        },
        b3: {
            badge: 'Căn Góc B3 • 88,8 m² • Ban Công Góc Panorama Vịnh Biển',
            title: 'Căn Góc 3PN Mẫu B3 (88,8 m² – 3PN, 2WC, Ban Công Góc & Lô Gia)',
            lead: 'Căn góc 3 phòng ngủ lớn nhất tầng điển hình (Tầng 03–15), mang tông kem phối đen cùng hệ vách ốp sang trọng và ban công góc Panorama ôm trọn tầm nhìn vịnh Đà Nẵng.',
            area: '88,8 m² (Thông thủy)',
            func: '3 PN • 2 WC • Ban công góc & Lô gia',
            link: 'can-ho-2pn-view-bien.html?layout=3pn-b3',
            thumbs: [
                { src: 'images/noi_that/layouts/can_b3_03.webp', alt: 'Mặt bằng 3D bóc tách Căn Góc 3PN Mẫu B3 (88,8m²)' },
                { src: 'images/noi_that/layouts/can_b3_01.webp', alt: 'Phòng khách Panorama Căn Góc 3PN Mẫu B3' },
                { src: 'images/noi_that/layouts/can_b3_09.webp', alt: 'Phòng ngủ Master căn góc 2 mặt thoáng Mẫu B3' },
                { src: 'images/noi_that/layouts/can_b3_04.webp', alt: 'Bàn ăn 6 ghế mặt đá cẩm thạch Mẫu B3' }
            ]
        }
    };

    document.querySelectorAll('.model-subpill-btn').forEach(pill => {
        pill.addEventListener('click', function () {
            const modelKey = this.getAttribute('data-submodel');
            const spec = subModelSpecs[modelKey];
            const panel = this.closest('.com-grid');
            if (!spec || !panel) return;

            this.parentElement.querySelectorAll('.model-subpill-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const badgeEl = panel.querySelector('.com-img-badge');
            const mainImg = panel.querySelector('.com-main-img');
            const thumbStrip = panel.querySelector('.com-thumb-strip');
            const titleEl = panel.querySelector('.com-info h3');
            const leadEl = panel.querySelector('.com-info .com-lead');
            const areaEl = panel.querySelector('.spec-area-val');
            const funcEl = panel.querySelector('.spec-func-val');
            const linkEl = panel.querySelector('.com-detail-link');

            if (badgeEl) badgeEl.textContent = spec.badge;
            if (titleEl) titleEl.textContent = spec.title;
            if (leadEl) leadEl.textContent = spec.lead;
            if (areaEl) areaEl.textContent = spec.area;
            if (funcEl) funcEl.textContent = spec.func;
            if (linkEl) linkEl.href = (window.ecolifeData && window.ecolifeData.siteUrl) ? (window.ecolifeData.siteUrl.replace(/\/$/, '') + '/can-ho-2pn-view-bien/?' + spec.link.split('?')[1]) : spec.link;

            if (mainImg && spec.thumbs.length > 0) {
                mainImg.style.opacity = '0.4';
                setTimeout(() => {
                    mainImg.src = resolveAssetUrl(spec.thumbs[0].src);
                    mainImg.alt = spec.thumbs[0].alt;
                    mainImg.setAttribute('data-caption', spec.title);
                    mainImg.style.opacity = '1';
                }, 100);
            }

            if (thumbStrip) {
                thumbStrip.innerHTML = spec.thumbs.map((t, i) => `
                    <img src="${resolveAssetUrl(t.src)}" alt="${t.alt}" class="thumb-swap ${i === 0 ? 'active' : ''}" data-large="${resolveAssetUrl(t.src)}">
                `).join('');
                thumbStrip.querySelectorAll('.thumb-swap').forEach(th => {
                    th.addEventListener('click', function () {
                        const largeSrc = this.getAttribute('data-large');
                        if (mainImg && largeSrc) {
                            mainImg.style.opacity = '0.4';
                            setTimeout(() => {
                                mainImg.src = largeSrc;
                                mainImg.style.opacity = '1';
                            }, 100);
                        }
                        thumbStrip.querySelectorAll('.thumb-swap').forEach(x => x.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
            }
        });
    });


    // Complete Photo Combos for Each Apartment Model (A1, A2, B1, B2, B3, B6, Sảnh 5 Sao)
    const buildModelItem = (relPath, title, desc) => ({
        src: resolveAssetUrl(relPath),
        title,
        desc: desc || title
    });

    const unitModelCombos = {
        a1: [
            buildModelItem('images/noi_that/layouts/can_a1_02.webp', 'Phòng khách & bàn ăn Căn 2PN (Mẫu A1 - 66,0m²)', 'Căn 2PN Mẫu A1 (66,0m² – 2PN, 2WC, ban công & lô gia riêng): Phong cách Nhật Bản tối giản (Japandi) với chất liệu gỗ sồi sáng ấm cúng'),
            buildModelItem('images/noi_that/layouts/can_a1_03.webp', 'Phòng khách kết nối lô gia Căn 2PN (Mẫu A1)', 'Căn 2PN Mẫu A1 (66,0m²): Không gian phòng khách nối liền bàn ăn ngập tràn ánh sáng tự nhiên'),
            buildModelItem('images/noi_that/layouts/can_a1_05.webp', 'Bàn ăn gia đình Căn 2PN (Mẫu A1)', 'Căn 2PN Mẫu A1 (66,0m²): Bàn ăn gia đình tinh tế với đèn thả nghệ thuật'),
            buildModelItem('images/noi_that/layouts/can_a1_01.webp', 'Phòng ngủ Master Căn 2PN (Mẫu A1)', 'Căn 2PN Mẫu A1 (66,0m²): Phòng ngủ Master ấm áp với hệ tủ gỗ kịch trần sang trọng'),
            buildModelItem('images/noi_that/layouts/can_a1_04.webp', 'Giường ngủ Master đón gió biển (Mẫu A1)', 'Căn 2PN Mẫu A1 (66,0m²): Góc nhìn giường ngủ Master hướng cửa sổ lớn đón gió biển'),
            buildModelItem('images/noi_that/layouts/can_a1_06.webp', 'Bàn làm việc & kệ trang trí Master (Mẫu A1)', 'Căn 2PN Mẫu A1 (66,0m²): Bàn làm việc & kệ trang trí liền khối trong phòng ngủ Master'),
            buildModelItem('images/noi_that/layouts/can_a1_07.webp', 'Phòng ngủ thứ 2 hệ phản Tatami (Mẫu A1)', 'Căn 2PN Mẫu A1 (66,0m²): Phòng ngủ phụ đa năng thiết kế hệ phản gỗ Tatami thông minh')
        ],
        a2: [
            buildModelItem('images/noi_that/layouts/can_a2_04.webp', 'Mặt bằng 3D bóc tách Căn 2PN (Mẫu A2 - 68,9m²)', 'Mặt bằng bóc tách 3D Căn 2PN (Mẫu A2 - 68,9m²): 2PN, 2WC, ban công & lô gia riêng biệt'),
            buildModelItem('images/noi_that/layouts/can_a2_02.webp', 'Không gian mở Phòng khách & Bàn ăn (Mẫu A2)', 'Căn 2PN Mẫu A2 (68,9m²): Tông đen nhám cá tính tương phản cùng bề mặt đá trắng vân mây sang trọng'),
            buildModelItem('images/noi_that/layouts/can_a2_03.webp', 'Phòng khách ốp đá vân mây & gỗ trầm (Mẫu A2)', 'Căn 2PN Mẫu A2 (68,9m²): Phòng khách hiện đại chuẩn thẩm mỹ đô thị'),
            buildModelItem('images/noi_that/layouts/can_a2_11.webp', 'Toàn cảnh sofa phòng khách & ban công (Mẫu A2)', 'Căn 2PN Mẫu A2 (68,9m²): Góc nhìn toàn cảnh sofa phòng khách hướng ra ban công thoáng rộng'),
            buildModelItem('images/noi_that/layouts/can_a2_12.webp', 'Bàn ăn mặt đá 6 ghế Căn 2PN (Mẫu A2)', 'Căn 2PN Mẫu A2 (68,9m²): Bàn ăn mặt đá kết nối không gian sinh hoạt chung ấm cúng'),
            buildModelItem('images/noi_that/layouts/can_a2_05.webp', 'Khu bếp chữ I & tủ lạnh âm tủ (Mẫu A2)', 'Căn 2PN Mẫu A2 (68,9m²): Khu bếp chữ I hiện đại ốp đá vân mây & tủ lạnh Side-by-Side âm tủ'),
            buildModelItem('images/noi_that/layouts/can_a2_01.webp', 'Phòng ngủ Master vách đá Marble (Mẫu A2)', 'Căn 2PN Mẫu A2 (68,9m²): Phòng ngủ Master sang trọng với vách đầu giường bọc nệm & đá Marble'),
            buildModelItem('images/noi_that/layouts/can_a2_06.webp', 'Góc tivi & bàn trang điểm Master (Mẫu A2)', 'Căn 2PN Mẫu A2 (68,9m²): Góc tivi & bàn trang điểm tinh tế trong phòng ngủ Master'),
            buildModelItem('images/noi_that/layouts/can_a2_07.webp', 'Hệ tủ quần áo kịch trần có đèn LED (Mẫu A2)', 'Căn 2PN Mẫu A2 (68,9m²): Hệ tủ quần áo kịch trần kết hợp kệ trưng bày có đèn LED'),
            buildModelItem('images/noi_that/layouts/can_a2_08.webp', 'Phòng ngủ giường tầng đôi liền bàn học kép (Mẫu A2)', 'Căn 2PN Mẫu A2 (68,9m²): Tích hợp hệ giường tầng đôi liền bàn học kép thông minh cho gia đình có 2 bé'),
            buildModelItem('images/noi_that/layouts/can_a2_10.webp', 'Bàn học đôi ngập tràn ánh sáng (Mẫu A2)', 'Căn 2PN Mẫu A2 (68,9m²): Bàn học đôi tràn ngập ánh sáng tự nhiên trong phòng ngủ trẻ em'),
            buildModelItem('images/noi_that/layouts/can_a2_09.webp', 'Cửa sổ lớn đón trọn ánh sáng & gió biển (Mẫu A2)', 'Căn 2PN Mẫu A2 (68,9m²): Cửa sổ lớn kịch trần đón trọn ánh sáng & gió biển Đà Nẵng')
        ],
        b1: [
            buildModelItem('images/noi_that/layouts/can_b1_01.webp', 'Phòng khách Căn Góc 3PN (Mẫu B1 - 77,8m²)', 'Căn góc 3PN Mẫu B1 (77,8m² – 3PN, 2WC, ban công & lô gia): Tông nâu trầm gỗ óc chó phối đá vân khói sang trọng'),
            buildModelItem('images/noi_that/layouts/can_b1_02.webp', 'Không gian khách – ăn liên hoàn Căn Góc B1', 'Căn góc 3PN Mẫu B1 (77,8m²): Bàn ăn mặt đá kết nối không gian phòng khách lịch lãm'),
            buildModelItem('images/noi_that/layouts/can_b1_03.webp', 'Góc sofa & ban công đón gió Căn Góc B1', 'Căn góc 3PN Mẫu B1 (77,8m²): Cửa kính lớn mở ra ban công đón ánh sáng tự nhiên'),
            buildModelItem('images/noi_that/layouts/can_b1_04.webp', 'Khu vực bàn ăn & hệ tủ trưng bày (Mẫu B1)', 'Căn góc 3PN Mẫu B1 (77,8m²): Hệ tủ gỗ óc chó kết hợp đèn LED ấm áp'),
            buildModelItem('images/noi_that/layouts/can_b1_06.webp', 'Phòng ngủ Master gỗ óc chó (Mẫu B1)', 'Căn góc 3PN Mẫu B1 (77,8m²): Phòng ngủ Master căn góc với cửa sổ rộng thoáng'),
            buildModelItem('images/noi_that/layouts/can_b1_08.webp', 'Hệ tủ kịch trần phòng ngủ Master (Mẫu B1)', 'Căn góc 3PN Mẫu B1 (77,8m²): Tủ quần áo cánh kính kịch trần sang trọng'),
            buildModelItem('images/noi_that/layouts/can_b1_10.webp', 'Phòng ngủ thứ 2 thoáng sáng (Mẫu B1)', 'Căn góc 3PN Mẫu B1 (77,8m²): Phòng ngủ thứ 2 bố trí bàn học cạnh cửa sổ'),
            buildModelItem('images/noi_that/layouts/can_b1_12.webp', 'Phòng ngủ thứ 3 đa năng (Mẫu B1)', 'Căn góc 3PN Mẫu B1 (77,8m²): Phòng ngủ thứ 3 tối ưu công năng cho gia đình đa thế hệ')
        ],
        b2: [
            buildModelItem('images/noi_that/layouts/can_b2_01.webp', 'Phòng khách Căn 3PN 2 Ban Công (Mẫu B2 - 87,3m²)', 'Căn 3PN Mẫu B2 (87,3m² – 3PN, 2WC, 2 ban công & lô gia): Tông ghi đen cùng hệ vách lam hiện đại, ban công trải dài'),
            buildModelItem('images/noi_that/layouts/can_b2_02.webp', 'Trục phòng khách – bàn ăn rộng mở (Mẫu B2)', 'Căn 3PN Mẫu B2 (87,3m²): Không gian sinh hoạt chung khoáng đạt với 2 ban công đón gió'),
            buildModelItem('images/noi_that/layouts/can_b2_04.webp', 'Bàn ăn 6 ghế & khu bếp hiện đại (Mẫu B2)', 'Căn 3PN Mẫu B2 (87,3m²): Bàn ăn gia đình kết nối khu bếp và lô gia riêng biệt'),
            buildModelItem('images/noi_that/layouts/can_b2_07.webp', 'Phòng ngủ Master có ban công riêng (Mẫu B2)', 'Căn 3PN Mẫu B2 (87,3m²): Phòng ngủ Master sở hữu ban công riêng tư ngắm cảnh quan nội khu'),
            buildModelItem('images/noi_that/layouts/can_b2_10.webp', 'Hệ tủ quần áo & bàn trang điểm Master (Mẫu B2)', 'Căn 3PN Mẫu B2 (87,3m²): Nội thất tông ghi đen – gỗ trầm sang trọng'),
            buildModelItem('images/noi_that/layouts/can_b2_13.webp', 'Phòng ngủ thứ 2 đón nắng tự nhiên (Mẫu B2)', 'Căn 3PN Mẫu B2 (87,3m²): Phòng ngủ thứ 2 rộng rãi với hệ tủ kịch trần'),
            buildModelItem('images/noi_that/layouts/can_b2_16.webp', 'Phòng ngủ thứ 3 cho con trẻ (Mẫu B2)', 'Căn 3PN Mẫu B2 (87,3m²): Phòng ngủ thứ 3 thiết kế bàn học dài bên cửa sổ')
        ],
        b6: [
            buildModelItem('images/noi_that/layouts/can_b6_01.webp', 'Phòng khách Căn 3PN 3WC Riêng Tư (Mẫu B6 - 87,1m²)', 'Căn 3PN Mẫu B6 (87,1m² – 3PN, 3WC riêng tư, ban công thoáng rộng): Tông kem gỗ sáng cùng nội thất bo cong mềm mại (Organic Modern)'),
            buildModelItem('images/noi_that/layouts/can_b6_07.webp', 'Cận cảnh phòng khách & bàn ăn tròn (Mẫu B6)', 'Căn 3PN Mẫu B6 (87,1m²): Phòng khách sofa da bò Ý màu Cognac & bàn ăn gia đình ấm cúng'),
            buildModelItem('images/noi_that/layouts/can_b6_09.webp', 'Cửa kính ban công rộng mở từ sofa (Mẫu B6)', 'Căn 3PN Mẫu B6 (87,1m²): Cửa kính ban công rộng mở đón trọn tầm nhìn từ sofa phòng khách'),
            buildModelItem('images/noi_that/layouts/can_b6_02.webp', 'Bàn ăn gia đình ghế bọc da Cognac (Mẫu B6)', 'Căn 3PN Mẫu B6 (87,1m²): Khu vực bàn ăn gia đình ấm cúng đồng bộ phong cách Organic Modern'),
            buildModelItem('images/noi_that/layouts/can_b6_08.webp', 'Hệ tủ lưu trữ âm tường tinh tế (Mẫu B6)', 'Căn 3PN Mẫu B6 (87,1m²): Hệ tủ lưu trữ âm tường tinh tế dọc hành lang căn hộ'),
            buildModelItem('images/noi_that/layouts/can_b6_03.webp', 'Phòng ngủ Master có WC khép kín (Mẫu B6)', 'Căn 3PN Mẫu B6 (87,1m²): Thiết kế 3 phòng vệ sinh riêng tư đáp ứng hoàn hảo gia đình đa thế hệ'),
            buildModelItem('images/noi_that/layouts/can_b6_04.webp', 'Phòng ngủ thứ 2 tích hợp kệ sách (Mẫu B6)', 'Căn 3PN Mẫu B6 (87,1m²): Phòng ngủ thứ 2 bố trí góc làm việc & kệ sách kịch trần hiện đại'),
            buildModelItem('images/noi_that/layouts/can_b6_06.webp', 'Hệ bàn học đôi dài cạnh cửa sổ (Mẫu B6)', 'Căn 3PN Mẫu B6 (87,1m²): Hệ bàn học đôi dài cạnh cửa sổ thoáng sáng trong phòng ngủ phụ')
        ],
        b3: [
            buildModelItem('images/noi_that/layouts/can_b3_03.webp', 'Mặt bằng 3D bóc tách Căn Góc 3PN (Mẫu B3 - 88,8m²)', 'Mặt bằng bóc tách 3D Căn Góc 3PN (Mẫu B3 - 88,8m²): 3PN, 2WC, ban công góc Panorama & lô gia riêng'),
            buildModelItem('images/noi_that/layouts/can_b3_01.webp', 'Phòng khách Panorama Căn Góc 3PN (Mẫu B3 - 88,8m²)', 'Căn Góc 3PN Mẫu B3 (88,8m²): Tông kem phối đen cùng hệ vách ốp sang trọng, kết nối ban công góc Panorama ngắm vịnh biển'),
            buildModelItem('images/noi_that/layouts/can_b3_07.webp', 'Không gian sinh hoạt chung sofa chữ L (Mẫu B3)', 'Căn Góc 3PN Mẫu B3 (88,8m²): Không gian sinh hoạt chung sang trọng với sofa chữ L cỡ lớn'),
            buildModelItem('images/noi_that/layouts/can_b3_08.webp', 'Phòng khách kết nối bàn ăn & tiền sảnh (Mẫu B3)', 'Căn Góc 3PN Mẫu B3 (88,8m²): Góc nhìn phòng khách kết nối khu vực bàn ăn & tiền sảnh'),
            buildModelItem('images/noi_that/layouts/can_b3_04.webp', 'Bàn ăn 6 ghế mặt đá cẩm thạch (Mẫu B3)', 'Căn Góc 3PN Mẫu B3 (88,8m²): Khu vực bàn ăn 6 ghế mặt đá cẩm thạch & tủ lạnh Side-by-Side'),
            buildModelItem('images/noi_that/layouts/can_b3_06.webp', 'Sảnh đón căn hộ ốp gỗ sang trọng (Mẫu B3)', 'Căn Góc 3PN Mẫu B3 (88,8m²): Sảnh đón căn hộ ốp gỗ sang trọng với tranh nghệ thuật'),
            buildModelItem('images/noi_that/layouts/can_b3_09.webp', 'Phòng ngủ Master căn góc 2 mặt thoáng (Mẫu B3)', 'Căn Góc 3PN Mẫu B3 (88,8m²): Phòng ngủ Master căn góc với 2 mặt cửa sổ đón gió biển'),
            buildModelItem('images/noi_that/layouts/can_b3_13.webp', 'Kệ tivi & bàn trang điểm phòng Master (Mẫu B3)', 'Căn Góc 3PN Mẫu B3 (88,8m²): Hệ kệ tivi treo tường & bàn trang điểm trong phòng ngủ Master'),
            buildModelItem('images/noi_that/layouts/can_b3_10.webp', 'Phòng ngủ thứ 2 tủ kịch trần (Mẫu B3)', 'Căn Góc 3PN Mẫu B3 (88,8m²): Phòng ngủ thứ 2 ấm cúng với tủ quần áo kịch trần & cửa sổ thoáng'),
            buildModelItem('images/noi_that/layouts/can_b3_02.webp', 'Phòng ngủ thứ 3 cho gia đình đa thế hệ (Mẫu B3)', 'Căn Góc 3PN Mẫu B3 (88,8m²): Phòng ngủ thứ 3 tinh tế, tối ưu công năng cho gia đình đa thế hệ')
        ],
        penthouse: [
            buildModelItem('images/architecture/penthouse_san_vuon_rieng.webp', 'Penthouse Biệt Thự Chân Mây Sân Vườn Riêng (Tầng 16–17)', 'Bộ sưu tập 06 căn Penthouse giới hạn tại Tầng 16–17 (157,5 – 630,4m²): Sở hữu sân vườn riêng cùng tầm nhìn ôm trọn vịnh biển Đà Nẵng, bàn giao thô để chủ nhân tự do khẳng định cá tính'),
            buildModelItem('images/architecture/master_3_toa_giat_cap.webp', 'Kiến trúc giật cấp 04 tầng vườn chân mây & Penthouse tầng 16–17', 'Tòa tháp 17 tầng nổi với kiến trúc giật cấp từ tầng 17 thoải dần xuống tầng 6, tạo lập 04 tầng vườn chân mây xanh mát'),
            buildModelItem('images/masterplan_rooftop.webp', 'Mặt bằng tổng thể tầng mái & Sân vườn Penthouse', 'Mặt bằng tổng thể hệ vườn chân mây, vườn thiền Yoga, vườn BBQ ngắm hoàng hôn & không gian Penthouse'),
            buildModelItem('images/brand/rooftop_bbq.webp', 'Vườn Nướng BBQ & Thưởng Trà Ngắm Hoàng Hôn Tầng Mái', 'Không gian Thân Tâm Trí trên các tầng mái giật cấp lộng gió vịnh biển Đà Nẵng'),
            buildModelItem('images/brand/mindfulness_wellness.webp', 'Vườn Thiền Yoga & Đường Dạo Bộ Trị Liệu Giác Quan', 'Không gian tĩnh dưỡng Thân – Tâm – Trí trên tầng mái xanh mát')
        ],
        sanh: [
            buildModelItem('images/architecture/shophouse_podium_26can.webp', '26 Căn Shophouse Khối Đế Thương Mại Tầng 1–2', '26 căn Shophouse khối đế (120,5 – 418,2m²) tại Tầng 1–2 kiến tạo phố thương mại, ẩm thực và dịch vụ sầm uất ngay nội khu'),
            buildModelItem('images/noi_that/layouts/sanh_02.webp', 'Sảnh lễ tân & Lounge đón khách chuẩn 5 sao', 'Sảnh Chính 5 Sao EcoLife Signature: Quầy lễ tân đá cẩm thạch, đèn chùm pha lê & Lounge tiếp khách VIP'),
            buildModelItem('images/noi_that/layouts/sanh_01.webp', 'Khu sofa chờ đèn chùm pha lê (Sảnh 5 Sao)', 'Sảnh Chính 5 Sao: Khu vực sofa chờ sang trọng với đèn chùm pha lê nghệ thuật'),
            buildModelItem('images/noi_that/layouts/sanh_03.webp', 'Quầy Concierge đá cẩm thạch (Sảnh 5 Sao)', 'Sảnh Chính 5 Sao: Quầy lễ tân Concierge phục vụ cư dân theo tiêu chuẩn khách sạn quốc tế'),
            buildModelItem('images/noi_that/layouts/sanh_05.webp', 'Khu vực hòm thư cư dân Tầng 1 (1F)', 'Sảnh Chính Tầng 1 (1F): Khu vực hòm thư cư dân sang trọng, an ninh 24/7'),
            buildModelItem('images/noi_that/layouts/sanh_06.webp', 'Sảnh Tiếp Khách VIP & Lounge Cafe', 'Sảnh Tiếp Khách VIP: Lounge cafe & không gian tiếp đón đối tác dành riêng cho cư dân'),
            buildModelItem('images/noi_that/layouts/sanh_12.webp', 'Sảnh thang máy tốc độ cao ốp đá Marble', 'Sảnh Thang Máy Tốc Độ Cao: Ốp đá Marble tự nhiên & hệ thống kiểm soát an ninh FaceID'),
            buildModelItem('images/noi_that/layouts/sanh_15.webp', 'Hành lang căn hộ thông thoáng đón khí tươi', 'Hành Lang Căn Hộ: Thiết kế rộng rãi, thông gió tự nhiên từ Vườn Atrio & Cổng Ostia')
        ]
    };

    // Interactive Layout Filter Tabs in Real Interior Photo Gallery (#interior-layout-tabs)
    const interiorTabBtns = document.querySelectorAll('.interior-tab-btn[data-layout-filter]');
    const interiorGrid = document.getElementById('interior-photo-grid');
    const initialInteriorGridHtml = interiorGrid ? interiorGrid.innerHTML : '';
    const interiorCtaLink = document.getElementById('interior-cta-dynamic-link');
    const interiorCtaText = document.getElementById('interior-cta-dynamic-text');

    if (interiorTabBtns.length > 0 && interiorGrid) {
        interiorTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                interiorTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterKey = btn.getAttribute('data-layout-filter');
                const targetLayoutUrl = btn.getAttribute('data-layout-url');
                const targetLabel = btn.getAttribute('data-layout-label');

                if (filterKey === 'all' || !unitModelCombos[filterKey]) {
                    interiorGrid.innerHTML = initialInteriorGridHtml;
                } else {
                    const comboItems = unitModelCombos[filterKey];
                    interiorGrid.innerHTML = comboItems.map(item => `
                        <div class="interior-card" data-model="${filterKey}" data-caption="${item.desc.replace(/"/g, '&quot;')}">
                            <img src="${item.src}" alt="${item.title.replace(/"/g, '&quot;')}" loading="lazy">
                            <div class="interior-overlay">
                                <span class="interior-caption">${item.title}</span>
                            </div>
                            <div class="interior-zoom-icon"><i class="fa-solid fa-expand"></i></div>
                        </div>
                    `).join('');
                }

                if (interiorCtaLink && targetLayoutUrl) {
                    interiorCtaLink.href = targetLayoutUrl;
                }
                if (interiorCtaText && targetLabel) {
                    interiorCtaText.textContent = targetLabel;
                }
            });
        });
    }

    // ==========================================================================
    // 2. 4 Pillars Interactive Tab Switcher
    // ==========================================================================
    const pillarTabsContainer = document.querySelector('.pillar-tabs');
    const pillarPanels = document.querySelectorAll('.pillar-content-panel');

    if (pillarTabsContainer) {
        setupIosSegmentedControl(pillarTabsContainer, {
            onSwitch: ({ btn, direction }) => {
                const pillarKey = btn.getAttribute('data-pillar');
                pillarPanels.forEach(panel => {
                    panel.classList.remove('ios-slide-in-right', 'ios-slide-in-left');
                    if (panel.id === `panel-${pillarKey}`) {
                        panel.classList.add('active');
                        panel.classList.add(direction === 'right' ? 'ios-slide-in-right' : 'ios-slide-in-left');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            }
        });
    }

    // ==========================================================================
    // 3. Interactive Green Savings Calculator Logic
    // ==========================================================================
    const calcAptTypeContainer = document.getElementById('calc-apt-type');
    const familySlider = document.getElementById('family-size-slider');
    const familyVal = document.getElementById('family-size-val');
    const resElec = document.getElementById('res-elec');
    const resWater = document.getElementById('res-water');
    const resTotal = document.getElementById('res-total');

    let currentAptType = '2pn';

    const updateSavings = () => {
        if (!familySlider) return;
        const members = parseInt(familySlider.value, 10);
        if (familyVal) familyVal.textContent = `${members} người`;

        // Calculation formulas based on APA technical benchmarks
        let elecPerMonth, waterPerMonth;
        if (currentAptType === '2pn') {
            elecPerMonth = 350000 + (members - 2) * 80000;
            waterPerMonth = 180000 + (members - 2) * 45000;
        } else {
            elecPerMonth = 480000 + (members - 2) * 110000;
            waterPerMonth = 240000 + (members - 2) * 60000;
        }

        const totalYear = (elecPerMonth + waterPerMonth) * 12;
        const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

        if (resElec) resElec.textContent = formatVND(elecPerMonth);
        if (resWater) resWater.textContent = formatVND(waterPerMonth);
        if (resTotal) resTotal.textContent = formatVND(totalYear);
    };

    if (calcAptTypeContainer) {
        setupIosSegmentedControl(calcAptTypeContainer, {
            onSwitch: ({ btn }) => {
                currentAptType = btn.getAttribute('data-type') || '2pn';
                updateSavings();
            }
        });
    }

    if (familySlider) {
        familySlider.addEventListener('input', updateSavings);
        updateSavings();
    }

    // ==========================================================================
    // 4. Masterplan View Switcher (Ground vs Rooftop)
    // ==========================================================================
    const darkToggleContainer = document.querySelector('.dark-toggle-container');
    const viewGround = document.getElementById('view-ground');
    const viewRooftop = document.getElementById('view-rooftop');

    if (darkToggleContainer && viewGround && viewRooftop) {
        setupIosSegmentedControl(darkToggleContainer, {
            onSwitch: ({ btn, direction }) => {
                const viewMode = btn.getAttribute('data-view');
                const activeView = viewMode === 'ground' ? viewGround : viewRooftop;
                const inactiveView = viewMode === 'ground' ? viewRooftop : viewGround;

                activeView.classList.remove('ios-slide-in-right', 'ios-slide-in-left');
                inactiveView.classList.remove('active', 'ios-slide-in-right', 'ios-slide-in-left');

                activeView.classList.add('active');
                activeView.classList.add(direction === 'right' ? 'ios-slide-in-right' : 'ios-slide-in-left');
            }
        });
    }

    // ==========================================================================
    // 5. 3D Gallery Filter System (iOS Spring Animated Filter)
    // ==========================================================================
    const galleryFiltersContainer = document.querySelector('.gallery-filters');
    const galleryCards = document.querySelectorAll('.gallery-card');

    if (galleryFiltersContainer) {
        setupIosSegmentedControl(galleryFiltersContainer, {
            onSwitch: ({ btn }) => {
                const filter = btn.getAttribute('data-filter');

                galleryCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        });
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(14px) scale(0.96)';
                        setTimeout(() => {
                            if (card.style.opacity === '0') {
                                card.style.display = 'none';
                            }
                        }, 240);
                    }
                });
            }
        });
    }


    // ==========================================================================
    // 7. Luxury Lightbox Modal (Next/Prev Navigation & Mini Thumbnail Strip)
    // ==========================================================================
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');
    const lbTitle = document.getElementById('lb-title');
    const lbDesc = document.getElementById('lb-desc');
    const lbCounter = document.getElementById('lb-counter');
    const lbThumbsStrip = document.getElementById('lightbox-thumbs-strip');

    let lightboxItems = [];
    let currentLightboxIdx = 0;

    // Build gallery items list from visible or all gallery cards (Always use resolved full URL!)
    const buildGalleryItems = () => {
        const items = [];
        galleryCards.forEach(card => {
            const imgEl = card.querySelector('img');
            const src = resolveAssetUrl(card.getAttribute('data-img'), imgEl);
            const title = card.getAttribute('data-title') || card.querySelector('.gallery-title, h3, h4')?.textContent || 'Phối Cảnh EcoLife Signature';
            const desc = card.getAttribute('data-desc') || card.querySelector('p')?.textContent || 'Góc nhìn cảnh quan & tiện ích thực tế dự án EcoLife Signature.';
            if (src) {
                items.push({ src, title, desc, cardEl: card });
            }
        });
        return items;
    };

    const renderThumbsStrip = () => {
        if (!lbThumbsStrip) return;
        lbThumbsStrip.innerHTML = '';
        lightboxItems.forEach((item, idx) => {
            const thumb = document.createElement('div');
            thumb.className = `lb-thumb-dot ${idx === currentLightboxIdx ? 'active' : ''}`;
            thumb.setAttribute('data-index', idx);
            thumb.setAttribute('title', item.title);
            thumb.innerHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy">`;
            thumb.addEventListener('click', (e) => {
                e.stopPropagation();
                showLightboxIndex(idx);
            });
            lbThumbsStrip.appendChild(thumb);
        });
    };

    const updateThumbsActiveState = () => {
        if (!lbThumbsStrip) return;
        const dots = lbThumbsStrip.querySelectorAll('.lb-thumb-dot');
        dots.forEach((dot, idx) => {
            if (idx === currentLightboxIdx) {
                dot.classList.add('active');
                lbThumbsStrip.scrollTo({ left: Math.max(0, dot.offsetLeft - (lbThumbsStrip.clientWidth / 2) + (dot.clientWidth / 2)), behavior: 'smooth' });
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const showLightboxIndex = (index) => {
        if (!lightboxModal || !lightboxImg || lightboxItems.length === 0) return;
        if (index < 0) index = lightboxItems.length - 1;
        if (index >= lightboxItems.length) index = 0;
        currentLightboxIdx = index;

        const item = lightboxItems[currentLightboxIdx];
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = item.src;
            lightboxImg.alt = item.title;
            lightboxImg.style.opacity = '1';
        }, 120);

        if (lbTitle) lbTitle.textContent = item.title;
        if (lbDesc) lbDesc.textContent = item.desc;
        if (lbCounter) lbCounter.textContent = `${currentLightboxIdx + 1} / ${lightboxItems.length}`;
        updateThumbsActiveState();
    };

    const openLightboxWithItems = (items, startIndex = 0) => {
        if (!lightboxModal || !lightboxImg) return;
        lightboxItems = items;
        currentLightboxIdx = startIndex;
        renderThumbsStrip();
        showLightboxIndex(currentLightboxIdx);

        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    // Helper to detect apartment model key (a1, a2, b1, b2, b3, b6, sanh) from URL or card
    const detectModelFromSrc = (src) => {
        if (!src) return null;
        const m = src.match(/can_(a1|a2|b1|b2|b3|b6)_/i);
        if (m) return m[1].toLowerCase();
        if (/\/sanh_\d+/i.test(src)) return 'sanh';
        return null;
    };

    const openModelComboLightbox = (modelKey, clickedSrc, fallbackTitle, fallbackDesc) => {
        const combo = unitModelCombos[modelKey];
        if (combo && combo.length > 0) {
            const clickedFile = (clickedSrc || '').split('/').pop();
            let idx = combo.findIndex(item => item.src === clickedSrc || (clickedFile && item.src.endsWith(clickedFile)));
            if (idx === -1) idx = 0;
            openLightboxWithItems(combo, idx);
            return true;
        }
        return false;
    };

    const openLightbox = (imgSrc, title, desc) => {
        if (!imgSrc) return;
        const detectedModel = detectModelFromSrc(imgSrc);
        if (detectedModel && openModelComboLightbox(detectedModel, imgSrc, title, desc)) {
            return;
        }
        const allItems = buildGalleryItems();
        let targetIdx = allItems.findIndex(item => item.src === imgSrc);
        if (targetIdx === -1) {
            openLightboxWithItems([{ src: imgSrc, title: title || 'EcoLife Signature', desc: desc || '' }], 0);
            return;
        }
        openLightboxWithItems(allItems, targetIdx);
    };

    const closeLightbox = () => {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lightboxImg) lightboxImg.src = '';
    };

    const nextLightboxImage = () => {
        if (lightboxItems.length > 0) {
            showLightboxIndex(currentLightboxIdx + 1);
        }
    };

    const prevLightboxImage = () => {
        if (lightboxItems.length > 0) {
            showLightboxIndex(currentLightboxIdx - 1);
        }
    };

    // Attach lightbox to gallery cards
    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            const allItems = buildGalleryItems();
            const imgEl = card.querySelector('img');
            const cardSrc = resolveAssetUrl(card.getAttribute('data-img'), imgEl);
            const targetIdx = allItems.findIndex(it => it.src === cardSrc || it.cardEl === card);
            openLightboxWithItems(allItems, targetIdx >= 0 ? targetIdx : 0);
        });
    });

    // Attach lightbox to zoomable images (like masterplans, showcase, commercial main images)
    document.querySelectorAll('img.zoomable-img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            const comPanel = img.closest('.com-grid');
            if (comPanel) {
                // Open the combo of the clicked model or the panel's thumbnails
                const detectedModel = detectModelFromSrc(img.src);
                if (detectedModel && openModelComboLightbox(detectedModel, img.src, img.alt, img.getAttribute('data-caption'))) {
                    return;
                }
                const thumbs = Array.from(comPanel.querySelectorAll('.thumb-swap'));
                if (thumbs.length > 0) {
                    const panelCombo = thumbs.map(th => ({
                        src: resolveAssetUrl(th.getAttribute('data-large'), th),
                        title: th.alt || img.alt || 'EcoLife Signature',
                        desc: img.getAttribute('data-caption') || th.alt || ''
                    }));
                    const idx = Math.max(0, panelCombo.findIndex(it => it.src === img.src));
                    openLightboxWithItems(panelCombo, idx);
                    return;
                }
            }
            const imgSrc = img.src;
            const title = img.getAttribute('alt') || 'Bản vẽ dự án';
            const desc = img.getAttribute('data-caption') || 'Chi tiết mặt bằng kiến trúc & cảnh quan';
            openLightbox(imgSrc, title, desc);
        });
    });

    if (lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); nextLightboxImage(); });
    if (lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); prevLightboxImage(); });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation (Arrow keys + Escape)
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextLightboxImage();
        } else if (e.key === 'ArrowLeft') {
            prevLightboxImage();
        }
    });

    // Interior Room Lightbox Integration (Clicking any card opens the FULL COMBO of that exact apartment model!)
    if (interiorGrid) {
        interiorGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.interior-card');
            if (!card) return;
            const img = card.querySelector('img');
            const imgSrc = img ? (img.currentSrc || img.src) : '';
            const modelKey = card.getAttribute('data-model') || detectModelFromSrc(imgSrc);
            const title = card.querySelector('.interior-caption')?.textContent || img?.alt || 'Nội thất EcoLife Signature';
            const caption = card.getAttribute('data-caption') || title;

            if (modelKey && openModelComboLightbox(modelKey, imgSrc, title, caption)) {
                return;
            }
            if (imgSrc) {
                openLightbox(imgSrc, title, caption);
            }
        });
    }

    // Vivid Amenity Cards Lightbox Integration (Opens the 12-photo Vivid Amenities combo!)
    const vividCards = Array.from(document.querySelectorAll('.vivid-amenity-card'));
    if (vividCards.length > 0) {
        const vividCombo = vividCards.map(c => {
            const img = c.querySelector('img');
            return {
                src: img ? (img.currentSrc || img.src) : '',
                title: c.querySelector('h4')?.textContent || img?.alt || 'Tiện Ích EcoLife Signature',
                desc: c.querySelector('p')?.textContent || ''
            };
        }).filter(it => it.src);

        vividCards.forEach((card, idx) => {
            card.addEventListener('click', () => {
                openLightboxWithItems(vividCombo, idx);
            });
        });
    }



    // ==========================================================================
    // 8. Google Sheets Integration & Quotation/Success Modals
    // ==========================================================================
    const GOOGLE_SHEET_ID = '1r_Mh2zjcLZio3m-ozGoDRfDu0uJPHKrp9lPAF1YUds0';
    // Deployed Google Apps Script Web App URL (Live Connected)
    const GOOGLE_SHEET_SCRIPT_URL = window.HOA_HIEP_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzHk3rzOzwwFVErevqP41BAjT9sebhnele14QWHYvFyjHaQUXL2C-nBw-CUNRQq7Jxp/exec';

    // Quotation Modal Elements
    const quoteModal = document.getElementById('quotation-modal');
    const quoteModalBackdrop = document.getElementById('quote-modal-backdrop');
    const quoteModalClose = document.getElementById('quote-modal-close');
    const quoteModalForm = document.getElementById('quote-modal-form');
    const triggerQuoteBtns = document.querySelectorAll('.btn-trigger-quote');

    // Success Modal Elements
    const successModal = document.getElementById('success-modal');
    const successModalBackdrop = document.getElementById('success-modal-backdrop');
    const successModalClose = document.getElementById('success-modal-close');
    const successModalDone = document.getElementById('btn-success-done');
    const successDisplayName = document.getElementById('success-display-name');
    const successDisplayPhone = document.getElementById('success-display-phone');

    // Open Quotation Modal
    const openQuoteModal = () => {
        if (quoteModal) {
            quoteModal.classList.add('active');
            quoteModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            const firstInput = quoteModal.querySelector('input');
            if (firstInput) setTimeout(() => firstInput.focus(), 200);
        }
    };

    // Close Quotation Modal
    const closeQuoteModal = () => {
        if (quoteModal) {
            quoteModal.classList.remove('active');
            quoteModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    // Open Success Modal with Email Confirmation
    const showSuccessModal = (name, phone, email) => {
        if (successModal) {
            if (successDisplayName) successDisplayName.textContent = name || 'Quý khách';
            if (successDisplayPhone) successDisplayPhone.textContent = phone || 'liên hệ';

            let emailNotice = successModal.querySelector('.success-email-notice');
            if (email && email.trim() !== '') {
                if (!emailNotice) {
                    emailNotice = document.createElement('div');
                    emailNotice.className = 'success-email-notice';
                    emailNotice.style.cssText = 'margin-top: 14px; padding: 10px 14px; background: #eaf4f0; border-radius: 8px; font-size: 13.5px; color: #0d3829; border: 1px solid #c5dfd4; display: flex; align-items: center; gap: 8px; justify-content: center;';
                    const modalBody = successModal.querySelector('.modal-dialog') || successModal;
                    const doneBtn = successModal.querySelector('#success-modal-done') || successModal.querySelector('button');
                    if (doneBtn && doneBtn.parentNode) {
                        doneBtn.parentNode.insertBefore(emailNotice, doneBtn);
                    }
                }
                emailNotice.innerHTML = `<i class="fa-solid fa-envelope-circle-check" style="color: #10b981; font-size: 16px;"></i> <span>Đã gửi email xác nhận & hồ sơ dự án tới: <strong>${email}</strong></span>`;
                emailNotice.style.display = 'flex';
            } else if (emailNotice) {
                emailNotice.style.display = 'none';
            }

            successModal.classList.add('active');
            successModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    };

    // Close Success Modal
    const closeSuccessModal = () => {
        if (successModal) {
            successModal.classList.remove('active');
            successModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    // Event Listeners for Quotation Modal Triggers
    triggerQuoteBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openQuoteModal();
        });
    });

    if (quoteModalClose) quoteModalClose.addEventListener('click', closeQuoteModal);
    if (quoteModalBackdrop) quoteModalBackdrop.addEventListener('click', closeQuoteModal);
    if (successModalClose) successModalClose.addEventListener('click', closeSuccessModal);
    if (successModalBackdrop) successModalBackdrop.addEventListener('click', closeSuccessModal);
    if (successModalDone) successModalDone.addEventListener('click', closeSuccessModal);

    // Close all modals on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (quoteModal && quoteModal.classList.contains('active')) closeQuoteModal();
            if (successModal && successModal.classList.contains('active')) closeSuccessModal();
        }
    });

    // Lead Generation & Google Sheets Submission Handler
    const leadForm = document.getElementById('lead-form');
    const toastContainer = document.getElementById('toast-container');

    const showToast = (message, type = 'success') => {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast-item ${type}`;
        const icon = type === 'success'
            ? '<i class="fa-solid fa-circle-check"></i>'
            : '<i class="fa-solid fa-triangle-exclamation"></i>';

        toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <h4>${type === 'success' ? 'ĐĂNG KÝ THÀNH CÔNG' : 'LỖI THÔNG TIN'}</h4>
        <p>${message}</p>
      </div>
      <button class="toast-close" aria-label="Đóng"><i class="fa-solid fa-xmark"></i></button>
    `;

        toastContainer.appendChild(toast);
        const autoRemove = setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 400);
        }, 5500);

        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 400);
        });
    };

    // Generic Submit Function to WordPress REST API / AJAX & Database
    let isLeadSubmitting = false;

    const handleLeadSubmission = async (formData, submitBtn, formElement, isModal = false) => {
        if (isLeadSubmitting) {
            return;
        }

        const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])[0-9]{8}$/;
        const cleanedPhone = (formData.phoneNumber || '').replace(/[\s.-]/g, '');

        if (!phoneRegex.test(cleanedPhone)) {
            showToast('Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số, ví dụ 0912345678).', 'error');
            return;
        }

        isLeadSubmitting = true;

        // Set Loading State
        if (submitBtn) {
            submitBtn.classList.add('is-loading');
            submitBtn.disabled = true;
        }

        const leadData = {
            fullName: formData.fullName || '',
            phoneNumber: cleanedPhone,
            email: formData.email || '',
            interestType: formData.interestType || 'Căn hộ Thương mại 2PN',
            consultTime: formData.consultTime || 'Sớm nhất có thể',
            source: (function() {
                var currentRef = window.ECOLIFE_REF || localStorage.getItem('ecolife_ref') || sessionStorage.getItem('ecolife_ref') || '';
                var baseSource = isModal ? 'Popup Nhận Báo Giá' : 'Form Đăng Ký Chân Trang';
                return currentRef ? ('ref=' + currentRef + ' - ' + baseSource) : baseSource;
            })(),
            ref: (window.ECOLIFE_REF || localStorage.getItem('ecolife_ref') || sessionStorage.getItem('ecolife_ref') || '')
        };

        // 1. Save to LocalStorage for offline safeguard
        try {
            const storedLeads = JSON.parse(localStorage.getItem('ecolife_leads') || '[]');
            storedLeads.push({ ...leadData, timestamp: new Date().toLocaleString('vi-VN') });
            localStorage.setItem('ecolife_leads', JSON.stringify(storedLeads));
        } catch (e) {
            console.warn('LocalStorage error:', e);
        }

        // 2. Post to WordPress Database & trigger automated SMTP thank you email
        let submitSuccess = false;
        let serverMessage = '';
        let lastEventId = '';

        const endpoints = [];
        if (window.ecolifeData && window.ecolifeData.restUrl) {
            endpoints.push({ url: window.ecolifeData.restUrl, type: 'rest' });
        } else {
            endpoints.push({ url: '/wp-json/ecolife/v1/lead', type: 'rest' });
        }
        endpoints.push({
            url: (window.ecolifeData?.themeUrl || '') + '/api/submit-lead.php',
            type: 'fallback'
        });

        for (const ep of endpoints) {
            try {
                let res;
                if (ep.type === 'ajax') {
                    const body = new URLSearchParams();
                    body.append('action', 'ecolife_submit_lead');
                    body.append('fullName', leadData.fullName);
                    body.append('phoneNumber', leadData.phoneNumber);
                    body.append('email', leadData.email);
                    body.append('interestType', leadData.interestType);
                    body.append('consultTime', leadData.consultTime);
                    body.append('source', leadData.source);
                    if (leadData.ref) body.append('ref', leadData.ref);
                    res = await fetch(ep.url, { method: 'POST', body: body });
                } else {
                    res = await fetch(ep.url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': window.ecolifeData?.nonce || ''
                        },
                        body: JSON.stringify(leadData)
                    });
                }

                if (res.ok) {
                    const json = await res.json();
                    if (json && (json.success || json.lead_id)) {
                        submitSuccess = true;
                        serverMessage = json.message || '';
                        if (json.event_id) {
                            lastEventId = json.event_id;
                        }
                        break; // Stop immediately on success
                    }
                }
            } catch (err) {
                console.warn('Attempt failed on endpoint:', ep.url, err);
            }
        }

        // Reset button & form
        if (submitBtn) {
            submitBtn.classList.remove('is-loading');
            submitBtn.disabled = false;
        }
        setTimeout(() => {
            isLeadSubmitting = false;
        }, 2500);
        if (formElement) formElement.reset();

        // Close quote modal if submitting from inside it
        if (isModal) closeQuoteModal();

        // Show Gorgeous Success Modal with personalized message
        showSuccessModal(leadData.fullName, leadData.phoneNumber, leadData.email);

        // Meta Pixel & CAPI Deduplication Event
        const eventId = lastEventId || ('lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
        if (typeof fbq === 'function') {
            fbq('track', 'Lead', {
                content_name: leadData.interestType,
                currency: 'VND',
                value: 1.0
            }, { eventID: eventId });
        }

        // Google Tag Lead Conversion
        if (typeof gtag === 'function') {
            gtag('event', 'generate_lead', {
                currency: 'VND',
                value: 1.0,
                event_label: leadData.interestType
            });
        }

        // Toast notification
        const toastMsg = leadData.email
            ? `Đã lưu thông tin Quý khách ${leadData.fullName} và gửi email xác nhận đến ${leadData.email}.`
            : `Đã ghi nhận yêu cầu của Quý khách ${leadData.fullName}. Chuyên viên sẽ liên hệ trong 15 phút.`;
        showToast(toastMsg, 'success');
    };

    // Submit Handler for Popup Modal Form
    if (quoteModalForm) {
        quoteModalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('btn-submit-quote-modal');
            const formData = {
                fullName: document.getElementById('quote-name')?.value.trim(),
                phoneNumber: document.getElementById('quote-phone')?.value.trim(),
                email: document.getElementById('quote-email')?.value.trim(),
                interestType: document.getElementById('quote-interest')?.value,
                consultTime: document.getElementById('quote-time')?.value
            };
            handleLeadSubmission(formData, submitBtn, quoteModalForm, true);
        });
    }

    // Submit Handler for In-Page Contact Section Form
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('btn-submit-lead');
            const formData = {
                fullName: document.getElementById('full-name')?.value.trim(),
                phoneNumber: document.getElementById('phone-number')?.value.trim(),
                email: document.getElementById('contact-email')?.value.trim() || '',
                interestType: document.getElementById('interest-type')?.value,
                consultTime: 'Sớm nhất có thể'
            };
            handleLeadSubmission(formData, submitBtn, leadForm, false);
        });
    }

    // ==========================================================================
    // 11. Mobile Slidedots Pagination Engine
    // ==========================================================================
    const initMobileSliderDots = () => {
        const sliders = [
            { container: document.querySelector('.concept-grid'), dotsWrap: document.getElementById('dots-concept') },
            { container: document.querySelector('.living-timeline-grid'), dotsWrap: document.getElementById('dots-living') },
            { container: document.querySelector('.gallery-grid'), dotsWrap: document.getElementById('dots-gallery') },
            { container: document.querySelector('.location-grid'), dotsWrap: document.getElementById('dots-location') }
        ];

        sliders.forEach(({ container, dotsWrap }) => {
            if (!container || !dotsWrap) return;

            const refreshDots = () => {
                if (window.innerWidth > 768) {
                    dotsWrap.innerHTML = '';
                    return;
                }

                const cards = Array.from(container.children).filter(c => {
                    return c.classList.contains('concept-card') ||
                        c.classList.contains('living-card') ||
                        c.classList.contains('gallery-card') ||
                        c.classList.contains('location-card');
                }).filter(c => window.getComputedStyle(c).display !== 'none');

                if (cards.length <= 1) {
                    dotsWrap.innerHTML = '';
                    return;
                }

                if (dotsWrap.children.length !== cards.length) {
                    dotsWrap.innerHTML = '';
                    cards.forEach((card, idx) => {
                        const dot = document.createElement('button');
                        dot.type = 'button';
                        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
                        dot.setAttribute('aria-label', `Trang ${idx + 1}`);
                        dot.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const cardOffset = card.offsetLeft - container.offsetLeft;
                            const centerOffset = cardOffset - (container.offsetWidth - card.offsetWidth) / 2;
                            container.scrollTo({ left: Math.max(0, centerOffset), behavior: 'smooth' });
                        });
                        dotsWrap.appendChild(dot);
                    });
                }

                // Active dot calculation based on center position
                const scrollLeft = container.scrollLeft;
                const containerCenter = scrollLeft + container.offsetWidth / 2;
                let closestIdx = 0;
                let minDiff = Infinity;

                cards.forEach((card, idx) => {
                    const cardCenter = card.offsetLeft - container.offsetLeft + card.offsetWidth / 2;
                    const diff = Math.abs(containerCenter - cardCenter);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closestIdx = idx;
                    }
                });

                Array.from(dotsWrap.children).forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === closestIdx);
                });
            };

            refreshDots();
            container.addEventListener('scroll', () => {
                requestAnimationFrame(refreshDots);
            }, { passive: true });

            container._refreshDots = refreshDots;
        });
    };

    initMobileSliderDots();

    window.addEventListener('resize', () => {
        document.querySelectorAll('.concept-grid, .living-timeline-grid, .gallery-grid, .location-grid').forEach(c => {
            if (c._refreshDots) c._refreshDots();
        });
    }, { passive: true });

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                const galleryGrid = document.querySelector('.gallery-grid');
                if (galleryGrid && galleryGrid._refreshDots) {
                    galleryGrid._refreshDots();
                }
            }, 300);
        });
    });

    // Meta Pixel & Google Analytics Engagement Event Tracking
    // Track Contact on Hotline Clicks
    document.querySelectorAll('a[href^="tel:"], #float-call, .header-hotline-chip, .bar-btn-call').forEach(el => {
        el.addEventListener('click', () => {
            if (typeof fbq === 'function') {
                fbq('track', 'Contact', { content_name: 'Hotline 0398 055 588' });
            }
            if (typeof gtag === 'function') {
                gtag('event', 'click_hotline', { event_category: 'engagement', event_label: '0398 055 588' });
            }
        });
    });

    // Track ViewContent on Key Sections
    if ('IntersectionObserver' in window) {
        const trackSections = ['commercial', 'concept', 'masterplan', 'progress'];
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const secId = entry.target.id;
                    if (trackSections.includes(secId)) {
                        if (typeof fbq === 'function') {
                            fbq('track', 'ViewContent', {
                                content_name: secId,
                                content_category: 'Section View'
                            });
                        }
                        sectionObserver.unobserve(entry.target);
                    }
                }
            });
        }, { threshold: 0.35 });

        trackSections.forEach(id => {
            const el = document.getElementById(id);
            if (el) sectionObserver.observe(el);
        });
    }

    // Console Welcome Branding
    console.log(
        '%c🌿 ECOLIFE SIGNATURE\n%cThiết kế Cảnh quan bởi APA Consultant | Chủ Đầu Tư: Ban Quản Lý Dự Án EcoLife Signature\n%cGoogle Sheet Connected: ' + GOOGLE_SHEET_ID,
        'color: #d4af37; font-size: 16px; font-weight: bold; background: #07130e; padding: 8px 14px; border-radius: 6px;',
        'color: #8fa89b; font-size: 12px; margin-top: 4px;',
        'color: #10b981; font-size: 11px; margin-top: 2px;'
    );
});
