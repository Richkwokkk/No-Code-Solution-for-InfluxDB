export const DARK_THEME = "vitesse-dark";
export const LIGHT_THEME = "vitesse-light";
export const DEFAULT_CODE = `from(bucket: "example-bucket")
  |> range(start: -1d)
  |> filter(fn: (r) => r._measurement == "example-measurement")
  |> mean()
  |> yield(name: "_results")`;
