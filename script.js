console.log("JavaScript Pertemuan 6 aktif");

const eventName = "TechStarter Day";
const maxSeats = 40;


console.log(eventName);
console.log(maxSeats);

const seatRequestInput = document.querySelector("#seatRequest");
const seatMessage = document.querySelector("#seatMessage");


console.log(seatRequestInput);
console.log(seatMessage);


function setStatus(message, type) { 
  seatMessage.textContent = message; 
  seatMessage.classList.remove("neutral", "success", "error"); 
  seatMessage.classList.add(type);
}

//P08
const STORAGE_KEY = "techstarter.registrations.v1"; 
 
function saveRegistrations() { 
  const json = JSON.stringify(registrations); 
  localStorage.setItem(STORAGE_KEY, json); 
}
function loadRegistrations() { 
  const raw = localStorage.getItem(STORAGE_KEY); 
 
  if (raw === null) { 
    return []; 
  } 
 
  try { 
    const parsed = JSON.parse(raw); 
    return Array.isArray(parsed) ? parsed : []; 
  } catch (error) { 
    console.error("Data localStorage tidak valid:", error); 
    return []; 
  } 
} 
 
let registrations = loadRegistrations(); 

 
console.table(registrations); 
const registrationList = document.querySelector("#registrationList");
const registrationSummary = document.querySelector("#registrationSummary");


function getUsedSeats() {
  return registrations.reduce((total, item) => total + item.seats, 0);
}

function renderRegistrations() {
  registrationList.replaceChildren();

  for (const item of registrations) {
    const li = document.createElement("li");
    li.textContent = `${item.name} : ${item.seats} kursi`;

      const deleteButton = document.createElement("button");
      deleteButton.type = "button"; 
      deleteButton.textContent = "Hapus"; 
      deleteButton.addEventListener("click", function () { 
    deleteRegistration(item.id);
  });
      const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", function () {
      startEdit(item);
    });

    li.append(" ", editButton);

    li.append(" ", deleteButton); 
    registrationList.append(li);
  }

  const used = getUsedSeats();
  const remaining = maxSeats - used;
  registrationSummary.textContent =
  `${registrations.length} registrasi • ${used}/${maxSeats} kursi terpakai • sisa ${remaining} kursi`;
}

renderRegistrations();

const registrationForm = document.querySelector("#registrationForm"); 
const participantNameInput = document.querySelector("#participantName");

let editingId = null; 
 
function startEdit(item) { 
  editingId = item.id; 
  participantNameInput.value = item.name; 
  seatRequestInput.value = item.seats; 
  participantNameInput.focus(); 
  setStatus("Mode edit aktif. Ubah data lalu tekan Simpan.", "neutral"); 
}


 
registrationForm.addEventListener("submit", function (event) { 
  event.preventDefault(); 
 
  const name = participantNameInput.value.trim(); 
  const seats = Number(seatRequestInput.value); 
  const used = getUsedSeats(); 
 
  if (name.length < 2) { 
    setStatus("Nama minimal 2 karakter.", "error"); 
    return; 
  } 
 
  if (!Number.isInteger(seats) || seats <= 0) { 
    setStatus("Jumlah kursi harus bilangan bulat positif.", "error"); 
    return; 
  } 
 
  if (used + seats > maxSeats) { 
    setStatus("Kursi tidak mencukupi.", "error"); 
    return; 
  }
  if (editingId === null) { 
  registrations.push({ id: Date.now(), name, seats }); 
} else { 
  const index = registrations.findIndex((item) => item.id === editingId); 
 
  if (index !== -1) { 
    registrations[index] = { ...registrations[index], name, seats }; 
  } 
 
  editingId = null; 
} 
 
  saveRegistrations(); 
  renderRegistrations(); 
  registrationForm.reset();

  setStatus("Registrasi ditambahkan.", "success"); 
});
function deleteRegistration(id) { 
  registrations = registrations.filter((item) => item.id !== id); 
  saveRegistrations(); 
  renderRegistrations(); 
  setStatus("Registrasi dihapus.", "success"); 
} 
const MENTOR_API_URL = "https://jsonplaceholder.typicode.com/users?_limit=0";
async function testMentorApi() {
  const response = await fetch(MENTOR_API_URL);
  console.log("status:", response.status);
  console.log("ok:", response.ok);

  const users = await response.json();
  console.table(users);
  return users;
}

const mentorStatus = document.querySelector("#mentorStatus"); 
const mentorList = document.querySelector("#mentorList"); 
const reloadMentorsButton = document.querySelector("#reloadMentors"); 
 
function renderMentors(users) { 
  mentorList.replaceChildren(); 
 
  users.forEach((user) => { 
    const card = document.createElement("article"); 
    card.className = "mentor-card"; 
 
    const name = document.createElement("h3"); 
    name.textContent = user.name; 
 
    const company = document.createElement("p"); 
    company.textContent = `Company: ${user.company.name}`; 
 
    const email = document.createElement("p"); 
    email.textContent = `Email: ${user.email}`;
    card.append(name, company, email); 
    mentorList.append(card); 
  }); 
}
async function loadMentors() { 
  mentorStatus.textContent = "Memuat data mentor..."; 
  mentorStatus.className = ""; 
  mentorList.replaceChildren(); 
 
  try { 
    const response = await fetch(MENTOR_API_URL); 
 
    if (!response.ok) { 
      throw new Error(`HTTP ${response.status}`); 
    } 
 
    const users = await response.json(); 
 
    if (!Array.isArray(users) || users.length === 0) { 
      mentorStatus.textContent = "Belum ada mentor untuk ditampilkan."; 
      return; 
    } 
 
    renderMentors(users); 
    mentorStatus.textContent = `${users.length} mentor berhasil dimuat.`; 
    mentorStatus.className = "status-success"; 
  } catch (error) { 
    console.error("Gagal memuat mentor:", error); 
    mentorStatus.textContent = 
      "Data mentor gagal dimuat. Periksa jaringan lalu coba lagi."; 
    mentorStatus.className = "status-error"; 
  } 
} 
 
reloadMentorsButton.addEventListener("click", loadMentors); 
loadMentors();