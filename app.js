const firebaseConfig = {
    apiKey: "AIzaSyCvSVlnZ0a00Y-32XKp5zZQS2mMAYWZ9ow",
    authDomain: "teacloud-housekeeping.firebaseapp.com",
    databaseURL: "https://teacloud-housekeeping-default-rtdb.firebaseio.com",
    projectId: "teacloud-housekeeping",
    storageBucket: "teacloud-housekeeping.firebasestorage.app",
};

const ROOMS = [
    {id:'601',f:6,t:'景觀四人',m:2}, {id:'602',f:6,t:'景觀雙人',m:1},
    {id:'603',f:6,t:'景觀雙人',m:1}, {id:'605',f:6,t:'景觀雙人',m:1},
    {id:'606',f:6,t:'景觀雙人',m:1}, {id:'607',f:6,t:'景觀雙人',m:1},
    {id:'608',f:6,t:'景觀雙人',m:1},
    {id:'203',f:2,t:'雙人房',m:1}, {id:'205',f:2,t:'雙人房',m:1},
    {id:'206',f:2,t:'雙人房',m:1}, {id:'207',f:2,t:'雙人房',m:1},
    {id:'208',f:2,t:'雙人房',m:1}, {id:'209',f:2,t:'雙人房',m:1},
    {id:'201',f:2,t:'標準四人',m:2}, {id:'301',f:3,t:'標準四人',m:2},
    {id:'202',f:2,t:'通舖',m:8,d:true}, {id:'302',f:3,t:'通舖',m:8,d:true}
];

const ST = {
    blue:  {c:'blue',  cn:'空房', id:'KOSONG', icon:'✨', cls:'st-blue'},
    yellow:{c:'yellow',cn:'預訂', id:'BOOKED', icon:'💡', cls:'st-yellow'},
    green: {c:'green', cn:'入住', id:'ADA TAMU', icon:'🎒', cls:'st-green'},
    red:   {c:'red',   cn:'退房', id:'KOTOR', icon:'🧹', cls:'st-red'},
    purple:{c:'purple',cn:'勿擾', id:'DND', icon:'⛔', cls:'st-purple'},
    locked:{c:'locked',cn:'鎖房', id:'KOSONG', icon:'🔒', cls:'st-locked'}
};

const INDO_DAYS = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const INDO_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const EN_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CN_DAYS = ['(日)','(一)','(二)','(三)','(四)','(五)','(六)'];

const I18N_STAFF = {
    'KOSONG': 'VACANT',
    'BOOKED': 'BOOKED',
    'ADA TAMU': 'OCCUPIED',
    'KOTOR': 'DIRTY',
    'DND': 'DND',
    'Kamar': 'Room',
    'Kasur': 'Bed',
    'Extra Bed': 'Extra Bed',
    'Selimut': 'Blanket',
    'Bak Bayi': 'Baby Bath',
    'Nanti': 'Arrive late',
    'TAMU DADAKAN': 'Walk-in',
    'Tamu di kamar ini akan datang terlambat, jadi bisa utamakan membersihkan kamar lain dulu.': 'Guests in this room will arrive late, so you can prioritize cleaning other rooms.',
    'PRIORITAS (Segera)': 'PRIORITY (Urgent)',
    'Siapkan': 'Prepare',
    'Tamu sedang keluar.': 'Guests are out.',
    'Silahkan sapu.': 'Please clean.',
    'SELESAI (完成)': 'Done',
    'Kamar yang berkelanjutan tidak perlu dibersihkan.': 'Continuous rooms do not need to be cleaned.',
    'Status:': 'Status:',
    'Tidak ada tindakan.': 'No action.',
    'Jadwal 8-Hari': '8-Day Schedule',
    'Ringkasan 8 Hari': '8-Day Summary',
    'Jadwal Kamar (Kamar mungkin berubah)': 'Room Schedule (Rooms may change)',
    'MASUK': 'IN',
    'LANJUT': 'STAY',
    'KELUAR': 'OUT',
    'MSK': 'IN',
    'LJT': 'STAY',
    'KLR': 'OUT',
    'LCK': 'LCK',
    'HARI INI': 'TODAY',
    '⚠️ PERHATIAN! (注意)': '⚠️ ATTENTION!',
    '⚠️ <b>ADA PERUBAHAN BARU!</b><br><br>Data kamar telah diperbarui.<br>Silahkan cek status kamar.<br>(房況已更新，請確認)': '⚠️ <b>NEW UPDATE!</b><br><br>Room data has been updated.<br>Please check the room status.',
    'SAYA MENGERTI (我知道了)': 'I UNDERSTAND',
    'PIN Salah!': 'Wrong PIN!',
    'Hanya bisa melihat kemarin dan 7 hari ke depan!\n(只能查看昨天到未來7天)': 'Can only view yesterday and 7 days ahead!',
    '無法換房：目標房間必須是「空房」！': 'Cannot move: Target room must be VACANT!',
    '已發送通知！': 'Notification sent!',
    '今日目前沒有特殊需求的房間喔！': 'No rooms with special requests today!',
    'Requests': 'Requests',
    '👆 Tap a date to view requests': '👆 Ketuk tanggal untuk melihat permintaan',
    'Tidak ada permintaan khusus': 'No special requests',
    'Jangan Ganggu': 'Do Not Disturb',
    'aya_reminder_text': "Remember to click 'Done' for the rooms you have finished cleaning when you have time~!",
    'aya_reminder_no_today': 'Don\'t remind me again today'
};

const I18N_STAFF_ID = {
    'aya_reminder_text': 'Jangan lupa untuk klik \'Selesai\' untuk kamar yang sudah dibersihkan jika ada waktu ya~!',
    'aya_reminder_no_today': 'Jangan ingatkan lagi hari ini'
};

function getStaffText(key) {
    if (!user || user.r !== 'staff') return key;
    if (user.l === 'en') return I18N_STAFF[key] || key;
    return I18N_STAFF_ID[key] || key;
}

function getText(text) {
    if (user && user.r === 'staff' && user.l === 'en') {
        return I18N_STAFF[text] || text;
    }
    return text;
}

function pluralize(count, word) {
    let text = getText(word);
    if (user && user.r === 'staff' && user.l === 'en' && count > 1) {
        return text + 's';
    }
    return text;
}

function toggleAyaLang() {
    if (user && user.r === 'staff') {
        user.l = user.l === 'id' ? 'en' : 'id';
        localStorage.setItem('aya_lang', user.l);
        localStorage.setItem('tea_user', JSON.stringify(user));
        updateDateUI();
        render();
        if(document.getElementById('week-view-layer').style.display === 'flex') {
            openWeekView(); // Re-render week view
        }
        const mRoomIdVal = mRoomId;
        if (document.getElementById('modal').style.display === 'flex') {
            openModal(mRoomIdVal); // Re-render modal
        }
        
        document.getElementById('week-btn-txt').innerText = getText('Jadwal 8-Hari');
        document.getElementById('wv-title').innerText = getText('Ringkasan 8 Hari');
        document.getElementById('wv-aya-alert').innerText = '⚠️ ' + getText('Jadwal Kamar (Kamar mungkin berubah)');
        document.getElementById('wv-legend').innerHTML = `
            <div class="leg-item"><span class="leg-dot" style="background:#F57F17"></span> ${getText('MASUK')}</div>
            <div class="leg-item"><span class="leg-dot" style="background:#4CAF50"></span> ${getText('LANJUT')}</div>
            <div class="leg-item"><span class="leg-dot" style="background:#D32F2F"></span> ${getText('KELUAR')}</div>
        `;
        updateAyaReminderLang();
    }
}

function getTodayStr() {
    const d = new Date(); const mm = String(d.getMonth()+1).padStart(2,'0'); const dd = String(d.getDate()).padStart(2,'0');
    return d.getFullYear() + '-' + mm + '-' + dd;
}

function showAyaReminderIfNeeded() {
    if (!user || user.r !== 'staff') return;
    const today = getTodayStr();
    if (localStorage.getItem('aya_hide_reminder_date') === today) return;
    const modal = document.getElementById('aya-reminder-modal');
    document.getElementById('aya-reminder-text').innerText = getStaffText('aya_reminder_text');
    document.getElementById('aya-reminder-chk-label').innerText = getStaffText('aya_reminder_no_today');
    document.getElementById('aya-reminder-chk').checked = false;
    modal.style.display = 'flex';
}

function closeAyaReminder() {
    const chk = document.getElementById('aya-reminder-chk');
    if (chk.checked) {
        localStorage.setItem('aya_hide_reminder_date', getTodayStr());
    }
    document.getElementById('aya-reminder-modal').style.display = 'none';
}

function updateAyaReminderLang() {
    const modal = document.getElementById('aya-reminder-modal');
    if (modal.style.display === 'flex') {
        document.getElementById('aya-reminder-text').innerText = getStaffText('aya_reminder_text');
        document.getElementById('aya-reminder-chk-label').innerText = getStaffText('aya_reminder_no_today');
    }
}

let db=null, dbRef=null, logRef=null;
let user={}; 

const getTwDate = () => {
    const now = new Date();
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(now);
};

let currDate = getTwDate();
let weekStartDate = currDate;
let currentWeekDates = []; 
let cache = {}; 
let trainingCache = {}; 
let filter = 'all';
let mRoomId = null;
let ayaPin = localStorage.getItem('aya_pin') || '8888';
let matrixSyncMode = false;
let daySyncMode = false; 
let isTraining = false;
let activeDateRef = null;
let moveMode = false;

let globalDirty = {};
let alertQueue = [];
let alertTimer = null;
let globalUpdateListener = null;
let fullLogs = [];

