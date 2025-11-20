// ===== 전역 변수 및 상태 =====
const DAY = 86400000;
const SLOTS = ['아침', '낮', '저녁', '밤'];

// 시간 축 매핑 데이터 (에디토리얼 스타일용)
const TIME_MAPPING = {
    '아침': { name: 'AM', range: '06 - 11', ko: '아침' },
    '낮': { name: 'PM', range: '11 - 17', ko: '낮' },
    '저녁': { name: 'EVE', range: '17 - 22', ko: '저녁' },
    '밤': { name: 'NGT', range: '22 - 06', ko: '밤' },
    'Morning': { name: 'AM', range: '06 - 11', ko: '아침' },
    'Afternoon': { name: 'PM', range: '11 - 17', ko: '낮' },
    'Evening': { name: 'EVE', range: '17 - 22', ko: '저녁' },
    'Night': { name: 'NGT', range: '22 - 06', ko: '밤' }
};

// 다국어 텍스트 상수
const TEXTS = {
  ko: {
    slots: ['아침', '낮', '저녁', '밤'],
    days: ['일', '월', '화', '수', '목', '금', '토'],
    nav: {
      prevWeek: '⟵ 저번주',
      thisWeek: '이번주',
      nextWeek: '다음주 ⟶'
    },
    summary: {
      lastWeek: '저번주',
      thisWeek: '이번주',
      nextWeek: '다음주',
      noData: '데이터 없음'
    },
    buttons: {
      logout: '로그아웃',
      eng: 'ENG',
      korean: '한국어'
    },
    theme: {
      light: '라이트',
      dark: '다크'
    },
    auth: {
      hint: '이메일과 비밀번호로 로그인하세요.',
      email: '이메일',
      password: '비밀번호',
      emailPlaceholder: '이메일 주소를 입력하세요.',
      passwordPlaceholder: '비밀번호를 입력하세요.',
      login: '로그인',
      signupPrompt: '계정이 없으신가요?',
      signup: '가입하기',
      passwordConfirm: '비밀번호 확인',
      passwordSignupPlaceholder: '비밀번호 (6자 이상)',
      passwordConfirmPlaceholder: '비밀번호를 다시 입력하세요.',
      back: '뒤로',
      verifyPrompt: '인증 메일을 못 받으셨나요?',
      resendVerify: '재전송'
    },
    modals: {
      memo: '📝 메모',
      addBlock: '새 블럭 추가',
      specialDay: '기념일/생일 추가',
      deadline: '데드라인 제목',
      month: '달력 보기 (기념일/생일)'
    },
    placeholders: {
      memo: '메모를 입력하세요...',
      blockName: '이름',
      specialLabel: '예: 여친 생일 / 월급날 / D-Day',
      deadlineTitle: '무엇에 대한 데드라인인지 입력'
    },
    hints: {
      specialDay: '원하는 날짜를 눌러 <b>기념일/생일</b> 라벨을 추가하세요. 동그라미와 라벨은 주간 보기에 자동 반영됩니다.'
    },
    special: {
      title: '기념일/생일',
      addNew: '새로 추가하기',
      empty: '등록된 특별한 날이 없습니다.',
      delete: '삭제'
    },
    clickAdd: {
      title: '블럭 선택'
    },
    recurring: {
      label: '매주 이 시간에 반복'
    },
    viewMode: {
      weekly: '주간 뷰',
      monthly: '월간 뷰'
    }
  },
  en: {
    slots: ['Morning', 'Afternoon', 'Evening', 'Night'],
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    nav: {
      prevWeek: '⟵ Last Week',
      thisWeek: 'This Week',
      nextWeek: 'Next Week ⟶'
    },
    summary: {
      lastWeek: 'Last Week',
      thisWeek: 'This Week',
      nextWeek: 'Next Week',
      noData: 'No Data'
    },
    buttons: {
      logout: 'Logout',
      eng: 'ENG',
      korean: '한국어'
    },
    theme: {
      light: 'Light',
      dark: 'Dark'
    },
    auth: {
      hint: 'Login with your email and password.',
      email: 'Email',
      password: 'Password',
      emailPlaceholder: 'Enter your email address.',
      passwordPlaceholder: 'Enter your password.',
      login: 'Login',
      signupPrompt: 'Don\'t have an account?',
      signup: 'Sign Up',
      passwordConfirm: 'Confirm Password',
      passwordSignupPlaceholder: 'Password (6+ characters)',
      passwordConfirmPlaceholder: 'Re-enter your password.',
      back: 'Back',
      verifyPrompt: 'Didn\'t receive verification email?',
      resendVerify: 'Resend'
    },
    modals: {
      memo: '📝 Memo',
      addBlock: 'Add New Block',
      specialDay: 'Add Special Day/Birthday',
      deadline: 'Deadline Title',
      month: 'Calendar View (Special Days/Birthdays)'
    },
    placeholders: {
      memo: 'Enter memo...',
      blockName: 'Name',
      specialLabel: 'e.g: Girlfriend\'s Birthday / Payday / D-Day',
      deadlineTitle: 'What is this deadline for?'
    },
    hints: {
      specialDay: 'Click on any date to add <b>special day/birthday</b> labels. Circles and labels are automatically reflected in weekly view.'
    },
    special: {
      title: 'Special Day/Birthday',
      addNew: 'Add New',
      empty: 'No special days registered.',
      delete: 'Delete'
    },
    clickAdd: {
      title: 'Select block'
    },
    recurring: {
      label: 'Repeat every week at this time'
    },
    viewMode: {
      weekly: 'Weekly View',
      monthly: 'Monthly View'
    }
  }
};

// 현재 언어 상태
let currentLanguage = 'ko';

// 다크모드 상태
let isDarkMode = false;

// 슬롯 매핑 함수 (한국어 ↔ 영어)
function getSlotMapping() {
    return {
        'ko': { '아침': 0, '낮': 1, '저녁': 2, '밤': 3 },
        'en': { 'Morning': 0, 'Afternoon': 1, 'Evening': 2, 'Night': 3 }
    };
}

// 슬롯을 현재 언어로 변환
function convertSlotToCurrentLanguage(slot) {
    const mappings = getSlotMapping();
    const koSlots = ['아침', '낮', '저녁', '밤'];
    const enSlots = ['Morning', 'Afternoon', 'Evening', 'Night'];
    
    // 한국어 슬롯인지 확인
    const koIndex = koSlots.indexOf(slot);
    if (koIndex !== -1) {
        return currentLanguage === 'ko' ? slot : enSlots[koIndex];
    }
    
    // 영어 슬롯인지 확인
    const enIndex = enSlots.indexOf(slot);
    if (enIndex !== -1) {
        return currentLanguage === 'ko' ? koSlots[enIndex] : slot;
    }
    
    return slot; // 매칭되지 않으면 그대로 반환
}

// 슬롯을 한국어로 변환 (데이터 저장용)
function convertSlotToKorean(slot) {
    const koSlots = ['아침', '낮', '저녁', '밤'];
    const enSlots = ['Morning', 'Afternoon', 'Evening', 'Night'];
    
    const enIndex = enSlots.indexOf(slot);
    if (enIndex !== -1) {
        return koSlots[enIndex];
    }
    
    return slot; // 이미 한국어이거나 매칭되지 않으면 그대로 반환
}

// 블록 이름을 현재 언어로 변환 (영어 모드에서만 번역)
function translateBlockName(blockName) {
    // 한국어 모드에서는 원래 이름 그대로 반환
    if (currentLanguage === 'ko') {
        return blockName;
    }
    
    // 영어 모드에서만 한국어 → 영어 번역
    const koreanToEnglish = {
        '일': 'Work',
        '공부': 'Study', 
        '운동': 'Exercise',
        '휴식': 'Rest',
        '쇼핑': 'Shopping',
        '여행': 'Travel',
        '미팅': 'Meeting',
        '프로젝트': 'Project',
        '독서': 'Reading',
        '게임': 'Gaming',
        '영화': 'Movie',
        '음악': 'Music',
        '요리': 'Cooking',
        '청소': 'Cleaning',
        '산책': 'Walk',
        '학교': 'School',
        '약속': 'Appointment',
        '병원': 'Hospital',
        '약국': 'Pharmacy',
        '은행': 'Bank',
        '우체국': 'Post Office',
        '카페': 'Cafe',
        '식당': 'Restaurant',
        '마트': 'Supermarket',
        '헬스장': 'Gym',
        '도서관': 'Library',
        '미술관': 'Museum',
        '공원': 'Park',
        '영화관': 'Cinema',
        '놀이공원': 'Amusement Park',
        '수영장': 'Swimming Pool',
        '스키장': 'Ski Resort',
        '해변': 'Beach',
        '산': 'Mountain',
        '강': 'River',
        '호수': 'Lake',
        '박물관': 'Museum',
        '전시회': 'Exhibition',
        '콘서트': 'Concert',
        '연극': 'Play',
        '뮤지컬': 'Musical',
        '발표': 'Presentation',
        '시험': 'Exam',
        '과제': 'Assignment',
        '회의': 'Conference',
        '세미나': 'Seminar',
        '워크샵': 'Workshop',
        '강의': 'Lecture',
        '수업': 'Class',
        '과외': 'Tutoring',
        '학원': 'Academy',
        '취미': 'Hobby',
        '운전': 'Driving',
        '등산': 'Hiking',
        '자전거': 'Cycling',
        '요가': 'Yoga',
        '필라테스': 'Pilates',
        '춤': 'Dance',
        '노래': 'Singing',
        '악기': 'Instrument',
        '피아노': 'Piano',
        '기타': 'Guitar',
        '바이올린': 'Violin',
        '드럼': 'Drums',
        '사진': 'Photography',
        '그림': 'Drawing',
        '공예': 'Craft',
        '바느질': 'Sewing',
        '요리교실': 'Cooking Class',
        '언어학습': 'Language Learning',
        '영어': 'English',
        '일본어': 'Japanese',
        '중국어': 'Chinese',
        '스페인어': 'Spanish',
        '프랑스어': 'French',
        '독일어': 'German',
        '러시아어': 'Russian',
        '아랍어': 'Arabic',
        '이탈리아어': 'Italian',
        '포르투갈어': 'Portuguese',
        '네덜란드어': 'Dutch',
        '스웨덴어': 'Swedish',
        '노르웨이어': 'Norwegian',
        '덴마크어': 'Danish',
        '핀란드어': 'Finnish',
        '폴란드어': 'Polish',
        '체코어': 'Czech',
        '헝가리어': 'Hungarian',
        '루마니아어': 'Romanian',
        '불가리아어': 'Bulgarian',
        '그리스어': 'Greek',
        '터키어': 'Turkish',
        '히브리어': 'Hebrew',
        '힌디어': 'Hindi',
        '태국어': 'Thai',
        '베트남어': 'Vietnamese',
        '인도네시아어': 'Indonesian',
        '말레이어': 'Malay',
        '필리핀어': 'Filipino',
        '한국어': 'Korean'
    };
    
    return koreanToEnglish[blockName] || blockName;
}

function generateRecurringId() {
    return 'rec-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function getWeekdayFromDateString(dateStr) {
    return fromYMDLocal(dateStr).getDay();
}

function getRecurringBlocksForCell(date, slot) {
    const weekday = getWeekdayFromDateString(date);
    return recurringData
        .filter(r => {
            // 요일과 슬롯이 일치하고, 시작일 이후의 날짜인지 확인
            if (r.weekday !== weekday || r.slot !== slot) return false;
            // startDate가 없으면 기존 데이터 호환성을 위해 true 반환
            if (!r.startDate) return true;
            // startDate 이후의 날짜만 반복 블록 생성
            return date >= r.startDate;
        })
        .map(r => ({
            category: r.category,
            color: r.color,
            memo: r.memo || '',
            time: r.time || '',
            date,
            slot,
            recurring: true,
            recurringId: r.id
        }));
}

function getCombinedBlocksForCell(date, slot) {
    const recurringBlocks = getRecurringBlocksForCell(date, slot);
    const singleBlocks = placedData
        .filter(b => b.date === date && b.slot === slot)
        .map(b => ({
            ...b,
            recurring: false
        }));
    return [...recurringBlocks, ...singleBlocks];
}

function findPlacedIndexByInfo(info) {
    return placedData.findIndex(
        b => b.date === info.date && b.slot === info.slot && b.category === info.category
    );
}

function removePlacedByInfo(info) {
    const idx = findPlacedIndexByInfo(info);
    if (idx > -1) {
        placedData.splice(idx, 1);
    }
}

