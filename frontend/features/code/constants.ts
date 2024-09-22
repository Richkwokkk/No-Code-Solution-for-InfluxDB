import { BundledTheme } from "@/features/code/types";

export const DARK_THEME: BundledTheme = "github-dark";
export const LIGHT_THEME: BundledTheme = "github-light";

export const DEFAULT_CODE = `from(bucket: "example-bucket")
  |> range(start: -1d)
  |> filter(fn: (r) => r._measurement == "example-measurement")
  |> mean()
  |> yield(name: "_results")`;

export const READ_ONLY_MESSAGE =
  "You can only modify the code through drag and drop";

export const CODE_FONT_FAMILY = "Fira Code";
