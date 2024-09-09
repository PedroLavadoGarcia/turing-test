<template>
  <v-container fluid>
    <!-- Spinner Overlay -->
    <spinner-overlay v-model="loading" />

    <!-- Title -->
    <v-card class="mb-5 pa-4 title-card" outlined>
      <v-card-title>
        <h2 class="headline-title mb-0" data-test-id="title">VISVAL Config Suite</h2>
      </v-card-title>
    </v-card>

    <v-form ref="form" v-model="valid" data-test-id="form">
      <!-- Car Models -->
      <v-card class="mb-4 pa-4" outlined>
        <v-card-title>
          <span class="headline" data-test-id="car-models-title">Car Models</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newCarModel"
            @keyup.enter="addItem('car_models', newCarModel)"
            label="Enter Car Model and Press Enter"
            dense
            data-test-id="car-model-input"
          ></v-text-field>
          <v-chip-group v-show="formData.car_models.length" column class="mt-3" data-test-id="car-models-chips">
            <v-chip
              v-for="(model, index) in formData.car_models"
              :key="model"
              class="mr-2 mb-2 custom-chip"
              @click:close="removeItem('car_models', index)"
              closable
              data-test-id="car-model-chip"
            >
              {{ model }}
            </v-chip>
          </v-chip-group>
          <v-alert v-show="!formData.car_models.length" type="error" dense data-test-id="car-model-error">
            At least one car model is required.
          </v-alert>
        </v-card-text>
      </v-card>

      <!-- Line Codes -->
      <v-card class="mb-4 pa-4" outlined>
        <v-card-title>
          <span class="headline" data-test-id="line-codes-title">Line Codes</span>
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="newLineCode"
            :items="availableLineCodes"
            label="Select or Enter Line Code"
            dense
            clearable
            @update:modelValue="addItem('line_codes', newLineCode)"
            data-test-id="line-code-input"
          ></v-autocomplete>
          <v-chip-group v-show="formData.line_codes.length" column class="mt-3" data-test-id="line-codes-chips">
            <v-chip
              v-for="(code, index) in formData.line_codes"
              :key="code"
              class="mr-2 mb-2 custom-chip"
              @click:close="removeItem('line_codes', index)"
              closable
              data-test-id="line-code-chip"
            >
              {{ code }}
            </v-chip>
          </v-chip-group>
          <v-alert v-show="!formData.line_codes.length" type="error" dense data-test-id="line-code-error">
            At least one line code is required.
          </v-alert>
        </v-card-text>
      </v-card>

      <!-- Cost Function -->
      <v-card class="mb-4 pa-4" outlined>
        <v-card-title>
          <span class="headline" data-test-id="cost-function-title">Cost Function</span>
          <v-btn icon color="primary" @click="addCostFunction" class="ml-3" data-test-id="add-cost-function-button">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-card
            v-for="(cost, index) in formData.cost_function"
            :key="index"
            class="mb-3 pa-3"
            outlined
            data-test-id="cost-function-card"
          >
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="cost.tipo"
                  :disabled="isWorkload(cost.tipo)"
                  label="Type"
                  dense
                  :rules="[rules.required]"
                  data-test-id="cost-type-input"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                  v-model="cost.source_table"
                  :items="availableTables"
                  :disabled="isWorkload(cost.tipo)"
                  label="Source Table"
                  dense
                  clearable
                  :rules="[rules.required]"
                  data-test-id="cost-source-table-input"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="cost.weight_percentage"
                  label="Weight Percentage"
                  type="number"
                  dense
                  :rules="[rules.required, rules.percentage]"
                  data-test-id="cost-weight-percentage-input"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="1" class="d-flex">
                <v-btn
                  v-if="!isWorkload(cost.tipo)"
                  icon
                  color="red"
                  @click="removeCostFunction(index)"
                  data-test-id="remove-cost-function-button"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
          <!-- Percentage sum error -->
          <v-alert v-show="percentageError" type="error" dense data-test-id="cost-percentage-error">
            The sum of the cost function weights must be exactly 100.
          </v-alert>
        </v-card-text>
      </v-card>

      <!-- Extra Cost Table -->
      <v-card class="mb-4 pa-4" outlined>
        <v-card-title>
          <span class="headline" data-test-id="extra-cost-table-title">Extra Cost Table</span>
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="formData.extra_cost_table"
            :items="availableTables"
            label="Extra Cost Table"
            dense
            clearable
            :rules="[rules.required]"
            data-test-id="extra-cost-table-input"
          ></v-autocomplete>
        </v-card-text>
      </v-card>

      <!-- VIN Info -->
      <v-card class="mb-4 pa-4" outlined>
        <v-card-title>
          <span class="headline" data-test-id="vin-info-title">VIN Info</span>
          <v-btn icon color="primary" @click="addVinInfo" class="ml-3" data-test-id="add-vin-info-button">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-card
            v-for="(vin, index) in formData.vin_info"
            :key="index"
            class="mb-3 pa-3"
            outlined
            data-test-id="vin-info-card"
          >
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="vin.tipo"
                  label="Type"
                  dense
                  :rules="[rules.required]"
                  data-test-id="vin-type-input"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="5">
                <v-autocomplete
                  v-model="vin.source_table"
                  :items="availableTables"
                  label="Source Table"
                  dense
                  clearable
                  :rules="[rules.required]"
                  data-test-id="vin-source-table-input"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="1" class="d-flex">
                <v-btn icon color="red" @click="removeVinInfo(index)" data-test-id="remove-vin-info-button">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
      </v-card>

      <!-- Action Buttons -->
      <v-card-actions class="justify-end">
        <v-btn color="red darken-1" @click="resetForm" class="undo-btn" data-test-id="reset-form-button">
          Undo Changes
        </v-btn>
        <v-btn
          color="green darken-1"
          @click="confirmSave"
          :disabled="!valid || percentageError"
          class="save-btn"
          data-test-id="save-changes-button"
        >
          Save Changes
        </v-btn>
      </v-card-actions>
    </v-form>

    <!-- Confirm Save Modal -->
    <confirm-save-dialog
      v-model="confirmSaveDialog"
      @close="confirmSaveDialog = false"
      @confirm="saveData"
      data-test-id="confirm-save-dialog"
    />

    <!-- Save Result Modal -->
    <result-dialog
      v-model="resultDialog"
      :resultTitle="resultTitle"
      :resultMessage="resultMessage"
      @close="resultDialog = false"
      data-test-id="result-dialog"
    />
  </v-container>
