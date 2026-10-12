// Keep the legacy root-level command safe by forwarding to the environment-
// configured utility rather than embedding credentials in source code.
require("./src/utils/createAdmin");
