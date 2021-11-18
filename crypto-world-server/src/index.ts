import express, { Application } from "express";
import morgan from "morgan";
import UserEndpoint from "./routes/UserEndpoint";
import TokenEndpoint from "./routes/TokenEndpoint";
import CourseEndpoint from "./routes/CourseEndpoint";
import swaggerUi from "swagger-ui-express";
import { PostgresDB } from "../src/config/PostgresDB";
var cors = require("cors");
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AQkQIuLTRJrMOnC1wBhCTfCkn8W93Irx90k4_mLLiUDGyd7vBrn92PxHYIm2_Rk7zW1kRgIweD64Q7sp",
  client_secret:
    "EHIZbHV6bK3Qjkhv2tG31veGPUFxfrN0L8CRHyD_JUoNI4NYDS-QQOw4C5TFh8Fl8gEVpE2nQ88BNNZX",
});

PostgresDB.Connect();

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use("/token", TokenEndpoint);
app.use("/user", UserEndpoint);
app.use("/course", CourseEndpoint);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// Handle errors
app.use((err: any, req: any, res: any, next: any) => {
  if (!err) {
    return next();
  }

  res.status(500);
  res.send("500: Internal server error");
});

app.post("/pay", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price: "3.99",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "3.99",
        },
        description: "This is the payment description.",
      },
    ],
  };
  paypal.payment.create(
    create_payment_json,
    function (error: any, payment: any) {
      if (error) {
        console.log("paypal error!!!");
        throw error;
      } else {
        console.log("paypal success!!!");

        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.json({ forwardLink: payment.links[i].href });
          }
        }
      }
    }
  );
});

app.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "3.99",
        },
      },
    ],
  };

  // Obtains the transaction details from paypal
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error: any, payment: any) {
      //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.send("Success");
      }
    }
  );
});

app.get("/cancel", (req, res) => res.send("Cancelled"));
