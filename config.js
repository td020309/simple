// Firebase 프로젝트 설정에서 복사한 코드를 여기에 붙여넣으세요.
// 이 정보는 우리 앱이 어떤 Firebase 프로젝트(클라우드 창고)에 연결되어야 하는지 알려주는
// 비밀 열쇠와 같습니다.
const firebaseConfig = {
  // ======================================================
  //      👇 여기에 여러분의 firebaseConfig 코드를 붙여넣으세요 👇
  // ======================================================
  apiKey: "AIzaSyBZdSqBlEIhaW_WlRaKM8hHX4HnKgiDPyc",
  authDomain: "simple-schedule-28147.firebaseapp.com",
  projectId: "simple-schedule-28147",
  storageBucket: "simple-schedule-28147.appspot.com",
  messagingSenderId: "350319823676",
  appId: "1:350319823676:web:26b2fe96edd7ffd35f6c39"
  // ======================================================
};

// Firebase 앱을 초기화합니다.
firebase.initializeApp(firebaseConfig);

// 다른 파일에서 쉽게 사용할 수 있도록 auth와 db 변수를 만듭니다.
const auth = firebase.auth();
const db = firebase.firestore();