// UI 요소
const authContainer = document.getElementById('auth-container');
const schedulerContainer = document.getElementById('scheduler-container');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const signupContainer = document.getElementById('signup-container');
const signupEmailInput = document.getElementById('signupEmail');
const signupPasswordInput = document.getElementById('signupPassword');
const signupPasswordConfirmInput = document.getElementById('signupPasswordConfirm');
const signupFeedback = document.getElementById('signup-feedback');
const signupSubmitBtn = document.getElementById('signupSubmitBtn');
const signupBackBtn = document.getElementById('signupBackBtn');
const resendVerifyBtn = document.getElementById('resendVerifyBtn');
const verifyCta = document.querySelector('#signup-container .verify-cta');
const logoutBtn = document.getElementById('logoutBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const userEmailSpan = document.getElementById('userEmail');
const authFeedback = document.getElementById('auth-feedback'); // 피드백 영역 추가
const languageBtn = document.getElementById('languageBtn');
const languageBtnKo = document.getElementById('languageBtnKo');
const languageBtnEn = document.getElementById('languageBtnEn');
const darkModeToggle = document.getElementById('darkModeToggle');
const authLanguageBtn = document.getElementById('authLanguageBtn');
const authDarkModeToggle = document.getElementById('authDarkModeToggle');
const signupLanguageBtn = document.getElementById('signupLanguageBtn');
const signupDarkModeToggle = document.getElementById('signupDarkModeToggle');

let dragged, selectedBlock;
let placedData = [];
let deadlines = [];
let specialDays = [];
let blocksConfig = [];
let recurringData = [];
let clickAddPopup = null;
let clickAddTarget = null;

// 터치 드래그 앤 드롭을 위한 변수들
let touchDragged = null;
let touchGhost = null;
let touchStartPos = null;
let touchCurrentPos = null;
let isTouchDragging = false;
let touchDropTarget = null;
let touchStartTime = null;
let touchLongPressTimer = null;
let isLongPress = false;

let currentMonday = getMonday(new Date());
let deadlineMode = false;
let monthCursor = new Date();
let quadrantMonthCursor = new Date();
let specialEditingDate = null;
let deadlineEditingKey = null;
let viewMode = 'weekly'; // 'weekly' or 'monthly'

let isSignupSuccess = false; // 가입 성공 상태 플래그

// ===== 유틸리티 함수 =====
function getMonday(d) {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.getFullYear(), d.getMonth(), diff);
}
function ymdLocal(d) {
    const x = new Date(d);
    const y = x.getFullYear();
    const m = String(x.getMonth() + 1).padStart(2, '0');
    const dd = String(x.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
}
function fromYMDLocal(s) {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
}
function fmtMMDD(d) { return (d.getMonth() + 1) + "/" + d.getDate(); }

// 현재 시간이 어떤 슬롯(아침/낮/저녁/밤)에 해당하는지 계산
function getCurrentSlot() {
    const hour = new Date().getHours();
    const slots = TEXTS[currentLanguage].slots;
    if (hour >= 5 && hour < 11) return slots[0]; // 아침/Morning
    if (hour >= 11 && hour < 17) return slots[1]; // 낮/Afternoon
    if (hour >= 17 && hour < 22) return slots[2]; // 저녁/Evening
    return slots[3]; // 밤/Night
}

// 언어 전환 함수
function switchLanguage() {
    const newLang = currentLanguage === 'ko' ? 'en' : 'ko';
    setLanguage(newLang);
}

// 언어 설정 함수
function setLanguage(lang) {
    if (currentLanguage === lang) return;
    currentLanguage = lang;
    updateLanguageUI();
    updateLanguageBtn();
    updateAuthLanguageBtn();
    updateSignupLanguageBtn();
    updateDarkModeToggle();
    updateAuthDarkModeToggle();
    updateSignupDarkModeToggle();
    updateModalTexts();
    updateModalButtons();
    updateViewModeUI();
    renderMainView();
    renderBlocks();
    renderCalendar();
    updateSummary();
    if (viewMode === 'monthly') {
        renderQuadrantViewMain();
    }
    updateSettingsMenuTexts();
}

// 언어 버튼 텍스트 업데이트 (헤더 버튼이 있을 때만)
function updateLanguageBtn() {
    if (languageBtn) {
        languageBtn.textContent = currentLanguage === 'ko' ? 'ENG' : '한국어';
    }
    if (languageBtnKo && languageBtnEn) {
        languageBtnKo.classList.toggle('active', currentLanguage === 'ko');
        languageBtnEn.classList.toggle('active', currentLanguage === 'en');
    }
}

// 설정 메뉴 텍스트 업데이트
function updateSettingsMenuTexts() {
    const darkModeLabel = document.querySelector('.menu-item-label[data-key="darkMode"]');
    const languageLabel = document.querySelector('.menu-item-label[data-key="language"]');
    if (darkModeLabel) {
        darkModeLabel.textContent = currentLanguage === 'ko' ? '다크 모드' : 'Dark Mode';
    }
    if (languageLabel) {
        languageLabel.textContent = currentLanguage === 'ko' ? '언어 / Language' : 'Language';
    }
}

// 로그인 화면용 언어 버튼 텍스트 업데이트
function updateAuthLanguageBtn() {
    if (currentLanguage === 'ko') {
        authLanguageBtn.textContent = 'ENG';
    } else {
        authLanguageBtn.textContent = '한국어';
    }
}

// 회원가입 화면용 언어 버튼 텍스트 업데이트
function updateSignupLanguageBtn() {
    if (currentLanguage === 'ko') {
        signupLanguageBtn.textContent = 'ENG';
    } else {
        signupLanguageBtn.textContent = '한국어';
    }
}

// 다크모드 토글 함수
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    updateDarkModeUI();
    updateDarkModeToggle();
    updateAuthDarkModeToggle(); // 로그인 화면용 토글도 업데이트
    updateSignupDarkModeToggle(); // 회원가입 화면용 토글도 업데이트
    saveDarkModeState();
}

// 로그인 화면용 다크모드 토글 함수
function toggleAuthDarkMode() {
    isDarkMode = !isDarkMode;
    updateDarkModeUI();
    updateDarkModeToggle();
    updateAuthDarkModeToggle();
    updateSignupDarkModeToggle();
    saveDarkModeState();
}

// 회원가입 화면용 다크모드 토글 함수
function toggleSignupDarkMode() {
    isDarkMode = !isDarkMode;
    updateDarkModeUI();
    updateDarkModeToggle();
    updateAuthDarkModeToggle();
    updateSignupDarkModeToggle();
    saveDarkModeState();
}

// 다크모드 토글 UI 업데이트
function updateDarkModeToggle() {
    // iOS 토글 스위치 업데이트 (설정 메뉴용)
    const iosToggle = document.getElementById('darkModeToggle');
    if (iosToggle && iosToggle.classList.contains('ios-toggle-switch')) {
        if (isDarkMode) {
            iosToggle.classList.add('active');
        } else {
            iosToggle.classList.remove('active');
        }
    }
    
    // 기존 토글 스위치가 있는 경우에만 업데이트 (로그인/회원가입 화면용)
    if (!darkModeToggle) return;
    
    const toggleIcon = darkModeToggle.querySelector('.toggle-icon');
    const labelLeft = darkModeToggle.querySelector('.label-left');
    const labelRight = darkModeToggle.querySelector('.label-right');
    
    if (toggleIcon && labelLeft && labelRight) {
        if (!isDarkMode) {
            darkModeToggle.classList.remove('active');
            toggleIcon.textContent = '🌙';
            labelLeft.classList.add('active');
            labelRight.classList.remove('active');
        } else {
            darkModeToggle.classList.add('active');
            toggleIcon.textContent = '☀️';
            labelLeft.classList.remove('active');
            labelRight.classList.add('active');
        }
        
        // 언어에 따른 라벨 텍스트 업데이트
        const texts = TEXTS[currentLanguage];
        labelLeft.textContent = texts.theme.light;
        labelRight.textContent = texts.theme.dark;
    }
}

// 로그인 화면용 다크모드 토글 UI 업데이트
function updateAuthDarkModeToggle() {
    if (!authDarkModeToggle) return;
    const toggleIcon = authDarkModeToggle.querySelector('.toggle-icon');
    const labelLeft = authDarkModeToggle.querySelector('.label-left');
    const labelRight = authDarkModeToggle.querySelector('.label-right');
    
    if (!isDarkMode) {
        authDarkModeToggle.classList.remove('active');
        toggleIcon.textContent = '🌙';
        labelLeft.classList.add('active');
        labelRight.classList.remove('active');
    } else {
        authDarkModeToggle.classList.add('active');
        toggleIcon.textContent = '☀️';
        labelLeft.classList.remove('active');
        labelRight.classList.add('active');
    }
    
    // 언어에 따른 라벨 텍스트 업데이트
    const texts = TEXTS[currentLanguage];
    labelLeft.textContent = texts.theme.light;
    labelRight.textContent = texts.theme.dark;
}

// 회원가입 화면용 다크모드 토글 UI 업데이트
function updateSignupDarkModeToggle() {
    if (!signupDarkModeToggle) return;
    const toggleIcon = signupDarkModeToggle.querySelector('.toggle-icon');
    const labelLeft = signupDarkModeToggle.querySelector('.label-left');
    const labelRight = signupDarkModeToggle.querySelector('.label-right');
    
    if (!isDarkMode) {
        signupDarkModeToggle.classList.remove('active');
        toggleIcon.textContent = '🌙';
        labelLeft.classList.add('active');
        labelRight.classList.remove('active');
    } else {
        signupDarkModeToggle.classList.add('active');
        toggleIcon.textContent = '☀️';
        labelLeft.classList.remove('active');
        labelRight.classList.add('active');
    }
    
    // 언어에 따른 라벨 텍스트 업데이트
    const texts = TEXTS[currentLanguage];
    labelLeft.textContent = texts.theme.light;
    labelRight.textContent = texts.theme.dark;
}

// 다크모드 UI 업데이트
function updateDarkModeUI() {
    const body = document.body;
    
    if (isDarkMode) {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
    }
}

// 다크모드 상태 저장
function saveDarkModeState() {
    localStorage.setItem('darkMode', isDarkMode.toString());
}

// 다크모드 상태 복원
function loadDarkModeState() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        isDarkMode = savedDarkMode === 'true';
    }
    updateDarkModeUI();
    updateDarkModeToggle();
    updateAuthDarkModeToggle(); // 로그인 화면용 토글도 업데이트
    updateSignupDarkModeToggle(); // 회원가입 화면용 토글도 업데이트
}

// 언어에 따른 UI 업데이트
function updateLanguageUI() {
    const texts = TEXTS[currentLanguage];
    
    // 로그아웃 버튼 텍스트 변경
    logoutBtn.textContent = texts.buttons.logout;
    
    // 네비게이션 버튼들 텍스트 변경
    const navButtons = document.querySelectorAll('.nav button');
    if (navButtons.length >= 3) {
        navButtons[0].textContent = texts.nav.prevWeek;
        navButtons[1].textContent = texts.nav.thisWeek;
        navButtons[2].textContent = texts.nav.nextWeek;
    }
    
    // 요약 섹션 헤더 변경
    const summaryHeaders = document.querySelectorAll('.report h3');
    if (summaryHeaders.length >= 3) {
        summaryHeaders[0].textContent = texts.summary.lastWeek;
        summaryHeaders[1].textContent = texts.summary.thisWeek;
        summaryHeaders[2].textContent = texts.summary.nextWeek;
    }
    
    // 로그인 화면 텍스트 업데이트
    updateAuthTexts();
    
    // 회원가입 화면 텍스트 업데이트
    updateSignupTexts();
    
    // 모달 창 텍스트들 변경
    updateModalTexts();
    
    // 모달 버튼 텍스트 업데이트
    updateModalButtons();
    
    // 뷰 모드 UI 업데이트 (월간뷰 버튼 텍스트 포함)
    updateViewModeUI();
}

// 로그인 화면 텍스트 업데이트
function updateAuthTexts() {
    const texts = TEXTS[currentLanguage];
    
    // 로그인 화면 힌트 텍스트
    const authHint = document.querySelector('.auth-hint');
    if (authHint) {
        authHint.textContent = texts.auth.hint;
    }
    
    // 이메일 라벨
    const emailLabel = document.querySelector('label[for="email"]');
    if (emailLabel) {
        emailLabel.textContent = texts.auth.email;
    }
    
    // 비밀번호 라벨
    const passwordLabel = document.querySelector('label[for="password"]');
    if (passwordLabel) {
        passwordLabel.textContent = texts.auth.password;
    }
    
    // 이메일 플레이스홀더
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.placeholder = texts.auth.emailPlaceholder;
    }
    
    // 비밀번호 플레이스홀더
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.placeholder = texts.auth.passwordPlaceholder;
    }
    
    // 로그인 버튼
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.textContent = texts.auth.login;
    }
    
    // 회원가입 안내 텍스트
    const signupCta = document.querySelector('.signup-cta span');
    if (signupCta) {
        signupCta.textContent = texts.auth.signupPrompt;
    }
    
    // 회원가입 버튼
    const signupBtn = document.querySelector('.signup-cta button');
    if (signupBtn) {
        signupBtn.textContent = texts.auth.signup;
    }
}

// 회원가입 화면 텍스트 업데이트
function updateSignupTexts() {
    const texts = TEXTS[currentLanguage];
    
    // 회원가입 이메일 라벨
    const signupEmailLabel = document.querySelector('label[for="signupEmail"]');
    if (signupEmailLabel) {
        signupEmailLabel.textContent = texts.auth.email;
    }
    
    // 회원가입 비밀번호 라벨
    const signupPasswordLabel = document.querySelector('label[for="signupPassword"]');
    if (signupPasswordLabel) {
        signupPasswordLabel.textContent = texts.auth.password;
    }
    
    // 비밀번호 확인 라벨
    const signupPasswordConfirmLabel = document.querySelector('label[for="signupPasswordConfirm"]');
    if (signupPasswordConfirmLabel) {
        signupPasswordConfirmLabel.textContent = texts.auth.passwordConfirm;
    }
    
    // 회원가입 이메일 플레이스홀더
    const signupEmailInput = document.getElementById('signupEmail');
    if (signupEmailInput) {
        signupEmailInput.placeholder = texts.auth.emailPlaceholder;
    }
    
    // 회원가입 비밀번호 플레이스홀더
    const signupPasswordInput = document.getElementById('signupPassword');
    if (signupPasswordInput) {
        signupPasswordInput.placeholder = texts.auth.passwordSignupPlaceholder;
    }
    
    // 비밀번호 확인 플레이스홀더
    const signupPasswordConfirmInput = document.getElementById('signupPasswordConfirm');
    if (signupPasswordConfirmInput) {
        signupPasswordConfirmInput.placeholder = texts.auth.passwordConfirmPlaceholder;
    }
    
    // 가입하기 버튼
    const signupSubmitBtn = document.getElementById('signupSubmitBtn');
    if (signupSubmitBtn) {
        signupSubmitBtn.textContent = texts.auth.signup;
    }
    
    // 뒤로 버튼
    const signupBackBtn = document.getElementById('signupBackBtn');
    if (signupBackBtn) {
        signupBackBtn.textContent = texts.auth.back;
    }
    
    // 인증 메일 안내 텍스트
    const verifyCta = document.querySelector('.verify-cta span');
    if (verifyCta) {
        verifyCta.textContent = texts.auth.verifyPrompt;
    }
    
    // 재전송 버튼
    const resendVerifyBtn = document.getElementById('resendVerifyBtn');
    if (resendVerifyBtn) {
        resendVerifyBtn.textContent = texts.auth.resendVerify;
    }
}

