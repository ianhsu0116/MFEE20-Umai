import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <>
      <footer className="Footer">
        <div className="footerTriangleBG"></div>
        <div className="footerContent">
          <div className="footerLink">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-2">
                <p className="footerTitle">
                  {/* <a
                    className="footerTitleText"
                    href=""
                    onClick={() => {
                      window.location.href = "http://localhost:3000/chef";
                    }}
                  >
                    主廚介紹
                  </a> */}
                  <Link to="/chef" className="footerTitleText">
                    主廚介紹
                  </Link>
                </p>
              </div>
              <div className="col-2">
                <p className="footerTitle">
                  <Link to="/about" className="footerTitleText">
                    關於我們
                  </Link>
                </p>
              </div>
              <div className="col-2">
                <p className="footerTitle">
                  {/* <a
                    className="footerTitleText"
                    href=""
                    onClick={() => {
                      window.location.href = "http://localhost:3000/contactus";
                    }}
                  >
                    聯絡我們
                  </a> */}
                  <Link to="/contactus" className="footerTitleText">
                    聯絡我們
                  </Link>
                </p>
              </div>
              <div className="col-2">
                <p className="footerIcon">
                  <a className="footerTitleText" href="#">
                    <FaFacebookSquare className="FaFacebookSquare" />
                  </a>
                  <a className="footerTitleText" href="#">
                    <RiInstagramFill className="RiInstagramFill" />
                  </a>
                </p>
              </div>
              <div className="col-2"></div>
              <div className="footerCopyright">
                <p>© 2021 Umai, Inc. ALL RIGHTS RESERVED.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
