const hamburgerButton = document.getElementById("hamburguer-button");
const menu = document.getElementById("menu");
const closeButton = document.getElementById("close-button");
const mainContent = document.getElementById("main-content");
mainContent.classList.add("flex.flex-center");
const cardContainer = document.querySelector(".card-container");
const modal = document.getElementById("profile-modal");
const closeModalButton = document.getElementById("close-modal");
const modalDetails = document.getElementById("modal-details");
const overlay = document.getElementById("overlay");

function toggleMenu(isOpen) {
  menu.style.left = isOpen ? "0px" : "-100%";
  overlay.classList.toggle("active", isOpen);
  mainContent.classList.toggle("shift", isOpen);
  cardContainer.classList.toggle("shift", isOpen);
}

hamburgerButton.addEventListener("click", function () {
  toggleMenu(menu.style.left !== "0px");
});

[overlay, closeButton].forEach((element) => {
  element.addEventListener("click", function () {
    toggleMenu(false);
  });
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
});

closeButton.addEventListener("click", function () {
  menu.style.left = "-100%";
  overlay.classList.remove("active");
  mainContent.classList.remove("shift");
  cardContainer.classList.remove("shift");
});

const menuLinks = document.querySelectorAll(".menu li a");

menuLinks.forEach((link) => {
  link.addEventListener("click", function () {
    menuLinks.forEach((link) => link.classList.remove("active"));

    this.classList.add("active");

    toggleMenu(false);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const userIcon = document.getElementById("user-menu-arrow");
  const userMenu = document.getElementById("dropdown-menu");

  userIcon.addEventListener("click", function () {
    const isMenuVisible = userMenu.style.display === "block";
    userMenu.style.display = isMenuVisible ? "none" : "block"; 
  });

  window.addEventListener("click", function (event) {
    if (!userIcon.contains(event.target) && !userMenu.contains(event.target)) {
      userMenu.style.display = "none"; 
    }
  });

  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", function () {
    window.location.href = "../index.html"
  });
});

modal.classList.add("modal-flex");

const savedPeopleData = JSON.parse(localStorage.getItem("peopleData")) || [];

const peopleData =
  savedPeopleData.length > 0
    ? savedPeopleData
    : [
        {
          photo: "../imagens/foto2.jpg",
          name: "Soraka",
          age: 30,
          tel: "123456",
          cpf: "123.456.789-00",
          email: "joao@exemplo.com",
          phone: "(11) 98765-4321",
          address: "Rua Exemplo, 123, São Paulo, SP",
          birthDate: "1994-05-14",
          gender: "Feminino",
          status: "Ativo",
        },
        {
          photo: "../imagens/icone1.jpg",
          name: "Seraphine",
          age: 25,
          tel: "12345600",
          cpf: "987.654.321-00",
          email: "maria@exemplo.com",
          phone: "(21) 91234-5678",
          address: "Avenida Teste, 456, Rio de Janeiro, RJ",
          birthDate: "1999-11-30",
          gender: "Feminino",
          status: "Inativo",
        },
        {
          photo: "../imagens/foto3.jpg",
          name: "Janna",
          age: 28,
          tel: "654321",
          cpf: "111.222.333-44",
          email: "janna@exemplo.com",
          phone: "(21) 98765-4321",
          address: "Rua Teste, 789, Rio de Janeiro, RJ",
          birthDate: "1996-02-20",
          gender: "Feminino",
          status: "Ativo",
        },
      ];

function createPersonCard(person) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <div class="card-content flex ${"flex-container"}" data-name="${
    person.name
  }">
            <div class="card-photo-container ${"flex-column"}">
                <img class="card-photo" src="${person.photo}" alt="Foto de ${
    person.name
  }" id="photo-${person.photo}">
                <div class="button-cards ${"flex-container"}">
                    <img class="card-photo" src="../imagens/icone_linkedin.png">
                    <img class="card-photo" src="../imagens/icone_insta.png">
                    <img class="card-photo" src="../imagens/icone_face.png">
                </div>
            </div>
            <div class="vertical-divider"></div>
            <div class="card-info-container">
                <p id="name-${person.name}"><strong>Nome:</strong> ${
    person.name
  }</p>

