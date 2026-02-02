/* duso_ecom Shopify Theme - JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Header scroll effect
    initHeaderScroll();
    
    // Mobile menu
    initMobileMenu();
    
    // Services tabs
    initServicesTabs();
    
    // Store logos scroll
    initStoreLogosScroll();
    
    // AI Assistant
    initAIAssistant();
    
    // Reinitialize icons after dynamic content
    observeDynamicContent();
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================

function initHeaderScroll() {
    const header = document.getElementById('main-header');
    const topbar = document.getElementById('header-topbar');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            header.classList.add('glass-strong', 'shadow-2xl');
            header.classList.remove('bg-transparent');
            header.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
            if (topbar) topbar.classList.replace('py-2', 'py-1');
        } else {
            header.classList.remove('glass-strong', 'shadow-2xl');
            header.classList.add('bg-transparent');
            header.style.borderBottom = 'none';
            if (topbar) topbar.classList.replace('py-1', 'py-2');
        }
    });
}

// ==========================================
// MOBILE MENU
// ==========================================

function initMobileMenu() {
    window.toggleMobileMenu = function() {
        const menu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-menu-icon');
        
        if (!menu) return;
        
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            if (menuIcon) menuIcon.classList.add('hidden');
            if (closeIcon) closeIcon.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
            if (menuIcon) menuIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
        }
        
        reinitIcons();
    };
}

// ==========================================
// SERVICES TABS
// ==========================================

function initServicesTabs() {
    window.showService = function(serviceId) {
        // Hide all content and features
        document.querySelectorAll('.service-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.features-list').forEach(el => el.classList.add('hidden'));
        
        // Reset all tabs
        document.querySelectorAll('#service-tabs button').forEach(btn => {
            btn.className = 'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 glass text-gray-400 hover:text-white hover:border-orange-500/30 border border-transparent';
        });
        
        // Show selected content and features
        const content = document.getElementById('content-' + serviceId);
        const features = document.getElementById('features-' + serviceId);
        
        if (content) content.classList.remove('hidden');
        if (features) features.classList.remove('hidden');
        
        // Highlight active tab
        const tab = document.getElementById('tab-' + serviceId);
        if (tab) {
            tab.className = 'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30';
        }
        
        reinitIcons();
    };
}

// ==========================================
// STORE LOGOS SCROLL
// ==========================================

function initStoreLogosScroll() {
    const scrollContainer = document.getElementById('store-logos-scroll');
    if (!scrollContainer) return;
    
    let scrollPosition = 0;
    const speed = 0.3;
    let animationId = null;
    
    function animate() {
        scrollPosition += speed;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
            scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
        animationId = requestAnimationFrame(animate);
    }
    
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            animationId = requestAnimationFrame(animate);
            observer.disconnect();
        }
    }, { threshold: 0.1 });
    
    observer.observe(scrollContainer);
}

// ==========================================
// AI ASSISTANT
// ==========================================

const SECRET_CODE = 'квантовий кіт шрёдінгера 2047';
let conversationHistory = [];
let aiChatOpen = false;

function initAIAssistant() {
    window.toggleAIChat = function() {
        aiChatOpen = !aiChatOpen;
        const panel = document.getElementById('ai-chat-panel');
        const chatIcon = document.getElementById('chat-icon');
        const closeIcon = document.getElementById('close-icon');
        
        if (!panel) return;
        
        if (aiChatOpen) {
            panel.classList.remove('hidden');
            panel.classList.add('flex');
            if (chatIcon) chatIcon.classList.add('hidden');
            if (closeIcon) closeIcon.classList.remove('hidden');
        } else {
            panel.classList.add('hidden');
            panel.classList.remove('flex');
            if (chatIcon) chatIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
        }
        
        reinitIcons();
    };
    
    window.sendSuggestion = function(text) {
        const input = document.getElementById('ai-input');
        if (input) {
            input.value = text;
            sendMessage();
        }
    };
    
    window.sendMessage = async function() {
        const input = document.getElementById('ai-input');
        const message = input ? input.value.trim() : '';
        
        if (!message) return;
        
        // Check for secret code
        if (message.toLowerCase() === SECRET_CODE.toLowerCase()) {
            addMessage(message, true);
            input.value = '';
            showAdminPanel();
            return;
        }
        
        // Hide suggestions after first message
        const suggestions = document.getElementById('ai-suggestions');
        if (suggestions) suggestions.classList.add('hidden');
        
        addMessage(message, true);
        input.value = '';
        
        conversationHistory.push({ role: 'user', content: message });
        
        showTypingIndicator();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        hideTypingIndicator();
        
        const fallbackResponse = getFallbackResponse(message);
        addMessage(fallbackResponse);
        conversationHistory.push({ role: 'assistant', content: fallbackResponse });
    };
    
    window.showAdminPanel = function() {
        const panel = document.getElementById('admin-panel');
        if (panel) panel.classList.remove('hidden');
    };
    
    window.closeAdminPanel = function() {
        const panel = document.getElementById('admin-panel');
        if (panel) panel.classList.add('hidden');
    };
}

function addMessage(content, isUser = false) {
    const messagesContainer = document.getElementById('ai-messages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'flex gap-3 justify-end' : 'flex gap-3';
    
    if (isUser) {
        messageDiv.innerHTML = `
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl rounded-tr-sm p-4 max-w-[280px]">
                <p class="text-white text-sm">${escapeHtml(content)}</p>
            </div>
            <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <i data-lucide="user" class="w-4 h-4 text-white"></i>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <i data-lucide="bot" class="w-4 h-4 text-white"></i>
            </div>
            <div class="glass rounded-2xl rounded-tl-sm p-4 max-w-[280px]">
                <p class="text-white text-sm">${escapeHtml(content)}</p>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    reinitIcons();
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('ai-messages');
    if (!messagesContainer) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'flex gap-3';
    typingDiv.innerHTML = `
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
            <i data-lucide="bot" class="w-4 h-4 text-white"></i>
        </div>
        <div class="glass rounded-2xl rounded-tl-sm p-4">
            <div class="flex gap-1">
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    reinitIcons();
}

function hideTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('стоимость') || lowerMessage.includes('цена') || lowerMessage.includes('сколько')) {
        return 'Стоимость разработки Shopify магазина начинается от $2,500. Точная цена зависит от сложности проекта, количества товаров и необходимых интеграций. Хотите получить индивидуальный расчёт? Напишите нам в Telegram: @duso_ecom';
    }
    
    if (lowerMessage.includes('гарант') || lowerMessage.includes('возврат')) {
        return 'Мы даём гарантию на все наши работы: ✓ Бесплатные правки в течение 30 дней после запуска ✓ Техподдержка 24/7 ✓ Возврат 100% при невыполнении условий договора. Работаем по договору с чётким ТЗ.';
    }
    
    if (lowerMessage.includes('кейс') || lowerMessage.includes('портфолио') || lowerMessage.includes('пример')) {
        return 'У нас более 6500+ успешных проектов! Средний рост продаж наших клиентов +180%. Посмотрите раздел "Портфолио" на сайте или напишите нам — пришлём релевантные кейсы из вашей ниши.';
    }
    
    if (lowerMessage.includes('срок') || lowerMessage.includes('время') || lowerMessage.includes('долго')) {
        return 'Сроки разработки: • Базовый магазин: 2-3 недели • Средний проект: 3-4 недели • Сложный/кастомный: 4-6 недель. Мы всегда укладываемся в оговоренные сроки!';
    }
    
    return 'Спасибо за ваш вопрос! Для детальной консультации свяжитесь с нами: Telegram: @duso_ecom или оставьте заявку на сайте. Наши эксперты ответят в течение 15 минут!';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function reinitIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function observeDynamicContent() {
    const observer = new MutationObserver(function(mutations) {
        reinitIcons();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