window.onload = function() {
    const savedUser = localStorage.getItem('tea_user');
    if (savedUser) {
        try {
            const parsedUser = JSON.parse(savedUser);
            if (parsedUser && parsedUser.n) {
                const url = new URLSearchParams(location.search);
                const isAyaUrl = url.get('mode') === 'aya';
                if (isAyaUrl) {
                    if (parsedUser.r === 'staff') login(null, parsedUser);
                    else { user = {}; localStorage.removeItem('tea_user'); }
                } else {
                    login(null, parsedUser);
                }
            }
        } catch(e) {}
    }

    if (!user.n) {
        const url = new URLSearchParams(location.search);
        if (url.get('mode')==='aya') {
            showAyaLogin();
            document.getElementById('login-layer').style.display = 'flex';
        } else {
            document.getElementById('fam-login').style.display='block';
        }
    }

    if(firebaseConfig.databaseURL) {
        try {
            firebase.initializeApp(firebaseConfig);
            db = firebase.database();
            loadData(currDate);
            db.ref('settings/aya_pin').on('value', s => { if(s.val()){ayaPin=s.val(); localStorage.setItem('aya_pin', ayaPin);}});
            

            db.ref('global/dirty_flags').on('value', s => {
                globalDirty = s.val() || {};
                if(!matrixSyncMode && !daySyncMode) {
                    if(document.getElementById('room-box').innerHTML !== "") render(); 
                    if(document.getElementById('week-view-layer').style.display === 'flex') updateMatrixDirtyStyles();
                }
            });
            
        } catch(e){console.error(e);}
    } else { ensureData(currDate); }
    
    if (user.r === 'staff' && !isTraining && db) {
        setupAyaListener();
    }
    
    setTimeout(() => {
        if (sessionStorage.getItem('isWeekViewOpen') === 'true') {
            openWeekView();
        }
    }, 500); // 確保 db 已連線且初始資料抓取中
};

function toggleDaySync() {
    daySyncMode = !daySyncMode;
    const btn = document.getElementById('day-sync-btn');
    if(daySyncMode) {
        btn.innerText = "🔁 日曆填色：開";
        btn.style.background = "#FF9800"; 
        // Alert removed
    } else {
        btn.innerText = "🔁 日曆填色：關";
        btn.style.background = "#ccc";
    }
    render(); 
}

function updateMatrixDirtyStyles() {
    const dates = [];
    for(let i=0; i<30; i++) { 
         let dt = new Date(weekStartDate + "T12:00:00");
         dt.setDate(dt.getDate()+i);
         const offset = dt.getTimezoneOffset() * 60000;
         dates.push((new Date(dt - offset)).toISOString().split('T')[0]);
    }
    
    ROOMS.forEach(r => {
        const isDirty = globalDirty[r.id] && !isTraining;
        dates.forEach(d => {
            const cell = document.getElementById(`td-${d}-${r.id}`);
            if(cell) {
                const content = cell.querySelector('.cell-content');
                if(content) {
                    if(isDirty) {
                        content.classList.add('dirty-active-border'); 
                        if(content.classList.contains('c-blue')) {
                            content.classList.add('dirty-active-bg');
                        }
                        if(!content.innerHTML.includes('🧹') && content.classList.contains('c-blue')) updateCellUI(d, r.id);
                    } else {
                        content.classList.remove('dirty-active-border');
                        content.classList.remove('dirty-active-bg');
                        if(content.innerHTML.includes('🧹')) updateCellUI(d, r.id);
                    }
                }
            }
        });
    });
}

function safeGetRoom(date, rid) {
    let target = isTraining ? trainingCache : cache;
    if (!target[date]) target[date] = {};
    let raw = target[date][rid];
    if (!raw) { raw = { s: 'blue', n: {} }; target[date][rid] = raw; }
    if (!raw.s) raw.s = 'blue'; 
    if (!raw.n) raw.n = {};     
    if (raw.n.peopleCount) { raw.n.p = raw.n.peopleCount; delete raw.n.peopleCount; }
    if (raw.n.extraBed) { raw.n.bed = raw.n.extraBed; delete raw.n.extraBed; }
    if (raw.status) { raw.s = raw.status; delete raw.status; }
    
    let s_val = raw.s;
    if (s_val === 'yellow' && raw.n && raw.n.isLocked) {
        s_val = 'locked';
    }
    
    if (user && (user.r === 'staff' || user.n === '👵🏻 媽媽') && (s_val === 'locked' || raw.s === 'locked')) {
        let n_copy = { ...raw.n };
        delete n_copy.msg;
        return { s: 'blue', n: n_copy }; 
    }
    
    return { s: s_val || 'blue', n: raw.n };
}

function loadData(date) {
    if(isTraining) { ensureData(date); render(); return; }
    if(!db) { ensureData(date); render(); return; }
    
    if(activeDateRef) activeDateRef.off();
    activeDateRef = db.ref('status/'+date);
    activeDateRef.on('value', s => {
        cache[date] = s.val() || {};
        ensureData(date);
        if(date === currDate) render();
    });

    if(logRef) logRef.off();
    
    let listenDate;
    if (date < getTwDate()) {
        listenDate = date; 
    } else {
        listenDate = getTwDate(); 
    }
    
    logRef = db.ref('logs/'+listenDate);
    logRef.on('value', s => {
        fullLogs = [];
        if (s.exists()) {
            s.forEach(c => { fullLogs.unshift(c.val()); }); 
        }
        
        const miniLogs = fullLogs.slice(0, 5);
        const logBox = document.getElementById('sys-logs');
        if(logBox) {
            logBox.innerHTML = miniLogs.length > 0 
                ? miniLogs.map(l => `<div class="log-item"><div><span class="log-time">${l.time}</span> <b>${l.user}</b></div><div>${l.action}</div></div>`).join('')
                : '<div style="padding:10px;text-align:center">此日無紀錄</div>';
        }
            
        if(document.getElementById('log-modal').style.display === 'flex') renderFullLogs();
    });
}
function ensureData(date) {
    let target = isTraining ? trainingCache : cache;
    if(!target[date]) target[date] = {};
    ROOMS.forEach(r => { if(!target[date][r.id]) target[date][r.id] = {s:'blue', n:{}}; });
}

function showAyaLogin() { document.getElementById('fam-login').style.display='none'; document.getElementById('aya-login').style.display='flex'; }

function login(role, savedUser = null) {
    if (savedUser) {
        user = savedUser;
    } else {
        if(role==='boss') user={n:'🧔🏻 阿成',r:'admin',l:'cn'};
        if(role==='wife') user={n:'👩🏻 Ting',r:'admin',l:'cn'};
        if(role==='mom')  user={n:'👵🏻 媽媽',r:'admin',l:'cn'};
        if(role==='aya')  user={n:'👩🏼 Aya', r:'staff',l: localStorage.getItem('aya_lang') || 'id'};
        localStorage.setItem('tea_user', JSON.stringify(user));
    }

    document.getElementById('login-layer').style.display='none';
    document.getElementById('app-layer').style.display='block';
    document.getElementById('u-tag').innerText = user.n;

    if(user.r==='staff') {
        document.body.classList.add('aya-mode');
        document.getElementById('admin-area').style.display='none';
        document.getElementById('wv-tools').style.display='none';
        document.getElementById('day-toolbar').style.display='none'; 
        document.getElementById('aya-lang-toggle').style.display='inline-block';
        document.getElementById('aya-lang-toggle').innerText = user.l === 'en' ? '🌐 EN' : '🌐 INDO';
        
        if(!isTraining) document.getElementById('wv-nav-ctrls').style.display='none'; 
        document.getElementById('wv-legend').classList.remove('hidden');
        document.getElementById('wv-aya-alert').classList.remove('hidden'); 
        document.querySelectorAll('input[type="date"]').forEach(el => el.style.display = 'none');
        
        document.getElementById('week-btn-txt').innerText = getText('Jadwal 8-Hari');
        document.getElementById('wv-title').innerText = getText('Ringkasan 8 Hari');
        document.getElementById('wv-aya-alert').innerText = '⚠️ ' + getText('Jadwal Kamar (Kamar mungkin berubah)');
        document.getElementById('wv-legend').innerHTML = `
            <div class="leg-item"><span class="leg-dot" style="background:#F57F17"></span> ${getText('MASUK')}</div>
            <div class="leg-item"><span class="leg-dot" style="background:#4CAF50"></span> ${getText('LANJUT')}</div>
            <div class="leg-item"><span class="leg-dot" style="background:#D32F2F"></span> ${getText('KELUAR')}</div>
        `;
        
        if(!isTraining) { 
            currDate = getTwDate(); 
            loadData(currDate); 
            setupAyaListener(); 
        }
        showAyaReminderIfNeeded();
    } else {
        document.getElementById('aya-lang-toggle').style.display='none';
        document.getElementById('day-toolbar').style.display='flex'; 
        document.querySelectorAll('input[type="date"]').forEach(el => el.style.display = 'block');
    }
    
    if(isTraining) {
        document.body.classList.add('training-mode');
        document.getElementsByClassName('app-title')[0].innerText = "練習模式 (LATIHAN)";
        if(user.r!=='staff') setupAyaListener(); 
    }
    updateDateUI();
    render();

    if (user.r === 'admin') {
        if (typeof db !== 'undefined' && db) {
            autoCleanOldData();
        } else {
            setTimeout(() => {
                if (typeof db !== 'undefined' && db) autoCleanOldData();
            }, 3000);
        }
    }
}

function autoCleanOldData() {
    try {
        let dt = new Date(getTwDate() + "T12:00:00");
        dt.setDate(dt.getDate() - 2);
        const offset = dt.getTimezoneOffset() * 60000;
        const limitDate = (new Date(dt - offset)).toISOString().split('T')[0];
        
        if (db) {
            db.ref('status').orderByKey().endAt(limitDate).once('value', s => {
                if (s.exists()) {
                    s.forEach(child => { child.ref.remove(); });
                }
            }).catch(e => {});
            
            db.ref('logs').orderByKey().endAt(limitDate).once('value', s => {
                if (s.exists()) {
                    s.forEach(child => { child.ref.remove(); });
                }
            }).catch(e => {});
        }
    } catch(e) {}
}

