import { css } from "aphrodite/no-important";
import { CartStyle as style } from "./CartStyle";
import { GlobalStyle } from "../../assets/style/GlobalStyle";
import { pay } from "../../services/course.service";

async function onPay() {
  const result = await pay();
  console.log(result);
}
export default function Cart() {
  return (
    <div className="container">
      <div className={css(style.title)}>Shopping cart</div>
      <button className={css(GlobalStyle.button)} onClick={onPay}>
        Pay
      </button>
    </div>
  );
}
