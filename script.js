/* ==========================================
   STATE MANAGEMENT (LOYIHA HOLATI)
   ========================================== */
const blitzQuestions = [
  "Meni birinchi marta ko'rganingda yoki sanga yozganimda xayolingdan nima o'tgan?",
  "Birga o'tkazgan qaysi kunimiz sani esinda qogan?",
  "Mening qaysi odatim yoki xarakterim senga eng ko'p yoqadi?",
  "Agar ikkimiz xohlagan joyimizga sayohat qila olsak, qayerga borardik?",
  "Mani qaysi gapim yoki so'zim kayfiyatingni ko'taradi?",
  "Birgalikdagi eng kulgili yoki qiziqarli xotiramiz qaysi?",
  "Menda ko'rmoqchi bo'lgan eng katta orzuing nima?",
  "Bizni bir-birimizga bog'lab turadigan eng asosiy narsa nima deb o'ylaysan?",
  "Hozir aynan shu soniyalarda menga nima deging kelyapti?",
  "So'nggi savol, blokdan ochasanmi 😁?"
];

const state = {
  currentScreen: 'screen-intro',
  moodPercentage: 50,
  moodReason: '',
  currentMemoryIndex: 0,
  galleryCompleted: false,
  galleryReaction: null,
  selectedGift: null,
  currentQuestionIndex: 0,
  answers: Array(blitzQuestions.length).fill(''),
  blockAnswer: '100%',
  finalLetter: '',
  musicPlaying: false
};

/* ==========================================
   MEMORIES DATA (8 TA RASM UCHUN MOSLANGAN)
   ========================================== */
const memories = [
  { img: 'images/1.jpg', caption: 'San asabimi buzgan kun!' },
  { img: 'images/2.jpg', caption: 'Manga edit qibergan kunin!' },
  { img: 'images/3.jpg', caption: 'Ayamga qaysi gul oganim yaxshi dsam, aytmagansan oshanda' },
  { img: 'images/4.jpg', caption: 'Bu esa sanga birinchi sevgi izhor qigan kunim! Esimdan chiqmedi' },
  { img: 'images/5.jpg', caption: 'Teymasen qara lekin!' },
  { img: 'images/6.jpg', caption: 'Oppoqoyim ozimmi' },
  { img: 'images/7.jpg', caption: 'Bechoramasmanu atak, shu gapin yoqgandi oshanda' },
  { img: 'images/8.jpg', caption: 'Bilib man sani boshqa qizlarga alishmiman asalcham!' }
];

const giftsData = {
  1: { title: "Gul 🌹", text: "Atirgulimga gul oberarkanmanda endi 😁!" },
  2: { title: "O'zim!", text: "Man endi sanga sov'gaman! Mani asrab avayla!" },
  3: { title: "Shokolad 🍫", text: "Sani o'zinga aytaman, shkalad qizsan dsam ishanmesana? Endi yana shokolad oberaman!" }
};

/* ==========================================
   DOM INITIALIZATION
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initParticles();
  initNavigation();
  initMoodSlider();
  initGallery();
  initGifts();
  initBlitz();
  initBlockQuestion();
  initFinalSubmit();
});

/* ==========================================
   1. AUDIO PLAYER (FAQAT TUGMA BOSILGANDA QO'YILADI)
   ========================================== */
function initAudio() {
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-toggle-btn');
  const musicStatusText = document.getElementById('music-status-text');

  if (!audio || !musicBtn) return;

  // Musiqa tugmasi bosilganda yoqiladi yoki o'chiriladi
  musicBtn.addEventListener('click', () => {
    if (state.musicPlaying) {
      audio.pause();
      state.musicPlaying = false;
      if (musicStatusText) musicStatusText.textContent = "Musiqa 🎵";
      musicBtn.classList.remove('playing');
    } else {
      audio.play().then(() => {
        state.musicPlaying = true;
        if (musicStatusText) musicStatusText.textContent = "To'xtatish ⏸️";
        musicBtn.classList.add('playing');
      }).catch(err => {
        console.warn("Musiqa chalishda xatolik:", err);
      });
    }
  });
}

/* ==========================================
   3. SCREEN NAVIGATION
   ========================================== */
function switchScreen(targetScreenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));

  const targetScreen = document.getElementById(targetScreenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    state.currentScreen = targetScreenId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function initNavigation() {
  const btnStart = document.getElementById('btn-start');
  if (btnStart) {
    btnStart.addEventListener('click', () => {
      // Shunchaki keyingi ekranga o'tadi, musiqa o'z-o'zidan yonmaydi
      switchScreen('screen-mood');
    });
  }

  const btnRestart = document.getElementById('btn-restart');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => location.reload());
  }
}
/* ==========================================
   2. PARTICLES ANIMATION
   ========================================== */
