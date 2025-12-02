document.addEventListener('DOMContentLoaded', function() {
    // 页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // ==================== 语言切换功能 ====================
    let currentLang = localStorage.getItem('language') || 'en';
    const langToggle = document.getElementById('langToggle');
    
    // 初始化语言（始终根据 currentLang 初始化，默认 'en'）
    function initLanguage() {
        // 直接使用当前语言初始化（不使用动画），避免按钮与内容闪烁
        switchToLanguage(currentLang, false);
    }
    
    // 切换语言函数
    function switchToLanguage(lang, animate = true) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // 添加切换动画类
        if (animate) {
            document.body.classList.add('lang-switching');
        }
        
        // 获取所有需要翻译的元素
        const elements = document.querySelectorAll('[data-en][data-zh]');
        
        elements.forEach((el, index) => {
            if (animate) {
                // 延迟动画，创建波浪效果
                setTimeout(() => {
                    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        el.textContent = lang === 'en' ? el.dataset.en : el.dataset.zh;
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 150);
                }, index * 10); // 每个元素延迟10ms
            } else {
                el.textContent = lang === 'en' ? el.dataset.en : el.dataset.zh;
            }
        });
        
        // 更新按钮文本
        const langText = langToggle.querySelector('.lang-text');
        if (animate) {
            langText.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            langText.style.opacity = '0';
            langText.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                langText.textContent = lang === 'en' ? 'EN' : '中文';
                langText.style.opacity = '1';
                langText.style.transform = 'scale(1)';
            }, 200);
        } else {
            langText.textContent = lang === 'en' ? 'EN' : '中文';
        }
        
        // 移除动画类
        if (animate) {
            setTimeout(() => {
                document.body.classList.remove('lang-switching');
            }, elements.length * 10 + 500);
        }
        
        // 更新HTML lang属性
        document.documentElement.lang = lang === 'en' ? 'en-US' : 'zh-CN';
        
        // 更新页面标题
        const titleEl = document.querySelector('title');
        if (titleEl && titleEl.dataset.en && titleEl.dataset.zh) {
            titleEl.textContent = lang === 'en' ? titleEl.dataset.en : titleEl.dataset.zh;
        }
        
        // （已移除）PDF 按钮更新逻辑
    }
    
    // 显示语言切换提示
    function showLangToast(lang) {
        const toast = document.createElement('div');
        toast.textContent = lang === 'zh' ? '🇨🇳 已切换至中文' : '🇺🇸 Switched to English';
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            z-index: 10000;
            font-size: 0.9rem;
            font-weight: 600;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    
    // 语言切换按钮点击事件
    langToggle.addEventListener('click', function() {
        const newLang = currentLang === 'en' ? 'zh' : 'en';
        switchToLanguage(newLang, true);
        showLangToast(newLang);
        
        // 按钮动画
        this.style.transform = 'scale(0.95) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
    
    // 键盘快捷键 Ctrl+L 或 Cmd+L 切换语言
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            const newLang = currentLang === 'en' ? 'zh' : 'en';
            switchToLanguage(newLang, true);
            showLangToast(newLang);
            
            // 按钮闪烁提示
            langToggle.style.transform = 'scale(1.1)';
            langToggle.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.6)';
            setTimeout(() => {
                langToggle.style.transform = '';
                langToggle.style.boxShadow = '';
            }, 300);
        }
    });
    
    // 初始化
    initLanguage();

    // 添加技能标签交互效果
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        // 添加入场动画延迟
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        setTimeout(() => {
            tag.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, 100 * index);

        // 点击效果
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }, 100);
        });
    });
    
    // 卡片视差效果
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
    
    // 滚动进度条
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #e94560, #00d9ff);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 2px 8px rgba(233, 69, 96, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // 返回顶部按钮
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #e94560, #ff6b9d);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(233, 69, 96, 0.4);
        z-index: 100;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
    `;
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
            setTimeout(() => backToTop.style.opacity = '1', 10);
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => backToTop.style.display = 'none', 300);
        }
    });

    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = '0 8px 24px rgba(233, 69, 96, 0.6)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 16px rgba(233, 69, 96, 0.4)';
    });

    document.body.appendChild(backToTop);
    
    // 已移除PDF导出按钮和逻辑
    
    // 增强的滚动观察器 - 元素进入视口动画
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.timeline-item, .certificate-item');
    animatedElements.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        fadeInObserver.observe(item);
    });

    // 高性能鼠标光标效果
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(233, 69, 96, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        display: none;
        left: 0;
        top: 0;
        will-change: transform;
        transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease;
    `;
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: rgba(233, 69, 96, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        display: none;
        left: 0;
        top: 0;
        will-change: transform;
        transition: width 0.15s ease, height 0.15s ease, background 0.15s ease;
    `;
    document.body.appendChild(cursorDot);

    // 仅在大屏设备上显示自定义光标
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';

        // 使用变量存储光标位置,提升性能
        let cursorX = window.innerWidth / 2;
        let cursorY = window.innerHeight / 2;
        let cursorDotX = window.innerWidth / 2;
        let cursorDotY = window.innerHeight / 2;
        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;

        // 监听鼠标移动
        document.addEventListener('mousemove', function(e) {
            targetX = e.clientX;
            targetY = e.clientY;
        });

        // 使用 requestAnimationFrame 实现流畅的光标跟随
        function animateCursor() {
            // 外圈光标 - 有延迟跟随效果
            const dx = targetX - cursorX;
            const dy = targetY - cursorY;
            cursorX += dx * 0.15; // 缓动系数,越小延迟越大
            cursorY += dy * 0.15;
            
            // 内圈光标 - 快速跟随
            const dxDot = targetX - cursorDotX;
            const dyDot = targetY - cursorDotY;
            cursorDotX += dxDot * 0.3; // 更快的跟随速度
            cursorDotY += dyDot * 0.3;
            
            // 使用 transform 代替 left/top,性能更好
            cursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;
            cursorDot.style.transform = `translate3d(${cursorDotX - 3}px, ${cursorDotY - 3}px, 0)`;
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();

        // 悬停在可点击元素上时放大
        const clickables = document.querySelectorAll('a, button, .skill-tag, .certificate-item, .card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.borderColor = 'rgba(0, 217, 255, 0.8)';
                cursorDot.style.width = '10px';
                cursorDot.style.height = '10px';
                cursorDot.style.background = 'rgba(0, 217, 255, 0.8)';
            });
            
            el.addEventListener('mouseleave', function() {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.borderColor = 'rgba(233, 69, 96, 0.6)';
                cursorDot.style.width = '6px';
                cursorDot.style.height = '6px';
                cursorDot.style.background = 'rgba(233, 69, 96, 0.8)';
            });
        });

        // 点击时的缩放效果
        document.addEventListener('mousedown', function() {
            cursor.style.width = '16px';
            cursor.style.height = '16px';
            cursorDot.style.width = '4px';
            cursorDot.style.height = '4px';
        });

        document.addEventListener('mouseup', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorDot.style.width = '6px';
            cursorDot.style.height = '6px';
        });
    }

    // 联系信息复制功能
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            navigator.clipboard.writeText(text).then(() => {
                const toast = document.createElement('div');
                toast.textContent = '已复制: ' + text;
                toast.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%) translateY(-100px);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    z-index: 10000;
                    font-size: 0.9rem;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                `;
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.style.transform = 'translateX(-50%) translateY(0)';
                    toast.style.opacity = '1';
                }, 10);
                
                setTimeout(() => {
                    toast.style.transform = 'translateX(-50%) translateY(-100px)';
                    toast.style.opacity = '0';
                    setTimeout(() => toast.remove(), 300);
                }, 2000);
            });
        });
    });
    
    // 更新简历年份
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
    const yearElement = document.querySelector('footer p:nth-child(2)');
    if (yearElement) {
        yearElement.textContent = `Last updated: ${currentMonth} ${currentYear}`;
    }

    // 性能优化：防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 响应式处理
    const handleResize = debounce(() => {
        const isMobile = window.innerWidth <= 768;
        cursor.style.display = isMobile ? 'none' : 'block';
        cursorDot.style.display = isMobile ? 'none' : 'block';
        
        // 在移动端隐藏自定义光标，桌面端显示
        if (isMobile) {
            document.body.classList.remove('has-custom-cursor');
        } else {
            document.body.classList.add('has-custom-cursor');
        }
    }, 250);

    window.addEventListener('resize', handleResize);
    
    // 初始化时隐藏默认光标(仅桌面端)
    if (window.innerWidth > 768) {
        // 添加类来隐藏默认光标
        document.body.classList.add('has-custom-cursor');
    }
});