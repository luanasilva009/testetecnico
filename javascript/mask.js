function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, '').slice(0, 11);

    return cpf
        .replace(/\D/g, '') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
}

function mask(o, f) {
    setTimeout(function () {
        var v = mphone(o.value);
        if (v != o.value) {
            o.value = v;
        }
    }, 1);
}

function mphone(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}

function formatEmail(email) {
    return email.replace(/[^\w\s]/gi, '');
}

function formatBirthDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    if (isNaN(birth)) {
        console.error("Data de nascimento inválida: ", birthDate);
        return "Data inválida"; 
    }
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth();
    
    if (month < birth.getMonth() || (month === birth.getMonth() && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
