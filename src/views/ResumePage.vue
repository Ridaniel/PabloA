<template>
  <div>
    <h1>Resumen de Inventario</h1>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Artículos Totales</v-card-title>
          <v-card-text>
            <v-icon large color="blue">mdi-cube-outline</v-icon> {{ totalItems }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Cantidad Total</v-card-title>
          <v-card-text>
            <v-icon large color="green">mdi-counter</v-icon> {{ totalQuantity }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Distribución de Artículos</v-card-title>
          <v-card-text>
            <pie-chart :data="itemDistribution"></pie-chart>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Cantidades de Artículos</v-card-title>
          <v-card-text>
            <bar-chart :data="itemQuantities"></bar-chart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="mostCommonItem">
      <v-col cols="12">
        <v-card>
          <v-card-title>Artículo Más Común</v-card-title>
          <v-card-text>{{ mostCommonItem.name }} ({{ mostCommonItem.quantity }} unidades)</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import { Pie, Bar } from 'vue-chartjs';
import { Chart, CategoryScale, BarController, LinearScale, BarElement, ArcElement, PieController  } from 'chart.js';

Chart.register(CategoryScale, BarController, LinearScale, BarElement,ArcElement, PieController);

export default {
  components: {
PieChart: {
  extends: Pie,
  props: ['data'],
  mounted() {
    this.renderChart(this.data);
  },
  watch: {
    data(newData) {
      this.renderChart(newData);
    }
  }
}
,
BarChart: {
  extends: Bar,
  props: ['data'],
  mounted() {
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false,
    });
  },
  watch: {
    data(newData) {
      this.renderChart(newData, {
        responsive: true,
        maintainAspectRatio: false,
      });
    }
  }
}

  },
  data() {
    return {
      items: JSON.parse(localStorage.getItem('inventoryItems') || '[]')
    };
  },
  computed: {
    totalItems() {
      return this.items.length;
    },
    totalQuantity() {
      return this.items.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
    },
    itemDistribution() {
      return {
        labels: this.items.map(item => item.name),
        datasets: [
          {
            data: this.items.map(item => item.quantity),
            backgroundColor: this.items.map(() => this.getRandomColor())
          }
        ]
      };
    },
    itemQuantities() {
      return {
        labels: this.items.map(item => item.name),
        datasets: [
          {
            label: 'Quantity',
            data: this.items.map(item => item.quantity),
            backgroundColor: this.items.map(() => this.getRandomColor())
          }
        ]
      };
    },
    mostCommonItem() {
      if (!this.items.length) return null;
      return this.items.reduce((a, b) => a.quantity > b.quantity ? a : b);
    }
  },
  methods: {
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
}
</script>
