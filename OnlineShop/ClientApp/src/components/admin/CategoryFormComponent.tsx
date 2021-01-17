import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { Button, Card } from "reactstrap";
import { AppState } from "../../redux";
import TextFieldComponent from "../shared/TextFieldComponent";
import { CategoryDTO } from "../../redux/types";
import { CategoriesActions } from "../../redux/categories";

interface IProps {
  category: CategoryDTO | null;
  getCategoryAction(categoryId: string): any;
  addCategoryAction(category: CategoryDTO): any;
  editCategoryAction(category: CategoryDTO): any;
}

const CategoryFormComponent = (
  props: IProps & RouteComponentProps<{ id: string }>
) => {
  const [category, setCategory] = useState<CategoryDTO>(new CategoryDTO());

  useEffect(() => {
    if (props.match.params.id) {
      const categoryId = props.match.params.id;
      props.getCategoryAction(categoryId);
    }
  }, []);

  useEffect(() => {
    if (props.category && props.match.params.id) {
      setCategory(props.category);
    }
  }, [props.category]);

  const editCategoryHandler = () => {
    if (category && props.match.params.id) {
      props.editCategoryAction(category);
    } else if (category) {
      props.addCategoryAction(category);
    }
  };

  return (
    <Card
      style={{ maxWidth: "75vw", margin: "auto", padding: 30 }}
      className="custom-card"
    >
      <div className="form-group" style={{ marginLeft: 20 }}>
        <TextFieldComponent
          id="name"
          inType="text"
          label="Nume"
          onChange={(event: any) =>
            setCategory({ ...category, name: event.target.value })
          }
          value={category.name || ""}
        />
      </div>
      <div className="form-group" style={{ marginLeft: 20 }}>
        <TextFieldComponent
          id="description"
          inType="textarea"
          label="Descriere"
          onChange={(event: any) =>
            setCategory({ ...category, description: event.target.value })
          }
          value={category.description || ""}
        />
      </div>
      <div className="button-container">
        <Button
          variant="contained"
          color="success"
          onClick={editCategoryHandler}
        >
          Salveaza categorie
        </Button>
      </div>
    </Card>
  );
};

function mapStateToProps(state: AppState) {
  return {
    category: state.categories.category,
  };
}

const dispatchToProps = {
  getCategoryAction: CategoriesActions.getCategoryAction,
  addCategoryAction: CategoriesActions.addCategoryAction,
  editCategoryAction: CategoriesActions.editCategoryAction,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(CategoryFormComponent)
);
