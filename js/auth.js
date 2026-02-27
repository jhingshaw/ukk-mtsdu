// AUTH.JS - Fungsi Login

// Login Murid
document.addEventListener('DOMContentLoaded', function() {
  const btnLogin = document.getElementById('btn-login-murid');
  if (btnLogin) {
    btnLogin.addEventListener('click', loginMurid);
  }
  
  const btnLoginAdmin = document.getElementById('btn-login-admin');
  if (btnLoginAdmin) {
    btnLoginAdmin.addEventListener('click', loginAdmin);
  }
});

async function loginMurid() {
  const kodeKelas = document.getElementById('kode-kelas').value.trim();
  const errorEl = document.getElementById('error-message');
  
  if (!kodeKelas) {
    errorEl.innerText = 'Masukkan kode kelas!';
    return;
  }
  
  try {
    // Cek ke database
    const kelasRef = db.collection('kelas');
    const snapshot = await kelasRef.where('kode_akses', '==', kodeKelas).get();
    
    if (snapshot.empty) {
      errorEl.innerText = 'Kode kelas salah!';
      return;
    }
    
    // Kode benar
    const kelasData = snapshot.docs[0].data();
    const kelasId = snapshot.docs[0].id;
    
    // Simpan ke sessionStorage
    sessionStorage.setItem('kode_kelas', kodeKelas);
    sessionStorage.setItem('kelas_id', kelasId);
    sessionStorage.setItem('kelas_nama', kelasData.nama_kelas);
    
    // Pindah ke halaman input nama (bisa langsung ke dashboard atau halaman antara)
    window.location.href = 'dashboard-murid.html';
    
  } catch (error) {
    console.error(error);
    errorEl.innerText = 'Terjadi kesalahan. Coba lagi.';
  }
}

async function loginAdmin() {
  const kodeAdmin = document.getElementById('kode-admin').value.trim();
  const errorEl = document.getElementById('error-admin');
  
  if (!kodeAdmin) {
    errorEl.innerText = 'Masukkan kode admin!';
    return;
  }
  
  try {
    // Cek ke database admin
    const adminRef = db.collection('admin').doc('admin_utama');
    const adminDoc = await adminRef.get();
    
    if (!adminDoc.exists) {
      errorEl.innerText = 'Kode admin salah!';
      return;
    }
    
    const adminData = adminDoc.data();
    
    if (adminData.kode_admin !== kodeAdmin) {
      errorEl.innerText = 'Kode admin salah!';
      return;
    }
    
    // Login berhasil
    sessionStorage.setItem('is_admin', 'true');
    sessionStorage.setItem('admin_login', new Date().toISOString());
    
    window.location.href = 'admin-dashboard.html';
    
  } catch (error) {
    console.error(error);
    errorEl.innerText = 'Terjadi kesalahan. Coba lagi.';
  }};