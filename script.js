document.addEventListener("DOMContentLoaded", () => {

  const toggleMenu = () => {
    const menu = document.getElementById("nav-menu");
    if (menu) {
      menu.classList.toggle("active");
    }
  };
  
  window.toggleMenu = toggleMenu;
 
  const form = document.getElementById("cadastroForm");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form) return;

    if (form.dataset.submitting === "true") return;
    form.dataset.submitting = "true";

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();

    if (!nome || !email) {
      alert("Por favor, preencha os campos obrigatórios: Nome e E-mail.");
      form.dataset.submitting = "false";
      return;
    }

     const formData = {
      nome,
      email,
      cpf: form.cpf?.value.trim() || "",
      telefone: form.telefone?.value.trim() || "",
      nascimento: form.nascimento?.value.trim() || "",
      endereco: form.endereço?.value.trim() || "",
      numero: form.número?.value.trim() || "",
      cep: form.CEP?.value.trim() || "",
      cidade: form.cidade?.value.trim() || "",
      estado: form.estado?.value.trim() || "",
    };

  
    let voluntarios = JSON.parse(localStorage.getItem("voluntarios")) || [];
    voluntarios.push(formData);
    localStorage.setItem("voluntarios", JSON.stringify(voluntarios));


    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.style.display = "block";
      successMessage.classList.add("show");
      successMessage.textContent = "Cadastro realizado com sucesso! Aguarde nosso contato.";

      setTimeout(() => {
        successMessage.classList.remove("show");
        successMessage.style.display = "none";
      }, 5000);
    }

    setTimeout(() => {
      form.reset();
      form.dataset.submitting = "false";
    }, 2000);

    exibirVoluntarios();
  };

  if (form) form.addEventListener("submit", handleSubmit);

  const exibirVoluntarios = () => {
    const voluntarios = JSON.parse(localStorage.getItem("voluntarios")) || [];
    const tabelaContainer = document.getElementById("tabelaVoluntarios");
    if (!tabelaContainer) return;

    if (voluntarios.length === 0) {
      tabelaContainer.innerHTML = "<p>Nenhum voluntário cadastrado.</p>";
      return;
    }

    let html = `
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th>Nascimento</th>
          <th>Endereço</th>
          <th>Número</th>
          <th>CEP</th>
          <th>Cidade</th>
          <th>Estado</th>
        </tr>
    `;

    voluntarios.forEach(v => {
      html += `
        <tr>
          <td>${v.nome}</td>
          <td>${v.email}</td>
          <td>${v.cpf}</td>
          <td>${v.telefone}</td>
          <td>${v.nascimento}</td>
          <td>${v.endereco}</td>
          <td>${v.numero}</td>
          <td>${v.cep}</td>
          <td>${v.cidade}</td>
          <td>${v.estado}</td>
        </tr>
      `;
    });

    html += "</table>";
    tabelaContainer.innerHTML = html;
  };

  exibirVoluntarios();

  const btnTopo = document.getElementById("btnTopo");

  if (btnTopo) {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 200) {
        btnTopo.style.display = "block";
      } else {
        btnTopo.style.display = "none";
      }
    });

    btnTopo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
