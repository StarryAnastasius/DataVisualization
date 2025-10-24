// 经典特写轮播功能
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.goddess-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// 自动轮播
let slideInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

// 切换幻灯片
function changeSlide(direction) {
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
    
    // 重置自动轮播计时器
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// 跳转到指定幻灯片
function goToSlide(slideNumber) {
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = slideNumber - 1;
    
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
    
    // 重置自动轮播计时器
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Banner轮播功能
let currentBannerSlide = 0;
const bannerSlides = document.querySelectorAll('.slide');
const totalBannerSlides = bannerSlides.length;

// Banner自动轮播
let bannerInterval = setInterval(() => {
    changeBannerSlide(1);
}, 4000);

function changeBannerSlide(direction) {
    bannerSlides[currentBannerSlide].classList.remove('active');
    
    currentBannerSlide += direction;
    
    if (currentBannerSlide >= totalBannerSlides) {
        currentBannerSlide = 0;
    } else if (currentBannerSlide < 0) {
        currentBannerSlide = totalBannerSlides - 1;
    }
    
    bannerSlides[currentBannerSlide].classList.add('active');
}

// 平滑滚动导航
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Canvas绘制电影海报
function drawMovieCanvas() {
    const canvas = document.getElementById('movieCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 创建渐变背景
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.5, '#E6B8A2');
    gradient.addColorStop(1, '#8B4B8C');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 绘制电影胶片边框
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    for (let i = 0; i < height; i += 20) {
        ctx.fillRect(0, i, 20, 10);
        ctx.fillRect(width - 20, i, 20, 10);
    }
    
    // 绘制标题
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 5;
    ctx.fillText('经典电影海报展示', width / 2, height / 2 - 20);
    
    // 绘制副标题
    ctx.font = 'italic 18px Cormorant Garamond, serif';
    ctx.fillText('European Classical Cinema Collection', width / 2, height / 2 + 20);
    
    // 重置阴影
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
}

// 表格交互功能
function toggleDetails(filmId) {
    const detailRow = document.querySelector(`.film-details.${filmId}`);
    const button = document.querySelector(`[onclick="toggleDetails('${filmId}')"]`);
    
    if (detailRow.style.display === 'none') {
        detailRow.style.display = 'table-row';
        button.textContent = '收起';
        button.style.background = 'linear-gradient(45deg, #8B4B8C, #E6B8A2)';
    } else {
        detailRow.style.display = 'none';
        button.textContent = '详情';
        button.style.background = 'linear-gradient(45deg, #E6B8A2, #8B4B8C)';
    }
}

// 展开/收起全部功能
function expandAllDetails() {
    const detailRows = document.querySelectorAll('.film-details');
    const buttons = document.querySelectorAll('.expand-btn');
    
    detailRows.forEach(row => {
        row.style.display = 'table-row';
    });
    
    buttons.forEach(button => {
        button.textContent = '收起';
        button.style.background = 'linear-gradient(45deg, #8B4B8C, #E6B8A2)';
    });
}

function collapseAllDetails() {
    const detailRows = document.querySelectorAll('.film-details');
    const buttons = document.querySelectorAll('.expand-btn');
    
    detailRows.forEach(row => {
        row.style.display = 'none';
    });
    
    buttons.forEach(button => {
        button.textContent = '详情';
        button.style.background = 'linear-gradient(45deg, #E6B8A2, #8B4B8C)';
    });
}

// 表格搜索功能
function setupTableSearch() {
    const searchInput = document.getElementById('tableSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('.film-row');
        
        rows.forEach(row => {
            const filmName = row.querySelector('td:first-child').textContent.toLowerCase();
            if (filmName.includes(searchTerm) || searchTerm === '') {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// 显示更多电影功能
function setupShowMore() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (!showMoreBtn) return;
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', function() {
        const hiddenRows = document.querySelectorAll('.hidden-row');
        
        if (!isExpanded) {
            hiddenRows.forEach(row => {
                row.classList.add('show');
            });
            this.textContent = '收起电影列表';
            isExpanded = true;
        } else {
            hiddenRows.forEach(row => {
                row.classList.remove('show');
            });
            this.textContent = '显示更多电影 (25部)';
            isExpanded = false;
        }
    });
}

// 显示通知
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #D4AF37, #8B4B8C);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        font-size: 0.9rem;
        line-height: 1.4;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 画廊项目点击事件
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const film = this.getAttribute('data-film');
        showFilmDetails(film);
    });
});

