let barangList = [];
let barangIdTerpilih = null;

document.getElementById('barang-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value;
  const stok = parseInt(document.getElementById('stok').value);
  const harga = parseInt(document.getElementById('harga').value);

  if (barangIdTerpilih === null) {
    barangList.push({
      id: Date.now(),
      nama,
      stok,
      harga
    });
  } else {
    const index = barangList.findIndex(b => b.id === barangIdTerpilih);
    barangList[index] = { id: barangIdTerpilih, nama, stok, harga };
    barangIdTerpilih = null;
  }

  document.getElementById('barang-form').reset();
  tampilkanBarang();
});

function tampilkanBarang() {
  const tbody = document.getElementById('tabel-barang');
  tbody.innerHTML = '';

  barangList.forEach(barang => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${barang.nama}</td>
      <td>${barang.stok}</td>
      <td>Rp ${barang.harga.toLocaleString()}</td>
      <td>
        <button onclick="editBarang(${barang.id})">Edit</button>
        <button onclick="hapusBarang(${barang.id})">Hapus</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editBarang(id) {
  const barang = barangList.find(b => b.id === id);
  document.getElementById('nama').value = barang.nama;
  document.getElementById('stok').value = barang.stok;
  document.getElementById('harga').value = barang.harga;
  barangIdTerpilih = id;
}

function hapusBarang(id) {
  barangList = barangList.filter(b => b.id !== id);
  tampilkanBarang();
}

tampilkanBarang();