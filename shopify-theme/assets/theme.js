/* duso_ecom Shopify Theme - JavaScript */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons with delay to prevent blocking
    setTimeout(function() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
    
    // Initialize components
    initHeaderScroll();
    initMobileMenu();
    initServicesTabs();
    initAIAssistant();
    
    // Delay heavy animations
    setTimeout(function() {
        initStoreLogosScroll();
    }, 500);
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================

function initHeaderScroll() {
    var header = document.getElementById('main-header');
    var topbar = document.getElementById('header-topbar');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        var scrolled = window.scrollY > 50;
        
        if (scrolled) {
            header.classList.add('glass-strong');
            header.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        } else {
            header.classList.remove('glass-strong');
            header.style.borderBottom = 'none';
        }
    }, { passive: true });
}

// ==========================================
// MOBILE MENU
// ==========================================

function initMobileMenu() {
    window.toggleMobileMenu = function() {
        var menu = document.getElementById('mobile-menu');
        var menuIcon = document.getElementById('menu-icon');
        var closeIcon = document.getElementById('close-menu-icon');
        
        if (!menu) return;
        
        var isHidden = menu.classList.contains('hidden');
        
        if (isHidden) {
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
        var contents = document.querySelectorAll('.service-content');
        var features = document.querySelectorAll('.features-list');
        var tabs = document.querySelectorAll('#service-tabs button');
        
        contents.forEach(function(el) { el.classList.add('hidden'); });
        features.forEach(function(el) { el.classList.add('hidden'); });
        
        // Reset all tabs
        tabs.forEach(function(btn) {
            btn.className = 'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 glass text-gray-400 hover:text-white border border-transparent';
        });
        
        // Show selected content and features
        var content = document.getElementById('content-' + serviceId);
        var featureList = document.getElementById('features-' + serviceId);
        var tab = document.getElementById('tab-' + serviceId);
        
        if (content) content.classList.remove('hidden');
        if (featureList) featureList.classList.remove('hidden');
        if (tab) {
            tab.className = 'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white';
        }
        
        reinitIcons();
    };
}

// ==========================================
// STORE LOGOS SCROLL (Optimized - no infinite loop)
// ==========================================

function initStoreLogosScroll() {
    var scrollContainer = document.getElementById('store-logos-scroll');
    if (!scrollContainer) return;
    
    // Only run animation when visible
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                scrollContainer.style.animation = 'scrollLogos 30s linear infinite';
            } else {
                scrollContainer.style.animation = 'none';
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(scrollContainer);
}

// ==========================================
// AI ASSISTANT
// ==========================================

var SECRET_CODE = 'квантовий кіт шрёдінгера 2047';
var conversationHistory = [];
var aiChatOpen = false;

function initAIAssistant() {
    window.toggleAIChat = function() {
        aiChatOpen = !aiChatOpen;
        var panel = document.getElementById('ai-chat-panel');
        var chatIcon = document.getElementById('chat-icon');
        var closeIcon = document.getElementById('close-icon');
        
        if (!panel) return;
        
        if (aiChatOpen) {
            panel.classList.remove('hidden');
            panel.style.display = 'flex';
            panel.style.flexDirection = 'column';
            if (chatIcon) chatIcon.classList.add('hidden');
            if (closeIcon) closeIcon.classList.remove('hidden');
        } else {
            panel.classList.add('hidden');
            panel.style.display = 'none';
            if (chatIcon) chatIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
        }
        
        reinitIcons();
    };
    
    window.sendSuggestion = function(text) {
        var input = document.getElementById('ai-input');
        if (input) {
            input.value = text;
            sendMessage();
        }
    };
    
    window.sendMessage = function() {
        var input = document.getElementById('ai-input');
        var message = input ? input.value.trim() : '';
        
        if (!message) return;
        
        // Check for secret code
        if (message.toLowerCase() === SECRET_CODE.toLowerCase()) {
            addMessage(message, true);
            input.value = '';
            showAdminPanel();
            return;
        }
        
        // Hide suggestions
        var suggestions = document.getElementById('ai-suggestions');
        if (suggestions) suggestions.classList.add('hidden');
        
        addMessage(message, true);
        input.value = '';
        
        // Show typing and respond
        showTypingIndicator();
        
        setTimeout(function() {
            hideTypingIndicator();
            var response = getFallbackResponse(message);
            addMessage(response, false);
        }, 1500);
    };
    
    window.showAdminPanel = function() {
        var panel = document.getElementById('admin-panel');
        if (panel) panel.classList.remove('hidden');
    };
    
    window.closeAdminPanel = function() {
        var panel = document.getElementById('admin-panel');
        if (panel) panel.classList.add('hidden');
    };
}

function addMessage(content, isUser) {
    var container = document.getElementById('ai-messages');
    if (!container) return;
    
    var div = document.createElement('div');
    div.className = isUser ? 'flex gap-3 justify-end' : 'flex gap-3';
    
    var escaped = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    if (isUser) {
        div.innerHTML = '<div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl rounded-tr-sm p-4 max-w-xs"><p class="text-white text-sm">' + escaped + '</p></div><div class="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0"><i data-lucide="user" class="w-4 h-4 text-white"></i></div>';
    } else {
        div.innerHTML = '<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0"><i data-lucide="bot" class="w-4 h-4 text-white"></i></div><div class="glass rounded-2xl rounded-tl-sm p-4 max-w-xs"><p class="text-white text-sm">' + escaped + '</p></div>';
    }
    
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    reinitIcons();
}

function showTypingIndicator() {
    var container = document.getElementById('ai-messages');
    if (!container) return;
    
    var div = document.createElement('div');
    div.id = 'typing-indicator';
    div.className = 'flex gap-3';
    div.innerHTML = '<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0"><i data-lucide="bot" class="w-4 h-4 text-white"></i></div><div class="glass rounded-2xl rounded-tl-sm p-4"><div class="flex gap-1"><span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span><span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:0.15s"></span><span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:0.3s"></span></div></div>';
    
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    reinitIcons();
}

function hideTypingIndicator() {
    var typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

function getFallbackResponse(message) {
    var m = message.toLowerCase();
    
    if (m.indexOf('стоимость') !== -1 || m.indexOf('цена') !== -1 || m.indexOf('сколько') !== -1) {
        return 'Стоимость разработки Shopify магазина начинается от $2,500. Точная цена зависит от сложности проекта. Напишите нам в Telegram: @duso_ecom';
    }
    
    if (m.indexOf('гарант') !== -1 || m.indexOf('возврат') !== -1) {
        return 'Мы даём гарантию на все наши работы: бесплатные правки 30 дней, техподдержка 24/7, возврат 100% при невыполнении условий.';
    }
    
    if (m.indexOf('кейс') !== -1 || m.indexOf('портфолио') !== -1 || m.indexOf('пример') !== -1) {
        return 'У нас более 6500+ успешных проектов! Средний рост продаж +180%. Посмотрите раздел Портфолио на сайте.';
    }
    
    if (m.indexOf('срок') !== -1 || m.indexOf('время') !== -1 || m.indexOf('долго') !== -1) {
        return 'Сроки: базовый магазин 2-3 недели, средний проект 3-4 недели, сложный 4-6 недель. Всегда укладываемся в сроки!';
    }
    
    return 'Спасибо за вопрос! Свяжитесь с нами: Telegram @duso_ecom. Ответим в течение 15 минут!';
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function reinitIcons() {
    setTimeout(function() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 50);
}

// Add CSS animation for logos scroll
var style = document.createElement('style');
style.textContent = '@keyframes scrollLogos { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }';
document.head.appendChild(style);
