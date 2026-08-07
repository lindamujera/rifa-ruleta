const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const logger = require("./middleware/logger");

dotenv.config({ override: true });

const app = express();
const path = require("path"); 

connectDB();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/uploads",express.static(path.join(__dirname, "uploads"))); 

app.use("/api/auth", require("./routes/AuthRoutes"));
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/payments", require("./routes/PaymentRoutes"));
app.use("/api/rounds", require("./routes/RoundRoutes"));
app.use("/api/transactions", require("./routes/TransactionRoutes"));
app.use("/api/audit", require("./routes/AuditRoutes"));
app.use("/api/notifications", require("./routes/NotificationRoutes"));
app.use("/api/tickets", require("./routes/TicketRoutes"));
app.use("/api/spins", require("./routes/SpinRoutes"));
app.use("/api/prizepool", require("./routes/PrizePoolRoutes"));

app.get("/", (req, res) => {
  res.json({
    proyecto: "RIFA-RULETA"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor ${PORT}`);
});