<p id="age-${person.age}"><strong>Idade:</strong> ${calculateAge(person.birthDate)}</p>


                <p data-cpf="${person.cpf}"><strong>CPF:</strong> ${
    person.cpf
  }</p>
                <p id="email-${formatEmail(
                  person.email
                )}"><strong>Email:</strong> ${person.email}</p>
                <p data-tel="${person.tel}"><strong>Telefone:</strong> ${
    person.tel
  }</p>
                <p id="address-${person.address.replace(
                  /[\s,]/g,
                  "-"
                )}" ><strong>Endereço completo:</strong> ${person.address}</p>
                <p id="birthDate-${
                  person.birthDate
                }"><strong>Data de nascimento:</strong> ${formatBirthDate(
    person.birthDate
  )}</p>
                <p id="status-${person.status}"><strong>Status:</strong> ${
    person.status
  }</p>
            </div>
        </div>
        <hr class="divider">
        <div class="view-profile">
            <button class="view-button" onclick="viewProfile('${
              person.name
            }')">Ver Cadastro Completo</button>
        </div>
    `;
  return card;
}

function viewProfile(name) {
  const person = peopleData.find((p) => p.name === name);

  if (person) {
    modal.style.display = "flex";
    document.body.classList.add("no-scroll");
    modalDetails.innerHTML = `
        <div class="modal-photo flex-center">
        <p>Nessa tela é possível alterar todas as informações do usuário escolhido!<p>
            <p><img src="${person.photo}" alt="${
      person.name
    }" class="rounded-img" id="modal-photo"></p>
            <div class="button-cards flex-container">
                <input type="file" class="photo-upload" accept="image/*" id="file-upload">
                <label for="file-upload" class="photo-upload-btn" id="upload-label">Escolher Imagem</label>
                <label for="photo-upload" class="remove-photo-btn">Remover Imagem</label>
                <input type="file" id="photo-upload" class="photo-upload">
            </div>
        </div>
        <div class="information-modal">
            <div class="modal-row flex-container">
                <div class="modal-column">
                    <label for="name">Nome:</label>
                    <input type="text" id="name" value="${person.name}">
                    <label for="age">Idade:</label>
                    <input type="number" id="age" value="${calculateAge(person.birthDate)}">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" value="${
                      person.cpf
                    }" oninput="this.value = formatCPF(this.value)">
                    <label for="birthDate">Data de Nascimento:</label>
                    <input type="date" id="birthDate" max="{{currentYear}}-12-31" value="${formatDateForInput(
                      person.birthDate
                    )}">
                </div>
                <div class="modal-column">
                    <label for="email">Email:</label>
                    <input type="email" id="email" value="${person.email}">
                    <label for="tel">Telefone:</label>
                    <input type="text" id="tel" value="${
                      person.tel
                    }" oninput="mask(this, mphone)">
                    <label for="address">Endereço:</label>
                    <input type="text" id="address" value="${person.address}">
                   <label for="status">Status:</label>
                  <select id="status">
                    <option>Escolha uma opção</option>
                    <option value="Ativo" ${person.status === "Ativo" || !person.status ? "selected" : ""}>Ativo</option>
                    <option value="Inativo" ${person.status === "Inativo" ? "selected" : ""}>Inativo</option>
                  </select>
                </div>
            </div>
            <div class="button-modal flex-container">
                <button class="save-photo-btn">Salvar</button>
                <button class="save-photo-btn" id="cancel-button">Cancelar</button>
            </div>
        </div>`;

    const cancelButton = document.getElementById("cancel-button");
    cancelButton.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.classList.remove("no-scroll");
    });

    setupModalEventListeners(person);

    const birthDateInput = document.getElementById("birthDate");
    const currentYear = new Date().getFullYear();

    birthDateInput.max = `${currentYear}-12-31`;
    birthDateInput.addEventListener("input", function () {
      const inputDate = new Date(birthDateInput.value);
      const currentDate = new Date();

      if (inputDate > currentDate) {
        alert("A data de nascimento não pode ser maior que a data atual!");
        birthDateInput.value = "";
      }
    });
  }
}

function setupModalEventListeners(person) {
  const photoUpload = modal.querySelector(".photo-upload");
  const photoElement = modal.querySelector("#modal-photo");
  const savePhotoBtn = modal.querySelector(".save-photo-btn");
  let tempPhotoUrl = photoElement.src;
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const cpfInput = document.getElementById("cpf");
  const emailInput = document.getElementById("email");
  const telInput = document.getElementById("tel");
  const addressInput = document.getElementById("address");
  const birthInput = document.getElementById("birthDate");
  const statusInput = document.getElementById("status");

  photoUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        tempPhotoUrl = e.target.result;
        photoElement.src = tempPhotoUrl;
      };
      reader.readAsDataURL(file);
    }
  });

  savePhotoBtn.addEventListener("click", function () {
    const newPhotoUrl = tempPhotoUrl;
    person.photo = newPhotoUrl;
    const newName = nameInput.value;
    const newAge = ageInput.value;
    const newCPF = cpfInput.value;
    const newEmail = emailInput.value;
    const newTel = telInput.value;
    const newAddress = addressInput.value;
    const newBirth = birthInput.value;
    const newStatus = statusInput.value;

    const personIndex = peopleData.indexOf(person);
    localStorage.setItem(`photo-${personIndex}`, newPhotoUrl);
    localStorage.setItem(`name-${personIndex}`, newName);
    localStorage.setItem(`age-${personIndex}`, newAge);
    localStorage.setItem(`cpf-${personIndex}`, newCPF);
    localStorage.setItem(`email-${personIndex}`, newEmail);
    localStorage.setItem(`tel-${personIndex}`, newTel);
    localStorage.setItem(`address-${personIndex}`, newAddress);
    localStorage.setItem(`birthDate-${personIndex}`, newBirth);
    localStorage.setItem(`status-${personIndex}`, newStatus);

    const card = Array.from(cardContainer.children).find(
      (card) => card.querySelector(".card-content").dataset.name === person.name
    );

    if (card) {
      const cardPhoto = card.querySelector(".card-photo");
      if (cardPhoto) {
        cardPhoto.src = newPhotoUrl;
      }
      const nameElement = card.querySelector(`#name-${person.name}`);
      if (nameElement) {
        nameElement.innerHTML = `<strong>Nome:</strong> ${newName}`;
      }
      const ageElement = card.querySelector(`#age-${person.age}`);
      if (ageElement) {
        ageElement.innerHTML = `<strong>Idade:</strong> ${newAge}`;
      }
      const cpfElement = document.querySelector(
        '[data-cpf="' + person.cpf + '"]'
      );
      if (cpfElement) {
        cpfElement.innerHTML = `<strong>CPF:</strong> ${newCPF}`;
      }
      const emailElement = card.querySelector(
        `#email-${formatEmail(person.email)}`
      );
      if (emailElement) {
        emailElement.innerHTML = `<strong>Email:</strong> ${newEmail}`;
      }
      const telElement = card.querySelector(`[data-tel="${person.tel}"]`);
      if (telElement) {
        telElement.innerHTML = `<strong>Telefone:</strong> ${newTel}`;
      }
      const addressElement = document.querySelector(
        `#address-${person.address.replace(/[\s,]/g, "-")}`
      );
      if (addressElement) {
        addressElement.innerHTML = `<strong>Endereço:</strong> ${newAddress}`;
      }
      const birthElement = card.querySelector(`#birthDate-${person.birthDate}`);
      if (birthElement) {
        birthElement.innerHTML = `<strong>Data de nascimento:</strong> ${formatBirthDate(
          newBirth
        )}`;
      }
      const statusElement = card.querySelector(`#status-${person.status}`);
    if (statusElement) {
      statusElement.innerHTML = `<strong>Status:</strong> ${newStatus}`; 
    }
    }

    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
  });

  const removePhotoBtn = modal.querySelector(".remove-photo-btn");
  const defaultPhotoUrl = "../imagens/icon.png";

  removePhotoBtn.addEventListener("click", function () {
    const confirmRemove = window.confirm(
      "Você tem certeza que deseja remover a foto?"
    );
    if (confirmRemove) {
      photoElement.src = defaultPhotoUrl;
      tempPhotoUrl = defaultPhotoUrl;
    }
  });
}