// 모달 버튼 텍스트 업데이트
function updateModalButtons() {
    const texts = TEXTS[currentLanguage];
    
    // 모든 모달의 저장/삭제 버튼 텍스트 업데이트
    const saveButtons = document.querySelectorAll('.modal-footer .save');
    const deleteButtons = document.querySelectorAll('.modal-footer .delete');
    
    saveButtons.forEach(btn => {
        // 더 정확한 텍스트 매칭을 위해 정규식 사용
        if (btn.textContent.trim() === '저장' || btn.textContent.trim() === 'Save' || 
            btn.textContent.trim() === '추가' || btn.textContent.trim() === 'Add') {
            btn.textContent = currentLanguage === 'ko' ? '저장' : 'Save';
        } else if (btn.textContent.trim() === '가입하기' || btn.textContent.trim() === 'Sign Up') {
            btn.textContent = currentLanguage === 'ko' ? '가입하기' : 'Sign Up';
        }
    });
    
    deleteButtons.forEach(btn => {
        if (btn.textContent.trim() === '삭제' || btn.textContent.trim() === 'Delete') {
            btn.textContent = currentLanguage === 'ko' ? '삭제' : 'Delete';
        }
    });
}

// 모달 창 텍스트 업데이트
function updateModalTexts() {
    const texts = TEXTS[currentLanguage];
    
    // 메모 모달
    const memoModal = document.getElementById('modal');
    if (memoModal) {
        const memoTitle = memoModal.querySelector('#modalTitle');
        const memoTextarea = memoModal.querySelector('#memo');
        if (memoTitle) memoTitle.textContent = texts.modals.memo;
        if (memoTextarea) memoTextarea.placeholder = texts.placeholders.memo;
    }
    
    // 블록 추가 모달 (이미 openAddBlockModal에서 처리됨)
    
    // 특별한 날 모달
    const specialModal = document.getElementById('specialModal');
    if (specialModal) {
        const specialTitle = specialModal.querySelector('h3');
        const specialInput = specialModal.querySelector('#specialLabel');
        if (specialTitle) specialTitle.textContent = texts.modals.specialDay;
        if (specialInput) specialInput.placeholder = texts.placeholders.specialLabel;
    }
    
    // 데드라인 모달
    const deadlineModal = document.getElementById('deadlineModal');
    if (deadlineModal) {
        const deadlineTitle = deadlineModal.querySelector('h3');
        const deadlineInput = deadlineModal.querySelector('#deadlineTitle');
        if (deadlineTitle) deadlineTitle.textContent = texts.modals.deadline;
        if (deadlineInput) deadlineInput.placeholder = texts.placeholders.deadlineTitle;
    }
    
    // 월별 캘린더 힌트
    const monthHint = document.querySelector('.hint');
    if (monthHint) monthHint.innerHTML = texts.hints.specialDay;
}

// ===== [신규] 인증 UI 헬퍼 함수 =====
function showFeedback(message, type = 'error') {
    authFeedback.textContent = message;
    authFeedback.className = `auth-feedback ${type}`;
}

function clearFeedback() {
    authFeedback.textContent = '';
    authFeedback.className = 'auth-feedback';
}

function setAuthButtonsLoading(isLoading, action) {
    loginBtn.disabled = isLoading;
    signupBtn.disabled = isLoading;

    if (isLoading) {
        if (action === 'signup') {
            signupSubmitBtn && (signupSubmitBtn.textContent = '처리 중...');
        } else {
            loginBtn.textContent = '로그인 중...';
        }
    } else {
        signupSubmitBtn && (signupSubmitBtn.textContent = '가입하기');
        loginBtn.textContent = '로그인';
    }
}


// ===================================================================
// 🔥 STEP 5 & 6: Firebase 인증 및 데이터베이스 로직 (개선됨) 🔥
// ===================================================================

// ----- 👤 인증(로그인/회원가입) 관련 함수 -----

// 회원가입: 네비게이션 (로그인 화면 -> 회원가입 화면)
signupBtn.addEventListener('click', () => {
    clearFeedback();
    authContainer.style.display = 'none';
    signupContainer.style.display = 'flex';
});

function showSignupFeedback(message, type = 'error') {
    signupFeedback.textContent = message;
    signupFeedback.className = `auth-feedback ${type}`;
}
function clearSignupFeedback() {
    signupFeedback.textContent = '';
    signupFeedback.className = 'auth-feedback';
}

// 회원가입 제출
signupSubmitBtn.addEventListener('click', () => {
    const email = signupEmailInput.value.trim();
    const password = signupPasswordInput.value.trim();
    const password2 = signupPasswordConfirmInput.value.trim();

    clearSignupFeedback();

    if (!email || !password || !password2) {
        showSignupFeedback('모든 항목을 입력해주세요.');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showSignupFeedback('올바른 이메일 형식이 아닙니다.');
        return;
    }
    if (password.length < 6) {
        showSignupFeedback('비밀번호는 6자리 이상이어야 합니다.');
        return;
    }
    if (password !== password2) {
        showSignupFeedback('비밀번호가 일치하지 않습니다.');
        return;
    }

    setAuthButtonsLoading(true, 'signup');
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            return userCredential.user.sendEmailVerification().then(async () => {
                await initializeUserData(userCredential.user);
                showSignupFeedback('이메일을 확인해주세요! 인증 후 로그인할 수 있어요.', 'success');
                if (verifyCta) verifyCta.style.display = 'flex';
                isSignupSuccess = true; // 가입 성공 플래그 설정
                setTimeout(() => {
                    signupContainer.style.display = 'none';
                    authContainer.style.display = 'flex';
                    emailInput.value = signupEmailInput.value;
                    passwordInput.value = '';
                    // 성공 메시지를 로그인 화면에서도 보여주기
                    showFeedback('이메일을 확인하고 인증을 완료해주세요.', 'success');
                }, 2000);
                return auth.signOut();
            });
        })
        .catch(error => {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    showSignupFeedback('이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.');
                    break;
                case 'auth/invalid-email':
                    showSignupFeedback('유효하지 않은 이메일 주소 형식입니다.');
                    break;
                case 'auth/weak-password':
                    showSignupFeedback('비밀번호가 너무 약합니다. 6자리 이상으로 설정해주세요.');
                    break;
                default:
                    showSignupFeedback('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                    console.error('회원가입 실패:', error);
                    break;
            }
        })
        .finally(() => setAuthButtonsLoading(false));
});

// 회원가입 뒤로가기
signupBackBtn.addEventListener('click', () => {
    clearSignupFeedback();
    if (verifyCta) verifyCta.style.display = 'none';
    signupContainer.style.display = 'none';
    authContainer.style.display = 'flex';
});

// 인증 메일 재전송
resendVerifyBtn.addEventListener('click', async () => {
    clearSignupFeedback();
    const email = signupEmailInput.value.trim();
    const password = signupPasswordInput.value.trim();
    if (!email || !password) {
        showSignupFeedback('이메일과 비밀번호를 입력한 뒤 재전송을 눌러주세요.', 'error');
        return;
    }
    try {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        if (cred.user.emailVerified) {
            showSignupFeedback('이미 인증된 계정입니다. 로그인 화면으로 이동해 로그인하세요.', 'success');
            await auth.signOut();
            return;
        }
        await cred.user.sendEmailVerification();
        showSignupFeedback('인증 메일을 다시 보냈습니다. 받은 메일함을 확인해주세요.', 'success');
        await auth.signOut();
    } catch (e) {
        showSignupFeedback('재전송에 실패했습니다. 이메일/비밀번호를 확인하거나 잠시 후 다시 시도해주세요.', 'error');
        console.error(e);
    }
});

// 더 이상 별도의 verify 버튼 로직 없음 (표준 플로우로 단순화)


// [수정] 로그인 함수
loginBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    clearFeedback();

    if (!email || !password) {
        showFeedback('이메일과 비밀번호를 모두 입력해주세요.');
        return;
    }

    setAuthButtonsLoading(true, 'login');

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // 이메일 미인증이면 즉시 로그아웃 + 안내
            if (!userCredential.user.emailVerified) {
                showFeedback('이메일 인증이 필요합니다. 받은 메일함에서 인증을 완료해주세요.', 'error');
                auth.signOut();
                return;
            }
            console.log('로그인 성공!', userCredential.user);
        })
        .catch(error => {
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    showFeedback('이메일 또는 비밀번호가 올바르지 않습니다.');
                    break;
                case 'auth/too-many-requests':
                    showFeedback('너무 많은 로그인 시도를 했습니다. 잠시 후 다시 시도해주세요.');
                    break;
                default:
                    showFeedback('로그인 중 오류가 발생했습니다.');
                    console.error('로그인 실패:', error);
                    break;
            }
        })
        .finally(() => {
            setAuthButtonsLoading(false);
        });
});


// 로그아웃 함수
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => console.log('로그아웃 성공!'));
});

// 언어 전환 버튼 이벤트 리스너
if (languageBtn) {
    languageBtn.addEventListener('click', switchLanguage);
}
if (languageBtnKo) {
    languageBtnKo.addEventListener('click', () => setLanguage('ko'));
}
if (languageBtnEn) {
    languageBtnEn.addEventListener('click', () => setLanguage('en'));
}
authLanguageBtn.addEventListener('click', switchLanguage);
signupLanguageBtn.addEventListener('click', switchLanguage);

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 다크모드 상태를 먼저 로드하고 모든 토글 UI 업데이트
    loadDarkModeState();
    
    // 언어 관련 UI 업데이트
    updateLanguageBtn();
    updateAuthLanguageBtn();
    updateSignupLanguageBtn();
    
    // 텍스트 업데이트
    updateAuthTexts(); // 로그인 화면 텍스트도 초기화
    updateSignupTexts(); // 회원가입 화면 텍스트도 초기화
    updateSettingsMenuTexts();
    updateLanguageBtn();
});

// 다크모드 버튼 이벤트 리스너
// iOS 토글은 HTML에서 onclick으로 직접 연결되어 있음
// 기존 토글 스위치가 있는 경우에만 이벤트 리스너 추가
if (darkModeToggle && darkModeToggle.classList.contains('toggle-switch')) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}
if (authDarkModeToggle) {
    authDarkModeToggle.addEventListener('click', toggleAuthDarkMode);
}
if (signupDarkModeToggle) {
    signupDarkModeToggle.addEventListener('click', toggleSignupDarkMode);
}

// ⭐ 핵심! 사용자의 로그인 상태를 실시간으로 감지하는 함수
auth.onAuthStateChanged(user => {
    if (user) {
        // --- 사용자가 로그인했을 때 ---
        if (!user.emailVerified) {
            // 미인증: 로그인 UI 유지 및 안내
            currentUser = null;
            authContainer.style.display = 'flex';
            signupContainer.style.display = 'none';
            schedulerContainer.style.display = 'none';
            
            // 가입 성공 직후가 아니면 에러 메시지 표시
            if (!isSignupSuccess) {
                showFeedback('이메일 인증 후 이용 가능합니다. 인증 메일을 확인하세요.', 'error');
            }
            return;
        }
        currentUser = user;
        authContainer.style.display = 'none';
        signupContainer.style.display = 'none';
        schedulerContainer.style.display = 'block';
        userEmailSpan.textContent = user.email;
        clearFeedback();
        isSignupSuccess = false; // 로그인 성공 시 플래그 리셋

        // 언어 UI 초기화
        updateLanguageUI();
        updateLanguageBtn();
        updateAuthLanguageBtn();
        updateSignupLanguageBtn();
        
        loadStateFromFirestore();
        updateViewModeUI(); // 초기 뷰 모드 UI 설정
        updateDateRangeDisplay(); // 초기 날짜 표시
        

    } else {
        // --- 사용자가 로그아웃했을 때 ---
        currentUser = null;
        authContainer.style.display = 'flex';
        signupContainer.style.display = 'none';
        schedulerContainer.style.display = 'none';
        isSignupSuccess = false; // 로그아웃 시 플래그 리셋
        
        placedData = [];
        deadlines = [];
        specialDays = [];
        blocksConfig = [];
        recurringData = [];
        renderCalendar();
    }
});


