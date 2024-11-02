class ImageGenerator {
    constructor() {
        this.promptInput = document.querySelector('.prompt-input');
        this.generateBtn = document.querySelector('.generate-btn');
        this.generatingSection = document.querySelector('.generation-status');
        this.galleryGrid = document.querySelector('.gallery-grid');
        
        this.setupEventListeners();
        this.loadExistingImages();
    }

    setupEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generateImage());
        
        // 添加输入框快捷键
        this.promptInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateImage();
            }
        });
    }

    async generateImage() {
        const prompt = this.promptInput.value.trim();
        if (!prompt) {
            this.showNotification('请输入提示词', 'error');
            return;
        }

        try {
            this.setGenerating(true);
            
            // 这里替换为实际的 API 调用
            // const response = await fetch('your-api-endpoint', {
            //     method: 'POST',
            //     body: JSON.stringify({ prompt })
            // });
            
            // 模拟 API 延迟
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // 模拟生成的图片
            const imageUrl = `https://picsum.photos/800/800?random=${Date.now()}`;
            
            this.addImageToGallery(imageUrl, prompt);
            this.promptInput.value = '';
            this.showNotification('图片生成成功！', 'success');
        } catch (error) {
            this.showNotification('生成失败，请重试', 'error');
            console.error('Generation error:', error);
        } finally {
            this.setGenerating(false);
        }
    }

    setGenerating(isGenerating) {
        this.generateBtn.disabled = isGenerating;
        this.generateBtn.innerHTML = isGenerating ? 
            '<i class="fas fa-spinner fa-spin"></i> 生成中...' : 
            '<i class="fas fa-wand-magic-sparkles"></i> 开始生成';
        
        this.generatingSection.style.display = isGenerating ? 'block' : 'none';
    }

    addImageToGallery(imageUrl, prompt) {
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';
        imageCard.innerHTML = `
            <img src="${imageUrl}" alt="${prompt}">
            <div class="image-info">
                <p class="prompt-text">${prompt}</p>
                <div class="image-actions">
                    <button class="action-btn" onclick="downloadImage('${imageUrl}')">
                        <i class="fas fa-download"></i> 下载
                    </button>
                    <button class="action-btn" onclick="shareImage('${imageUrl}')">
                        <i class="fas fa-share-alt"></i> 分享
                    </button>
                </div>
            </div>
        `;
        
        this.galleryGrid.insertBefore(imageCard, this.galleryGrid.firstChild);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    loadExistingImages() {
        // 加载示例图片
        const samplePrompts = [
            '未来城市的黄昏',
            '机械与自然的融合',
            '深海中的太空站'
        ];

        samplePrompts.forEach(prompt => {
            const imageUrl = `https://picsum.photos/800/800?random=${Math.random()}`;
            this.addImageToGallery(imageUrl, prompt);
        });
    }
}

// 工具函数
function downloadImage(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-image-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function shareImage(url) {
    if (navigator.share) {
        navigator.share({
            title: 'AI 生成的图片',
            text: '查看我用 AI 创想空间生成的图片！',
            url: url
        });
    } else {
        // 复制图片链接到剪贴板
        navigator.clipboard.writeText(url).then(() => {
            imageGenerator.showNotification('图片链接已复制到剪贴板！');
        });
    }
}

// 添加通知样式
const notificationStyles = `
.notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 8px;
    background: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
}

.notification.success {
    background: #4caf50;
    color: white;
}

.notification.error {
    background: #f44336;
    color: white;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// 初始化应用
const imageGenerator = new ImageGenerator(); 