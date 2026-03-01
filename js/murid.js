// MURID.JS - Halaman dashboard murid

let currentMuridId = null;
let currentKelas = null;

document.addEventListener('DOMContentLoaded', function() {
  // Cek apakah user sudah login
  const kodeKelas = sessionStorage.getItem('kode_kelas');
  const kelasId = sessionStorage.getItem('kelas_id');
  const kelasNama = sessionStorage.getItem('kelas_nama');
  
  if (!kodeKelas || !kelasId) {
    window.location.href = 'index.html';
    return;
  }
  
  // Tampilkan info kelas
  document.getElementById('kelas-murid').innerText = `Kelas: ${kelasNama || kelasId}`;
  
  // Cek apakah user sudah punya nama di session
  cekNamaMurid();
  
  // Event listener untuk kirim tugas
  const btnKirim = document.getElementById('btn-kirim-tugas');
  if (btnKirim) {
    btnKirim.addEventListener('click', kirimTugas);
  }
  
  // Logout
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', function() {
      sessionStorage.clear();
      window.location.href = 'index.html';
    });
  }
  
  // Listen riwayat pengumpulan real-time
  listenRiwayat();
});

function cekNamaMurid() {
    const namaTersimpan = sessionStorage.getItem('nama_murid');
    const muridId = sessionStorage.getItem('murid_id');
    
    if (namaTersimpan && muridId) {
        // Sudah pernah input nama
        document.getElementById('nama-murid').innerText = namaTersimpan;
        currentMuridId = muridId;
        currentKelas = sessionStorage.getItem('kelas_id');
        return;
    }
    
    // Belum input nama, minta input dengan CAPS LOCK
    let nama = '';
    let namaValid = false;
    
    while (!namaValid) {
        nama = prompt('Masukkan NAMA LENGKAP sesuai Kartu Pelajaran/Ujian (HURUF BESAR SEMUA):');
        
        if (nama === null) {
            // User cancel
            window.location.href = 'index.html';
            return;
        }
        
        nama = nama.trim();
        
        if (nama === '') {
            alert('Nama tidak boleh kosong!');
            continue;
        }
        
        // Cek apakah HURUF BESAR SEMUA (CAPS LOCK)
        if (nama !== nama.toUpperCase()) {
            alert('⚠️ NAMA HARUS HURUF BESAR SEMUA (CAPS LOCK ON)! Contoh: MOCHAMAD ANUGRAH SAPUTRA');
            continue;
        }
        
        // Cek minimal 3 karakter
        if (nama.length < 3) {
            alert('Nama terlalu pendek! Minimal 3 karakter.');
            continue;
        }
        
        namaValid = true;
    }
    
    simpanNamaMurid(nama);
}

async function simpanNamaMurid(nama) {
    try {
        const kelasId = sessionStorage.getItem('kelas_id');
        
        // Cek apakah murid sudah ada di database (dengan nama SAMA PERSIS)
        const muridRef = db.collection('murid');
        const snapshot = await muridRef
            .where('nama', '==', nama)  // case sensitive, caps lock
            .where('kelas', '==', kelasId)
            .get();
        
        let muridId;
        
        if (snapshot.empty) {
            // Murid baru, simpan
            const docRef = await muridRef.add({
                nama: nama,  // simpan dalam caps lock
                kelas: kelasId,
                created_at: new Date().toLocaleString('id-ID')
            });
            muridId = docRef.id;
            
            alert(`✅ Selamat datang, ${nama}!`);
        } else {
            // Murid sudah ada
            muridId = snapshot.docs[0].id;
            alert(`👋 Selamat datang kembali, ${nama}!`);
        }
        
        // Simpan ke session
        sessionStorage.setItem('nama_murid', nama);
        sessionStorage.setItem('murid_id', muridId);
        
        document.getElementById('nama-murid').innerText = nama;
        currentMuridId = muridId;
        currentKelas = kelasId;
        
    } catch (error) {
        console.error(error);
        alert('Gagal menyimpan data. Coba lagi.');
    }
}

async function kirimTugas() {
  const link = document.getElementById('link-tugas').value.trim();
  const notif = document.getElementById('notif-kirim');
  
  if (!link) {
    notif.innerText = 'Masukkan link tugas!';
    notif.className = 'notif-error';
    return;
  }
  
  if (!link.includes('docs.google.com/spreadsheets')) {
    notif.innerText = 'Link harus dari Google Sheets!';
    notif.className = 'notif-error';
    return;
  }
  
  try {
    const nama = sessionStorage.getItem('nama_murid');
    const kelas = sessionStorage.getItem('kelas_id');
    
    // Simpan ke collection pengumpulan
    await db.collection('pengumpulan').add({
      murid_id: currentMuridId,
      nama: nama,
      kelas: kelas,
      link: link,
      waktu: new Date().toLocaleString('id-ID'),
      created_at: new Date().toISOString()
    });
    
    // Catat log aktivitas
    await db.collection('log_aktivitas').add({
      aksi: 'kumpul',
      detail: `${nama} (${kelas}) mengumpulkan tugas`,
      waktu: new Date().toLocaleString('id-ID')
    });
    
    // Bersihkan input
    document.getElementById('link-tugas').value = '';
    
    // Tampilkan notif sukses
    notif.innerText = '✓ Tugas berhasil dikumpulkan!';
    notif.className = 'notif-success';
    
    setTimeout(() => {
      notif.innerText = '';
    }, 3000);
    
  } catch (error) {
    console.error(error);
    notif.innerText = 'Gagal mengirim. Coba lagi.';
    notif.className = 'notif-error';
  }
}

// LISTEN RIWAYAT PENGUMPULAN - HANYA UNTUK USER INI
function listenRiwayat() {
  const container = document.getElementById('riwayat-list');
  if (!container || !currentMuridId) return;

  db.collection('pengumpulan')
    .where('murid_id', '==', currentMuridId) // PENTING! filter ini
    .orderBy('created_at', 'desc')
    .onSnapshot((snapshot) => {
      if (snapshot.empty) {
        container.innerHTML = '<p class="text-muted">Belum ada riwayat pengumpulan</p>';
        return;
      }
      
      let html = '';
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        html += `<div class="riwayat-item">
                    <div class="riwayat-time">${data.waktu}</div>
                    <div class="riwayat-link">
                        <a href="${data.link}" target="_blank">${data.link.substring(0, 30)}...</a>
                    </div>
                </div>`;
      });
      container.innerHTML = html;
    });
}