// ----- 💾 데이터베이스(Firestore) 관련 함수 (이하 코드는 기존과 동일)-----
// (기존 script.js의 'initializeUserData' 함수부터 끝까지의 모든 코드를 여기에 붙여넣으세요.)
async function initializeUserData(user) {
    const initialBlocks = [
        { name: '운동', color: '#4a90e2' },
        { name: '공부', color: '#50c878' },
        { name: '약속', color: '#ff914d' },
    ];
    await db.collection('users').doc(user.uid).set({
        blocks: initialBlocks,
        placedData: [],
        deadlines: [],
        specialDays: [],
        recurringData: []
    });
}
async function saveStateToFirestore() {
    if (!currentUser) return;
    const allData = {
        blocks: blocksConfig,
        placedData: placedData,
        deadlines: deadlines,
        specialDays: specialDays,
        recurringData: recurringData
    };
    try {
        await db.collection('users').doc(currentUser.uid).set(allData, { merge: true });
        console.log('데이터가 클라우드에 저장되었습니다.');
    } catch (error) {
        console.error("클라우드 저장 실패: ", error);
        alert('데이터 저장에 실패했습니다. 인터넷 연결을 확인해주세요.');
    }
}
async function loadStateFromFirestore() {
    if (!currentUser) return;
    try {
        const docRef = db.collection('users').doc(currentUser.uid);
        const doc = await docRef.get();
        if (doc.exists) {
            const data = doc.data();
            blocksConfig = data.blocks || [];
            placedData = data.placedData || [];
            deadlines = data.deadlines || [];
            specialDays = data.specialDays || [];
            recurringData = data.recurringData || [];
            console.log('데이터를 클라우드에서 불러왔습니다.');
        } else {
            console.log("저장된 데이터가 없어 새로 생성합니다.");
            await initializeUserData(currentUser);
            await loadStateFromFirestore();
            return;
        }
    } catch (error) {
        console.error("클라우드 데이터 로드 실패: ", error);
        alert('데이터를 불러오는 데 실패했습니다.');
    }
    renderBlocks();
    renderMainView();
}
function saveState() {
    saveStateToFirestore();
}
let editingBlockIndex = null; // 수정 중인 블럭 인덱스

function renderBlocks() {
    const container = document.getElementById('blockList');
    container.innerHTML = '';
    blocksConfig.forEach((b, index) => {
        const div = document.createElement('div');
        div.className = 'block';
        div.style.background = b.color;
        div.setAttribute('draggable', 'true');
        div.dataset.name = b.name;
        div.dataset.index = index;
        const translatedName = translateBlockName(b.name);
        
        // 블럭 이름
        const nameSpan = document.createElement('span');
        nameSpan.className = 'block-name';
        nameSpan.textContent = translatedName;
        nameSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            editBlock(index);
        });
        
        // 수정 버튼
        const editBtn = document.createElement('span');
        editBtn.className = 'editBtn';
        editBtn.innerHTML = '✎';
        editBtn.title = '수정';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editBlock(index);
        });
        
        // 삭제 버튼
        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.innerHTML = '✖';
        deleteBtn.title = '삭제';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteBlock(e, index);
        });
        
        // 버튼 컨테이너
        const btnContainer = document.createElement('div');
        btnContainer.className = 'block-actions';
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        
        div.appendChild(nameSpan);
        div.appendChild(btnContainer);
        
        // 터치 이벤트를 위한 추가 설정
        div.style.touchAction = 'none'; // 터치 스크롤 방지
        
        // 블럭 드래그 이벤트: 항상 dragged 설정 (순서 변경은 드롭 타겟에서 판단)
        div.addEventListener('dragstart', (e) => {
            // 버튼 영역에서 시작된 드래그는 무시
            if (e.target.classList.contains('editBtn') || e.target.classList.contains('deleteBtn') ||
                e.target.closest('.block-actions')) {
                e.preventDefault();
                return;
            }
            // 항상 dragged 설정 (캘린더 배치용)
            dragged = div;
            // 순서 변경을 위한 데이터도 함께 설정
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', 'block:' + index);
            div.classList.add('dragging');
        });
        
        div.addEventListener('dragend', () => {
            div.classList.remove('dragging');
            dragged = null;
        });
        
        // 블럭 전체에 드롭 이벤트 (순서 변경용)
        div.addEventListener('dragover', (e) => {
            // 다른 블럭이 드래그 중인지 확인
            const dragging = document.querySelector('.block.dragging');
            if (!dragging || dragging === div) return;
            // 블럭 리스트 영역 내에서만 순서 변경 허용
            const blocksContainer = document.getElementById('blockList');
            const rect = blocksContainer.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            if (mouseX >= rect.left && mouseX <= rect.right && 
                mouseY >= rect.top && mouseY <= rect.bottom) {
                e.preventDefault();
                e.stopPropagation();
                e.dataTransfer.dropEffect = 'move';
                const allBlocks = Array.from(container.querySelectorAll('.block'));
                const draggingIndex = allBlocks.indexOf(dragging);
                const currentIndex = allBlocks.indexOf(div);
                if (draggingIndex < currentIndex) {
                    container.insertBefore(dragging, div.nextSibling);
                } else {
                    container.insertBefore(dragging, div);
                }
            }
        });
        
        div.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const dragging = document.querySelector('.block.dragging');
            if (!dragging || dragging === div) return;
            
            // 블럭 리스트 영역 내에서만 순서 변경 허용
            const blocksContainer = document.getElementById('blockList');
            const rect = blocksContainer.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            if (mouseX >= rect.left && mouseX <= rect.right && 
                mouseY >= rect.top && mouseY <= rect.bottom) {
                const draggedIndex = parseInt(dragging.dataset.index);
                const dropIndex = index;
                if (draggedIndex !== dropIndex && !isNaN(draggedIndex)) {
                    // 배열 순서 변경
                    const draggedBlock = blocksConfig[draggedIndex];
                    blocksConfig.splice(draggedIndex, 1);
                    blocksConfig.splice(dropIndex, 0, draggedBlock);
                    saveState();
                    renderBlocks();
                }
            }
        });
        
        container.appendChild(div);
    });
    const addBtn = document.createElement('button');
    addBtn.className = 'add-block-btn';
    addBtn.title = '새 블럭 추가';
    addBtn.textContent = '＋';
    addBtn.onclick = openAddBlockModal;
    container.appendChild(addBtn);
}
function ensureClickAddPopup() {
    if (clickAddPopup) return;
    clickAddPopup = document.createElement('div');
    clickAddPopup.id = 'clickAddPopup';
    clickAddPopup.className = 'click-add-popup';
    clickAddPopup.addEventListener('click', e => e.stopPropagation());
    document.body.appendChild(clickAddPopup);
}
function closeClickAddPopup() {
    if (!clickAddPopup) return;
    clickAddPopup.style.display = 'none';
    clickAddPopup.style.visibility = 'hidden';
    clickAddPopup.innerHTML = '';
    clickAddTarget = null;
}
function openClickAddPopup(event, cellInfo) {
    if (!blocksConfig.length) return;
    ensureClickAddPopup();
    
    const newTarget = {
        date: cellInfo.date,
        slot: convertSlotToKorean(cellInfo.slot)
    };
    
    // 같은 셀을 다시 클릭했고 팝업이 이미 열려있으면 닫기
    if (clickAddPopup && 
        clickAddPopup.style.display === 'flex' && 
        clickAddPopup.style.visibility === 'visible' &&
        clickAddTarget && 
        clickAddTarget.date === newTarget.date && 
        clickAddTarget.slot === newTarget.slot) {
        closeClickAddPopup();
        return;
    }
    
    closeClickAddPopup();
    
    clickAddTarget = newTarget;
    
    const texts = TEXTS[currentLanguage];
    const header = document.createElement('div');
    header.className = 'click-add-header';
    const title = document.createElement('div');
    title.className = 'click-add-title';
    title.textContent = texts?.clickAdd?.title || (currentLanguage === 'ko' ? '블럭 선택' : 'Select block');
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'click-add-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeClickAddPopup();
    });
    header.appendChild(title);
    header.appendChild(closeBtn);
    clickAddPopup.appendChild(header);
    
    const list = document.createElement('div');
    list.className = 'click-add-list';
    clickAddPopup.appendChild(list);
    
    blocksConfig.forEach(block => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'click-add-item';
        btn.style.background = block.color;
        btn.textContent = translateBlockName(block.name);
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addBlockFromClick(block);
        });
        list.appendChild(btn);
    });
    
    clickAddPopup.style.visibility = 'hidden';
    clickAddPopup.style.display = 'flex';
    requestAnimationFrame(() => {
        const rect = clickAddPopup.getBoundingClientRect();
        const offset = 12;
        let left = event.clientX + offset;
        let top = event.clientY + offset;
        if (left + rect.width > window.innerWidth) {
            left = Math.max(8, window.innerWidth - rect.width - 8);
        }
        if (top + rect.height > window.innerHeight) {
            top = Math.max(8, window.innerHeight - rect.height - 8);
        }
        clickAddPopup.style.left = `${left}px`;
        clickAddPopup.style.top = `${top}px`;
        clickAddPopup.style.visibility = 'visible';
    });
}
function addBlockFromClick(blockConfig) {
    if (!clickAddTarget) return;
    const newPlaced = {
        category: blockConfig.name,
        color: blockConfig.color,
        date: clickAddTarget.date,
        slot: clickAddTarget.slot,
        memo: ''
    };
    placedData.push(newPlaced);
    saveState();
    closeClickAddPopup();
    renderMainView();
}
function handleCalendarCellClick(e, cellInfo) {
    if (deadlineMode) {
        e.stopPropagation();
        const koreanSlot = convertSlotToKorean(cellInfo.slot);
        const exists = deadlines.find(d => d.date === cellInfo.date && d.slot === koreanSlot);
        if (!exists) {
            deadlines.push({ date: cellInfo.date, slot: koreanSlot, title: '' });
        }
        openDeadlineModal({ date: cellInfo.date, slot: koreanSlot });
        return;
    }
    if (e.target.closest('.placed') || e.target.closest('.deadline-line') || e.target.closest('.deadline-label')) {
        return;
    }
    e.stopPropagation();
    openClickAddPopup(e, cellInfo);
}
document.addEventListener('click', (e) => {
    if (!clickAddPopup || clickAddPopup.style.display === 'none') return;
    if (clickAddPopup.contains(e.target)) return;
    closeClickAddPopup();
});
window.addEventListener('resize', closeClickAddPopup);
window.addEventListener('scroll', closeClickAddPopup, true);
function openAddBlockModal() {
    editingBlockIndex = null;
    const modal = document.getElementById('addBlockModal');
    const title = document.getElementById('blockModalTitle');
    const saveBtn = document.getElementById('blockSaveBtn');
    const cancelBtn = document.getElementById('blockCancelBtn');
    const nameInput = document.getElementById('newBlockName');
    const colorInput = document.getElementById('newBlockColor');
    
    title.textContent = currentLanguage === 'ko' ? '새 블럭 추가' : 'Add New Block';
    saveBtn.textContent = currentLanguage === 'ko' ? '추가' : 'Add';
    cancelBtn.style.display = 'none';
    nameInput.value = '';
    colorInput.value = '#888888';
    
    modal.style.display = 'flex';
    setTimeout(() => nameInput.focus(), 10);
}

function editBlock(index) {
    if (index < 0 || index >= blocksConfig.length) return;
    editingBlockIndex = index;
    const block = blocksConfig[index];
    const modal = document.getElementById('addBlockModal');
    const title = document.getElementById('blockModalTitle');
    const saveBtn = document.getElementById('blockSaveBtn');
    const cancelBtn = document.getElementById('blockCancelBtn');
    const nameInput = document.getElementById('newBlockName');
    const colorInput = document.getElementById('newBlockColor');
    
    title.textContent = currentLanguage === 'ko' ? '블럭 수정' : 'Edit Block';
    saveBtn.textContent = currentLanguage === 'ko' ? '저장' : 'Save';
    cancelBtn.style.display = 'inline-block';
    nameInput.value = block.name;
    colorInput.value = block.color;
    
    modal.style.display = 'flex';
    setTimeout(() => nameInput.focus(), 10);
}

function saveBlock() {
    const name = document.getElementById('newBlockName').value.trim();
    const color = document.getElementById('newBlockColor').value;
    if (!name) {
        alert(currentLanguage === 'ko' ? '이름을 입력해주세요.' : 'Please enter a name.');
        return;
    }
    
    if (editingBlockIndex !== null) {
        // 수정 모드
        const existingBlock = blocksConfig[editingBlockIndex];
        // 이름이 변경되었고, 다른 블럭과 중복되는지 확인
        if (name !== existingBlock.name && blocksConfig.some((b, i) => i !== editingBlockIndex && b.name === name)) {
            alert(currentLanguage === 'ko' ? '같은 이름의 블럭이 이미 있어요.' : 'A block with this name already exists.');
            return;
        }
        blocksConfig[editingBlockIndex].name = name;
        blocksConfig[editingBlockIndex].color = color;
    } else {
        // 추가 모드
        if (blocksConfig.some(b => b.name === name)) {
            alert(currentLanguage === 'ko' ? '같은 이름의 블럭이 이미 있어요.' : 'A block with this name already exists.');
            return;
        }
        blocksConfig.push({ name, color });
    }
    
    renderBlocks();
    saveState();
    updateSummary();
    renderCalendar(); // 캘린더도 다시 렌더링 (색상 변경 반영)
    closeBlockModal();
}

function closeBlockModal() {
    const modal = document.getElementById('addBlockModal');
    modal.style.display = 'none';
    editingBlockIndex = null;
    document.getElementById('newBlockName').value = '';
}