let lastKnownUpdate = null;
function setupAyaListener() {
    if(isTraining) return; 
    if(globalUpdateListener) globalUpdateListener.off();
    globalUpdateListener = db.ref('global/last_update');
    let initial = true;
    globalUpdateListener.on('value', snap => {
        const val = snap.val();
        if(initial) { initial=false; lastKnownUpdate=val; return; } 
        if(val && val !== lastKnownUpdate) {
             lastKnownUpdate = val;
             db.ref('status/'+getTwDate()).once('value', s => { queueAlert('UPDATE', {}); });
        }
    });
    
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible' && user.r === 'staff' && !isTraining && db) {
            db.ref('global/last_update').once('value', snap => {
                const val = snap.val();
                if (val && lastKnownUpdate && val !== lastKnownUpdate) {
                    lastKnownUpdate = val;
                    db.ref('status/'+getTwDate()).once('value', s => { queueAlert('UPDATE', {}); });
                } else {
                    lastKnownUpdate = val;
                }
            });
            loadData(currDate);
            if (document.getElementById('week-view-layer').style.display === 'flex') {
                refreshWeekView();
            }
        }
    });
}

function queueAlert(rid, val) {
    alertQueue.push({rid, val});
    if(alertTimer) clearTimeout(alertTimer);
    alertTimer = setTimeout(showAlertModal, 2000);
}

function showAlertModal() {
    const overlay = document.getElementById('alert-overlay');
    const content = document.getElementById('alert-content');
    
    const alertTitle = document.getElementById('alert-title');
    if (alertTitle) alertTitle.innerText = getText('⚠️ PERHATIAN! (注意)');
    
    const alertBtn = document.getElementById('alert-btn');
    if (alertBtn) alertBtn.innerText = getText('SAYA MENGERTI (我知道了)');
    
    if (content) content.innerHTML = `<div class="alert-item" style="font-size:18px; padding:20px;">${getText('⚠️ <b>ADA PERUBAHAN BARU!</b><br><br>Data kamar telah diperbarui.<br>Silahkan cek status kamar.<br>(房況已更新，請確認)')}</div>`;
    if (overlay) overlay.style.display = 'flex';
    alertQueue = [];
}

function closeAlert() { 
    document.getElementById('alert-overlay').style.display='none'; 
    loadData(currDate);
    if (document.getElementById('week-view-layer').style.display === 'flex') {
        refreshWeekView();
    }
}

function startTraining() {
    if(confirm("進入練習模式？ (Masuk Mode Latihan?)\n系統將自動產生測試考題。\n重整網頁可退出。")) {
        isTraining = true;
        seedTrainingData();
        login('aya'); 
    }
}
function seedTrainingData() {
    const t = trainingCache; const d = currDate; ensureData(d);
    t[d]['601'] = {s:'red', n:{late:true}};
    t[d]['201'] = {s:'red', n:{flash:true}};
    t[d]['205'] = {s:'yellow', n:{bed:1}};
    t[d]['202'] = {s:'green', n:{p:8}};
}
function checkPin() { if(document.getElementById('aya-pin').value === ayaPin) login('aya'); else { alert(getText('PIN Salah!')); document.getElementById('aya-pin').value=''; }}
function logout() { 
    localStorage.removeItem('tea_user'); 
    if (window.location.search.includes('mode=aya')) {
        window.location.reload();
    } else {
        window.location.href = window.location.pathname;
    }
}
function changeAyaPin() {
    if(isTraining) return;
    const newPin = prompt("新 PIN 碼 (4位數)", ayaPin);
    if(newPin && newPin.length===4) {
        ayaPin = newPin; localStorage.setItem('aya_pin', ayaPin);
        if(db) db.ref('settings/aya_pin').set(ayaPin);
    }
}
function previewAya() { if(confirm('切換阿雅視角？')) login('aya'); }

function changeDate(d) {
    let dt = new Date(currDate + "T12:00:00");
    dt.setDate(dt.getDate()+d);
    const offset = dt.getTimezoneOffset() * 60000;
    const next = (new Date(dt - offset)).toISOString().split('T')[0];
    
    if(user.r==='staff' && !isTraining) {
        const today = getTwDate();
        const d1 = new Date(next); 
        const d2 = new Date(today);
        const diff = Math.round((d1-d2)/(86400000));
        
        if(diff < -1 || diff > 7) { 
            alert(getText('Hanya bisa melihat kemarin dan 7 hari ke depan!\n(只能查看昨天到未來7天)')); 
            return; 
        }
    }
    pickDate(next);
}

function pickDate(v) { currDate = v; loadData(currDate); updateDateUI(); render(); }
function updateDateUI() {
    const today = getTwDate();
    const dateObj = new Date(currDate + "T12:00:00");
    let txt = currDate;
    let badge = '今天';
    if(user.r==='staff') {
        const dayIdx = dateObj.getDay();
        const dayName = user.l === 'en' ? EN_DAYS[dayIdx] : INDO_DAYS[dayIdx];
        txt = `${dayName}, ${currDate.split('-')[2]}-${currDate.split('-')[1]}`; 
        badge = getText('HARI INI');
    } else {
        const dayIdx = dateObj.getDay();
        txt = `${currDate} ${CN_DAYS[dayIdx]}`;
    }
    document.getElementById('date-txt').innerText = txt;
    document.getElementById('today-bdg').innerText = (currDate!==today) ? (user.r==='staff' ? `↺ ${getText('HARI INI')}` : '↺ 回今天') : badge;
    document.getElementById('today-bdg').style.display = (currDate!==today)?'inline-block':'none';
    if (user.r === 'staff') {
        document.getElementById('aya-lang-toggle').innerText = user.l === 'en' ? '🌐 EN' : '🌐 INDO';
    }
    
    // Sync native date picker value to avoid "no reaction" when picking the same date again
    const dp = document.getElementById('native-dp');
    if (dp) dp.value = currDate;
}

function triggerDatePicker(id) {
    if (user && user.r === 'staff') return;
    const dp = document.getElementById(id);
    if (dp && dp.showPicker) {
        try { dp.showPicker(); } catch (e) { console.warn(e); }
    }
}

function goToday() { pickDate(getTwDate()); }

function setFloor(f, el) { filter = f; document.querySelectorAll('.tab').forEach(e=>e.classList.remove('active')); el.classList.add('active'); render(); }
function render() {
    const box = document.getElementById('room-box');
    box.innerHTML = '';
    let list = ROOMS.filter(r => filter==='all' || r.f==filter);

    if(user.r==='staff') {
        list.sort((a,b) => {
            const da = globalDirty[a.id] ? 0 : 1; 
            const db = globalDirty[b.id] ? 0 : 1;
            if(da !== db) return da - db; 

            const sa = safeGetRoom(currDate, a.id).s; const sb = safeGetRoom(currDate, b.id).s;
            const na = safeGetRoom(currDate, a.id).n; const nb = safeGetRoom(currDate, b.id).n;
            const score = (s, n) => {
                if(s==='red' && !n.late) return 0;
                if(s==='red' && n.late) return 1;
                if(s==='yellow') return 2; if(s==='green') return 3; return 4;
            };
            return score(sa, na) - score(sb, nb);
        });
    }

    list.forEach(r => {
        const d = safeGetRoom(currDate, r.id); 
        const st = ST[d.s] || ST['blue'];
        const n = d.n;
        const isStaff = user.r === 'staff';
        const isDirty = globalDirty[r.id] && !isTraining; 

        const card = document.createElement('div');
        card.className = `card ${st.cls}`;
        
        let statusTextContent = isStaff ? getText(st.id) : st.cn;

        if (isDirty) {
            card.style.border = "4px solid #D32F2F"; 
            statusTextContent = isStaff ? getText('KOTOR') : '已退房';
        }

        if(d.s==='red' && n.late) card.style.opacity='0.7';

        let tags = '';
        if(n.late) tags+=`<span class="tag">🌃 ${isStaff?getText('Nanti'):'晚'}</span>`;
        if(n.flash) tags+=`<span class="tag tag-flash">⚡ ${isStaff?getText('TAMU DADAKAN'):'現場客'}</span>`;
        if(r.d && n.p) tags+=`<span class="tag tag-high">👩 ${n.p} ${isStaff?pluralize(n.p, 'Kasur'):'床'}</span>`;
        if(n.bed) tags+=`<span class="tag tag-high">🛏️ +${n.bed}</span>`;
        if(n.q) tags+=`<span class="tag tag-high"><span class="icon" style="font-size:14px">layers</span> +${n.q} ${isStaff?pluralize(n.q, 'Selimut'):'被'}</span>`;
        if(n.out) tags+=`<span class="tag" style="background:#E0F7FA; color:#006064;">🏃 外出</span>`;
        if(n.bath) tags+=`<span class="tag">🛁 ${isStaff?getText('Bak Bayi'):'Bak'}</span>`;
        if(n.msg) tags+=`<span class="tag" style="color:purple">💬 Note</span>`;

        let moon = (d.s==='red'&&n.late)?'<div class="moon-icon">🌃</div>':'';
        if (n.out) {
            statusTextContent += ' 🏃';
        }

        card.innerHTML = `${moon}<div class="r-head"><div><div class="r-no">${r.id}</div><div class="r-type">${isStaff?getText('Kamar'):''} ${r.t}</div></div><div style="text-align:right"><div class="st-icon">${st.icon}</div><div class="st-txt">${statusTextContent}</div></div></div><div class="tags">${tags}</div>`;
        
        if (user.r !== 'staff') {
            card.setAttribute('oncontextmenu', 'return false;');
            card.setAttribute('ontouchstart', `handleGridPressStart('${currDate}','${r.id}', event)`);
            card.setAttribute('onmousedown', `handleGridPressStart('${currDate}','${r.id}', event)`);
            card.setAttribute('ontouchmove', `handleGridMove(event)`);
            card.setAttribute('ontouchend', `handleGridPressEnd('${currDate}','${r.id}')`);
            card.setAttribute('onmouseup', `handleGridPressEnd('${currDate}','${r.id}')`);
            card.setAttribute('onclick', `handleGridClick('${currDate}','${r.id}', event)`);
        } else { 
            card.onclick = () => openModal(r.id);
        }
        
        box.appendChild(card);
    });
}

