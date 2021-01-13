import { Card } from "reactstrap";
import { ProductDTO } from "../../redux/types";

interface IProps {
  product: ProductDTO;
  onClick: (event: any) => any;
}
const ProductItem = (props: IProps) => {
  return (
    <Card style={{ height: 400, padding: "0 10px 10px 0" }}>
      <div style={{ ...styles.container, position: "relative" }}>
        <div
          className="arrow-right"
          style={{
            backgroundColor: props.product.isInStock ? "#28A745" : "#444",
          }}
        >
          <span>{props.product.isInStock ? "In stoc" : "Epuizat"}</span>
        </div>
        <div
          style={{
            ...styles.image,
            backgroundImage: `url(${props.product.imageUrl})`,
          }}
        />
        <div
          style={{
            margin: "20px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ ...styles.title }}>{props.product.name}</div>
          <div>
            <div style={{ ...styles.descriptionTag }}>Descriere</div>
            <div>{props.product.description}</div>
          </div>
          <div style={{ ...styles.descriptionTag, alignSelf: "flex-end" }}>
            {props.product.price} RON
          </div>
          <div
            id={props.product.id + ""}
            style={{ ...styles.checkDetails, textAlign: "center" }}
            onClick={(event) => props.onClick(event)}
          >
            Vezi detalii
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
  image: {
    margin: 15,
    width: "100%",
    height: "90%",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  descriptionTag: {
    fontWeight: 600,
    margin: "10px 0",
    width: "100%",
  },
  checkDetails: {
    padding: 10,
    borderRadius: 5,
    width: "100px",
    color: "white",
    backgroundColor: "#28A745",
    cursor: "pointer",
  },
};

export default ProductItem;
