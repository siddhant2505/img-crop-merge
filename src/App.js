import React, { PureComponent } from "react";
//import logo from "./logo.svg";
import "./App.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// import frame from "./frame.png";
// import frame1 from "./frame1.png";
// import frame2 from "./frame2.png";
import frame3 from "./frame3-600.png";
import frame4 from "./frame4-600.png";
import frame5 from "./frame5-600.png";
//import fin3 from "./6.png";
import fin2 from "./2.png";
import fin1 from "./5.png";
import fin4 from "./fin4.png";
import fin5 from "./1.png";
//import fin4 from "./fin4.png";
//import fin5 from "./fin5.png";
// import fin6 from "./Fin6.png";
// import fin7 from "./Fin7.png";
// import fin8 from "./fin8.png";
// import fin9 from "./fin9.png";
// import fin12 from "./fin12.png";

// import fin15 from "./fin15.png";
// import fin10 from "./1.png";
import fin11 from "./fin11.png";
import urPic from "./yourPic.jpg";
import logoN from "./logoN.png";
import dp from "./dp.png";
// import img2 from "./11.PNG";
import mergeImages from "merge-images";
// import ResizeImage from "react-resize-image";
// import Resizer from "react-image-file-resizer";

class App extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: "%",
      width: 2400,
      aspect: 1000 / 1000,
    },
  };

  handleSelect = async (img) => {
    this.setState({ selimg: img });
    if (this.state.croppedImageUrl && this.state.selimg) {
      await mergeImages([
        { src: this.state.croppedImageUrl, x: 0, y: 0 },
        { src: this.state.selimg, x: 0, y: 0 },
      ]).then((b64) => {
        document.getElementById("merged").src = b64;
        this.setState({ finalimg: b64 });
      });
    }
  };
  handleSubmit = () => {
    if (!this.state.croppedImageUrl) {
      this.setState({ upload: "Please upload image file to continue" });
    }
    setTimeout(() => this.setState({ upload: null }), 4000);
    if (!this.state.selimg) {
      this.setState({ layout: "Please select one layout" });
    }

    setTimeout(() => this.setState({ layout: "" }), 4000);
    if (this.state.croppedImageUrl && this.state.selimg) {
      this.setState({ display: true });
      mergeImages([
        { src: this.state.croppedImageUrl, x: 0, y: 0 },
        { src: this.state.selimg, x: 0, y: 0 },
      ]).then((b64) => {
        this.setState({ finalimg: b64 });
        console.log(this.state.finalimg);
        document.getElementById("merged").src = b64;
      });
    }
  };
  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
      //const scaledimg =
      // Resizer.imageFileResizer(
      //   frame,
      //   200,
      //   200,
      //   "JPEG",
      //   100,
      //   0,
      //   (uri) => {
      //     console.log(uri);
      //   },
      //   "blob"
      // );
      //this.setState(scaledimg);
      console.log(this.state.selimg);
      // mergeImages([
      //   { src: croppedImageUrl, x: 0, y: 0 },
      //   { src: this.state.selimg, x: 0, y: 0 },
      // ]).then((b64) => (document.getElementById("merged").src = b64));
    }
  }
  // getMergedImg(image1, image2) {
  //   mergeImages(
  //     [
  //       { src: image2, x: 0, y: 0 },
  //       { src: image1, x: 0, y: 0 },
  //     ],
  //     { width: 100, height: 100 }
  //   ).then((b64) => (document.getElementById("merged").src = b64));
  // }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      600,
      600
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    //this.getMergedImg(frame, img2);
    const {
      display,
      crop,
      croppedImageUrl,
      //
      // layout,
      src,
      // selimg,
      finalimg,
    } = this.state;

    mergeImages([
      { src: urPic, x: 0, y: 0 },
      { src: frame3, x: 0, y: 0 },
    ]).then((b64) => (document.getElementById("pic1").src = b64));
    mergeImages([
      { src: urPic, x: 0, y: 0 },
      { src: frame5, x: 0, y: 0 },
    ]).then((b64) => (document.getElementById("pic2").src = b64));
    mergeImages([
      { src: urPic, x: 0, y: 0 },
      { src: frame4, x: 0, y: 0 },
    ]).then((b64) => (document.getElementById("pic3").src = b64));
    mergeImages([
      { src: urPic, x: 0, y: 0 },
      { src: fin1, x: 0, y: 0 },
    ]).then((b64) => (document.getElementById("pic4").src = b64));
    mergeImages([
      { src: urPic, x: 0, y: 0 },
      { src: fin2, x: 0, y: 0 },
    ]).then((b64) => (document.getElementById("pic5").src = b64));
    // mergeImages([
    //   { src: urPic, x: 0, y: 0 },
    //   { src: fin11, x: 0, y: 0 },
    // ]).then((b64) => (document.getElementById("pic5").src = b64));
    mergeImages([
      { src: urPic, x: 0, y: 0 },
      { src: fin4, x: 0, y: 0 },
    ]).then((b64) => (document.getElementById("pic7").src = b64));
    mergeImages([
      { src: urPic, x: 0, y: 0 },
      { src: fin11, x: 0, y: 0 },
    ]).then((b64) => (document.getElementById("pic6").src = b64));
    mergeImages([
      { src: urPic, x: 0, y: 0 },
      { src: fin5, x: 0, y: 0 },
    ]).then((b64) => (document.getElementById("pic8").src = b64));

    return (
      <div className="App">
        <nav style={{ margin: "0px" }} class="navbar navbar-dark bg-primary">
          <a class="navbar-brand 	d-xs-none d-md-block hide" href="/#">
            <img
              src={logoN}
              width="30px"
              height="30px"
              class="d-inline-block align-top"
              alt="logo"
              loading="lazy"
            />
          </a>
          <h3 style={{ float: "left" }} className="hid ">
            <span style={{ color: "orange" }}> Happy</span>{" "}
            <span style={{ color: "white" }}>Independence</span>
            <span style={{ color: "green" }}> Day</span>
          </h3>

          <span class="text-center mr-sm-2 d-block mx-auto">
            {" "}
            <img
              width="50px"
              alt="dp"
              style={{
                //marginLeft: "100px",
                clipPath: "circle(25px at center)",
                marginRight: "10px",
              }}
              src={dp}
            />
            By Nitesh Varshney
          </span>
        </nav>
        <div class="container-fluid my-5">
          <div class="row">
            <div
              style={{ alignItems: "center", justifyContent: "center" }}
              class="col-sm "
            >
              <h2>Upload your Image</h2>
              <div class="my-4 mx-auto">
                {this.state.upload && (
                  <div class="alert alert-danger" role="alert">
                    {this.state.upload}
                  </div>
                )}
                <span class="text-danger"></span>
                <input
                  class="text-center"
                  type="file"
                  accept="image/*"
                  onChange={this.onSelectFile}
                />
              </div>
              {src && (
                <div class="mx-auto img-container">
                  <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                </div>
              )}
            </div>
            <div class="col-sm">
              <h2>Choose your layout</h2>
              {this.state.layout && (
                <div class="alert alert-danger my-4" role="alert">
                  {this.state.layout}
                </div>
              )}
              <div style={{ position: "relative", float: "left" }} class="mx-3">
                <div className="my-4"> Layout 1</div>
                <img
                  id="pic1"
                  alt="layout"
                  onClick={() => this.handleSelect(frame3)}
                  //onClick={this.handleSelect(frame3)}
                  className={`layout ${
                    this.state.selimg === frame3 ? "selected" : ""
                  } `}
                  width="150px"
                  height="150px"
                  role="button"
                  src={frame3}
                />
              </div>
              <div style={{ float: "right" }} class="mx-3">
                <div className="my-4"> Layout 2</div>
                <img
                  alt="layout"
                  id="pic2"
                  onClick={() => this.handleSelect(frame5)}
                  className={`layout ${
                    this.state.selimg === frame5 ? "selected" : ""
                  } `}
                  width="150px"
                  height="150px"
                  role="button"
                  src={frame5}
                />
              </div>
              <div style={{ float: "left" }} class="mx-3">
                <div className="my-4"> Layout 3</div>
                <img
                  alt="layout"
                  id="pic3"
                  onClick={() => this.handleSelect(frame4)}
                  //  onClick={this.handleSelect(frame3)}
                  className={`layout  ${
                    this.state.selimg === frame4 ? "selected" : ""
                  } `}
                  width="150px"
                  height="150px"
                  role="button"
                  src={frame4}
                />
              </div>
              <div
                style={{ position: "relative", float: "right" }}
                class="mx-3"
              >
                <div className="my-4">
                  {" "}
                  Layout 4
                  <h1
                    style={{
                      display: "inline",
                      position: "absolute",
                      right: "-10px",
                    }}
                    className="newitem"
                  >
                    NEW
                  </h1>
                </div>
                <img
                  alt="layout"
                  id="pic4"
                  onClick={() => this.handleSelect(fin1)}
                  className={`layout ${
                    this.state.selimg === fin1 ? "selected" : ""
                  } `}
                  width="150px"
                  height="150px"
                  role="button"
                  src={fin1}
                />
              </div>
              <div style={{ position: "relative", float: "left" }} class="mx-3">
                <div className="my-4">
                  {" "}
                  Layout 5
                  <h1
                    style={{
                      display: "inline",
                      position: "absolute",
                      right: "-10px",
                    }}
                    className="newitem"
                  >
                    NEW
                  </h1>
                </div>
                <img
                  alt="layout"
                  id="pic5"
                  onClick={() => this.handleSelect(fin2)}
                  className={`layout ${
                    this.state.selimg === fin2 ? "selected" : ""
                  } `}
                  width="150px"
                  height="150px"
                  role="button"
                  src={fin2}
                />
              </div>
              <div
                style={{ position: "relative", float: "right" }}
                class="mx-3"
              >
                <div className="my-4">
                  {" "}
                  Layout 6
                  <h1
                    style={{
                      display: "inline",
                      position: "absolute",
                      right: "-10px",
                    }}
                    className="newitem"
                  >
                    NEW
                  </h1>
                </div>
                <img
                  alt="layout"
                  id="pic6"
                  onClick={() => this.handleSelect(fin11)}
                  className={`layout ${
                    this.state.selimg === fin11 ? "selected" : ""
                  } `}
                  width="150px"
                  height="150px"
                  role="button"
                  src={fin11}
                />
              </div>
              <div style={{ position: "relative", float: "left" }} class="mx-3">
                <div className="my-4">
                  {" "}
                  Layout 7
                  <h1
                    style={{
                      display: "inline",
                      position: "absolute",
                      right: "-10px",
                    }}
                    className="newitem"
                  >
                    NEW
                  </h1>
                </div>
                {/* <h1 class="newitem">NEW</h1> */}
                <img
                  alt="layout"
                  id="pic7"
                  onClick={() => this.handleSelect(fin4)}
                  className={`layout ${
                    this.state.selimg === fin4 ? "selected" : ""
                  } `}
                  width="150px"
                  height="150px"
                  role="button"
                  src={fin4}
                />
              </div>
              <div style={{ float: "right" }} class="mx-3">
                <div className="my-4"> Layout 8</div>
                {/* <h1 class="newitem">NEW</h1> */}
                <img
                  alt="layout"
                  id="pic8"
                  onClick={() => this.handleSelect(fin5)}
                  className={`layout ${
                    this.state.selimg === fin5 ? "selected" : ""
                  } `}
                  width="150px"
                  height="150px"
                  role="button"
                  src={fin5}
                />
              </div>

              {/* <div className="my-4"> Layout 1</div>
              <img className="layout" width="150px" src={frame3} />
              <div className="my-4"> Layout 2</div>
              <img className="layout" width="150px" src={frame} />
              <div className="my-4"> Layout 3</div>
              <img className="layout" width="150px" src={frame3} /> */}
            </div>
            <div class="col-sm">
              <h2>Press the below Button</h2>
              <h2
                onClick={() => {
                  console.log("submitting");
                  this.handleSubmit();
                }}
                class="btn btn-primary my-4"
              >
                Proceed &rarr;
              </h2>
              <div
                className="mx-auto"
                style={{
                  width: "300px",
                  height: "300px",
                  outline: "2px solid black",
                  outlineOffset: "3px",
                }}
              >
                {display ? (
                  <>
                    <img
                      id="merged"
                      alt="Crop"
                      // width="100px"
                      // height="100px"
                      style={{ maxWidth: "100%" }}
                      src={croppedImageUrl}
                    />
                    <div className="my-5">
                      <a
                        id="download"
                        className="btn btn-warning"
                        href={finalimg}
                        // href={
                        //   document.getElementById("merged")
                        //     ? document.getElementById("merged").src
                        //     : ""
                        // }
                        download
                      >
                        Download your Image
                      </a>
                    </div>
                  </>
                ) : (
                  "YOUR IMAGE WILL LOAD HERE"
                )}
              </div>
            </div>
          </div>
          <img alt="123" className="d-none" src="2222" id="merged"></img>
        </div>

        {/* {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
        )}
        <img alt="Cropscaled" src={scaledimg} />
        {/* <ResizeImage
          src={croppedImageUrl}
          alt="cropped scaled"
          options={{ width: 20 }}
        /> */}
      </div>
    );
  }
}
export default App;

//onClick={fileUploadHandler}