// 显示电影详情
function showFilmDetails(film) {
    const filmDetails = {
        'gone-with-wind': {
            title: '乱世佳人',
            year: '1939',
            director: '维克多·弗莱明',
            stars: '费雯·丽, 克拉克·盖博',
            description: '改编自玛格丽特·米切尔的小说《飘》，讲述了南北战争期间斯嘉丽·奥哈拉的生活和爱情故事。'
        },
        'hamilton-lady': {
            title: '汉密尔顿夫人',
            year: '1941',
            director: '亚历山大·柯达',
            stars: '费雯·丽, 劳伦斯·奥利弗',
            description: '讲述18世纪英国海军英雄纳尔逊与汉密尔顿夫人之间传奇爱情故事的历史传记片。'
        },
        'age-of-innocence': {
            title: '纯真年代',
            year: '1993',
            director: '马丁·斯科塞斯',
            stars: '米歇尔·菲佛, 丹尼尔·戴-刘易斯',
            description: '改编自伊迪丝·华顿同名小说，描绘19世纪70年代纽约上流社会的爱情悲剧。'
        },
        'pride-prejudice': {
            title: '傲慢与偏见',
            year: '2005',
            director: '乔·赖特',
            stars: '凯拉·奈特莉, 马修·麦克费登',
            description: '改编自简·奥斯汀同名小说，讲述伊丽莎白·班纳特与达西先生的爱情故事。'
        },
        'sense-sensibility': {
            title: '理智与情感',
            year: '1995',
            director: '李安',
            stars: '艾玛·汤普森, 凯特·温斯莱特',
            description: '改编自简·奥斯汀同名小说，讲述达什伍德姐妹的爱情故事。'
        },
        'little-women': {
            title: '小妇人',
            year: '1994',
            director: '吉莉安·阿姆斯特朗',
            stars: '薇诺娜·瑞德, 苏珊·萨兰登',
            description: '改编自路易莎·梅·奥尔科特同名小说，讲述马奇家四姐妹的成长故事。'
        }
    };
    
    const details = filmDetails[film];
    if (details) {
        const modal = createFilmModal(details);
        document.body.appendChild(modal);
        
        // 显示动画
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
    }
}

// 创建电影详情模态框
function createFilmModal(details) {
    const modal = document.createElement('div');
    modal.className = 'film-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${details.title}</h2>
            <div class="modal-details">
                <p><strong>年份：</strong>${details.year}</p>
                <p><strong>导演：</strong>${details.director}</p>
                <p><strong>主演：</strong>${details.stars}</p>
                <p><strong>简介：</strong>${details.description}</p>
            </div>
            <div class="modal-actions">
                <button class="btn-primary">查看豆瓣详情</button>
                <button class="btn-secondary">经典台词</button>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .film-modal.show {
            opacity: 1;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        .modal-content {
            position: relative;
            background: white;
            padding: 2rem;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        .film-modal.show .modal-content {
            transform: scale(1);
        }
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #8B4B8C;
        }
        .modal-details p {
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        .btn-primary, .btn-secondary {
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-primary {
            background: linear-gradient(45deg, #D4AF37, #8B4B8C);
            color: white;
        }
        .btn-secondary {
            background: transparent;
            color: #8B4B8C;
            border: 2px solid #8B4B8C;
        }
        .btn-primary:hover, .btn-secondary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    // 关闭模态框
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    return modal;
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // 初始化Canvas绘制
    drawMovieCanvas();
    
    // 初始化表格功能
    setupTableSearch();
    setupShowMore();
    
    // 绑定表格控制按钮
    const expandAllBtn = document.getElementById('expandAllBtn');
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', expandAllDetails);
    }
    
    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', collapseAllDetails);
    }
    
    // 添加滚动动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.film-cover-item, .gallery-item, .goddess-slide').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        } else if (e.key === 'Escape') {
            // 关闭任何打开的模态框
            const modals = document.querySelectorAll('.film-modal');
            modals.forEach(modal => {
                modal.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                }, 300);
            });
        }
    });
});

// 添加鼠标悬停效果
document.querySelectorAll('.film-cover-item, .gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 添加点击波纹效果
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// 为所有按钮添加波纹效果
document.querySelectorAll('button, .gallery-item, .film-cover-item').forEach(button => {
    button.addEventListener('click', createRipple);
});

// 添加波纹效果的CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 600ms linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