function openWeekView() { 
    sessionStorage.setItem('isWeekViewOpen', 'true');
    if(user.r === 'staff') {
        let dt = new Date(getTwDate() + "T12:00:00");
        dt.setDate(dt.getDate() - 1);
        const offset = dt.getTimezoneOffset() * 60000;
        weekStartDate = (new Date(dt - offset)).toISOString().split('T')[0];
    } else {
        weekStartDate = getTwDate();
    }
    document.getElementById('week-view-layer').style.display='flex'; 
    refreshWeekView(); 
}
function shiftWeek(d) { 
    let dt = new Date(weekStartDate + "T12:00:00");
    dt.setDate(dt.getDate()+d); 
    const offset = dt.getTimezoneOffset() * 60000;
    weekStartDate = (new Date(dt - offset)).toISOString().split('T')[0];
    refreshWeekView();
}
function goTodayInWeek() { weekStartDate=getTwDate(); refreshWeekView(); }

function goYesterdayInWeek() {
    let dt = new Date(getTwDate() + "T12:00:00");
    dt.setDate(dt.getDate() - 1);
    const offset = dt.getTimezoneOffset() * 60000;
    weekStartDate = (new Date(dt - offset)).toISOString().split('T')[0];
    refreshWeekView();
}

function pickWeekDate(v) {
    if(v) {
        weekStartDate = v;
        refreshWeekView();
    }
}
let twHolidaysCache = {};
async function fetchHolidays(year) {
    if (twHolidaysCache[year]) return;
    try {
        const res = await fetch(`https://cdn.jsdelivr.net/gh/imsyuan/taiwan-holidays/data/${year}.json`);
        if (!res.ok) throw new Error('API return ' + res.status);
        const data = await res.json();
        twHolidaysCache[year] = {};
        data.forEach(d => {
            const y = d.date.substring(0,4);
            const m = d.date.substring(4,6);
            const day = d.date.substring(6,8);
            const dateStr = `${y}-${m}-${day}`;
            twHolidaysCache[year][dateStr] = d.isHoliday;
        });
    } catch (e) {
        console.error('Failed to load holidays for', year, e);
        twHolidaysCache[year] = {}; // prevent infinite retry
    }
}

async function refreshWeekView() {
    const tbl = document.getElementById('wv-table');
    tbl.innerHTML = '<tr><td>Loading...</td></tr>';
    
    const startObj = new Date(weekStartDate);
    const yyyy = startObj.getFullYear();
    const mm = startObj.getMonth() + 1;
    
    if(user.r === 'staff') {
        document.getElementById('wv-title').innerText = getText('Ringkasan 8 Hari');
    } else {
        document.getElementById('wv-title').innerText = `🗓 ${yyyy}年 ${mm}月`;
    }
    const wvDp = document.getElementById('wv-native-dp');
    if (wvDp) wvDp.value = weekStartDate;

    const dates = [];
    const daysToShow = user.r === 'staff' ? 8 : 30;
    for(let i=0; i<daysToShow; i++) { 
         let dt = new Date(weekStartDate + "T12:00:00");
        dt.setDate(dt.getDate()+i);
        const offset = dt.getTimezoneOffset() * 60000;
        dates.push((new Date(dt - offset)).toISOString().split('T')[0]);
    }

    // 引入並使用 taiwan-holidays
    const yearsNeeded = [...new Set(dates.map(d => d.substring(0, 4)))];
    await Promise.all(yearsNeeded.map(y => fetchHolidays(y)));

    if(!isTraining && db) {
        const promises = dates.map(d => db.ref('status/'+d).once('value'));
        const snaps = await Promise.all(promises);
        snaps.forEach((s, i) => { cache[dates[i]] = s.val() || {}; });
    } 
    renderWeekTable(dates);
    
    if (user.r === 'staff') {
        document.getElementById('request-dashboard').style.display = 'flex';
        const todayIdx = dates.indexOf(getTwDate());
        if (todayIdx !== -1) {
            setTimeout(() => selectDateInDashboard(getTwDate(), todayIdx + 1, false), 50);
        } else {
            setTimeout(() => selectDateInDashboard(dates[0], 1, false), 50);
        }
    } else {
        document.getElementById('request-dashboard').style.display = 'none';
    }
}

function renderWeekTable(dates) {
    const tbl = document.getElementById('wv-table');
    let html = '';
    const today = getTwDate(); 

    const startObj = new Date(weekStartDate);
    const ym = `${startObj.getFullYear()}/${startObj.getMonth()+1}`;
    html += `<thead><tr class="month-row"><th class="wv-room-col">${ym}</th>`;
    
    let currentMonth = '';
    dates.forEach((d, i) => {
        const mIdx = parseInt(d.split('-')[1]) - 1;
        const isStaff = user.r === 'staff';
        const monthName = isStaff ? (user.l === 'en' ? EN_MONTHS[mIdx] : INDO_MONTHS[mIdx]) : `${mIdx+1}月`;
        if(monthName !== currentMonth) {
            html += `<th style="border-left:2px solid #999; text-align:left; padding-left:5px; color:#555; font-weight:900; cursor:pointer;" onclick="if(user.r !== 'staff') broadcastSpecialRequestsForDay('${d}')" title="單日特殊需求廣播">${monthName}</th>`;
            currentMonth = monthName;
        } else {
            html += `<th style="cursor:pointer;" onclick="if(user.r !== 'staff') broadcastSpecialRequestsForDay('${d}')" title="單日特殊需求廣播"></th>`;
        }
    });
    html += '</tr>';

    html += '<tr><th class="wv-room-col"></th>';
    dates.forEach(d => {
        const dayIdx = new Date(d + "T12:00:00").getDay();
        const dateNum = d.split('-')[2];
        let lbl = user.r === 'staff' ? `${user.l === 'en' ? EN_DAYS[dayIdx] : INDO_DAYS[dayIdx]} ${dateNum}` : `${dateNum} ${CN_DAYS[dayIdx]}`;
        
        let isHoliday = (dayIdx === 0 || dayIdx === 6);
        const yyyy = d.substring(0, 4);
        if (twHolidaysCache[yyyy] && twHolidaysCache[yyyy].hasOwnProperty(d)) {
            isHoliday = twHolidaysCache[yyyy][d];
        }
        
        let thClass = isHoliday ? 'th-weekend' : '';
   
        let hasRequest = false;
        if (cache[d]) {
            for (const rid in cache[d]) {
                const room = cache[d][rid];
                const n = room.n || {};
                if (room.s === 'purple' || n.bed > 0 || n.q > 0 || n.p > 1 || n.late || n.flash || n.bath || (n.msg && n.msg.trim() !== '')) {
                    hasRequest = true;
                    break;
                }
            }
        }
        
        let reqDot = (user.r === 'staff' && hasRequest) ? `<span class="req-dot"></span>` : '';
        
        if(d === today) thClass += ' today-col'; 
        let clickAction = user.r === 'staff' ? `selectDateInDashboard('${d}', this.cellIndex)` : `lockAllEmptyRooms('${d}')`;
        
        html += `<th class="${thClass} wv-date-col" style="${d===today?'background:#FFF8E1; border-bottom:3px solid #FFC107;':''} cursor:pointer;" onclick="${clickAction}" title="${user.r === 'staff' ? '查看需求' : '一鍵全鎖房'}">${lbl}${reqDot}</th>`;
    });
    html += '</tr></thead><tbody>';

    const target = isTraining ? trainingCache : cache;
    ROOMS.forEach(r => {
        html += `<tr><td class="wv-room-col" style="${user.r!=='staff'?'cursor:pointer;':''}" onclick="if(user.r !== 'staff') lockAllEmptyRoomDays('${r.id}')" title="依房號一鍵鎖房">${r.id}</td>`;
        dates.forEach(d => {
            const cd = safeGetRoom(d, r.id);
            const cls = 'c-'+cd.s; 
     
            const isStaff = user.r === 'staff';
            let code = '';
            if(isStaff) { if(cd.s==='yellow')code=getText('MSK'); else if(cd.s==='green')code=getText('LJT'); else if(cd.s==='red')code=getText('KLR'); else if(cd.s==='locked')code=getText('LCK'); } 
            else { if(cd.s==='yellow')code='入';
            else if(cd.s==='green')code='續'; else if(cd.s==='red')code='退'; else if(cd.s==='locked')code='鎖'; }

  
            let icons = '';
            if(r.d && cd.n.p) icons += `<span class="icon-hl">${cd.n.p}${isStaff?getText('Kasur').charAt(0):'床'}</span> `;
            if(cd.n.bed) icons += `<span class="icon-hl">+${cd.n.bed}</span> `;
            if(cd.n.q) icons += `<span class="icon-hl"><span class="icon" style="font-size:10px">layers</span>+${cd.n.q}</span> `;

            if(cd.n.bath) icons += `🛁 `;
            if(cd.n.msg) icons += `💬 `;
            let moon = cd.n.late ? '<span class="cell-moon">🌃</span>' : '';
            let flash = cd.n.flash ? '<span class="cell-flash">⚡</span>' : '';
            let isDirty = (globalDirty[r.id] && !isTraining);
    
            let dirtyMark = '';
            if (isDirty) { 
                dirtyMark = '<span style="position:absolute;bottom:2px;left:2px;font-size:10px;color:red;">🧹</span>';
            }

            let bottomRow = icons ? `<div class="cell-icons">${icons}</div>` : '';

            if (cd.n.out) {
                code += ' 🏃';
            }
            
            let statusText = `<div class="cell-status">${code}</div>`;
            
            let finalCls = cls;
            if(isDirty) {
                finalCls += ' dirty-active-border';
                if(cd.s === 'blue') finalCls += ' dirty-active-bg';
            }

            const evts = `onclick="handleGridClick('${d}','${r.id}', event)" oncontextmenu="return false;"
            ontouchstart="handleGridPressStart('${d}','${r.id}', event)" onmousedown="handleGridPressStart('${d}','${r.id}', event)" ontouchmove="handleGridMove(event)" onmouseup="handleGridPressEnd('${d}','${r.id}')" ontouchend="handleGridPressEnd('${d}','${r.id}')"`;

            html += `<td id="td-${d}-${r.id}" ${evts}><div class="cell-content ${finalCls}">${moon}${flash}${dirtyMark}${statusText}${bottomRow}</div></td>`;
        });
        html += '</tr>';
    });
    html += '</tbody>';
    tbl.innerHTML = html;
}

