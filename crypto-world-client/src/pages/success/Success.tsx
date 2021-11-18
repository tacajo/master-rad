import { useEffect } from "react";
import { successfulPayment } from "../../services/course.service";
import queryString from "query-string";

export default function Success(props: any) {
  useEffect(() => {
    let params = queryString.parse(props.location.search);
    console.log(params);

    async function successful() {
      if (
        typeof params.paymentId === "string" &&
        typeof params.token === "string" &&
        typeof params.PayerID === "string"
      ) {
        console.log(params.paymentId, params.token, params.PayerID);
        const result = await successfulPayment(params.paymentId, params.token, params.PayerID);
        console.log(result);
      }
    }
    successful();
  }, []);

  return <div className="container">successful payment</div>;
}