peopleData.forEach((person, index) => {
  console.log(person);
  const savedPhoto = localStorage.getItem(`photo-${index}`);
  const savedName = localStorage.getItem(`name-${index}`);
  const savedAge = localStorage.getItem(`age-${index}`);
  const savedCPF = localStorage.getItem(`cpf-${index}`);
  const savedEmail = localStorage.getItem(`email-${index}`);
  const savedTel = localStorage.getItem(`tel-${index}`);
  const saveAddress = localStorage.getItem(`address-${index}`);
  const saveBirth = localStorage.getItem(`birthDate-${index}`);
  const saveStatus = localStorage.getItem(`status-${index}`);

  if (savedPhoto) {
    person.photo = savedPhoto;
  }
  if (savedName) {
    person.name = savedName;
  }
  if (savedAge) {
    person.age = savedAge;
  }
  if (savedCPF) {
    person.cpf = savedCPF;
  }
  if (savedEmail) {
    person.email = savedEmail;
  }
  if (savedTel) {
    person.tel = savedTel;
  }
  if (saveAddress) {
    person.address = saveAddress;
  }
  if (saveBirth) {
    person.birthDate = saveBirth;
  }
  if (saveStatus) {
    person.status = saveStatus;
  }
  cardContainer.appendChild(createPersonCard(person));
});