let pressTimer;
let isLongPress = false;
let startX = 0;
let startY = 0;
let isScrolling = false;

function handleGridPressStart(d, rid, e) { 
    isLongPress = false;
    isScrolling = false;
    
    if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    } else {
        startX = e.clientX;
        startY = e.clientY;
    }

    pressTimer = setTimeout(() => { 
        if (!isScrolling) { 
            isLongPress = true; 
            openModalFromGrid(d, rid);
            if(navigator.vibrate) navigator.vibrate(50);
        }
    }, 600);
}

function handleGridMove(e) {
    if (!pressTimer) return;
    let clientX, clientY;
    if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    let diffX = Math.abs(clientX - startX);
    let diffY = Math.abs(clientY - startY);

    if (diffX > 10 || diffY > 10) {
        isScrolling = true;
        clearTimeout(pressTimer);
    }
}

function handleGridPressEnd(d, rid) { clearTimeout(pressTimer); }

function handleGridClick(d, rid, e) { 
    if(isLongPress) return;
    if(matrixSyncMode || (daySyncMode && d === currDate)) {
        matrixCycle(d, rid);
    } else {
        openModalFromGrid(d, rid);
    }
}
function handleGridRightClick(d, rid, e) { e.preventDefault(); openModalFromGrid(d, rid); }
function openModalFromGrid(d, rid) { 
    currDate = d;
    openModal(rid); 
}

function forceCloseWeekView() { 
    sessionStorage.removeItem('isWeekViewOpen');
    document.getElementById('week-view-layer').style.display='none'; 
    matrixSyncMode=false; 
    closeDashboardMobile(); 
    render(); 
}
function closeWeekView() { forceCloseWeekView(); }

function closeDashboardMobile(e) { 
    if (e) e.stopPropagation();
    document.getElementById('request-dashboard').classList.remove('mobile-open'); 
    const cells = document.querySelectorAll('.wv-table td, .wv-table th');
    cells.forEach(c => c.classList.remove('col-selected'));
}

function selectDateInDashboard(dateStr, colIndex, isUserClick = true) {
    if (isUserClick) document.getElementById('request-dashboard').classList.add('mobile-open');
    
    const cells = document.querySelectorAll('.wv-table td, .wv-table th');
    cells.forEach(c => c.classList.remove('col-selected'));
    
    const colCells = document.querySelectorAll(`.wv-table tr > :nth-child(${colIndex + 1})`);
    colCells.forEach(c => c.classList.add('col-selected'));

    const headerText = document.getElementById('rd-header-text');
    const content = document.getElementById('rd-content');
    
    const dayIdx = new Date(dateStr + "T12:00:00").getDay();
    const dateNum = dateStr.split('-')[2];
    let lbl = user.r === 'staff' && user.l === 'en' ? `${EN_DAYS[dayIdx]} ${dateNum}` : `${INDO_DAYS[dayIdx]} ${dateNum}`;
    headerText.innerHTML = `📅 ${lbl} ${getText('Requests')}`;

    let html = '';
    if (cache[dateStr]) {
        for (const rid of ROOMS.map(r=>r.id)) {
            const room = cache[dateStr][rid];
            if (!room) continue;
            const n = room.n || {};
            let reqs = [];
            
            if (room.s === 'purple') reqs.push(`🚫 <b>${getText('Jangan Ganggu')}</b>`);
            if (n.p > 1) reqs.push(`👩 ${getText('Siapkan')} <b>${n.p} ${pluralize(n.p, 'Kasur')}</b>`);
            if (n.bed > 0) reqs.push(`🛏️ +${n.bed} ${pluralize(n.bed, 'Extra Bed')}`);
            if (n.q > 0) reqs.push(`<span class="icon">layers</span> +${n.q} ${pluralize(n.q, 'Selimut')}`);
            if (n.bath) reqs.push(`🛁 ${getText('Bak Bayi')}`);
            if (n.late) reqs.push(`🌃 <b>${getText('Nanti')}</b>`);
            if (n.flash) reqs.push(`⚡ <b>${getText('TAMU DADAKAN')}</b>`);
            if (n.msg && n.msg.trim() !== '') reqs.push(`<div style="color:#666; font-size:0.95em; margin-top:4px;">💬 ${n.msg}</div>`);
            
            if (reqs.length > 0) {
                html += `<div class="rd-item">
                            <div class="rd-room-title">${rid} - ${ROOMS.find(r=>r.id===rid).t}</div>
                            <div class="rd-detail">${reqs.join('<br>')}</div>
                         </div>`;
            }
        }
    }
    
    if (html === '') {
        content.innerHTML = `<div class="rd-empty">
                                <div class="rd-empty-icon">✅</div>
                                <div>${getText('Tidak ada permintaan khusus')}</div>
                             </div>`;
    } else {
        content.innerHTML = html;
    }
}

function toggleMatrixSync() {
    matrixSyncMode = !matrixSyncMode;
    const btn = document.getElementById('wv-sync-toggle'); const save = document.getElementById('wv-save-btn');
    if(matrixSyncMode) { btn.classList.add('active'); btn.innerText='🔁 填色：開'; save.classList.remove('hidden'); }
    else { btn.classList.remove('active'); btn.innerText='🔁 填色：關'; save.classList.add('hidden'); }
}

function matrixCycle(d, rid) {
    const cyc = ['blue','yellow','green','red','locked'];
    const target = isTraining ? trainingCache : cache;
    const cur = safeGetRoom(d, rid).s;
    let idx = cyc.indexOf(cur); if(idx===-1) idx=0;
    let next = cyc[(idx+1)%5];
    
    if (!target[d]) target[d] = {};
    if (!target[d][rid]) target[d][rid] = {s:'blue', n:{}};
    
    if (globalDirty[rid] && next === 'green' && !isTraining) {
        if(!confirm("⚠️ 警告：此房間尚未打掃 (Dirty)！\n確定要標記為續住/入住嗎？")) return;
    }

    if (next === 'locked') {
        target[d][rid].s = 'yellow';
        if (!target[d][rid].n) target[d][rid].n = {};
        target[d][rid].n.isLocked = true;
    } else {
        target[d][rid].s = next;
        if (!target[d][rid].n) target[d][rid].n = {};
        target[d][rid].n.isLocked = null;
    }
    if(next==='blue') {
        target[d][rid].n = {};
        if (!isTraining && typeof db !== 'undefined' && db) {
            db.ref('status/'+d+'/'+rid+'/n').set(null);
        }
    }
    
    if (!isTraining && db) { 
         if (next === 'red') db.ref('global/dirty_flags/'+rid).set(true);
         if (user.r === 'admin' && d === getTwDate()) { 
             db.ref('global/last_update').set(Date.now());
         } 
         db.ref('status/'+d+'/'+rid).update(target[d][rid]);
         logAction(`變更 ${rid} 狀態為 ${ST[next].cn}`, d);
    }

    updateCellUI(d, rid);
}

function lockAllEmptyRooms(d) {
    if(user.r === 'staff') return;
    
    const target = isTraining ? trainingCache : cache;
    if (!target[d]) target[d] = {};

    let hasBlue = false;
    let hasLocked = false;
    ROOMS.forEach(r => {
        const cur = safeGetRoom(d, r.id).s;
        if (cur === 'blue') hasBlue = true;
        if (cur === 'locked') hasLocked = true;
    });

    if (!hasBlue && !hasLocked) return;

    const isLocking = hasBlue;
    const msg = isLocking 
        ? `確定要將 ${d} 所有的「空房」一鍵設為「鎖房」嗎？\n(既有訂單將不受影響)`
        : `確定要將 ${d} 所有的「鎖房」一鍵【解除鎖定】恢復為空房嗎？`;

    if(!confirm(msg)) return;
    
    let updated = false;
    ROOMS.forEach(r => {
        const cur = safeGetRoom(d, r.id).s;
        if (isLocking && cur === 'blue') {
            if (!target[d][r.id]) target[d][r.id] = {s:'blue', n:{}};
            target[d][r.id].s = 'yellow';
            target[d][r.id].n.isLocked = true;
            updated = true;
            if (!isTraining && db) db.ref('status/'+d+'/'+r.id).update(target[d][r.id]);
            updateCellUI(d, r.id);
        } else if (!isLocking && cur === 'locked') {
            if (!target[d][r.id]) target[d][r.id] = {s:'blue', n:{}};
            target[d][r.id].s = 'blue';
            target[d][r.id].n.isLocked = null;
            updated = true;
            if (!isTraining && db) db.ref('status/'+d+'/'+r.id).update(target[d][r.id]);
            updateCellUI(d, r.id);
        }
    });
    
    if (updated && !isTraining && db) {
        if (user.r === 'admin' && d === getTwDate()) { 
             db.ref('global/last_update').set(Date.now());
        }
        logAction(isLocking ? `一鍵鎖房 (所有空房)` : `一鍵解鎖 (所有鎖房)`, d);
    }
    if (d === currDate) {
        render();
    }
}

