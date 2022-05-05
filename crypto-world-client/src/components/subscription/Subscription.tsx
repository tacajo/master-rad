import { useEffect, useState } from "react";
import { css } from "aphrodite/no-important";
import { SubsciptionStyle as style } from "./SubsciptionStyle";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { IFile } from "../../interfaces/file.interface";
import { getActiveBillingPlans } from "../../services/paypal.service";

export default function Subsciption({ show, handleClose }: any) {
  const [billingPlans, setBillingPlans] = useState<[]>([]);
  const [selectedBillingPlan, setSelectedBillingPlan] = useState<any>(null);

  useEffect(() => {
    console.log(" useEffect getBillingPlans");
    getBillingPlans();
  }, []);

  async function getBillingPlans() {
    console.log("getBillingPlans");
    const result = await getActiveBillingPlans();
    console.log(result);
    setBillingPlans(result.data);
    setSelectedBillingPlan(result.data[result.data.length - 1].id);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSelectedBillingPlan(value);
    console.log({ selectedBillingPlan });
  }

  return (
    <div>
      <Modal show={show} className={css(style.modalDesign)}>
        <Modal.Header>
          <Modal.Title className={css(style.title)}>Automatic payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {billingPlans.map((plan: any) => (
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value={plan?.id}
                onChange={handleChange}
              />
              <label className="form-check-label">
                <p className={css(style.planName)}>{plan?.name}</p>
                <p className={css(style.planDescription)}>{plan?.description}</p>
              </label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Subscribe
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
