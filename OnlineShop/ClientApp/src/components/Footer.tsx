const FooterComponent = () => {
  return (
    <div>
      <div
        className="row"
        style={{
          backgroundColor: "#305738",
          color: "white",
          padding: 30,
          margin: 0,
        }}
      >
        <div className="col-sm-5">
          <h5 className="title">Ceainarie.ro</h5>
          <p>Proiect realizat de Tugui Diana Ecaterina</p>
        </div>
        <div className="col-sm-5">
          <h5 className="title">Social Media</h5>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                style={styles.listLink}
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                style={styles.listLink}
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        style={{
          padding: 10,
          textAlign: "center",
          backgroundColor: "#253d2a",
          color: "white",
        }}
      >
        @FMI Unibuc 2021
      </div>
    </div>
  );
};

export default FooterComponent;

const styles = {
  listLink: {
    color: "white",
  },
};
