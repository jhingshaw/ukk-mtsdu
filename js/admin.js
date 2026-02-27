// ADMIN.JS - Dashboard utama admin
// VERSI FINAL - FIX ERROR snapshot is not defined

document.addEventListener('DOMContentLoaded', function() {
    // Cek login
    if (!sessionStorage.getItem('is_admin')) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Update waktu
    updateWaktu();
    setInterval(updateWaktu, 1000);
    
    // Logout
    const btnLogout = document.getElementById('btn-logout-admin');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            sessionStorage.removeItem('is_admin');
            sessionStorage.removeItem('admin_login');
            window.location.href = 'admin-login.html';
        });
    }
    
    // Real-time listeners
    listenTotalMurid();
    listenTotalTugas();
    listenSudahDinilai();
    listenKelasStatus();
    listenAktivitas();
});

function updateWaktu() {
    const el = document.getElementById('waktu-real');
    if (el) {
        const now = new Date();
        el.innerText = now.toLocaleString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}

// Listen total murid real-time
function listenTotalMurid() {
    const el = document.getElementById('total-murid');
    if (!el) return;
    
    db.collection('murid').onSnapshot((snapshot) => {
        el.innerText = snapshot.size;
    });
}

// Listen total tugas real-time
function listenTotalTugas() {
    const el = document.getElementById('total-tugas');
    if (!el) return;
    
    db.collection('pengumpulan').onSnapshot((snapshot) => {
        el.innerText = snapshot.size;
    });
}

// Listen sudah dinilai real-time
function listenSudahDinilai() {
    const el = document.getElementById('sudah-dinilai');
    if (!el) return;
    
    db.collection('nilai').where('status', '==', 'sudah').onSnapshot((snapshot) => {
        el.innerText = snapshot.size;
    });
}

// Listen status per kelas real-time
function listenKelasStatus() {
    const kelasList = ['7A', '7B', '7C', '7D', '8A', '8B', '8C', '8D', '8E'];
    const tbody = document.getElementById('kelas-status-body');
    if (!tbody) return;
    
    // Buat object untuk nyimpen data setiap kelas
    let kelasData = {};
    kelasList.forEach(k => {
        kelasData[k] = { total: 0, kumpul: 0, nilai: 0 };
    });
    
    // FUNGSI RENDER
    function renderKelasTable() {
        let html = '';
        kelasList.forEach((kelas, idx) => {
            const data = kelasData[kelas] || { total: 0, kumpul: 0, nilai: 0 };
            const progress = data.total > 0 ? (data.nilai / data.total) * 100 : 0;
            
            html += `<tr>
                <td>${idx + 1}</td>
                <td><strong>${kelas}</strong></td>
                <td>${data.total}</td>
                <td>${data.kumpul}</td>
                <td>${data.nilai}</td>
                <td>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <small>${Math.round(progress)}%</small>
                </td>
            </tr>`;
        });
        tbody.innerHTML = html;
    }
    
    // 1. LISTEN TOTAL MURID PER KELAS
    kelasList.forEach((kelas) => {
        db.collection('murid').where('kelas', '==', kelas).onSnapshot((snapshot) => {
            kelasData[kelas].total = snapshot.size;
            renderKelasTable();
        });
    });
    
    // 2. LISTEN JUMLAH KUMPUL (PENGUMPULAN) PER KELAS
    kelasList.forEach((kelas) => {
        db.collection('pengumpulan').where('kelas', '==', kelas).onSnapshot((snapshot) => {
            // Ambil unique murid_id (satu murid bisa kumpul berkali-kali)
            const uniqueMurid = new Set();
            snapshot.docs.forEach(doc => {
                if (doc.data().murid_id) {
                    uniqueMurid.add(doc.data().murid_id);
                }
            });
            kelasData[kelas].kumpul = uniqueMurid.size;
            renderKelasTable();
        });
    });
    
    // 3. LISTEN JUMLAH SUDAH DINILAI PER KELAS
    kelasList.forEach((kelas) => {
        db.collection('nilai').where('kelas', '==', kelas).where('status', '==', 'sudah').onSnapshot((snapshot) => {
            kelasData[kelas].nilai = snapshot.size;
            renderKelasTable();
        });
    });
}

// Listen aktivitas terbaru real-time
function listenAktivitas() {
    const container = document.getElementById('aktivitas-list');
    if (!container) return;
    
    db.collection('log_aktivitas')
        .orderBy('waktu', 'desc')
        .limit(5)
        .onSnapshot((snapshot) => {
            if (snapshot.empty) {
                container.innerHTML = '<p class="text-muted">Belum ada aktivitas</p>';
                return;
            }
            
            let html = '';
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                const icon = data.aksi === 'kumpul' ? '🟢' : '✅';
                html += `<div class="aktivitas-item">
                    ${icon} ${data.detail} · ${data.waktu}
                </div>`;
            });
            container.innerHTML = html;
        });
}