function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const symbols = ['❤️', '💖', '✨', '🌸', '💕'];
  
  setInterval(() => {
    const particle = document.createElement('span');
    particle.className = 'floating-particle';
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    const startLeft = Math.random() * 100;
    const duration = 4 + Math.random() * 4;
    const size = 14 + Math.random() * 16;
    
    particle.style.cssText = `
      position: absolute;
      left: ${startLeft}vw;
      bottom: -30px;
      font-size: ${size}px;
      opacity: ${0.4 + Math.random() * 0.6};
      animation: floatUp ${duration}s linear forwards;
      pointer-events: none;
    `;
    
    container.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
  }, 800);
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes floatUp {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(-105vh) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(particleStyle);

/* ==========================================
   3. SCREEN NAVIGATION
   ========================================== */
function switchScreen(targetScreenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));

  const targetScreen = document.getElementById(targetScreenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    state.currentScreen = targetScreenId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function initNavigation() {
  const btnStart = document.getElementById('btn-start');
  if (btnStart) {
    btnStart.addEventListener('click', () => switchScreen('screen-mood'));
  }

  const btnRestart = document.getElementById('btn-restart');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => location.reload());
  }
}

/* ==========================================
   4. MOOD SLIDER
   ========================================== */
function initMoodSlider() {
  const slider = document.getElementById('mood-slider');
  const emojiDisplay = document.getElementById('mood-emoji');
  const percentDisplay = document.getElementById('mood-percent');
  const btnSubmit = document.getElementById('btn-mood-submit');
  const moodModal = document.getElementById('modal-mood');
  const modalEmoji = document.getElementById('modal-mood-emoji');
  const modalTitle = document.getElementById('modal-mood-title');
  const modalMessage = document.getElementById('modal-mood-message');
  const moodReasonWrapper = document.getElementById('mood-reason-wrapper');
  const moodReasonInput = document.getElementById('mood-reason-input');
  const btnModalClose = document.getElementById('btn-modal-mood-close');

  if (!slider) return;

  function getMoodConfig(val) {
    if (val <= 20) return { emoji: '😢', title: 'Kayfiyating judayam yomonmi?', msg: 'Senga nima bo\'ldi, birdaniga ko\'ngling buzildimi? Menga sababini aytib berishni xohlaysanmi?' };
    if (val <= 40) return { emoji: '😔', title: 'Biroz ma\'yussan...', msg: 'Bugun seni nimadir xafa qildi shekilli... Biroz sirlashamizmi?' };
    if (val <= 60) return { emoji: '😐', title: 'O\'rtacha kayfiyat', msg: 'Yomon ham emas, juda a\'lo ham emas. Lekin bu sayt seni albatta tabassum qilishga majbur qiladi!' };
    if (val <= 80) return { emoji: '😊', title: 'Yaxshi kayfiyat!', msg: 'Juda soatday! Sening tabassuming menga cheksiz quvvat beradi ✨' };
    return { emoji: '🥰', title: 'A\'lo kayfiyat!', msg: 'Kayfiyating 100% va nur sochmoqdasan! Tayyor bo\'lsang, xotiralarimizga o\'tamiz 🚀' };
  }

  slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.moodPercentage = val;
    if (percentDisplay) percentDisplay.textContent = `${val}%`;
    
    const config = getMoodConfig(val);
    if (emojiDisplay) emojiDisplay.textContent = config.emoji;
  });

  btnSubmit.addEventListener('click', () => {
    const config = getMoodConfig(state.moodPercentage);
    if (modalEmoji) modalEmoji.textContent = config.emoji;
    if (modalTitle) modalTitle.textContent = config.title;
    if (modalMessage) modalMessage.textContent = config.msg;

    if (state.moodPercentage <= 40) {
      if (moodReasonWrapper) moodReasonWrapper.classList.remove('hidden');
    } else {
      if (moodReasonWrapper) moodReasonWrapper.classList.add('hidden');
    }

    if (moodModal) moodModal.classList.remove('hidden');
  });

  if (btnModalClose) {
    btnModalClose.addEventListener('click', () => {
      if (state.moodPercentage <= 40 && moodReasonInput) {
        state.moodReason = moodReasonInput.value.trim();
      }
      if (moodModal) moodModal.classList.add('hidden');
      switchScreen('screen-gallery');
      renderGalleryItem();
    });
  }
}

