const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("."));
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.listen(PORT);
// tạo database từ config/initDB
// trong require lúc nào cũng có ""
require("../config/initDB")();
//tạo model(database)

const rootRoute = require("../Routes");

// Lây tất cả từ file src/Routes/index.js để sử dụng
// api sẽ có dạng ví dụ: localhost:5000/api/auth/signup
app.use("/api", rootRoute);
