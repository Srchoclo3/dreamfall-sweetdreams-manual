document.addEventListener("DOMContentLoaded", () => {
    // 1. Resaltar la página actual en el menú
    let path = window.location.pathname;
    let page = path.split("/").pop();
    
    if (page === "") {
        page = "index.html";
    }

    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('activo');
        }

        // 2. Efecto de "apagado" al cambiar de página
        link.addEventListener('click', function(e) {
            // Solo aplicamos el efecto si no es la misma página en la que ya estamos
            if (this.getAttribute('href') !== page) {
                e.preventDefault(); // Detenemos la navegación instantánea
                const destino = this.getAttribute('href');
                
                // Aplicamos estilo de apagado al body
                document.body.style.transition = "transform 0.3s ease-in, filter 0.3s ease-in, opacity 0.3s";
                document.body.style.transform = "scale(1, 0.001)";
                document.body.style.filter = "brightness(5)";
                document.body.style.opacity = "0";

                // Esperamos 300ms a que termine la animación y luego redirigimos
                setTimeout(() => {
                    window.location.href = destino;
                }, 300);
            }
        });
    });

    // 3. Efecto de parpadeo aleatorio sutil para el filtro CRT
    function crtFlicker() {
        const crt = document.getElementById('crt-screen');
        if (crt) {
            const randomOpacity = Math.random() * (0.85 - 0.75) + 0.75;
            crt.style.opacity = randomOpacity;
        }
        setTimeout(crtFlicker, Math.random() * 100 + 50);
    }

    crtFlicker();
});

// Lógica del Muro de Feedback (community.html)
const feedbackForm = document.getElementById('feedback-form');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que la página se recargue

        const nameInput = document.getElementById('fb-name');
        const msgInput = document.getElementById('fb-msg');
        
        const nombre = nameInput.value.trim();
        const mensaje = msgInput.value.trim();

        if (nombre !== "" && mensaje !== "") {
            const wall = document.getElementById('wall-messages');
            
            // Creamos el nuevo div del mensaje
            const nuevaNota = document.createElement('div');
            nuevaNota.style.backgroundColor = 'var(--bg-dark)';
            nuevaNota.style.borderLeft = '4px solid var(--accent)';
            nuevaNota.style.padding = '10px';
            nuevaNota.style.opacity = '0'; // Para la animacion
            
            // Texto del mensaje
            nuevaNota.innerHTML = `<strong>[ ${nombre} ]:</strong> ${mensaje}`;
            
            // Añadimos la nota al principio del muro (debajo de la caja)
            wall.insertBefore(nuevaNota, wall.firstChild);
            
            // Limpiamos el formulario
            nameInput.value = '';
            msgInput.value = '';
            
            // Animación de aparición
            setTimeout(() => { 
                nuevaNota.style.transition = 'opacity 0.5s ease-in'; 
                nuevaNota.style.opacity = '1'; 
            }, 50);
        }
    });
}