export default {
    car_models: ["CX482", "CX735"],
    line_codes: ["RGV", "IP", "MLV"],
    workload_weight_percentage: 20,
    cost_function: [
      {
        tipo: "workload",
        weight_percentage: 20,
        source_table: "gcp_visval_workload"
      },
      {
        tipo: "stoppage",
        weight_percentage: 20,
        source_table: "gcp_visval_stoppage"
      },
      {
        tipo: "quality",
        weight_percentage: 60,
        source_table: "gcp_visval_quality"
      }
    ],
    extra_cost_table: "gcp_visval_extra_cost",
    vin_info: [
      {
        tipo: "options",
        source_table: "gcp_visval_info_options"
      },
      {
        tipo: "features",
        source_table: "gcp_visval_info_features"
      }
    ]
  };