function deleteBlock(e, index) {
    e.stopPropagation();
    if (index === undefined) {
        // 기존 방식 호환성
        const blockName = e.target.closest('.block').dataset.name;
        index = blocksConfig.findIndex(b => b.name === blockName);
    }
    if (index < 0 || index >= blocksConfig.length) return;
    
    if (confirm(currentLanguage === 'ko' ? 
        `"${blocksConfig[index].name}" 블럭을 삭제하시겠습니까?` : 
        `Delete "${blocksConfig[index].name}" block?`)) {
        blocksConfig.splice(index, 1);
        renderBlocks();
        saveState();
        updateSummary();
        renderCalendar(); // 캘린더도 다시 렌더링
    }
}
// 기존 마우스 드래그 앤 드롭 이벤트 (블럭은 블럭 내부에서 처리)
document.addEventListener('dragstart', e => {
    // 블럭은 블럭 내부 이벤트 리스너에서 처리
    if (e.target.classList.contains('block')) {
        return;
    }
    if (e.target.classList.contains('placed')) {
        // 버튼 영역에서 시작된 드래그는 무시
        if (e.target.classList.contains('editBtn') || e.target.classList.contains('deleteBtn') ||
            e.target.closest('.block-actions')) {
            return;
        }
        dragged = e.target;
    }
});
document.addEventListener('dragend', () => { 
    dragged = null; 
});

// 터치 드래그 앤 드롭 이벤트 핸들러들
function handleTouchStart(e) {
    if (e.touches.length !== 1) return;
    
    const target = e.target;
    
    // 삭제 버튼 클릭은 제외
    if (target.classList.contains('deleteBtn')) return;
    
    // 모바일에서만 터치 드래그 처리
    if (!isMobileDevice()) return;
    
    // 모바일에서는 새로운 블럭(.block)만 드래그 가능
    // 배치된 블럭(.placed)은 터치로 메모 모달만 열기
    if (!target.classList.contains('block') && !target.classList.contains('placed')) return;
    
    e.preventDefault();
    
    touchDragged = target;
    touchStartPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
    touchStartTime = Date.now();
    isLongPress = false;
    
    // 새로운 블럭(.block)만 길게 누르기로 드래그 가능
    if (target.classList.contains('block')) {
        touchLongPressTimer = setTimeout(() => {
            if (touchDragged && !isTouchDragging) {
                isLongPress = true;
                startTouchDrag();
                // 진동 피드백
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        }, 500);
    }
    
    // 터치 이동 이벤트 리스너 추가
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
}

function handleTouchMove(e) {
    if (!touchDragged || e.touches.length !== 1) return;
    
    // 모바일에서만 처리
    if (!isMobileDevice()) return;
    
    e.preventDefault();
    
    touchCurrentPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
    
    // 움직임이 감지되면 길게 누르기 타이머 취소
    if (touchLongPressTimer) {
        clearTimeout(touchLongPressTimer);
        touchLongPressTimer = null;
    }
    
    // 드래그 거리 계산
    const dragDistance = Math.sqrt(
        Math.pow(touchCurrentPos.x - touchStartPos.x, 2) + 
        Math.pow(touchCurrentPos.y - touchStartPos.y, 2)
    );
    
    // 새로운 블럭(.block)만 길게 누르기 후 드래그 가능
    if (touchDragged.classList.contains('block') && isLongPress && dragDistance > 10) {
        if (!isTouchDragging) {
            startTouchDrag();
        }
        updateTouchGhost(touchCurrentPos);
        
        // 드롭 타겟 감지
        const elementBelow = document.elementFromPoint(touchCurrentPos.x, touchCurrentPos.y);
        const dropTarget = findDropTarget(elementBelow);
        
        // 드롭 타겟 하이라이트
        highlightDropTarget(dropTarget);
    }
}

function handleTouchEnd(e) {
    if (!touchDragged) return;
    
    // 모바일에서만 처리
    if (!isMobileDevice()) return;
    
    e.preventDefault();
    
    // 길게 누르기 타이머 취소
    if (touchLongPressTimer) {
        clearTimeout(touchLongPressTimer);
        touchLongPressTimer = null;
    }
    
    // 드래그 거리 계산
    const dragDistance = touchCurrentPos ? Math.sqrt(
        Math.pow(touchCurrentPos.x - touchStartPos.x, 2) + 
        Math.pow(touchCurrentPos.y - touchStartPos.y, 2)
    ) : 0;
    
    const touchDuration = Date.now() - touchStartTime;
    
    // 새로운 블럭(.block): 길게 누르기 후 드래그로 배치
    if (touchDragged.classList.contains('block')) {
        if (isLongPress && isTouchDragging && touchDropTarget) {
            performTouchDrop(touchDragged, touchDropTarget);
        }
    }
    // 배치된 블럭(.placed): 짧은 터치로 메모 모달 열기
    else if (touchDragged.classList.contains('placed')) {
        if (!isLongPress && touchDuration < 500 && dragDistance < 10) {
            openMemoModal(touchDragged);
        }
    }
    
    // 정리
    cleanupTouchDrag();
    
    // 이벤트 리스너 제거
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
}

// 드래그 시작 함수
function startTouchDrag() {
    if (!touchDragged) return;
    
    isTouchDragging = true;
    createTouchGhost(touchDragged);
}

// 모바일 디바이스 감지 함수
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 768);
}

function createTouchGhost(originalBlock) {
    touchGhost = originalBlock.cloneNode(true);
    touchGhost.style.position = 'fixed';
    touchGhost.style.pointerEvents = 'none';
    touchGhost.style.zIndex = '1000';
    touchGhost.style.opacity = '0.7';
    touchGhost.style.transform = 'scale(1.05)';
    touchGhost.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
    
    document.body.appendChild(touchGhost);
    updateTouchGhost(touchStartPos);
}

function updateTouchGhost(pos) {
    if (!touchGhost) return;
    
    touchGhost.style.left = (pos.x - 60) + 'px';
    touchGhost.style.top = (pos.y - 20) + 'px';
}

function findDropTarget(element) {
    if (!element) return null;
    
    // 캘린더 셀인지 확인
    if (element.classList.contains('dropzone')) {
        return element;
    }
    
    // 부모 요소에서 드롭 타겟 찾기
    let parent = element.parentElement;
    while (parent && parent !== document.body) {
        if (parent.classList.contains('dropzone')) {
            return parent;
        }
        parent = parent.parentElement;
    }
    
    return null;
}

function highlightDropTarget(target) {
    // 이전 하이라이트 제거
    document.querySelectorAll('.dropzone.highlight').forEach(el => {
        el.classList.remove('highlight');
    });
    
    // 새 타겟 하이라이트
    if (target) {
        target.classList.add('highlight');
        touchDropTarget = target;
    } else {
        touchDropTarget = null;
    }
}

function performTouchDrop(draggedBlock, dropTarget) {
    // 모바일에서는 새로운 블럭(.block)만 드롭 가능
    if (!draggedBlock.classList.contains('block')) return;
    
    // 기존 드래그 앤 드롭 로직 재사용 (새로운 블럭 추가만)
    const children = [...dropTarget.querySelectorAll('.placed')];
    let desiredWithin = children.findIndex(child => touchCurrentPos.y <= child.offsetTop + child.offsetHeight / 2);
    if (desiredWithin === -1) desiredWithin = children.length;
    
    const moved = { 
        category: draggedBlock.dataset.name, 
        color: draggedBlock.style.background, 
        date: dropTarget.dataset.date, 
        slot: convertSlotToKorean(dropTarget.dataset.slot), 
        memo: '' 
    };
    
    const others = placedData.slice();
    let newArr = [];
    let inserted = false;
    let countInCell = 0;
    
    for (const item of others) {
        const isCell = (item.date === dropTarget.dataset.date && item.slot === convertSlotToKorean(dropTarget.dataset.slot));
        if (isCell && countInCell === desiredWithin && !inserted) { 
            newArr.push(moved); 
            inserted = true; 
        }
        newArr.push(item);
        if (isCell) countInCell++;
    }
    
    if (!inserted) newArr.push(moved);
    placedData = newArr;
    
    saveState();
    renderMainView();
}

function cleanupTouchDrag() {
    if (touchGhost) {
        document.body.removeChild(touchGhost);
        touchGhost = null;
    }
    
    // 하이라이트 제거
    document.querySelectorAll('.dropzone.highlight').forEach(el => {
        el.classList.remove('highlight');
    });
    
    // 길게 누르기 타이머 취소
    if (touchLongPressTimer) {
        clearTimeout(touchLongPressTimer);
        touchLongPressTimer = null;
    }
    
    touchDragged = null;
    touchStartPos = null;
    touchCurrentPos = null;
    touchStartTime = null;
    isTouchDragging = false;
    touchDropTarget = null;
    isLongPress = false;
}

