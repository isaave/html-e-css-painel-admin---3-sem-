/**
 * ARQUIVO: script.js
 * FUNÇÕES: Menu Hambúrguer, Máscaras de Input (Nome, Moeda), Rolagem, Confirmação.
 */

// ===========================================
// FUNÇÕES DE UTILIDADE GERAL
// ===========================================

// Função de Confirmação para Exclusão (usada nas listagens)
function confirmDeletion(message = 'Tem certeza que deseja deletar este item?') {
    return confirm(message);
}

// Máscara de Moeda (BRL)
function mascaramoeda(campo) {
    let v = campo.value.replace(/\D/g, '');
    if (v.length === 0) v = '0';
    let valor = (parseInt(v) / 100).toFixed(2);
    campo.value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Máscara de CNPJ (Placeholder - Código Real necessário se usado)
function mascaracnpj(campo) {
    // Exemplo de implementação real (pode ser ajustado)
    let v = campo.value.replace(/\D/g, ''); 
    v = v.replace(/^(\d{2})(\d)/, '$1.$2'); 
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); 
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); 
    v = v.replace(/(\d{4})(\d)/, '$1-$2'); 
    campo.value = v;
}

// Máscara de Telefone (Placeholder - Código Real necessário se usado)
function mascaratelefone(campo) {
    // Exemplo de implementação real (pode ser ajustado para celular/fixo)
    let v = campo.value.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d)(\d{4})$/, '$1-$2');
    campo.value = v;
}

// Funções de Rolagem (usadas na lista de produtos)
function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ===========================================
// INICIALIZAÇÃO DO DOM
// ===========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicialização do Menu Hambúrguer
    const menuBtn = document.querySelector('.menu-btn');
    const hamburguer = document.querySelector('.hamburguer');
    const categories = document.querySelectorAll(".category");

    // Alterna o menu hambúrguer
    if (menuBtn && hamburguer) { // Verifica se os elementos existem
        menuBtn.addEventListener("click", (event) => {
            hamburguer.classList.toggle("active");
            event.stopPropagation();

            const isExpanded = hamburguer.classList.contains("active");
            menuBtn.setAttribute("aria-expanded", isExpanded);
            menuBtn.innerHTML = isExpanded ? "✖" : "&#9776;";
        });

        // Submenu por categoria
        categories.forEach(category => {
            category.addEventListener("click", (event) => {
                event.stopPropagation();
                const submenu = category.querySelector(".submenu");
                const isActive = category.classList.contains("active");

                // Fecha todos
                categories.forEach(cat => {
                    cat.classList.remove("active");
                    const sm = cat.querySelector(".submenu");
                    if (sm) {
                        sm.style.maxHeight = "0";
                        sm.style.opacity = "0";
                    }
                });

                // Se não estava ativa, abre essa
                if (!isActive && submenu) {
                    category.classList.add("active");
                    submenu.style.maxHeight = "500px";
                    submenu.style.opacity = "1";
                }
            });
        });

        // Fecha menu e submenus ao clicar fora
        document.addEventListener("click", (event) => {
            if (!hamburguer.contains(event.target) && !menuBtn.contains(event.target)) {
                hamburguer.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.innerHTML = "&#9776;";

                // Fecha todos submenus
                categories.forEach(category => {
                    const submenu = category.querySelector(".submenu");
                    if (submenu) {
                        submenu.style.maxHeight = "0";
                        submenu.style.opacity = "0";
                        category.classList.remove("active");
                    }
                });
            }
        });
    }

    // 2. Validação/Máscara de Nome
    const nomeInput = document.getElementById("nome");
    if (nomeInput) {
        nomeInput.addEventListener("input", function () {
            // Permite apenas letras e espaços (incluindo letras acentuadas)
            this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); 
        });
    }
    
    // 3. Adicione aqui a inicialização para outras máscaras/eventos DOM, se necessário.

});