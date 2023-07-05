const { createApp } = Vue;
createApp({
  data() {
    return {
      productos: [],
      url: 'http://13245586.pythonanywhere.com/productos',
      error: false,
      cargando: true,
      id: 0,
      nombre: "",
      imagen: "",
      stock: 0,S,
      precio: 0,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.productos = data;
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(producto) {
      const url = this.url + '/' + producto;
      var options = {
        method: 'DELETE',
      };
      fetch(url, options)
        .then(res => res.text())
        .then(res => {
          location.reload();
        });
    },
    grabar() {
      let producto = {
        nombre: this.nombre,
        precio: this.precio,
        stock: this.stock,
        imagen: this.imagen,
      };
      var options = {
        body: JSON.stringify(producto),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado");
          window.location.href = "./CRUD.html";
        })
        .catch(err => {
          console.error(err);
          alert("Error al Grabar");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount('#app');
