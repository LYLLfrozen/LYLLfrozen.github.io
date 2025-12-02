document.addEventListener('DOMContentLoaded', function() {
    // 添加技能标签点击效果
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // 添加卡片悬停效果增强
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = `4px solid var(--accent-color)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
        });
    });
    
    // 打印成 PDF 功能
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-file-pdf"></i> 打印成 PDF';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 30px;
        cursor: pointer;
        box-shadow: var(--shadow);
        z-index: 100;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1rem;
        transition: var(--transition);
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow)';
    });
    
    printButton.addEventListener('click', function() {
        // 导出整页（含 header/footer），并尽量处理分页与隐藏样式问题
        const element = document.documentElement || document.body;

        // 保存可能会被 print 样式隐藏的元素的原始 display 值，导出后恢复
        const toggled = [];
        ['header', 'footer'].forEach(sel => {
            const el = document.querySelector(sel);
            if (el) {
                toggled.push({ el, display: el.style.display });
                el.style.display = 'block';
            }
        });

        const opt = {
            margin:       8, // mm
            filename:     `LYLL_简历_${new Date().toISOString().slice(0,10)}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, scrollY: -window.scrollY },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak:    { mode: ['css', 'legacy'] }
        };

        if (typeof html2pdf === 'function') {
            // 先微调滚动到顶部，确保从页面顶部开始渲染
            const prevScroll = window.scrollY || window.pageYOffset;
            window.scrollTo(0, 0);

            html2pdf().set(opt).from(element).save().finally(() => {
                // 恢复滚动位置和原始 display
                window.scrollTo(0, prevScroll);
                toggled.forEach(item => item.el.style.display = item.display || '');
            });
        } else {
            // 回退到浏览器打印对话框（用户可选择保存为 PDF）
            window.print();
            toggled.forEach(item => item.el.style.display = item.display || '');
        }
    });
    
    document.body.appendChild(printButton);
    
    // 添加时间线动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // 更新简历年份
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('footer p:nth-child(2)');
    if (yearElement) {
        yearElement.textContent = `最后更新：${currentYear}年12月`;
    }
});