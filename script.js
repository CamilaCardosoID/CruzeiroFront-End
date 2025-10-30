document.addEventListener("DOMContentLoaded", () => {
  const toggleMenu = () => {
    const menu = document.getElementById("nav-menu");
    if (menu) menu.classList.toggle("active");
  };
  window.toggleMenu = toggleMenu;

  const form = document.getElementById("cadastroForm");

  function validarFormulario(form) {
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const cpf = form.cpf.value.trim();
    const telefone = form.telefone.value.trim();
    const cep = form.CEP.value.trim();
    const endereco = form.endereço.value.trim();
    const numero = form.número.value.trim();
    const cidade = form.cidade.value.trim();
    const estado = form.estado.value.trim();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    const regexTelefone = /^\(\d{2}\)\s?\d{4,5}\-\d{4}$/;
    const regexCEP = /^\d{5}\-\d{3}$/;

    let erros = [];

    if (!nome) erros.push("O campo Nome é obrigatório.");
    if (!email || !regexEmail.test(email)) erros.push("Informe um e-mail válido (ex: nome@exemplo.com).");
    if (!cpf || !regexCPF.test(cpf)) erros.push("Informe um CPF válido (ex: 999.999.999-99).");
    if (!telefone || !regexTelefone.test(telefone)) erros.push("Informe um telefone válido (ex: (99) 99999-9999).");
    if (!cep || !regexCEP.test(cep)) erros.push("Informe um CEP válido (ex: 99999-999).");
    if (!endereco) erros.push("O campo Endereço é obrigatório.");
    if (!numero) erros.push("O campo Número é obrigatório.");
    if (!cidade) erros.push("O campo Cidade é obrigatório.");
    if (!estado) erros.push("O campo Estado é obrigatório.");

    if (erros.length > 0) {
      alert("⚠️ Corrija os seguintes erros antes de enviar:\n\n" + erros.join("\n"));
      return false;
    }

    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form) return;
    if (form.dataset.submitting === "true") return;
    form.dataset.submitting = "true";

    const valido = validarFormulario(form);
    if (!valido) {
      form.dataset.submitting = "false";
      return;
    }

    const formData = {
      nome: form.nome.value.trim(),
      email: form.email.value.trim(),
      cpf: form.cpf.value.trim(),
      telefone: form.telefone.value.trim(),
      nascimento: form.nascimento.value.trim(),
      endereco: form.endereço.value.trim(),
      numero: form.número.value.trim(),
      cep: form.CEP.value.trim(),
      cidade: form.cidade.value.trim(),
      estado: form.estado.value.trim(),
    };

    let voluntarios = JSON.parse(localStorage.getItem("voluntarios")) || [];
    voluntarios.push(formData);
    localStorage.setItem("voluntarios", JSON.stringify(voluntarios));

    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.style.display = "block";
      successMessage.classList.add("show");
      successMessage.textContent = "✅ Cadastro realizado com sucesso! Aguarde nosso contato.";
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
      btnTopo.style.display = window.scrollY > 200 ? "block" : "none";
    });
    btnTopo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
