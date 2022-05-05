import express, { Application } from "express";
import morgan from "morgan";
import UserEndpoint from "./routes/UserEndpoint";
import TokenEndpoint from "./routes/TokenEndpoint";
import CourseEndpoint from "./routes/CourseEndpoint";
import S3Endpoint from "./routes/S3Endpoint";
import swaggerUi from "swagger-ui-express";
import { PostgresDB } from "../src/config/PostgresDB";
import { JWTMiddleware } from "./middleware/VerifyToken";
var cors = require("cors");
const paypal = require("paypal-rest-sdk");
import { TransactionQueryProcessor } from "../src/query_processor/TransactionQueryProcessor";
import { CourseQueryProcessor } from "./query_processor/CourseQueryProcessor";
const AWS = require("aws-sdk");
const fs = require("fs");
import FileType from "file-type";
import multiparty from "multiparty";
import axios from "axios";
import { access } from "fs";

paypal.configure({
  mode: "sandbox",
  client_id:
    "AQkQIuLTRJrMOnC1wBhCTfCkn8W93Irx90k4_mLLiUDGyd7vBrn92PxHYIm2_Rk7zW1kRgIweD64Q7sp",
  client_secret:
    "EHIZbHV6bK3Qjkhv2tG31veGPUFxfrN0L8CRHyD_JUoNI4NYDS-QQOw4C5TFh8Fl8gEVpE2nQ88BNNZX",
});

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID /* required */,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY /* required */,
  Bucket: process.env.AWS_BUCKET /* required */,
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
app.use("/s3", S3Endpoint);

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

const uploadFile = (buffer: any, name: any, type: any) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: "tacajobucket",
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

// app.post('/test-upload', (request, response) => {
//   const form = new multiparty.Form();
//   form.parse(request, async (error, fields, files) => {
//     if (error) {
//       return response.status(500).send(error);
//     };
//     try {
//       const path = files.file[0].path;
//       const buffer = fs.readFileSync(path);
//       const type = await FileType.fileTypeFromFile(buffer);
//       const fileName = `bucketFolder/${Date.now().toString()}`;
//       const data = await uploadFile(buffer, 'novo', type);
//       return response.status(200).send(data);
//     } catch (err) {
//       return response.status(500).send(err);
//     }
//   });
// });

// download file from s3 bucket
app.get("/download", function (req, res, next) {
  // download the file via aws s3
  var fileKey = req.query["fileKey"] as string;
  console.log("Trying to download file", fileKey);

  var options = {
    Bucket: "tacajobucket",
    Key: fileKey,
  };

  //ako se zakomentarise res.attachemnt onda se samo otvori file ali se ne downloaduje
  res.attachment(fileKey);
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);
});

// read file from s3 bucket
app.get("/get-s3-file", function (req, res, next) {
  // download the file via aws s3
  var fileKey = req.query["fileKey"] as string;
  var fileSize = req.query["fileSize"] as string;

  console.log("Trying to send file", fileKey);
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID /* required */,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY /* required */,
    Bucket: process.env.AWS_BUCKET /* required */,
  });
  var options = {
    Bucket: "tacajobucket",
    Key: fileKey,
  };

  const [name, extension] = fileKey.split(".");
  if (extension === "mp4") {
    console.log({ extension });

    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });
    var fileStream = s3.getObject(options).createReadStream();
  } else {
    var fileStream = s3.getObject(options).createReadStream();
  }

  fileStream.pipe(res);
});

app.post("/pay", [JWTMiddleware.verifyToken], async (req: any, res: any) => {
  const itemList = req.body.map((course: any) => {
    return {
      name: course?.title,
      sku: course?.course_id,
      price: course?.price,
      currency: "USD",
      quantity: 1,
    };
  });

  const sum = req.body.reduce(
    (accum: number, currentValue: any) => accum + currentValue.price,
    0
  );

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
          items: [...itemList],
        },
        amount: {
          currency: "USD",
          total: sum,
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(
    create_payment_json,
    async function (error: any, payment: any) {
      if (error) {
        console.log("paypal error!!!");
        console.log(error.response.details);
        throw error;
      } else {
        console.log("paypal success!!!");
        console.log("PAYMENT:", payment);
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.json({ forwardLink: payment.links[i].href });
          }
        }

        const result = await TransactionQueryProcessor.addTransaction(
          payment?.id,
          req.user.id,
          sum
        );
      }
    }
  );
});

