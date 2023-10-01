<template>
  <div>
    <h1 class="text-center mb-5">Gestión de Inventario</h1>

    <v-row>
      <v-col cols="12" md="4">
        <v-text-field 
          label="Nombre del artículo" 
          v-model="newItem.name"
          :rules="[v => !!v || 'El nombre del artículo es obligatorio']" 
          required>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field 
          type="number" 
          label="Cantidad" 
          v-model="newItem.quantity"
          :rules="[v => (!isNaN(v) && v > 0) || 'La cantidad debe ser mayor que 0']" 
          required>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4" class="d-flex align-center">
        <v-btn @click="addItem" color="primary" :disabled="!isValid">Agregar</v-btn>
      </v-col>
    </v-row>

    <v-list>
      <v-list-item-group v-for="(item, index) in items" :key="index">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>Cantidad: {{ item.quantity }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn icon @click="removeItem(index)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: {
        name: '',
        quantity: 0
      },
      items: JSON.parse(localStorage.getItem('inventoryItems') || '[]')
    };
  },
  computed: {
    isValid() {
      return this.newItem.name && !isNaN(this.newItem.quantity) && this.newItem.quantity > 0;
    }
  },
  methods: {
    addItem() {
      if (!this.isValid) return;  // No agregar si las validaciones no pasan

      this.newItem.quantity = parseInt(this.newItem.quantity, 10); 
      this.items.push({ ...this.newItem });
      this.newItem.name = '';
      this.newItem.quantity = 0;
      this.updateLocalStorage();
    },
    removeItem(index) {
      this.items.splice(index, 1);
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem('inventoryItems', JSON.stringify(this.items));
    }
  },
  watch: {
    items: {
      handler() {
        this.updateLocalStorage();
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
.mb-5 {
  margin-bottom: 2rem;
}
</style>