/* ==========================================
   5. MEMORY GALLERY LOGIC (POP-UP BILAN)
   ========================================== */
function initGallery() {
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.currentMemoryIndex > 0) {
        state.currentMemoryIndex--;
        renderGalleryItem();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.currentMemoryIndex < memories.length - 1) {
        state.currentMemoryIndex++;
        renderGalleryItem();
      } else if (state.currentMemoryIndex === memories.length - 1) {
        const reactionModal = document.getElementById('modal-gallery-reaction');
        if (reactionModal) reactionModal.classList.remove('hidden');
      }
    });
  }

  const reactionChoices = document.querySelectorAll('.btn-gallery-choice');
  reactionChoices.forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.galleryReaction = e.currentTarget.dataset.reaction;
      
      const reactionModal = document.getElementById('modal-gallery-reaction');
      if (reactionModal) reactionModal.classList.add('hidden');

      switchScreen('screen-gifts');
    });
  });
}

function renderGalleryItem() {
  const track = document.getElementById('gallery-track');
  const counter = document.getElementById('gallery-counter');
  const caption = document.getElementById('gallery-caption');

  if (!track || memories.length === 0) return;

  const item = memories[state.currentMemoryIndex];
  
  track.innerHTML = `
    <div class="gallery-item active">
      <img src="${item.img}" alt="Xotira ${state.currentMemoryIndex + 1}" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'">
    </div>
  `;

  if (counter) counter.textContent = `${state.currentMemoryIndex + 1} / ${memories.length}`;
  if (caption) caption.textContent = item.caption;

  if (state.currentMemoryIndex === memories.length - 1 && !state.galleryCompleted) {
    state.galleryCompleted = true;
    setTimeout(() => {
      const reactionModal = document.getElementById('modal-gallery-reaction');
      if (reactionModal) reactionModal.classList.remove('hidden');
    }, 400);
  }
}

/* ==========================================
   6. GIFTS LOGIC (SOVG'ALARNIKI)
   ========================================== */
function initGifts() {
  const giftItems = document.querySelectorAll('.gift-item');
  const giftModal = document.getElementById('modal-gift');
  const giftTitle = document.getElementById('modal-gift-title');
  const giftMessage = document.getElementById('modal-gift-message');
  const btnGiftClose = document.getElementById('btn-modal-gift-close');
  const animImg = document.getElementById('anim-gift-img');

  giftItems.forEach(item => {
    item.addEventListener('click', () => {
      const giftId = item.dataset.giftId;
      state.selectedGift = giftId;
      
      const giftInfo = giftsData[giftId] || { title: "Maxsus Sovg'a!", text: "Sen uchun eng go'zal tilaklar va baxt!" };
      
      if (giftTitle) giftTitle.textContent = giftInfo.title;
      if (giftMessage) giftMessage.textContent = giftInfo.text;

      if (giftModal) giftModal.classList.remove('hidden');
      
      if (animImg) {
        animImg.classList.remove('animate-gift-open');
        void animImg.offsetWidth;
        animImg.classList.add('animate-gift-open');
      }
    });
  });

  if (btnGiftClose) {
    btnGiftClose.addEventListener('click', () => {
      if (giftModal) giftModal.classList.add('hidden');
      switchScreen('screen-blitz');
      renderBlitzQuestion();
    });
  }
}

/* ==========================================
   7. BLITZ QUESTIONNAIRE LOGIC (1-10)
   ========================================== */
function initBlitz() {
  const btnNext = document.getElementById('btn-blitz-next');
  const btnPrev = document.getElementById('btn-blitz-prev');
  const textarea = document.getElementById('blitz-answer-input');

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (textarea) {
        state.answers[state.currentQuestionIndex] = textarea.value.trim();
      }

      if (state.currentQuestionIndex < blitzQuestions.length - 1) {
        state.currentQuestionIndex++;
        renderBlitzQuestion();
      } else {
        switchScreen('screen-block-question');
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (textarea) {
        state.answers[state.currentQuestionIndex] = textarea.value.trim();
      }

      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
        renderBlitzQuestion();
      } else {
        switchScreen('screen-gifts');
      }
    });
  }
}

function renderBlitzQuestion() {
  const title = document.getElementById('blitz-question-title');
  const textarea = document.getElementById('blitz-answer-input');
  const progressBar = document.getElementById('blitz-progress-bar');
  const btnPrev = document.getElementById('btn-blitz-prev');

  if (!title || !textarea) return;

  const qIndex = state.currentQuestionIndex;
  title.textContent = `${qIndex + 1}. ${blitzQuestions[qIndex]}`;
  textarea.value = state.answers[qIndex] || '';

  const progressPercent = ((qIndex + 1) / blitzQuestions.length) * 100;
  if (progressBar) progressBar.style.width = `${progressPercent}%`;

  if (btnPrev) {
    btnPrev.style.visibility = qIndex === 0 ? 'hidden' : 'visible';
  }
}

