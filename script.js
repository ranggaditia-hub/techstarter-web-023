console.log("JavaScript Pertemuan 6 aktif");

const eventName = "TechStarter Day";
const maxSeats = 40;
let registered = 39;

console.log(eventName);
console.log(maxSeats);
console.log(registered);

const remaining = maxSeats - registered;
console.log(`Sisa kursi: ${remaining}`);

const requested = -2; 
 
if (requested <= remaining) { 
  console.log("Permintaan dapat dilayani"); 
} else { 
  console.log("Kursi tidak cukup"); 
}

function checkSeat(requested) {
  const remaining = maxSeats - registered;

  if (!Number.isInteger(requested) || requested <= 0) {
    return "Masukkan jumlah kursi berupa bilangan bulat lebih dari 0.";
  }

  if (requested <= remaining) {
    return `Tersedia. Saat ini ${remaining} kursi.`;
  }

  return `Tidak cukup. Hanya tersisa ${remaining} kursi.`;
}

const checkSeatBtn = document.querySelector("#checkSeatBtn");

checkSeatBtn.addEventListener("click", function () {
  const requested = Number(prompt("Berapa kursi yang ingin di cek?"));
  const result= checkSeat(requested);
  console.log(result);
  alert(result);
});

function registerSeats(requested) {
  const remaining = maxSeats - registered;

  if (!Number.isInteger(requested) || requested <= 0) {
    return "Input tidak valid.";
  }
  if (requested > remaining) {
    return `Gagal. Hanya tersisa ${remaining} kursi.`;
  }
  
  registered = registered + requested;
  return `Berhasil. Total terdaftar sekarang ${registered}.`;
}