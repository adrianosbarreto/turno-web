import router from "@/router";
import { createAuth } from "vue-auth3";

import driverAuthBasic from "vue-auth3/drivers/auth/basic";
import driverHttpAxios from "vue-auth3/drivers/http/axios";

const auth = createAuth({
  plugins: {
  },
  drivers: {
    auth: driverAuthBasic,
    http: driverHttpAxios,
  },
})

export default auth;
