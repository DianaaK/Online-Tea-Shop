import { Button, Card } from "reactstrap";
import { ProductDTO } from "../../redux/types";
import placeholder from "../../assets/images/placeholder.jpg";

interface IProps {
  product: ProductDTO;
  onClick: (event: any) => any;
}
const ProductItem = (props: IProps) => {
  return (
    <Card
      style={{ height: 475, padding: "0 25px 15px 0" }}
      className="custom-card"
    >
      <div style={{ ...styles.container, position: "relative" }}>
        <div className="badge-container">
          <div
            className={`badge ${
              props.product.isInStock
                ? "gradient-available"
                : "gradient-unavailable"
            }`}
          >
            <span>{props.product.isInStock ? "In stoc" : "Epuizat"}</span>
          </div>
        </div>
        <div
          className="product-image"
          style={{
            backgroundImage: `url(${
              props.product.imageUrl ? props.product.imageUrl : placeholder
            })`,
          }}
        />
        <div style={{ ...styles.content, flexDirection: "column" }}>
          <div className="product-title">{props.product.name}</div>
          <div className="product-category">{props.product.category?.name}</div>
          <div className="product-description overflow-fix">
            {props.product.description}
          </div>
          <div className="product-price">{props.product.price} RON</div>
          <div className="button-container" style={{ textAlign: "initial" }}>
            <Button
              id={props.product.id + ""}
              variant="contained"
              color="success"
              onClick={props.onClick}
            >
              Vezi detalii
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100%",
    overflow: "hidden",
  },
  content: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-evenly",
  },
};

export default ProductItem;
