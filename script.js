const WHATSAPP = "525565063714";
const PRICE = 1000;

const products = [
  { id: 1, name: "PON_AQUI_NOMBRE_GORRA_01", brand: "Barbas Hats", image: "assets/gorra-placeholder.svg", available: true },
  { id: 2, name: "PON_AQUI_NOMBRE_GORRA_02", brand: "Dandy Hats", image: "assets/gorra-placeholder.svg", available: true },
  { id: 3, name: "PON_AQUI_NOMBRE_GORRA_03", brand: "Thirty One Hats", image: "assets/gorra-placeholder.svg", available: true },
  { id: 4, name: "PON_AQUI_MODELO_CATALOGO", brand: "Catálogo", image: "assets/gorra-catalogo.svg", available: false }
];

let cart = [];

const productsBox = document.querySelector("#products");
const cartBox = document.querySelector("#cart");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const total = document.querySelector("#total");
const form = document.querySelector("#checkoutForm");
const whatsappBtn = document.querySelector("#whatsappBtn");
const paymentMethod = document.querySelector("#paymentMethod");
const transferBox = document.querySelector("#transferBox");
const concept = document.querySelector("#concept");

function money(n) {
  return `$${n.toLocaleString("es-MX")} MXN`;
}

function renderProducts() {
  productsBox.innerHTML = products.map(p => `
    <article class="card">
      <img src="${p.image}" alt="${p.name}">
      <div>
        <h3>${p.name}</h3>
        <p>${p.brand} | G5</p>
        <strong>${money(PRICE)}</strong>
        <br><br>
        <button onclick="${p.available ? `addToCart(${p.id})` : `consultCatalog(${p.id})`}">
          ${p.available ? "Agregar al carrito" : "Consultar por WhatsApp"}
        </button>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  renderCart();
  cartBox.classList.add("open");
}

function renderCart() {
  cartItems.innerHTML = cart.map(p => `<p>${p.brand} - ${p.name}</p>`).join("");
  cartCount.textContent = cart.length;
  total.textContent = money(cart.length * PRICE);
}

function consultCatalog(id) {
  const p = products.find(item => item.id === id);
  const msg = `Hola, quiero consultar esta gorra de catálogo: ${p.brand} / ${p.name}`;
  window.open(`https://web.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(msg)}`);
}

paymentMethod.addEventListener("change", () => {
  const isTransfer = paymentMethod.value === "Transferencia";
  transferBox.classList.toggle("hidden", !isTransfer);
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());
  const proof = form.elements.proof.files[0];
  const orderConcept = `GORRAS EDOMEX - ${data.name.toUpperCase()} - ${cart.length} GORRA(S)`;
  concept.textContent = orderConcept;

  const items = cart.map(p => `- ${p.brand} / ${p.name}`).join("\n");

  const msg = `
Hola, quiero confirmar mi pedido en Gorras Edomex.

Productos:
${items}

Total: ${money(cart.length * PRICE)}
Envío: nacional
Entrega: 5 días a 3 semanas

Datos:
Nombre: ${data.name}
Teléfono: ${data.phone}
Correo: ${data.email}
Dirección: ${data.address}

Pago:
Método: ${data.paymentMethod}
Concepto: ${orderConcept}
Comprobante seleccionado: ${proof ? proof.name : "Sin archivo"}

Adjunto la captura del comprobante en este chat.
`;

  whatsappBtn.href = `https://web.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(msg)}`;
  whatsappBtn.classList.remove("hidden");
});

document.querySelector("#openCart").onclick = () => cartBox.classList.add("open");
document.querySelector("#closeCart").onclick = () => cartBox.classList.remove("open");

renderProducts();