function lockAllEmptyRoomDays(rid) {
    if(user.r === 'staff') return;
    
    const dates = [];
    for(let i=0; i<30; i++) { 
         let dt = new Date(weekStartDate + "T12:00:00");
        dt.setDate(dt.getDate()+i);
        const offset = dt.getTimezoneOffset() * 60000;
        dates.push((new Date(dt - offset)).toISOString().split('T')[0]);
    }

    const target = isTraining ? trainingCache : cache;
    let hasBlue = false;
    let hasLocked = false;
    dates.forEach(d => {
        const cur = safeGetRoom(d, rid).s;
        if (cur === 'blue') hasBlue = true;
        if (cur === 'locked') hasLocked = true;
    });

    if (!hasBlue && !hasLocked) return;

    const isLocking = hasBlue;
    const rInfo = ROOMS.find(r => r.id === rid);
    const msg = isLocking 
        ? `確定要將 ${rid} (${rInfo.t}) 在畫面上未來 30 天的所有「空房」一鍵設為「鎖房」嗎？\n(既有訂單將不受影響)`
        : `確定要將 ${rid} (${rInfo.t}) 在畫面上未來 30 天的「鎖房」一鍵【解除鎖定】恢復為空房嗎？`;

    if(!confirm(msg)) return;
    
    let updated = false;
    dates.forEach(d => {
        const cur = safeGetRoom(d, rid).s;
        if (!target[d]) target[d] = {};
        if (isLocking && cur === 'blue') {
            if (!target[d][rid]) target[d][rid] = {s:'blue', n:{}};
            target[d][rid].s = 'yellow';
            target[d][rid].n.isLocked = true;
            updated = true;
            if (!isTraining && db) {
                db.ref('status/'+d+'/'+rid).update(target[d][rid]);
                logAction(`變更 ${rid} 狀態為 鎖房`, d);
            }
            updateCellUI(d, rid);
        } else if (!isLocking && cur === 'locked') {
            if (!target[d][rid]) target[d][rid] = {s:'blue', n:{}};
            target[d][rid].s = 'blue';
            target[d][rid].n.isLocked = null;
            updated = true;
            if (!isTraining && db) {
                db.ref('status/'+d+'/'+rid).update(target[d][rid]);
                logAction(`變更 ${rid} 狀態為 空房`, d);
            }
            updateCellUI(d, rid);
        }
    });
    
    if (updated && !isTraining && db) {
         if (user.r === 'admin' && dates.includes(getTwDate())) {
             db.ref('global/last_update').set(Date.now());
         }
    }
    if (dates.includes(currDate)) {
        render();
    }
}

function updateCellUI(d, rid) {
    const cell = document.getElementById(`td-${d}-${rid}`);
    if(!cell) return;
    const cd = safeGetRoom(d, rid);
    const cls = 'c-'+cd.s;
    const isStaff = user.r === 'staff';
    const r = ROOMS.find(x=>x.id===rid);
    const today = getTwDate(); 

    let code = '';
    if(isStaff) { if(cd.s==='yellow')code=getText('MSK'); else if(cd.s==='green')code=getText('LJT'); else if(cd.s==='red')code=getText('KLR'); else if(cd.s==='locked')code=getText('LCK'); } 
    else { if(cd.s==='yellow')code='入';
    else if(cd.s==='green')code='續'; else if(cd.s==='red')code='退'; else if(cd.s==='locked')code='鎖'; }

    let icons = '';
    if(r.d && cd.n.p) icons += `<span class="icon-hl">${cd.n.p}${isStaff?getText('Kasur').charAt(0):'床'}</span> `;
    if(cd.n.bed) icons += `<span class="icon-hl">+${cd.n.bed}</span> `;
    if(cd.n.q) icons += `<span class="icon-hl"><span class="icon" style="font-size:10px">layers</span>+${cd.n.q}</span> `;
    if(cd.n.bath) icons += `🛁 `;
    if(cd.n.msg) icons += `💬 `;
    let moon = cd.n.late ? '<span class="cell-moon">🌃</span>' : '';
    let flash = cd.n.flash ? '<span class="cell-flash">⚡</span>' : '';
    let isDirty = (globalDirty[rid] && !isTraining);
    
    let dirtyMark = '';
    if (isDirty) { 
        dirtyMark = '<span style="position:absolute;bottom:2px;left:2px;font-size:10px;color:red;">🧹</span>';
    }

    if (cd.n.out) {
        code += ' 🏃';
    }

    let statusText = `<div class="cell-status">${code}</div>`;
    let bottomRow = icons ? `<div class="cell-icons">${icons}</div>` : '';

    let finalCls = cls;
    if(isDirty) {
        finalCls += ' dirty-active-border';
        if(cd.s === 'blue') finalCls += ' dirty-active-bg';
    }

    cell.innerHTML = `<div class="cell-content ${finalCls}">${moon}${flash}${dirtyMark}${statusText}${bottomRow}</div>`;
}

function saveMatrixSync() {
    if(!isTraining && db) { 
         for(let date in cache) db.ref('status/'+date).update(cache[date]);
         if (user.r === 'admin' && cache[getTwDate()]) db.ref('global/last_update').set(Date.now());
    }
    toggleMatrixSync();
}
function jumpTo(date, rid) { currDate = date;
loadData(currDate); updateDateUI(); closeWeekView(); render(); setTimeout(()=>openModal(rid),100); }

function startMoveRoom() {
    if(user.r==='staff') return;
    if(moveMode) return;
    moveMode = true;
    const btn = document.getElementById('move-btn');
    btn.innerText = '請點選目標空房...'; 
    btn.style.background = '#FFEB3B';
    btn.style.color = '#333';
    closeModal();
}

function executeMove(toRid) {
    const fromRid = mRoomId;
    const d = safeGetRoom(currDate, fromRid);
    const newData = JSON.parse(JSON.stringify(d)); 
    
    updateRoom(toRid, newData);
    
    // 修正：明確清空舊房間快取與資料庫中的備註狀態，避免被合併邏輯保留
    const target = isTraining ? trainingCache : cache;
    if (target[currDate] && target[currDate][fromRid]) {
        target[currDate][fromRid].n = {};
    }
    if (!isTraining && typeof db !== 'undefined' && db) {
        db.ref('status/' + currDate + '/' + fromRid + '/n').set(null);
    }
    
    updateRoom(fromRid, {s:'blue'});

    if(document.getElementById('week-view-layer').style.display === 'flex') {
        updateCellUI(currDate, fromRid);
        updateCellUI(currDate, toRid);
    }

    moveMode = false;
    const btn = document.getElementById('move-btn');
    if(btn) {
        btn.innerText = '🏩 換房';
        btn.style.background = '#E3F2FD';
        btn.style.color = '#0D47A1';
    }
}