app.get("/success", async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const transactionDB = await TransactionQueryProcessor.getTransaction(
    paymentId
  );

  console.log("TRANSACTION", transactionDB);
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: transactionDB?.amount,
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
        console.log("TRANSACTION IZ PAYMENT EXECUTE", JSON.stringify(payment));
        payment?.transactions.map((transaction: any) => {
          transaction?.item_list.items.map(async (item: any) => {
            console.log("ITEM", item);
            const result = await CourseQueryProcessor.updateItemTransaction(
              transactionDB.user_id,
              item.sku
            );
            if (!result) res.send("Item cannot be updated.");
          });
        });
        res.send("Success");
      }
    }
  );
});

app.get("/cancel", (req, res) => res.send("Cancelled"));

const getPayPalAccessToken = async () => {
  const client_id =
    "AQkQIuLTRJrMOnC1wBhCTfCkn8W93Irx90k4_mLLiUDGyd7vBrn92PxHYIm2_Rk7zW1kRgIweD64Q7sp";
  const client_secret =
    "EHIZbHV6bK3Qjkhv2tG31veGPUFxfrN0L8CRHyD_JUoNI4NYDS-QQOw4C5TFh8Fl8gEVpE2nQ88BNNZX";

    const { status, data } = await axios({
    url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-Language": "en_US",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: client_id,
      password: client_secret,
    },
    params: {
      grant_type: "client_credentials",
    },
  });
  console.log("token", data.access_token);
  return data.access_token;
};

app.get("/get-billing-plans", async (req, res) => {
  await getPayPalAccessToken();
  var list_billing_plan = {
    status: "ACTIVE",
    page_size: 10,
  };

  paypal.billingPlan.list(
    list_billing_plan,
    async function (error: any, response: any) {
      if (error) {
        throw error;
      } else {
        res.send(response.plans)
      }
    }
  );

});

app.post("/subscription", async (req: any, res: any) => {
  const plan_id = req.query.plan_id;
  const accessToken = await getPayPalAccessToken();
  console.log(accessToken);
  paypal.subscription(plan_id,  function (error: any, response: any) {
    if (error) {
      console.error(JSON.stringify(error));
      throw error;
    } else {
      console.log("USPESNA SUBSCRIPCIJA!! ", true);
    }
  })
  const { status, data } = await axios({
    url: "https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-Language": "en_US",
      "Content-Type": "application/json0",
      "Authorization": `Bearer ${accessToken}`
    },
    data: {plan_id}
  });
  console.log(status)
});

app.post("/createPlan", async (req: any, res: any) => {
  var billingPlanAttribs = {
    name: "Food of the World Club Membership: Standard",
    description: "Monthly plan for getting the t-shirt of the month.",
    type: "fixed",
    payment_definitions: [
      {
        name: "Standard Plan",
        type: "REGULAR",
        frequency_interval: "1",
        frequency: "MONTH",
        cycles: "11",
        amount: {
          currency: "USD",
          value: "19.99",
        },
      },
    ],
    merchant_preferences: {
      setup_fee: {
        currency: "USD",
        value: "1",
      },
      cancel_url: "http://localhost:3000/cancel",
      return_url: "http://localhost:3000/processagreement",
      max_fail_attempts: "0",
      auto_bill_amount: "YES",
      initial_fail_amount_action: "CONTINUE",
    },
  };

  paypal.billingPlan.create(
    billingPlanAttribs,
    function (error: any, billingPlan: any) {
      var billingPlanUpdateAttributes;

      if (error) {
        console.error(JSON.stringify(error));
        throw error;
      } else {
        // Create billing plan patch object
        billingPlanUpdateAttributes = [
          {
            op: "replace",
            path: "/",
            value: {
              state: "ACTIVE",
            },
          },
        ];

        // Activate the plan by changing status to active
        paypal.billingPlan.update(
          billingPlan.id,
          billingPlanUpdateAttributes,
          function (error: any, response: any) {
            if (error) {
              console.error(JSON.stringify(error));
              throw error;
            } else {
              console.log("Billing plan created under ID: " + billingPlan.id);
            }
          }
        );
      }
    }
  );
});