// 터치 이벤트 리스너 등록
document.addEventListener('touchstart', handleTouchStart, { passive: false });
function renderCalendar() {
    const table = document.getElementById('calendarTable');
    table.innerHTML = '';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    tr.appendChild(document.createElement('th'));
    
    const texts = TEXTS[currentLanguage];
    
    for (let i = 0; i < 7; i++) {
        const day = new Date(currentMonday.getTime() + i * DAY);
        const th = document.createElement('th');
        const date = ymdLocal(day);
        
        // 오늘 날짜 확인
        const today = new Date();
        const isToday = day.getFullYear() === today.getFullYear() &&
                       day.getMonth() === today.getMonth() &&
                       day.getDate() === today.getDate();
        if (isToday) {
            th.classList.add('today');
        }
        
        // 헤더 컨텐츠 컨테이너 생성
        const thContent = document.createElement('div');
        thContent.className = 'th-content';
        
        // 요일 이름
        const dayName = document.createElement('span');
        dayName.className = 'day-name';
        const dayNames = currentLanguage === 'ko' 
            ? ['일', '월', '화', '수', '목', '금', '토']
            : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        dayName.textContent = dayNames[day.getDay()];
        thContent.appendChild(dayName);
        
        // 날짜 숫자
        const dateNum = document.createElement('span');
        dateNum.className = 'date-num';
        dateNum.textContent = day.getDate();
        thContent.appendChild(dateNum);
        
        th.appendChild(thContent);
        
        // 특별한 날 블럭 표시
        const sds = specialDays.filter(s => s.date === date);
        if (sds.length > 0) {
            const specialBlocksWrap = document.createElement('div');
            specialBlocksWrap.className = 'week-special-blocks';
            // 최대 3개까지 표시, 나머지는 "+N"
            const displayCount = Math.min(sds.length, 3);
            sds.slice(0, displayCount).forEach(sd => {
                const block = document.createElement('div');
                block.className = 'week-special-block';
                block.textContent = sd.label;
                block.style.background = sd.color || '#4f46e5';
                block.style.color = '#ffffff';
                specialBlocksWrap.appendChild(block);
            });
            if (sds.length > 3) {
                const moreBlock = document.createElement('div');
                moreBlock.className = 'week-special-block-more';
                moreBlock.textContent = `+${sds.length - 3}`;
                specialBlocksWrap.appendChild(moreBlock);
            }
            th.appendChild(specialBlocksWrap);
        }
        
        // 날짜 헤더 클릭 시 특별한 날 모달 열기
        th.style.cursor = 'pointer';
        th.addEventListener('click', (e) => {
            e.stopPropagation();
            openSpecialModal(date);
        });
        
        tr.appendChild(th);
    }
    thead.appendChild(tr); table.appendChild(thead);
    const tbody = document.createElement('tbody');
    texts.slots.forEach((slot, slotIndex) => {
        const tr = document.createElement('tr');
        const tdLabel = document.createElement('td');
        
        // 모던 디지털 캔버스 스타일 시간 레이블 생성
        const timeMapping = TIME_MAPPING[slot] || { name: slot.toUpperCase(), range: '', ko: slot };
        const displayName = currentLanguage === 'ko' ? timeMapping.ko : timeMapping.name;
        tdLabel.innerHTML = `<span class="time-label">${displayName}</span>`;
        
        tr.appendChild(tdLabel);
        for (let i = 0; i < 7; i++) {
            const td = document.createElement('td'); td.className = 'dropzone';
            const date = ymdLocal(new Date(currentMonday.getTime() + i * DAY));
            td.dataset.slot = slot; td.dataset.date = date;
            td.addEventListener('dragover', e => e.preventDefault());
            td.addEventListener('drop', e => {
                e.preventDefault(); if (!dragged) return;
                const children = [...td.querySelectorAll('.placed')].filter(el => el !== dragged);
                let desiredWithin = children.findIndex(child => e.offsetY <= child.offsetTop + child.offsetHeight / 2);
                if (desiredWithin === -1) desiredWithin = children.length;
                let moved;
                if (dragged.classList.contains('block')) {
                    moved = { category: dragged.dataset.name, color: dragged.style.background, date, slot: convertSlotToKorean(slot), memo: '' };
                } else {
                    const idx = placedData.findIndex(b => b.date === dragged.dataset.date && b.slot === dragged.dataset.slot && b.category === dragged.dataset.category);
                    if (idx === -1) return;
                    moved = { ...placedData[idx], date, slot: convertSlotToKorean(slot) };
                    placedData.splice(idx, 1);
                }
                const others = placedData.slice(); let newArr = []; let inserted = false; let countInCell = 0;
                for (const item of others) {
                    const isCell = (item.date === date && item.slot === convertSlotToKorean(slot));
                    if (isCell && countInCell === desiredWithin && !inserted) { newArr.push(moved); inserted = true; }
                    newArr.push(item);
                    if (isCell) countInCell++;
                }
                if (!inserted) newArr.push(moved);
                placedData = newArr;
                saveState();
                renderCalendar();
                // 슬롯 쿼드런트 모달이 열려있으면 새로고침
                const quadrantModal = document.getElementById('slotQuadrantModal');
                if (quadrantModal && quadrantModal.style.display !== 'none') {
                    renderSlotQuadrant();
                }
            });
            td.addEventListener('click', (e) => handleCalendarCellClick(e, { td, slot, date }));
            // 슬롯을 한국어로 변환하여 데이터와 매칭
            const koreanSlot = convertSlotToKorean(slot);
            const cellBlocks = getCombinedBlocksForCell(date, koreanSlot);
            cellBlocks.forEach(b => {
                const clone = document.createElement('div'); 
                clone.className = 'placed';
                if (b.recurring) {
                    clone.classList.add('recurring');
                }
                if (b.time) {
                    clone.classList.add('has-time');
                }
                
                // 시간 표시 (블록 왼쪽 위에)
                if (b.time) {
                    const timeBadge = document.createElement('span');
                    timeBadge.className = 'time-badge';
                    timeBadge.textContent = b.time;
                    clone.appendChild(timeBadge);
                }
                
                // 블록 텍스트 구성
                const blockText = document.createElement('span');
                blockText.className = 'block-text';
                blockText.textContent = translateBlockName(b.category);
                clone.appendChild(blockText);
                
                clone.style.background = b.color;
                clone.dataset.category = b.category;
                clone.dataset.date = b.date;
                clone.dataset.slot = koreanSlot;
                clone.dataset.memo = b.memo || '';
                clone.dataset.time = b.time || '';
                clone.dataset.color = b.color;
                clone.dataset.recurring = b.recurring ? 'true' : 'false';
                if (b.recurring && b.recurringId) {
                    clone.dataset.recurringId = b.recurringId;
                }
                if (!b.recurring) {
                    clone.setAttribute('draggable', 'true');
                }
                
                // 터치 이벤트를 위한 추가 설정
                clone.style.touchAction = 'none'; // 터치 스크롤 방지
                
                clone.addEventListener('click', () => openMemoModal(clone));
                td.appendChild(clone);
            });
            // day-flag 제거 (블럭으로 대체됨)
            const dl = deadlines.find(d => d.date === date && d.slot === koreanSlot);
            if (dl) {
                const line = document.createElement('div'); line.className = 'deadline-line'; line.title = dl.title || '데드라인';
                line.addEventListener('click', (e) => { e.stopPropagation(); openDeadlineModal({ date, slot: koreanSlot }); });
                const label = document.createElement('div'); label.className = 'deadline-label'; label.textContent = dl.title ? dl.title : '';
                td.appendChild(line); if (dl.title) td.appendChild(label);
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    updateSummary();
    updateDateRangeDisplay();
    const isThisWeek = ymdLocal(getMonday(new Date())) === ymdLocal(currentMonday);
    const btnThisWeek = document.getElementById('btnThisWeek');
    if (btnThisWeek) {
        btnThisWeek.classList.toggle('current', isThisWeek);
    }
}
function prevWeek() { 
    currentMonday = new Date(currentMonday.getFullYear(), currentMonday.getMonth(), currentMonday.getDate() - 7); 
    renderMainView(); 
}
function nextWeek() { 
    currentMonday = new Date(currentMonday.getFullYear(), currentMonday.getMonth(), currentMonday.getDate() + 7); 
    renderMainView(); 
}
function thisWeek() { 
    currentMonday = getMonday(new Date()); 
    renderMainView(); 
}
function updateSummary() {
    const counts = { last: {}, this: {}, next: {} };
    const lastStart = new Date(currentMonday.getFullYear(), currentMonday.getMonth(), currentMonday.getDate() - 7);
    const lastEnd = new Date(currentMonday.getFullYear(), currentMonday.getMonth(), currentMonday.getDate() - 1);
    const thisStart = new Date(currentMonday.getFullYear(), currentMonday.getMonth(), currentMonday.getDate());
    const thisEnd = new Date(currentMonday.getFullYear(), currentMonday.getMonth(), currentMonday.getDate() + 6);
    const nextStart = new Date(currentMonday.getFullYear(), currentMonday.getMonth(), currentMonday.getDate() + 7);
    const nextEnd = new Date(currentMonday.getFullYear(), currentMonday.getMonth(), currentMonday.getDate() + 13);
    placedData.forEach(b => {
        const d = fromYMDLocal(b.date);
        if (d >= thisStart && d <= thisEnd) { counts.this[b.category] = (counts.this[b.category] || 0) + 1; }
        else if (d >= lastStart && d <= lastEnd) { counts.last[b.category] = (counts.last[b.category] || 0) + 1; }
        else if (d >= nextStart && d <= nextEnd) { counts.next[b.category] = (counts.next[b.category] || 0) + 1; }
    });
    addRecurringCounts(counts.last, lastStart, lastEnd);
    addRecurringCounts(counts.this, thisStart, thisEnd);
    addRecurringCounts(counts.next, nextStart, nextEnd);
    renderSummary('lastWeek', counts.last); renderSummary('thisWeek', counts.this); renderSummary('nextWeek', counts.next);
}
function renderSummary(id, data) {
    const box = document.getElementById(id); box.innerHTML = '';
    const texts = TEXTS[currentLanguage];
    if (Object.keys(data).length === 0) { box.textContent = texts.summary.noData; return; }
    for (let c in data) {
        const item = document.createElement('div'); item.className = 'report-item';
        const label = document.createElement('div'); label.className = 'report-label'; label.textContent = translateBlockName(c) + ' ' + data[c];
        const barC = document.createElement('div'); barC.className = 'bar-container';
        const bar = document.createElement('div'); bar.className = 'bar';
        bar.style.width = (data[c] * 22) + 'px';
        const ref = blocksConfig.find(b => b.name === c);
        bar.style.background = ref ? ref.color : '#aaa';
        barC.appendChild(bar); item.appendChild(label); item.appendChild(barC);
        box.appendChild(item);
    }
}
function addRecurringCounts(target, rangeStart, rangeEnd) {
    if (!recurringData.length) return;
    const cursor = new Date(rangeStart.getTime());
    while (cursor <= rangeEnd) {
        const weekday = cursor.getDay();
        recurringData.forEach(r => {
            if (r.weekday === weekday) {
                target[r.category] = (target[r.category] || 0) + 1;
            }
        });
        cursor.setDate(cursor.getDate() + 1);
    }
}
function openMemoModal(block) {
    selectedBlock = block;
    const texts = TEXTS[currentLanguage];
    const memoInput = document.getElementById('memo');
    memoInput.placeholder = texts.placeholders.memo;
    // 제목을 블록 이름만 표시
    document.getElementById('modalTitle').textContent = translateBlockName(block.dataset.category);
    memoInput.value = block.dataset.memo || '';
    
    // 시간 태그 설정
    const timeIconBtn = document.getElementById('timeIconBtn');
    const timeTagIcon = document.getElementById('timeTagIcon');
    const timeTagText = document.getElementById('timeTagText');
    const timeClearBtn = document.getElementById('timeClearBtn');
    const blockTime = block.dataset.time || '';
    
    if (blockTime) {
        timeTagIcon.style.display = 'none';
        timeTagText.textContent = blockTime;
        timeTagText.style.display = 'inline-flex';
        timeIconBtn.classList.add('has-time');
        timeClearBtn.style.display = 'flex';
    } else {
        timeTagIcon.style.display = 'inline';
        timeTagText.textContent = '';
        timeTagText.style.display = 'none';
        timeIconBtn.classList.remove('has-time');
        timeClearBtn.style.display = 'none';
    }
    timeIconBtn.style.display = 'flex';
    
    const recurringToggle = document.getElementById('memoRecurringToggle');
    const recurringLabel = document.getElementById('memoRecurringLabel');
    if (recurringToggle) {
        recurringToggle.checked = block.dataset.recurring === 'true';
    }
    if (recurringLabel) {
        recurringLabel.textContent = texts.recurring?.label || 'Repeat every week at this time';
    }
    
    // 모달 버튼 텍스트 업데이트
    const saveBtn = document.querySelector('.modal-footer .save');
    const deleteBtn = document.querySelector('.modal-footer .delete');
    if (saveBtn) saveBtn.textContent = currentLanguage === 'ko' ? '저장' : 'Save';
    if (deleteBtn) deleteBtn.textContent = currentLanguage === 'ko' ? '삭제' : 'Delete';
    
    document.getElementById('modal').style.display = 'flex';
}

let currentAmPm = 'AM';

function selectAmPm(amPm) {
    currentAmPm = amPm;
    const amBtn = document.getElementById('amBtn');
    const pmBtn = document.getElementById('pmBtn');
    
    if (amPm === 'AM') {
        amBtn.classList.add('active');
        pmBtn.classList.remove('active');
    } else {
        pmBtn.classList.add('active');
        amBtn.classList.remove('active');
    }
}

function openTimeModal() {
    const timeModal = document.getElementById('timeModal');
    const timeHour = document.getElementById('timeHour');
    const timeMinute = document.getElementById('timeMinute');
    const timeTagText = document.getElementById('timeTagText');
    
    // 기존 시간이 있으면 불러오기
    if (timeTagText.style.display !== 'none' && timeTagText.textContent) {
        const [hourStr, minute] = timeTagText.textContent.split(':');
        let hour = parseInt(hourStr) || 12;
        
        // 24시간 형식을 12시간 형식으로 변환
        if (hour === 0) {
            hour = 12;
            currentAmPm = 'AM';
        } else if (hour === 12) {
            currentAmPm = 'PM';
        } else if (hour > 12) {
            hour = hour - 12;
            currentAmPm = 'PM';
        } else {
            currentAmPm = 'AM';
        }
        
        timeHour.value = hour;
        timeMinute.value = minute || '00';
    } else {
        timeHour.value = '12';
        timeMinute.value = '00';
        currentAmPm = 'AM';
    }
    
    selectAmPm(currentAmPm);
    timeModal.style.display = 'flex';
    setTimeout(() => timeHour.focus(), 10);
}

function closeTimeModal() {
    document.getElementById('timeModal').style.display = 'none';
}

function adjustTime(type, delta) {
    const timeHour = document.getElementById('timeHour');
    const timeMinute = document.getElementById('timeMinute');
    
    let value;
    if (type === 'hour') {
        value = parseInt(timeHour.value) || 12;
        value += delta;
        if (value > 12) value = 12;
        if (value < 1) value = 1;
        timeHour.value = value;
    } else {
        value = parseInt(timeMinute.value) || 0;
        value += delta;
        if (value > 59) value = 59;
        if (value < 0) value = 0;
        timeMinute.value = String(value).padStart(2, '0');
    }
    
    updateTimePreview();
}

function updateTimePreview() {
    const timeHour = document.getElementById('timeHour');
    const timeMinute = document.getElementById('timeMinute');
    
    // 값 제한
    let hour = parseInt(timeHour.value) || 12;
    let minute = parseInt(timeMinute.value) || 0;
    
    if (hour > 12) hour = 12;
    if (hour < 1) hour = 1;
    if (minute > 59) minute = 59;
    if (minute < 0) minute = 0;
    
    timeHour.value = hour;
    timeMinute.value = minute;
    
    // 자동 포커스 이동
    if (String(hour).length === 2 && String(minute).length < 2) {
        setTimeout(() => timeMinute.focus(), 10);
    }
}

function confirmTime() {
    const timeHour = document.getElementById('timeHour');
    const timeMinute = document.getElementById('timeMinute');
    const timeTagIcon = document.getElementById('timeTagIcon');
    const timeTagText = document.getElementById('timeTagText');
    const timeIconBtn = document.getElementById('timeIconBtn');
    const timeClearBtn = document.getElementById('timeClearBtn');
    
    let hour = parseInt(timeHour.value) || 12;
    const minute = parseInt(timeMinute.value) || 0;
    
    // 12시간 형식을 24시간 형식으로 변환
    if (currentAmPm === 'PM' && hour !== 12) {
        hour = hour + 12;
    } else if (currentAmPm === 'AM' && hour === 12) {
        hour = 0;
    }
    
    if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
        const timeStr = String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0');
        timeTagIcon.style.display = 'none';
        timeTagText.textContent = timeStr;
        timeTagText.style.display = 'inline-flex';
        timeIconBtn.classList.add('has-time');
        timeIconBtn.style.display = 'flex';
        timeClearBtn.style.display = 'flex';
        closeTimeModal();
    }
}

function clearTime() {
    const timeTagIcon = document.getElementById('timeTagIcon');
    const timeTagText = document.getElementById('timeTagText');
    const timeClearBtn = document.getElementById('timeClearBtn');
    const timeIconBtn = document.getElementById('timeIconBtn');
    
    timeTagIcon.style.display = 'inline';
    timeTagText.textContent = '';
    timeTagText.style.display = 'none';
    timeIconBtn.classList.remove('has-time');
    timeClearBtn.style.display = 'none';
}
function closeMemoModal() {
    document.getElementById('modal').style.display = 'none';
    selectedBlock = null;
}
function saveMemo() {
    if (!selectedBlock) return;
    const memo = document.getElementById('memo').value;
    const timeTagText = document.getElementById('timeTagText');
    const time = timeTagText.style.display !== 'none' ? timeTagText.textContent : '';
    const recurringToggle = document.getElementById('memoRecurringToggle');
    const wantRecurring = recurringToggle ? recurringToggle.checked : false;
    const blockInfo = {
        date: selectedBlock.dataset.date,
        slot: selectedBlock.dataset.slot,
        category: selectedBlock.dataset.category,
        color: selectedBlock.dataset.color || selectedBlock.style.background
    };
    const wasRecurring = selectedBlock.dataset.recurring === 'true';
    
    if (wantRecurring) {
        const weekday = getWeekdayFromDateString(blockInfo.date);
        const recurringId = selectedBlock.dataset.recurringId || generateRecurringId();
        // 반복 시작일을 현재 날짜로 설정 (미래에만 적용)
        const startDate = blockInfo.date;
        const entry = {
            id: recurringId,
            weekday,
            slot: blockInfo.slot,
            category: blockInfo.category,
            color: blockInfo.color,
            memo,
            time: time,
            startDate: startDate
        };
        const idx = recurringData.findIndex(r => r.id === recurringId);
        if (idx > -1) {
            recurringData[idx] = entry;
        } else {
            recurringData.push(entry);
        }
        // 현재 날짜의 placedData만 제거 (과거는 유지)
        removePlacedByInfo(blockInfo);
        selectedBlock.dataset.recurring = 'true';
        selectedBlock.dataset.recurringId = recurringId;
    } else {
        const idx = findPlacedIndexByInfo(blockInfo);
        if (idx > -1) {
            placedData[idx].memo = memo;
            placedData[idx].time = time;
        } else {
            placedData.push({
                category: blockInfo.category,
                color: blockInfo.color,
                date: blockInfo.date,
                slot: blockInfo.slot,
                memo,
                time: time
            });
        }
        if (wasRecurring && selectedBlock.dataset.recurringId) {
            const recurringId = selectedBlock.dataset.recurringId;
            recurringData = recurringData.filter(r => r.id !== recurringId);
        }
        selectedBlock.dataset.recurring = 'false';
        delete selectedBlock.dataset.recurringId;
    }
    
    selectedBlock.dataset.memo = memo;
    selectedBlock.dataset.time = time;
    saveState();
    closeMemoModal();
    renderMainView();
}
function deletePlaced() {
    if (!selectedBlock) return;
    if (selectedBlock.dataset.recurring === 'true' && selectedBlock.dataset.recurringId) {
        // 반복 블록 삭제: recurringData에서만 제거
        // placedData는 건드리지 않음 (과거 기록 유지)
        const recurringId = selectedBlock.dataset.recurringId;
        recurringData = recurringData.filter(r => r.id !== recurringId);
        // recurringData에서 제거하면 미래 날짜에 자동으로 생성되지 않음
        // 과거 기록은 placedData에 있든 없든 그대로 유지됨
    } else {
        // 일반 블록 삭제: 해당 날짜의 placedData에서만 제거
        placedData = placedData.filter(b => !(b.date === selectedBlock.dataset.date && b.slot === selectedBlock.dataset.slot && b.category === selectedBlock.dataset.category));
    }
    saveState();
    closeMemoModal();
    renderMainView();
}
function toggleDeadlineMode() {
    deadlineMode = !deadlineMode;
    const btnDeadlineWeekly = document.getElementById('btnDeadlineMode');
    const btnDeadlineMonthly = document.getElementById('btnDeadlineModeMonthly');
    if (btnDeadlineWeekly) btnDeadlineWeekly.classList.toggle('active', deadlineMode);
    if (btnDeadlineMonthly) btnDeadlineMonthly.classList.toggle('active', deadlineMode);
}
function openDeadlineModal(key) {
    deadlineEditingKey = key;
    const d = deadlines.find(x => x.date === key.date && x.slot === key.slot);
    document.getElementById('deadlineTitle').value = d?.title || '';
    
    // 모달 버튼 텍스트 업데이트
    const modal = document.getElementById('deadlineModal');
    const saveBtn = modal.querySelector('.modal-footer .save');
    const deleteBtn = modal.querySelector('.modal-footer .delete');
    if (saveBtn) saveBtn.textContent = currentLanguage === 'ko' ? '저장' : 'Save';
    if (deleteBtn) deleteBtn.textContent = currentLanguage === 'ko' ? '삭제' : 'Delete';
    
    modal.style.display = 'flex';
}
function saveDeadline() {
    const title = document.getElementById('deadlineTitle').value.trim();
    const { date, slot } = deadlineEditingKey || {}; if (!date || !slot) { closeDeadline(); return; }
    const idx = deadlines.findIndex(x => x.date === date && x.slot === slot);
    if (idx > -1) { deadlines[idx].title = title; } else { deadlines.push({ date, slot, title }); }
    saveState();
    closeDeadline(); renderCalendar();
}
function deleteDeadline() {
    const { date, slot } = deadlineEditingKey || {};
    deadlines = deadlines.filter(x => !(x.date === date && x.slot === slot));
    saveState();
    closeDeadline(); renderCalendar();
}
function closeDeadline() { document.getElementById('deadlineModal').style.display = 'none'; deadlineEditingKey = null; }
// 달력 버튼 이벤트 리스너 (주간/월간 모두)
const btnMonthWeekly = document.getElementById('btnMonth');
const btnMonthMonthly = document.getElementById('btnMonthMonthly');

if (btnMonthWeekly) {
    btnMonthWeekly.addEventListener('click', () => {
        document.getElementById('monthModal').style.display = 'flex';
        renderMonth();
    });
}

if (btnMonthMonthly) {
    btnMonthMonthly.addEventListener('click', () => {
        document.getElementById('monthModal').style.display = 'flex';
        renderMonth();
    });
}

// 설정 메뉴 토글
function toggleSettingsMenu() {
    const menu = document.getElementById('settingsMenu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// 설정 메뉴 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    if (settingsMenu && settingsBtn && !settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
        settingsMenu.classList.remove('show');
    }
});

// 뷰 모드 전환 함수 (세그먼트 컨트롤용)
function setViewMode(mode) {
    if (viewMode === mode) return;
    viewMode = mode;
    updateViewModeUI();
    renderMainView();
    updateDateRangeDisplay();
}

// 뷰 모드 전환 함수 (기존 호환성)
function toggleViewMode() {
    viewMode = viewMode === 'weekly' ? 'monthly' : 'weekly';
    updateViewModeUI();
    renderMainView();
    updateDateRangeDisplay();
}

function updateViewModeUI() {
    const weeklyNav = document.getElementById('weeklyNav');
    const monthlyNav = document.getElementById('monthlyNav');
    const calendarTable = document.getElementById('calendarTable');
    const quadrantContainer = document.getElementById('quadrantViewContainer');
    const blockList = document.getElementById('blockList');
    const segWeekly = document.getElementById('segWeekly');
    const segMonthly = document.getElementById('segMonthly');
    const calendarHeader = document.querySelector('.calendar-header');
    const summarySection = document.querySelector('.summary');
    const texts = TEXTS[currentLanguage];
    
    if (viewMode === 'weekly') {
        if (weeklyNav) weeklyNav.style.display = 'flex';
        if (monthlyNav) monthlyNav.style.display = 'none';
        calendarTable.style.display = 'table';
        quadrantContainer.style.display = 'none';
        if (segWeekly) {
            segWeekly.classList.add('active');
            segWeekly.textContent = texts.viewMode.weekly;
        }
        if (segMonthly) {
            segMonthly.classList.remove('active');
            segMonthly.textContent = texts.viewMode.monthly;
        }
        // 요약 섹션 표시
        if (summarySection) summarySection.style.display = 'flex';
        // 블럭 리스트 표시
        if (blockList) {
            blockList.style.display = 'flex';
        }
        // 주간뷰에서는 헤더 숨기기
        if (calendarHeader) {
            calendarHeader.style.display = 'none';
        }
        
        // 주간뷰 네비게이션 버튼 텍스트 업데이트
        if (weeklyNav) {
            const weeklyNavButtons = weeklyNav.querySelectorAll('button');
            if (weeklyNavButtons.length >= 3) {
                weeklyNavButtons[0].textContent = texts.nav.prevWeek;
                weeklyNavButtons[1].textContent = texts.nav.thisWeek;
                weeklyNavButtons[2].textContent = texts.nav.nextWeek;
            }
        }
    } else {
        if (weeklyNav) weeklyNav.style.display = 'none';
        if (monthlyNav) monthlyNav.style.display = 'flex';
        calendarTable.style.display = 'none';
        // 요약 섹션 숨기기
        if (summarySection) summarySection.style.display = 'none';
        quadrantContainer.style.display = 'block';
        if (segWeekly) {
            segWeekly.classList.remove('active');
            segWeekly.textContent = texts.viewMode.weekly;
        }
        if (segMonthly) {
            segMonthly.classList.add('active');
            segMonthly.textContent = texts.viewMode.monthly;
        }
        // 블럭 리스트 숨기기
        if (blockList) {
            blockList.style.display = 'none';
        }
        // 월간뷰에서는 헤더 표시
        if (calendarHeader) {
            calendarHeader.style.display = 'flex';
        }
        
        // 월간뷰 네비게이션 버튼 텍스트 업데이트
        if (monthlyNav) {
            const monthlyNavButtons = monthlyNav.querySelectorAll('button');
            if (monthlyNavButtons.length >= 3) {
                monthlyNavButtons[0].textContent = currentLanguage === 'ko' ? '⟵ 저번달' : '⟵ Last Month';
                monthlyNavButtons[1].textContent = currentLanguage === 'ko' ? '이번달' : 'This Month';
                monthlyNavButtons[2].textContent = currentLanguage === 'ko' ? '다음달 ⟶' : 'Next Month ⟶';
            }
        }
    }
    updateDateRangeDisplay();
}

function renderMainView() {
    if (viewMode === 'weekly') {
        renderCalendar();
    } else {
        renderQuadrantViewMain();
    }
    updateDateRangeDisplay();
}

// 날짜 범위 표시 업데이트
function updateDateRangeDisplay() {
    const dateRangeText = document.getElementById('dateRangeText');
    const calendarDateInfo = document.getElementById('calendarDateInfo');
    
    if (viewMode === 'weekly') {
        // 주간뷰에서는 날짜 정보 표시 안 함 (이미 헤더가 숨겨짐)
    } else {
        // 월간뷰에서만 월 표시 (매거진 스타일)
        const y = quadrantMonthCursor.getFullYear();
        const m = quadrantMonthCursor.getMonth();
        
        const monthNumber = calendarDateInfo?.querySelector('.month-number');
        const yearNumber = calendarDateInfo?.querySelector('.year-number');
        const monthText = calendarDateInfo?.querySelector('.month-text');
        
        if (monthNumber) monthNumber.textContent = m + 1;
        if (yearNumber) yearNumber.textContent = y;
        
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthNamesKo = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
        
        if (monthText) {
            if (currentLanguage === 'ko') {
                monthText.textContent = monthNamesKo[m];
            } else {
                monthText.textContent = monthNames[m].toUpperCase();
            }
        }
        
        if (dateRangeText) {
            dateRangeText.textContent = `${y}. ${String(m + 1).padStart(2, '0')}`;
        }
    }
}

// 기간 이동 함수 (주간/월간 자동 처리)
function prevPeriod() {
    if (viewMode === 'weekly') {
        prevWeek();
    } else {
        prevQuadrantMonth();
    }
}

function nextPeriod() {
    if (viewMode === 'weekly') {
        nextWeek();
    } else {
        nextQuadrantMonth();
    }
}

// 오늘로 리셋
function resetToToday() {
    if (viewMode === 'weekly') {
        thisWeek();
    } else {
        thisMonth();
    }
}

function prevQuadrantMonth() {
    quadrantMonthCursor = new Date(quadrantMonthCursor.getFullYear(), quadrantMonthCursor.getMonth() - 1, 1);
    renderQuadrantViewMain();
}

function nextQuadrantMonth() {
    quadrantMonthCursor = new Date(quadrantMonthCursor.getFullYear(), quadrantMonthCursor.getMonth() + 1, 1);
    renderQuadrantViewMain();
}

function thisMonth() {
    const today = new Date();
    quadrantMonthCursor = new Date(today.getFullYear(), today.getMonth(), 1);
    renderQuadrantViewMain();
}

function renderQuadrantViewMain() {
    const grid = document.getElementById('quadrantGridMain');
    grid.innerHTML = '';
    
    const y = quadrantMonthCursor.getFullYear();
    const m = quadrantMonthCursor.getMonth();
    
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);
    const startDay = (first.getDay() + 6) % 7; // 월요일 기준
    const totalCells = Math.ceil((startDay + last.getDate()) / 7) * 7;
    
    updateDateRangeDisplay();
    
    // 이번달 버튼 활성화 상태 업데이트
    const today = new Date();
    const isThisMonth = y === today.getFullYear() && m === today.getMonth();
    const btnThisMonth = document.getElementById('btnThisMonth');
    if (btnThisMonth) {
        btnThisMonth.classList.toggle('current', isThisMonth);
    }
    
    
    const texts = TEXTS[currentLanguage];
    const dayNames = currentLanguage === 'ko' ? 
        ['월', '화', '수', '목', '금', '토', '일'] : 
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // 요일 헤더 추가
    dayNames.forEach(dn => {
        const dv = document.createElement('div');
        dv.className = 'quadrant-dow';
        dv.textContent = dn;
        grid.appendChild(dv);
    });
    
    // 날짜 셀 생성
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'quadrant-cell';
        const dayNum = i - startDay + 1;
        
        if (dayNum >= 1 && dayNum <= last.getDate()) {
            const date = ymdLocal(new Date(y, m, dayNum));
            
            // 날짜 헤더 영역
            const dateHeader = document.createElement('div');
            dateHeader.className = 'quadrant-date-header';
            
            // 날짜 번호
            const num = document.createElement('div');
            num.className = 'quadrant-date-num';
            num.textContent = dayNum;
            
            // 오늘 날짜 하이라이트
            const today = new Date();
            if (y === today.getFullYear() && m === today.getMonth() && dayNum === today.getDate()) {
                num.classList.add('today');
            }
            dateHeader.appendChild(num);
            
            // 기념일 표시 (날짜 오른쪽)
            const sds = specialDays.filter(s => s.date === date);
            const specialBlocksWrap = document.createElement('div');
            specialBlocksWrap.className = 'quadrant-special-blocks';
            if (sds.length > 0) {
                // 최대 3개까지 표시, 나머지는 "+N"
                const displayCount = Math.min(sds.length, 3);
                sds.slice(0, displayCount).forEach(sd => {
                    const block = document.createElement('div');
                    block.className = 'quadrant-special-block';
                    block.textContent = sd.label;
                    block.style.background = sd.color || '#4f46e5';
                    block.style.color = '#ffffff';
                    specialBlocksWrap.appendChild(block);
                });
                if (sds.length > 3) {
                    const moreBlock = document.createElement('div');
                    moreBlock.className = 'quadrant-special-block-more';
                    moreBlock.textContent = `+${sds.length - 3}`;
                    specialBlocksWrap.appendChild(moreBlock);
                }
            }

            dateHeader.appendChild(specialBlocksWrap);
            
            // 기념일 블록 클릭 시 모달 열기
            specialBlocksWrap.addEventListener('click', (e) => {
                if (e.target.classList.contains('quadrant-special-block')) {
                    e.stopPropagation();
                    specialEditingDate = date;
                    openSpecialModal(date);
                }
            });
            
            // 날짜 헤더 빈 공간 클릭 시 기념일 추가 모달 열기
            dateHeader.addEventListener('click', (e) => {
                // 기념일 블록이나 날짜 번호가 아닌 빈 공간을 클릭했을 때만
                if (!e.target.classList.contains('quadrant-special-block') &&
                    !e.target.classList.contains('quadrant-special-block-more') &&
                    !e.target.classList.contains('quadrant-date-num') &&
                    !e.target.closest('.quadrant-special-block') &&
                    !e.target.closest('.quadrant-date-num')) {
                    e.stopPropagation();
                    specialEditingDate = date;
                    openSpecialModal(date);
                    // 입력 필드로 포커스 이동
                    setTimeout(() => {
                        const specialLabelInput = document.getElementById('specialLabel');
                        specialLabelInput && specialLabelInput.focus();
                    }, 50);
                }
            });
            
            cell.appendChild(dateHeader);
            
            // 2x2 그리드 (4개 사분면)
            const quadrantGrid = document.createElement('div');
            quadrantGrid.className = 'quadrant-inner-grid';
            
            // 각 슬롯에 대한 사분면 생성
            const slots = texts.slots;
            slots.forEach((slot, slotIndex) => {
                const quadrant = document.createElement('div');
                quadrant.className = 'quadrant-slot';
                quadrant.dataset.date = date;
                quadrant.dataset.slot = slot;
                quadrant.dataset.slotIndex = slotIndex;
                
                // 슬롯 레이블 (작은 텍스트)
                const slotLabel = document.createElement('div');
                slotLabel.className = 'quadrant-slot-label';
                slotLabel.textContent = slot;
                quadrant.appendChild(slotLabel);
                
                // 블록 컨테이너
                const blocksContainer = document.createElement('div');
                blocksContainer.className = 'quadrant-blocks';
                
                // 해당 슬롯의 블록들 가져오기
                const koreanSlot = convertSlotToKorean(slot);
                const cellBlocks = getCombinedBlocksForCell(date, koreanSlot);
                
                // 최대 2개까지만 표시 (공간 제약)
                cellBlocks.slice(0, 2).forEach(b => {
                    const blockDiv = document.createElement('div');
                    blockDiv.className = 'quadrant-block';
                    blockDiv.style.background = b.color;
                    blockDiv.textContent = translateBlockName(b.category);
                    blockDiv.title = translateBlockName(b.category) + (b.memo ? ': ' + b.memo : '');
                    blockDiv.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // 블록 클릭 시 메모 모달 열기
                        const fakeBlock = {
                            dataset: {
                                date: b.date,
                                slot: koreanSlot,
                                category: b.category,
                                color: b.color,
                                memo: b.memo || '',
                                time: b.time || '',
                                recurring: b.recurring ? 'true' : 'false',
                                recurringId: b.recurringId || ''
                            },
                            style: {
                                background: b.color
                            }
                        };
                        openMemoModal(fakeBlock);
                    });
                    blocksContainer.appendChild(blockDiv);
                });
                
                // 더 많은 블록이 있으면 표시
                if (cellBlocks.length > 2) {
                    const moreBlock = document.createElement('div');
                    moreBlock.className = 'quadrant-more';
                    moreBlock.textContent = `+${cellBlocks.length - 2}`;
                    blocksContainer.appendChild(moreBlock);
                }
                
                quadrant.appendChild(blocksContainer);
                
                // 사분면 클릭 시 블록 추가 팝업 열기
                quadrant.addEventListener('click', (e) => {
                    // 블록이나 더보기 클릭은 무시 (메모 모달 열기)
                    if (e.target.classList.contains('quadrant-block') || 
                        e.target.classList.contains('quadrant-more') ||
                        e.target.closest('.quadrant-block') ||
                        e.target.closest('.quadrant-more')) {
                        return;
                    }
                    // 슬롯 레이블이나 빈 공간 클릭 시 블록 추가
                    e.stopPropagation();
                    const fakeEvent = {
                        clientX: e.clientX,
                        clientY: e.clientY,
                        stopPropagation: () => {}
                    };
                    openClickAddPopup(fakeEvent, { date, slot });
                });
                
                // 슬롯 레이블도 클릭 가능하도록
                slotLabel.style.cursor = 'pointer';
                
                quadrantGrid.appendChild(quadrant);
            });
            
            cell.appendChild(quadrantGrid);
        } else {
            cell.style.visibility = 'hidden';
        }
        
        grid.appendChild(cell);
    }
}
function shiftMonth(delta) { monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + delta, 1); renderMonth(); }
function renderMonth() {
    const grid = document.getElementById('monthGrid'); 
    const title = document.getElementById('monthTitle'); 
    grid.innerHTML = '';
    const y = monthCursor.getFullYear(); 
    const m = monthCursor.getMonth();
    
    // 매거진 스타일 타이틀 업데이트
    const monthNumber = title.querySelector('.month-number');
    const yearNumber = title.querySelector('.year-number');
    const monthText = title.querySelector('.month-text');
    
    if (monthNumber) monthNumber.textContent = m + 1;
    if (yearNumber) yearNumber.textContent = y;
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthNamesKo = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    
    if (monthText) {
        if (currentLanguage === 'ko') {
            monthText.textContent = monthNamesKo[m];
        } else {
            monthText.textContent = monthNames[m].toUpperCase();
        }
    }
    const first = new Date(y, m, 1); const last = new Date(y, m + 1, 0); const startDay = (first.getDay() + 6) % 7;
    const totalCells = Math.ceil((startDay + last.getDate()) / 7) * 7;
    const texts = TEXTS[currentLanguage];
    // 영어에서는 월요일부터 시작하도록 순서 조정
    const dayNames = currentLanguage === 'ko' ? 
        ['월', '화', '수', '목', '금', '토', '일'] : 
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    dayNames.forEach(dn => { const dv = document.createElement('div'); dv.className = 'dow'; dv.textContent = dn; grid.appendChild(dv); });
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div'); cell.className = 'mcell'; const dayNum = i - startDay + 1;
        if (dayNum >= 1 && dayNum <= last.getDate()) {
            const date = ymdLocal(new Date(y, m, dayNum));
            const num = document.createElement('div'); num.className = 'num'; num.textContent = dayNum; cell.appendChild(num);
            // 블럭 형태로 특별한 날 표시
            const sds = specialDays.filter(s => s.date === date);
            if (sds.length > 0) {
                const blocksContainer = document.createElement('div');
                blocksContainer.className = 'special-blocks-container';
                // 최대 3개까지 블럭 표시, 나머지는 "+N" 형태
                const displayCount = Math.min(sds.length, 3);
                sds.slice(0, displayCount).forEach(sd => {
                    const block = document.createElement('div');
                    block.className = 'special-block';
                    block.textContent = sd.label;
                    block.style.background = sd.color || '#4f46e5';
                    block.style.color = '#ffffff';
                    blocksContainer.appendChild(block);
                });
                // 3개 이상이면 "+N" 표시
                if (sds.length > 3) {
                    const moreBlock = document.createElement('div');
                    moreBlock.className = 'special-block-more';
                    moreBlock.textContent = `+${sds.length - 3}`;
                    blocksContainer.appendChild(moreBlock);
                }
                cell.appendChild(blocksContainer);
            }
            cell.addEventListener('click', () => {
                specialEditingDate = date;
                openSpecialModal(date);
            });
        } else { cell.style.visibility = 'hidden'; }
        grid.appendChild(cell);
    }
}
// 특별한 날 ID 생성 함수
function generateSpecialId() {
    return 'special-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// 특별한 날 모달 열기 (리스트형)
function openSpecialModal(date) {
    if (!date) return;
    specialEditingDate = date;
    const modal = document.getElementById('specialModal');
    const listContainer = document.getElementById('specialList');
    const addForm = document.getElementById('specialAddForm');
    
    // 해당 날짜의 모든 특별한 날 가져오기
    const existing = specialDays.filter(s => s.date === date);
    const texts = TEXTS[currentLanguage];
    
    // 모달 제목 업데이트
    const modalTitle = document.getElementById('specialModalTitle');
    if (modalTitle) {
        modalTitle.textContent = texts.special?.title || (currentLanguage === 'ko' ? '기념일/생일' : 'Special Day/Birthday');
    }
    
    // "새로 추가하기" 텍스트 업데이트
    const addHeader = document.querySelector('.special-add-header span');
    if (addHeader) {
        addHeader.textContent = texts.special?.addNew || (currentLanguage === 'ko' ? '새로 추가하기' : 'Add New');
    }
    
    // 리스트 렌더링
    listContainer.innerHTML = '';
    if (existing.length > 0) {
        existing.forEach((sd, index) => {
            // ID가 없으면 추가 (기존 데이터 호환성)
            if (!sd.id) {
                sd.id = generateSpecialId();
                // specialDays 배열에서도 업데이트
                const globalIdx = specialDays.findIndex(s => s.date === date && s.label === sd.label && !s.id);
                if (globalIdx > -1) {
                    specialDays[globalIdx].id = sd.id;
                }
            }
            const item = document.createElement('div');
            item.className = 'special-list-item';
            const deleteTitle = texts.special?.delete || (currentLanguage === 'ko' ? '삭제' : 'Delete');
            
            // 블럭 형태로 표시
            const block = document.createElement('div');
            block.className = 'special-block';
            block.textContent = sd.label;
            block.style.background = sd.color || '#4f46e5';
            block.style.color = '#ffffff';
            block.style.flex = '1';
            block.style.marginRight = '8px';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'special-item-delete';
            deleteBtn.textContent = '✕';
            deleteBtn.title = deleteTitle;
            deleteBtn.onclick = () => deleteSpecialItem(sd.id);
            
            item.appendChild(block);
            item.appendChild(deleteBtn);
            item.dataset.specialId = sd.id;
            listContainer.appendChild(item);
        });
    } else {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'special-list-empty';
        emptyMsg.textContent = texts.special?.empty || (currentLanguage === 'ko' ? '등록된 특별한 날이 없습니다.' : 'No special days registered.');
        listContainer.appendChild(emptyMsg);
    }
    
    // 입력 필드 초기화
    document.getElementById('specialLabel').value = '';
    document.getElementById('specialColor').value = '#4f46e5';
    
    // 버튼 텍스트 업데이트
    const saveBtn = modal.querySelector('.modal-footer .save');
    if (saveBtn) {
        saveBtn.textContent = currentLanguage === 'ko' ? '추가' : 'Add';
    }
    
    modal.style.display = 'flex';
}

// 특별한 날 추가
function saveSpecial() {
    const label = document.getElementById('specialLabel').value.trim();
    const color = document.getElementById('specialColor').value;
    if (!specialEditingDate || !label) { 
        closeSpecial(); 
        return; 
    }
    
    const newSpecial = {
        id: generateSpecialId(),
        date: specialEditingDate,
        label: label,
        color: color
    };
    
    specialDays.push(newSpecial);
    saveState();
    openSpecialModal(specialEditingDate); // 모달 새로고침
    renderMonth();
    renderCalendar();
}

// 개별 특별한 날 삭제
function deleteSpecialItem(id) {
    if (!id) return;
    specialDays = specialDays.filter(s => s.id !== id);
    saveState();
    openSpecialModal(specialEditingDate); // 모달 새로고침
    renderMonth();
    renderCalendar();
}

function closeSpecial() { 
    document.getElementById('specialModal').style.display = 'none'; 
    specialEditingDate = null; 
}

function wireGlobalClosing() {
    window.addEventListener('click', (e) => {
        ['modal', 'addBlockModal', 'monthModal', 'specialModal', 'deadlineModal', 'timeModal'].forEach(id => {
            const el = document.getElementById(id); 
            if (e.target === el) {
                if (id === 'addBlockModal') {
                    closeBlockModal();
                } else {
                    el.style.display = 'none';
                }
            }
        });
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // 시간 모달이 열려있으면 시간 모달만 닫기
            const timeModal = document.getElementById('timeModal');
            if (timeModal && timeModal.style.display !== 'none') {
                closeTimeModal();
                e.preventDefault();
                return;
            }
            // 블럭 모달 닫기
            const blockModal = document.getElementById('addBlockModal');
            if (blockModal && blockModal.style.display !== 'none') {
                closeBlockModal();
                e.preventDefault();
                return;
            }
            ['modal', 'monthModal', 'specialModal', 'deadlineModal'].forEach(id => {
                document.getElementById(id).style.display = 'none';
            });
        }
    });
}
wireGlobalClosing();