closeModalButton.addEventListener("click", function () {
  modal.style.display = "none";
  document.body.classList.remove("no-scroll");
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
});

document
  .getElementById("new-user-button")
  .addEventListener("click", function () {
    openModalForNewUser();
  });

function openModalForNewUser() {
  modal.style.display = "flex";
  document.body.classList.add("no-scroll");

  modalDetails.innerHTML = `
        <div class="modal-photo flex-center">
            <div> 
              <p>Preencha os dados para cadastrar um novo usuário!<p>
            <p>Os campos com * são obrigatórios!<p>
            </div>
            <p><img src="../imagens/icon.png" alt="Novo Usuário" class="rounded-img" id="modal-photo"></p>
            <div class="button-cards flex-container">
                <input type="file" class="file-upload-cadastro" accept="image/*" id="file-upload-cadastro">
                <label for="file-upload-cadastro" class="photo-upload-btn">Escolher Imagem</label>
                <label for="photo-upload" class="remove-photo-btn">Remover Imagem</label>
                <input type="file" id="photo-upload" class="photo-upload">
            </div>
        </div>
        <div class="information-modal">
            <div class="modal-row flex-container">
                <div class="modal-column">
                    <label for="name">Nome*:</label>
                    <input type="text" id="name" placeholder="Digite o nome">

                    <label for="address">Endereço*:</label>
                    <input type="text" id="address" placeholder="Digite o endereço">

                    <label for="email">Email*:</label>
                    <input type="email" id="email" placeholder="Digite o email">
                </div>
                <div class="modal-column">

                <label for="tel">Telefone*:</label>
                <input type="text" id="tel" placeholder="Digite o telefone" oninput="mask(this, mphone)">

                <label for="birthDate">Data de Nascimento*:</label>
                <input type="date" id="birthDate"  max="{{currentYear}}-12-31">
                <label for="gender">Gênero*:</label>
                    <select id="gender">
                        <option value="Masculino">Escolha uma opção</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                </select>
                </div>
            </div>
            <div class="button-modal flex-container">
                <button class="save-photo-btn" id="save-new-user">Salvar</button>
                <button class="save-photo-btn" id="cancel-button">Cancelar</button>
            </div>
        </div>`;

  document
    .getElementById("cancel-button")
    .addEventListener("click", function () {
      modal.style.display = "none";
      document.body.classList.remove("no-scroll");
    });

  document
    .getElementById("save-new-user")
    .addEventListener("click", function () {
      saveNewUser();
    });
  const fileUploadCadastro = document.getElementById("file-upload-cadastro");
  const modalPhotoCadastro = document.getElementById("modal-photo");

  if (fileUploadCadastro) {
    fileUploadCadastro.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          modalPhotoCadastro.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function saveNewUser() {
  const newUser = {
    photo: document.getElementById("modal-photo").src || "../imagens/icon.png",
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
    email: document.getElementById("email").value,
    tel: document.getElementById("tel").value,
    birthDate: document.getElementById("birthDate").value,
    gender: document.getElementById("gender").value,
  };

  peopleData.push(newUser);
  localStorage.setItem("peopleData", JSON.stringify(peopleData));

  cardContainer.appendChild(createPersonCard(newUser));

  modal.style.display = "none";
  document.body.classList.remove("no-scroll");
}
