import {
  Button,
  Container,
  Form,
  Modal,
  Accordion,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap/";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddBlogItems,
  LoggedInData,
  checkToken,
  getBlogItems,
  getBlogItemsByUserId,
} from "../Services/DataService";

const Dashboard = () => {
  let navigate = useNavigate();
  useEffect(() => {
    //useEffect is the first thing that fires on load
    //put any logic we want to fire onload
    //our effect will fire if we have a change in the state in our depenency
    if (!checkToken()) {
      navigate("/Login");
    } else {
      setTimeout(async () => {
        let LoggedInData = LoggedInData();
        console.log(LoggedInData);
        let userBlogItems = await getBlogItemsByUserId(LoggedInData.userId);
        console.log(userBlogItems);
        isLoading(false);
      }, 1000);
    }

    // let userInfo = LoggedInData();
    // console.log(userInfo);
  }, []);

  //functions
  const handleSetTitle = (e) => setBlogTitle(e.target.value);
  const handleBlogDescription = (e) => setBlogDescription(e.target.value);
  const handleTag = (e) => setBlogTags(e.target.value);
  const handleCategory = (e) => setBlogCategory(e.target.value);
  // const handleSaveImg = ({target}) => setBlogImage(target.files[0]);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    if (e.target.textContent == "Add Blog Item") {
      setEdit(false);
      setBlogTitle("");
      setBlogDescription("");
      setBlogCategory("");
    } else {
      setEdit(true);
      setBlogTitle("My Awsome Title");
      setBlogDescription("My Awsome Description");
      setBlogCategory("Fitness");
    }
  };

  //create useStates for our forms
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogItems, setBlogItems] = useState([]);
  // const [userId, setUserId] = useState(0);
  // const [Publishername, setPublishername] = useState("");

  //bools
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSaveWithPublish = async () => {
    let { publishername, userId } = LoggedInData();
    const Published = {
      Id: 0,
      UserId: userId,
      Publishername: publishername,
      Title: blogTitle,
      Image: blogImage,
      Description: blogDescription,
      Date: new Date(),
      Category: blogCategory,
      Tag: blogTags,
      IsDelted: false,
      IsPublished: true,
    };
    console.log(Published);
    handleClose();
    let result = await AddBlogItems(Published);

    if (result) {
      let userBlogItems = await getBlogItemsByUserId(userId);
      setBlogItems(userBlogItems);
      console.log(userBlogItems, "yes it works");
    }
  };
  const handleSaveWithUnpublish = async () => {
    let { publishername, userId } = LoggedInData();
    const notPublished = {
      Id: 0,
      UserId: userId,
      Publishername: publishername,
      Title: blogTitle,
      Image: blogImage,
      Description: blogDescription,
      Date: new Date(),
      Category: blogCategory,
      Tag: blogTags,
      IsDelted: false,
      IsPublished: false,
    };
    console.log(notPublished);
    handleClose();
    let result = await AddBlogItems(notPublished);
    if (result) {
      let userBlogItems = await getBlogItemsByUserId(userId);
      setBlogItems(userBlogItems);
    }
    AddBlogItems(notPublished);
  };

  //handle our image
  const handleImage = async (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
    // setBlogImage(target.files[0]);
  };

  return (
    <>
      <Container>
        <Button className="me-3" variant="outline-primary" onClick={handleShow}>
          Add Blog Item
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{ background: "#2f2f2f" }} closeButton>
            <Modal.Title style={{ background: "#2f2f2f" }}>
              {edit ? "Edit" : "Add"} Blog Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "#2f2f2f" }}>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={blogTitle}
                  onChange={handleSetTitle}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={blogDescription}
                  onChange={handleBlogDescription}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Category">
                <Form.Select
                  aria-label="Default select example"
                  value={blogCategory}
                  onChange={handleCategory}
                >
                  <option>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Sport">Sports</option>
                  <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tags"
                  value={blogTags}
                  onChange={handleTag}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Image">
                <Form.Label>Pick an Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Select Image from file"
                  accept="image/png, image/jpg"
                  // value={blogImage}
                  onChange={handleImage}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ background: "#2f2f2f" }}>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleSaveWithUnpublish}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="outline-primary" onClick={handleSaveWithPublish}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="outline-primary" onClick={handleShow}>
          Edit Blog Item
        </Button>

        <Row>
          <Col>
          {isLoading ? <h1>Loading...</h1> : 
            blogItems.length == 0 ? (
              <h1 className="text-center">
                No blog items. Add a blog item above
              </h1>
            ) : (
              <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Publish</Accordion.Header>
                  <Accordion.Body
                    style={{ backgroundColor: "#3f3f3f", color: "azure" }}
                  >
                    {blogItems.map((item, i) =>
                      item.Published ? (
                        <ListGroup key={i}>
                          {item.Title}
                          <Col className="d-flex justify-content-end">
                            <Button variant="outline-danger mx-2">
                              Delete
                            </Button>
                            <Button variant="outline-info mx-2">Edit</Button>
                            <Button variant="outline-primary mx-2">
                              Publish
                            </Button>
                          </Col>
                        </ListGroup>
                      ) : null
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Unpublished</Accordion.Header>
                  <Accordion.Body
                    style={{ backgroundColor: "#3f3f3f", color: "azure" }}
                  >
                    {blogItems.map((item, i) =>
                      !item.Published ? (
                        <ListGroup key={i}>
                          {item.Title}
                          <Col className="d-flex justify-content-end">
                            <Button variant="outline-danger mx-2">
                              Delete
                            </Button>
                            <Button variant="outline-info mx-2">Edit</Button>
                            <Button variant="outline-primary mx-2">
                              Upublish
                            </Button>
                          </Col>
                        </ListGroup>
                      ) : null
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