/* ==========================================
   8. BLOCK QUESTION LOGIC (FOIZLI SLAYDER)
   ========================================== */
function initBlockQuestion() {
  const loveSlider = document.getElementById('love-slider');
  const lovePercent = document.getElementById('love-percent');
  const loveEmoji = document.getElementById('love-emoji');
  const btnSubmit = document.getElementById('btn-block-submit');

  if (!loveSlider) return;

  state.blockAnswer = "100%";

  loveSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.blockAnswer = `${val}%`;

    if (lovePercent) lovePercent.textContent = `${val}%`;

    if (loveEmoji) {
      if (val < 300) {
        loveEmoji.textContent = '💖';
      } else if (val < 600) {
        loveEmoji.textContent = '❤️‍🔥';
      } else if (val < 900) {
        loveEmoji.textContent = '👑';
      } else {
        loveEmoji.textContent = '🌌✨';
      }
    }
  });

  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      switchScreen('screen-final');
    });
  }
}

/* ==========================================
   9. TELEGRAM SUBMIT & FINAL
   ========================================== */
const TELEGRAM_BOT_TOKEN = '8852331218:AAFk8-SCtVxdW1BwzFNjcJhk_o67oTBdIfk';
const TELEGRAM_CHAT_ID = '8594155055'; // Shu yerga o'zingizning shaxsiy Telegram ID raqamingizni yozing!

function initFinalSubmit() {
  const btnFinalSubmit = document.getElementById('btn-final-submit');
  const finalInput = document.getElementById('final-letter-input');
  const loadingOverlay = document.getElementById('loading-overlay');

  if (!btnFinalSubmit) return;

  btnFinalSubmit.addEventListener('click', async () => {
    if (finalInput) {
      state.finalLetter = finalInput.value.trim();
    }

    if (loadingOverlay) loadingOverlay.classList.remove('hidden');

    let messageText = `💖 <b>YANGI JAVOB QABUL QILINDI!</b> 💖\n\n`;
    messageText += `📅 <b>Sana:</b> ${new Date().toLocaleString('uz-UZ')}\n`;
    messageText += `──────────────────────\n\n`;
    
    messageText += `📊 <b>1-Bosqich (Kayfiyat):</b> ${state.moodPercentage}%\n`;
    if (state.moodReason) {
      messageText += `💬 <b>Kayfiyat sababi:</b> ${state.moodReason}\n`;
    }
    
    messageText += `📸 <b>2-Bosqich (Galereya reaksiyasi):</b> ${state.galleryReaction || 'Munosabat bildirilmadi'}\n`;
    
    const chosenGiftObj = giftsData[state.selectedGift];
    const giftTitleText = chosenGiftObj ? chosenGiftObj.title : 'Tanlanmadi';
    messageText += `🎁 <b>3-Bosqich (Tanlangan sovg'a):</b> ${giftTitleText}\n\n`;
    
    messageText += `📝 <b>4-Bosqich (Blitz Savollar):</b>\n`;
    blitzQuestions.forEach((q, idx) => {
      const userAns = state.answers[idx] || 'Javob berilmadi';
      messageText += `<b>${idx + 1}. ${q}</b>\n➔ <i>${userAns}</i>\n\n`;
    });

    messageText += `💘 <b>Hal qiluvchi Savol (Sevgi darajasi):</b> ${state.blockAnswer || '100%'}\n\n`;
    messageText += `💌 <b>Dil izhori / Yakuniy xat:</b>\n<i>${state.finalLetter || 'Xat yozilmadi'}</i>\n`;

    try {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: 'HTML'
        })
      });

      const result = await response.json();

      if (!result.ok) {
        throw new Error(result.description || 'Telegram API xatosi');
      }

      if (loadingOverlay) loadingOverlay.classList.add('hidden');
      switchScreen('screen-success');

    } catch (err) {
      console.error('Telegramga yuborishda xatolik:', err);
      if (loadingOverlay) loadingOverlay.classList.add('hidden');
      
      alert("Xabar yuborishda xatolik yuz berdi. Iltimos, Telegram botga /start bosganingizni va TELEGRAM_CHAT_ID to'g'riligini tekshiring!");
      switchScreen('screen-success');
    }
  });
}