function openModal(rid) {
    if(moveMode) {
        const target = safeGetRoom(currDate, rid);
        if(target.s !== 'blue') { alert(getText('無法換房：目標房間必須是「空房」！')); return; }
        executeMove(rid);
        return;
    }

    mRoomId = rid;
    const d = safeGetRoom(currDate, rid); 
    const n = d.n; 
    const r = ROOMS.find(x=>x.id===rid);
    
    document.getElementById('modal').style.display='flex';
    document.getElementById('m-id').innerText = rid; 
    document.getElementById('m-type').innerText = r.t;
    
    document.getElementById('dirty-btn').style.display = (user.r==='staff') ? 'none' : 'block';
    document.getElementById('move-btn').style.display = (user.r==='staff') ? 'none' : 'block';
    
    const mvBtn = document.getElementById('move-btn');
    if(mvBtn) { mvBtn.innerText = '🏩 換房'; mvBtn.style.background = '#E3F2FD';
    mvBtn.style.color = '#0D47A1'; }

    const body = document.getElementById('m-body');
    body.innerHTML = '';

    if(user.r==='staff') {
        let ins = '';
        if(n.late) ins += `🌃 <b>${getText('Tamu di kamar ini akan datang terlambat, jadi bisa utamakan membersihkan kamar lain dulu.')}</b><br>`;
        if(d.s==='red' && !n.late) ins += `🧹 <b>${getText('PRIORITAS (Segera)')}</b><br>`;
        if(n.flash) ins += `⚡ <b>${getText('TAMU DADAKAN')}</b><br>`;
        if(r.d && n.p) ins += `👩 ${getText('Siapkan')} <b>${n.p} ${pluralize(n.p, 'Kasur')}</b><br>`;
        if(n.bed) ins += `🛏️ +${n.bed} ${pluralize(n.bed, 'Extra Bed')}<br>`;
        if(n.q) ins += `<span class="icon">layers</span> +${n.q} ${pluralize(n.q, 'Selimut')}<br>`;
        if(n.out) ins += `🏃 <b>${getText('Tamu sedang keluar.')}</b><br>`;
        if(n.bath) ins += `🛁 ${getText('Bak Bayi')}<br>`;
        if(n.msg) ins += `💬 ${n.msg} <a href="https://translate.google.com/?sl=zh-TW&tl=id&text=${encodeURIComponent(n.msg)}&op=translate" target="_blank">🌐 Translate</a>`;
        
        if(d.s==='red' || globalDirty[rid]) {
            body.innerHTML = `<div style="background:#FFF3E0; padding:15px; border-radius:10px; margin-bottom:15px; font-size:16px;">${ins||getText('Silahkan sapu.')}</div><button class="line-btn" style="background:#2196F3" onclick="finishCleaning('${rid}')">✅ ${getText('SELESAI (完成)')}</button>`;
        } else if (d.s === 'purple') {
            body.innerHTML = `<div style="padding:15px; color:#666; font-size:16px; font-weight:bold;">⛔ ${getText('Kamar yang berkelanjutan tidak perlu dibersihkan.')}</div>`;
        } else {
            body.innerHTML = `<div style="padding:15px; color:#666;">${ins||getText('Status:')+' '+getText(ST[d.s].id)}<br><br>${getText('Tidak ada tindakan.')}</div>`;
        }
        return;
    }

    let cleanBtn = '';
    if (globalDirty[rid] && !isTraining) {
        cleanBtn = `
        <div style="margin-bottom:15px;">
            <button class="act-btn" style="width:100%; background:#FFEBEE; border:2px solid #D32F2F; color:#D32F2F; padding:15px; font-size:18px; flex-direction:row; justify-content:center; gap:10px;" onclick="finishCleaning('${rid}')">
                <span style="font-size:24px">✅</span> <span>完成打掃 (消除紅框)</span>
            </button>
        </div>`;
    }

    const acts = [{c:'green',l:'入住'},{c:'red',l:'退房'},{c:'blue',l:'空房'},{c:'yellow',l:'預訂'},{c:'purple',l:'勿擾'},{c:'locked',l:'鎖房'}];
    let btns = acts.map(x => `<div class="act-btn" onclick="setStatus('${x.c}')" style="border:2px solid ${x.c===d.s?'#333':'transparent'}"><div style="font-size:24px">${ST[x.c].icon}</div><div>${x.l}</div></div>`).join('');
    
    body.innerHTML = `${cleanBtn}<div class="act-grid">${btns}</div>`;

    let ctrls = '';
    if(r.d) ctrls += mkStp('👩 人數', 'p', n.p||0, 8); else ctrls += mkStp('🛏️ 加床', 'bed', n.bed||0, r.m);
    ctrls += mkStp('🌫️ 加被', 'q', n.q||0, 5);
    
    ctrls += `<div class="ctrl-row"><div>🏃 外出</div><div class="tgl ${n.out?'on':''}" onclick="togOut(this)"></div><input type="hidden" id="v-out" value="${n.out?'1':''}"></div>`;

    ctrls += `<div class="ctrl-row"><div>🛁 澡盆</div><div class="tgl ${n.bath?'on':''}" onclick="tog(this)"></div><input type="hidden" id="v-bath" value="${n.bath?'1':''}"></div><div class="ctrl-row"><div>🌃 晚到 (墊底)</div><div class="tgl ${n.late?'on-red':''}" onclick="togRed(this)"></div><input type="hidden" id="v-late" value="${n.late?'1':''}"></div><div class="ctrl-row"><div>⚡ 現場客 (標記)</div><div class="tgl ${n.flash?'on-orange':''}" onclick="togFlash(this)"></div><input type="hidden" id="v-flash" value="${n.flash?'1':''}"></div><textarea id="v-msg" style="width:100%; padding:10px; margin-top:10px; border:1px solid #ccc; border-radius:8px;"
    placeholder="備註...">${n.msg||''}</textarea><button class="line-btn" style="background:var(--theme-color)" onclick="saveNote(true)">💾 儲存備註</button>`;
    body.innerHTML += `<div style="border-top:1px solid #eee;">${ctrls}</div>`;

    if (user.r !== 'staff') {
        body.innerHTML += `<button class="line-btn" style="background:#FF9800; color:#fff; margin-top:8px;" onclick="saveAndNotifyRoom()">📢 通知阿雅此房異動</button>`;
    }
}

function closeModal() { document.getElementById('modal').style.display='none';
    if(document.getElementById('week-view-layer').style.display==='flex') {
        updateCellUI(currDate, mRoomId);
    }
}

function setStatus(s) { 
    if (s === 'green' && globalDirty[mRoomId]) {
        if (!confirm("⚠️ 警告：此房間尚未打掃 (Dirty)！\n確定要讓客人入住嗎？")) return;
    }
    
    // 修正：當狀態變更為「空房」時，明確清空該房間備註狀態
    if (s === 'blue') {
        const target = isTraining ? trainingCache : cache;
        if (target[currDate] && target[currDate][mRoomId]) {
            target[currDate][mRoomId].n = {};
        }
        if (!isTraining && typeof db !== 'undefined' && db) {
            db.ref('status/' + currDate + '/' + mRoomId + '/n').set(null);
        }
    }

    let updateObj = {s: s, n: {isLocked: null}};
    if (s === 'locked') {
        updateObj.s = 'yellow';
        updateObj.n.isLocked = true;
    }
    updateRoom(mRoomId, updateObj);
    closeModal(); 
    logAction(`更變 ${mRoomId} 狀態為 ${ST[s].cn}`); 
}

function saveNote(close = false) {
    const d = safeGetRoom(currDate, mRoomId);
    const n = {
        p: parseInt(document.getElementById('val-p')?.innerText||0),
        bed: parseInt(document.getElementById('val-bed')?.innerText||0),
        q: parseInt(document.getElementById('val-q')?.innerText||0),
        bath: document.getElementById('v-bath').value==='1',
        late: document.getElementById('v-late').value==='1',
        flash: document.getElementById('v-flash').value==='1',
        out: document.getElementById('v-out').value==='1',
        msg: document.getElementById('v-msg').value,
        isLocked: (d && d.n && d.n.isLocked !== undefined) ? d.n.isLocked : null
    };
    updateRoom(mRoomId, {n:n}); 
    if(close) closeModal(); 
    logAction(`更新 ${mRoomId} 備註`);
}

const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/ksddatrko6bxxuw6jzfsl6qqowwneu5u"; 