</template>


<script>
import {
  getData,
  getLineCodes,
  getTables,
  saveData,
} from "@/services/dataService";
import SpinnerOverlay from "./common/spinner/SpinnerOverlay.vue";
import ConfirmSaveDialog from "./common/dialog/ConfirmSaveDialog.vue";
import ResultDialog from "./common/dialog/ResultDialog.vue";

export default {
  components: { SpinnerOverlay, ConfirmSaveDialog, ResultDialog },
  data() {
    return {
      initialFormData: {},
      availableLineCodes: [],
      availableTables: [],
      newCarModel: "",
      newLineCode: "",
      formData: {
        car_models: [],
        line_codes: [],
        cost_function: [],
        extra_cost_table: "",
        vin_info: [],
      },
      valid: false,
      percentageError: false,
      confirmSaveDialog: false,
      resultDialog: false,
      resultTitle: "",
      resultMessage: "",
      rules: {
        required: (value) => !!value || "Required.",
        percentage: (value) =>
          (value >= 0 && value <= 100) || "Must be between 0 and 100.",
      },
      loading: true,
    };
  },
  mounted() {
    this.loading = true;
    Promise.all([getData(), getLineCodes(), getTables()])
      .then(([data, lineCodes, tables]) => {
        this.formData = data;
        this.initialFormData = JSON.parse(JSON.stringify(this.formData));
        this.availableLineCodes = lineCodes;
        this.availableTables = tables;
      })
      .catch((error) => {
        console.error("Failed to load data", error);
        this.resultTitle = "Error";
        this.resultMessage = "Failed to load data. Please try again later.";
        this.resultDialog = true;
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
  },
  methods: {
    addItem(type, value) {
      const trimmedValue = value?.trim();
      if (trimmedValue && !this.formData[type].includes(trimmedValue)) {
        this.formData[type].push(trimmedValue);
        if (type === 'car_models') this.newCarModel = "";
        if (type === 'line_codes') this.newLineCode = "";
      }
    },
    removeItem(type, index) {
      this.formData[type].splice(index, 1);
    },
    addCostFunction() {
      this.formData.cost_function.push({
        tipo: "",
        weight_percentage: 0,
        source_table: "",
      });
    },
    removeCostFunction(index) {
      this.formData.cost_function.splice(index, 1);
    },
    addVinInfo() {
      this.formData.vin_info.push({
        tipo: "",
        source_table: "",
      });
    },
    removeVinInfo(index) {
      this.formData.vin_info.splice(index, 1);
    },
    validatePercentageSum() {
      const totalPercentage = this.formData.cost_function.reduce(
        (sum, cost) => sum + Number(cost.weight_percentage),
        0
      );
      this.percentageError = totalPercentage !== 100;
    },
    async confirmSave() {
      this.confirmSaveDialog = true;
    },
    saveData() {
      this.loading = true;
      saveData(this.formData)
        .then(() => {
          this.initialFormData = JSON.parse(JSON.stringify(this.formData));
          this.resultTitle = "Success";
          this.resultMessage = "Changes have been successfully saved.";
        })
        .catch(() => {
          this.resultTitle = "Error";
          this.resultMessage = "Failed to save the changes.";
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
            this.confirmSaveDialog = false;
            this.resultDialog = true;
          }, 1000);
        });
    },
    resetForm() {
      this.formData = JSON.parse(JSON.stringify(this.initialFormData));
    },
    isWorkload(tipo) {
      return tipo === "workload";
    },
  },
  watch: {
    "formData.cost_function": {
      handler() {
        this.validatePercentageSum();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 10px;
}

.v-btn {
  margin: 0 4px;
}

.title-card {
  background-color: #e3f2fd;
  border: 1px solid #bbdefb;
  color: #0d47a1;
}

.headline-title {
  font-weight: 600;
  font-size: 2rem;
  color: #0d47a1;
}

.v-chip {
  cursor: pointer;
}

.save-btn {
  background-color: #4caf50 !important;
  color: white !important;
}

.undo-btn {
  background-color: #f44336 !important;
  color: white !important;
}

.custom-chip {
  background-color: #2196f3;
  color: white;
  border-radius: 8px;
  padding: 8px 12px;
  border: none;
}

.custom-chip:hover {
  background-color: #1976d2;
}

.custom-chip .v-chip__close {
  color: white;
  font-size: 16px;
}

.v-dialog .v-card {
  border-radius: 10px;
}

.v-card-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
}

.v-icon {
  font-size: 2rem;
}

.v-card-subtitle {
  font-size: 1rem;
  color: #666;
}

.v-card-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