async function sendWebhook(actionType, roomId, extraData = {}) {
    if (isTraining || !MAKE_WEBHOOK_URL.startsWith("http")) return; 

    const payload = {
        action: actionType,      
        room: roomId,            
        user: user.n,             
        time: new Date().toLocaleTimeString('zh-TW', { hour12: false }),
        ...extraData
    };

    try {
        await fetch(MAKE_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        console.log("Webhook 傳送成功:", payload);
    } catch (error) {
        console.error("Webhook 傳送失敗:", error);
    }
}

async function broadcastAllCheckout() {
    if(confirm('確定要發送「今日客人已全數退房」通知嗎？')) {
        await sendWebhook('all_checkout', 'ALL');
        alert(getText('已發送通知！'));
    }
}

function updateRoom(rid, diff) {
    const target = isTraining ? trainingCache : cache;
    if (!target[currDate][rid]) target[currDate][rid] = {s:'blue', n:{}};
    const d = target[currDate][rid];
    
    if(diff.s) d.s = diff.s; 
    if(diff.n) {
        d.n = { ...d.n, ...diff.n };
    }
    if(diff.s === 'red' && d.n && d.n.late && diff.n) diff.n.late = true;
    
    if(!isTraining && db) {
        db.ref('status/'+currDate+'/'+rid).update(diff);
        if (user.r === 'admin' && currDate === getTwDate()) {
            db.ref('global/last_update').set(Date.now());
        }
        
        if (diff.s === 'red') {
            db.ref('global/dirty_flags/'+rid).set(true);
            sendWebhook('checkout', rid, { status: 'red' });
        }
        // 移除自動清空髒房狀態的邏輯，保護髒房任務不會在誤觸時消失
        // if (diff.s === 'blue') db.ref('global/dirty_flags/'+rid).set(false);
    }
    render();
}

function finishCleaning(rid, status) {
    if (!isTraining && db) {
        db.ref('global/dirty_flags/'+rid).set(false);
        sendWebhook('cleaned', rid);
    }
    globalDirty[rid] = false; 
    
    // Just remove the flag, don't force status change unless passed
    if(status) {
        setStatus(status);
    } else {
        const d = safeGetRoom(currDate, rid);
        
        // Optimized Logic:
        // 如果房間當前狀態是「續住(Green)」或「預訂(Yellow)」，只消除髒房狀態（紅框），保持原狀態。
        if (d.s === 'green' || d.s === 'yellow') {
             closeModal();
             logAction(`完成清潔 ${rid}`);
             render();
             return;
        }

        // 若為「退房(Red)」或「空房(Blue)」：
        // 自動根據有無備註需求，轉換為預訂(Yellow)或空房(Blue)。
        const n = d.n || {};
        // 檢查是否有任何備註需求
        const hasBooking = (n.p || n.bed || n.q || n.late || n.flash || n.msg || n.bath || n.out);
        setStatus(hasBooking ? 'yellow' : 'blue');
    }
}

function logAction(act, logDate) {
    if(!isTraining && db) {
        try {
             const now = new Date();
             const t = now.toTimeString().split(' ')[0];
             
             const targetDate = logDate || currDate;
             const realToday = getTwDate();
             const md = targetDate.substring(5).replace('-', '/'); 
             
             let finalAct = act;
             
             // 統一修正錯字並將日期插入至房號前方，符合「變更 (日期) (房號) 狀態為 (狀態)」格式
             if (act.includes('更變 ') || act.includes('變更 ')) {
                 finalAct = act.replace(/(更變|變更)\s+(\d+)/, `變更 ${md} $2`);
             } else if (act.includes('更新 ')) {
                 finalAct = act.replace(/更新\s+(\d+)/, `更新 ${md} $1`);
             } else if (act.includes('完成清潔 ')) {
                 finalAct = act.replace(/完成清潔\s+(\d+)/, `完成清潔 ${md} $1`);
             } else if (act.includes('手動標記 ')) {
                 finalAct = act.replace(/手動標記\s+(\d+)/, `手動標記 ${md} $1`);
             } else {
                 // 對於其他特殊操作 (如一鍵鎖房)，保留中括號格式
                 finalAct = `[${md}] ` + act;
             }
             
             // 永遠寫入「真實的今天(realToday)」，確保 Log 全域即時顯示
             db.ref('logs/' + realToday).push({
                time: t,
                user: user.n,
                action: finalAct
             });
        } catch(e) {}
    }
}

// --- 直接標記為髒房 (不觸發 Webhook) ---
function markAsDirty() {
    if(!mRoomId) return;
    if(confirm(`確定要直接將 ${mRoomId} 標記為髒房嗎？\n(此操作僅改變打掃狀態，不會發送 Line 通知)`)) {
        if(!isTraining && db) {
            db.ref('global/dirty_flags/'+mRoomId).set(true);
        }
        globalDirty[mRoomId] = true;
        logAction(`手動標記 ${mRoomId} 為髒房`);
        render();
        closeModal();
    }
}

// --- 補充缺少的 UI 控制與日誌函數 ---
function mkStp(label, id, val, max) {
    return `<div class="ctrl-row"><div>${label}</div><div class="stepper"><div class="s-btn" onclick="chgVal('${id}',-1,0,${max})">-</div><div class="s-val" id="val-${id}">${val}</div><div class="s-btn" onclick="chgVal('${id}',1,0,${max})">+</div></div></div>`;
}

function chgVal(id, d, min, max) {
    let el = document.getElementById('val-'+id);
    if(!el) return;
    let v = parseInt(el.innerText) + d;
    if(v >= min && v <= max) el.innerText = v;
}

function tog(el) {
    el.classList.toggle('on');
    let inp = el.nextElementSibling;
    if(el.classList.contains('on')) { inp.value='1'; }
    else { inp.value=''; }
}

function togRed(el) {
    el.classList.toggle('on-red');
    let inp = el.nextElementSibling;
    if(el.classList.contains('on-red')) { inp.value='1'; }
    else { inp.value=''; }
}

function togFlash(el) {
    el.classList.toggle('on-orange');
    let inp = el.nextElementSibling;
    if(el.classList.contains('on-orange')) { inp.value='1'; }
    else { inp.value=''; }
}

function togOut(el) {
    el.classList.toggle('on');
    let inp = el.nextElementSibling;
    if(el.classList.contains('on')) { 
inp.value='1'; 
// 新增這行：觸發外出 Webhook 通知
sendWebhook('guest_out', mRoomId); 
    }
    else { 
inp.value=''; 
    }
    // 新增這行：自動儲存，確保系統狀態與通知完美同步！
    saveNote(false);
}

function openLogModal() {
    document.getElementById('log-modal').style.display='flex';
    renderFullLogs();
}

function renderFullLogs() {
    const list = document.getElementById('log-full-list');
    if(!list) return;
    if(fullLogs.length === 0) {
        list.innerHTML = '<div style="padding:20px;text-align:center;">今日目前無紀錄</div>';
        return;
    }
    list.innerHTML = fullLogs.map(l => `<div class="log-row"><div><span class="log-time">${l.time}</span> <b>${l.user}</b></div><div>${l.action}</div></div>`).join('');
}

async function broadcastSpecialRequests() {
    const target = isTraining ? trainingCache : cache;
    const dayData = target[currDate] || {};
    let requests = [];

    ROOMS.forEach(r => {
        const rid = r.id;
        if (!dayData[rid]) return;
        const n = dayData[rid].n;
        if (!n) return;

        let roomReqs = [];
        
        if (n.p > 0) roomReqs.push(`Kasur +${n.p} (床)`);
        if (n.bed > 0) roomReqs.push(`Extra Bed +${n.bed} (加床)`);
        if (n.q > 0) roomReqs.push(`Selimut +${n.q} (加被)`);
        if (n.bath) roomReqs.push(`Bak Bayi (嬰兒澡盆)`);
        if (n.late) roomReqs.push(`Tamu Datang Terlambat (晚到)`);
        if (n.msg && n.msg.trim() !== '') roomReqs.push(`Note: ${n.msg}`);
        if (dayData[rid].s === 'purple') roomReqs.push(`Jangan Ganggu (勿擾房)`);
        
        if (roomReqs.length > 0) {
            requests.push(`• Kamar ${rid}：${roomReqs.join(', ')}`);
        }
    });

    if (requests.length === 0) {
        alert(getText('今日目前沒有特殊需求的房間喔！'));
        return;
    }

    let dayIdx = new Date(currDate + "T12:00:00").getDay();
    let indoDay = INDO_DAYS[dayIdx];
    const listText = `🔔 Daftar Kebutuhan Khusus tgl ${currDate} ${indoDay} (特殊需求清單):\n` + requests.join('\n');
    
    if (confirm(`預覽即將發送的清單：\n\n${listText}\n\n確定要發送嗎？`)) {
        await sendWebhook('special_requests', 'ALL', { req_msg: listText });
        alert(getText('已發送通知！'));
    }
}

async function broadcastSpecialRequestsForDay(targetDate) {
    const target = isTraining ? trainingCache : cache;
    const dayData = target[targetDate] || {};
    let requests = [];

    ROOMS.forEach(r => {
        const rid = r.id;
        if (!dayData[rid]) return;
        const n = dayData[rid].n;
        if (!n) return;

        let roomReqs = [];
        
        if (n.p > 0) roomReqs.push(`Kasur +${n.p} (床)`);
        if (n.bed > 0) roomReqs.push(`Extra Bed +${n.bed} (加床)`);
        if (n.q > 0) roomReqs.push(`Selimut +${n.q} (加被)`);
        if (n.bath) roomReqs.push(`Bak Bayi (嬰兒澡盆)`);
        if (n.late) roomReqs.push(`Tamu Datang Terlambat (晚到)`);
        if (n.msg && n.msg.trim() !== '') roomReqs.push(`Note: ${n.msg}`);
        if (dayData[rid].s === 'purple') roomReqs.push(`Jangan Ganggu (勿擾房)`);
        
        if (roomReqs.length > 0) {
            requests.push(`• Kamar ${rid}：${roomReqs.join(', ')}`);
        }
    });

    if (requests.length === 0) {
        alert(getText('今日目前沒有特殊需求的房間喔！'));
        return;
    }

    let dayIdx = new Date(targetDate + "T12:00:00").getDay();
    let indoDay = INDO_DAYS[dayIdx];
    const listText = `🔔 Daftar Kebutuhan Khusus tgl ${targetDate} ${indoDay} (特殊需求清單):\n` + requests.join('\n');
    
    if (confirm(`預覽即將發送的清單：\n\n${listText}\n\n確定要發送嗎？`)) {
        await sendWebhook('special_requests', 'ALL', { req_msg: listText });
        alert(getText('已發送通知！'));
    }
}

function saveAndNotifyRoom() {
    saveNote(false);
    notifySingleRoomChange();
}

let _ccResolve = null;
function showCustomConfirm(title, body) {
    return new Promise(resolve => {
        _ccResolve = resolve;
        document.getElementById('cc-title').innerText = title;
        document.getElementById('cc-body').innerText = body;
        const overlay = document.getElementById('custom-confirm-overlay');
        overlay.style.display = 'flex';
        const okBtn = document.getElementById('cc-ok-btn');
        okBtn.innerText = '確定發送';
        okBtn.onclick = () => closeCustomConfirm(true);
        document.querySelector('.custom-confirm-cancel').style.display = '';
    });
}
function closeCustomConfirm(result) {
    document.getElementById('custom-confirm-overlay').style.display = 'none';
    if (_ccResolve) { _ccResolve(result); _ccResolve = null; }
}
function showCustomAlert(msg) {
    return new Promise(resolve => {
        _ccResolve = resolve;
        document.getElementById('cc-title').innerText = '✅ 完成';
        document.getElementById('cc-body').innerText = msg;
        const overlay = document.getElementById('custom-confirm-overlay');
        overlay.style.display = 'flex';
        const okBtn = document.getElementById('cc-ok-btn');
        okBtn.innerText = '完成';
        okBtn.onclick = () => closeCustomConfirm(true);
        document.querySelector('.custom-confirm-cancel').style.display = 'none';
    });
}

async function notifySingleRoomChange() {
    const rid = mRoomId;
    if (!rid) return;
    const target = isTraining ? trainingCache : cache;
    const dayData = target[currDate];
    if (!dayData || !dayData[rid]) return;
    const n = dayData[rid].n || {};
    const r = ROOMS.find(x => x.id === rid);

    let reqs = [];
    if (r && r.d && n.p > 0) reqs.push(`Kasur +${n.p}`);
    if (n.bed > 0) reqs.push(`Extra Bed +${n.bed}`);
    if (n.q > 0) reqs.push(`Selimut +${n.q}`);
    if (n.bath) reqs.push(`Bak Bayi`);
    if (n.late) reqs.push(`Tamu Datang Terlambat (晚到)`);
    if (n.flash) reqs.push(`Tamu Dadakan (現場客)`);
    if (dayData[rid].s === 'purple') reqs.push(`Jangan Ganggu (勿擾房)`);
    if (n.msg && n.msg.trim() !== '') reqs.push(`Note: ${n.msg}`);

    let msgText;
    if (reqs.length > 0) {
        msgText = `⚠️ [Perubahan Mendadak] Kamar ${rid} Kebutuhan Terbaru：${reqs.join(', ')}`;
    } else {
        msgText = `⚠️ [Perubahan Mendadak] Kamar ${rid}：Tidak ada kebutuhan khusus`;
    }

    const ok = await showCustomConfirm('📢 預覽即將發送的通知', msgText + '\n\n確定要發送嗎？');
    if (ok) {
        await sendWebhook('single_room_update', 'ALL', { update_msg: msgText });
        await showCustomAlert('已成功發送異動通知！');
        closeModal();
    }
}

