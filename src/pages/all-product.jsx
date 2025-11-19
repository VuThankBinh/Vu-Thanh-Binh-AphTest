import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Col, Flex, Input, Row, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "../services/productService";
import { getImageUrlWithFallback } from "../utils/imageUtils";

function AllProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await productService.getListCategory("en");
      // Đảm bảo data là mảng
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); // Set mảng rỗng nếu có lỗi
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async (e) => {
    if (e) {
      navigate(`/search?query=${e}`);
    }
  };

  return (
    <div id="content" className="content-area">
      <section className="heath-lek section">
        <div className="section-bg fill">
          <video
            className="video-bg fill"
            preload="true"
            playsInline
            autoPlay
            muted
            loop
          >
            <source
              src="images/website/video_all_product.mp4"
              type="video/mp4"
            />
          </video>
          <div className="section-bg-overlay absolute fill"></div>
        </div>
        <div className="section-content relative">
          <div className="_4csl">
            <Row gutter={30}>
              <Col span={12} className="_9trw RemovePaddingBottom">
                <div className="_4yvp">
                  <Breadcrumb
                    items={[
                      {
                        title: (
                          <a href="/" className="item-bread">
                            Home
                          </a>
                        ),
                      },
                      {
                        title: (
                          <span className="active-bread">All Products</span>
                        ),
                      },
                    ]}
                    id="breadcrumb"
                  />
                  <h2 className="_5xfq _1kly">All Products</h2>
                  <p className="_7vyg">
                    Discover our full range of eco-friendly and high-tech
                    plastic products designed for diverse industries. Engineered
                    with precision, tailored for your needs, and committed to a
                    greener future.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section className="seamy-sod section">
        <div className="section-content relative">
          <div className="_4zut">
            <Row gutter={30}>
              <Col span={24} className="_9msw">
                <h2 className="title-home">Find What You're Looking For</h2>
              </Col>
            </Row>
          </div>
          <div className="_9jvd">
            <Row gutter={30}>
              <Col span={24} className="_5czu RemovePaddingBottom">
                <Input.Search
                  placeholder="Input search text"
                  className="_8wts"
                  enterButton={
                    <div className="button-gradient">
                      <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                      <span className="uppercase">Search</span>
                    </div>
                  }
                  onSearch={onSearch}
                />
              </Col>
            </Row>
          </div>
          <div className="_5kgp">
            <Row gutter={30}>
              <Col span={24} className="_5pqy RemovePaddingBottom">
                <Flex vertical gap={14}>
                  <div className="_4tma">KEYWORD SUGGESTION</div>
                  <Flex align="center" justify="center" gap={12} wrap="wrap">
                    <div className="_1hmm">
                      <Link to="/search?query=Food Packaging" className="_6dut">
                        Food Packaging
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="/search?query=Consumer Packaging" className="_6dut">
                        Consumer Packaging
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="/search?query=Eco-Friendly Bags" className="_6dut">
                        Eco-Friendly Bags
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="/search?query=Masterbatch Compounds" className="_6dut">
                        Masterbatch Compounds
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="/search?query=Plastic Resins" className="_6dut">
                        Plastic Resins
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="/search?query=Cutlery" className="_6dut">
                        Cutlery
                      </Link>
                    </div>
                  </Flex>
                </Flex>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section className="dynamism-nib section">
        <div className="section-content relative">
          <div className="_4zut">
            <Row gutter={30}>
              <Col span={24} className="_9msw">
                <h2 className="title-home">Choose a Market</h2>
              </Col>
            </Row>
          </div>
          {loading ? (
            <div style={{ textAlign: "center", padding: "50px", width: "100%" }}>
              <Spin size="large" />
            </div>
          ) : (
            <div className="_0odn">
              {categories.map((category) => (
                <div className="_3iwp" key={category.id}>
                  <Link to={`/category/${category.link}`} className="_8ahh block has-hover">
                    <div className="_4rfh image-zoom">
                      <img 
                        src={getImageUrlWithFallback(category.thumb)} 
                        className="_5mgw" 
                        alt={category.categoryName || "Category"} 
                        onError={(e) => {
                          e.target.src = "/images/defaultImage.png";
                        }}
                      />
                    </div>
                    <div className="_1blc">
                      <div className="_9wvo">{category.categoryName}</div>
                      <div className="_4jqn">
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dynamic sections for Packaging & Building Materials (2-3 children - horizontal cards) */}
      {!loading && categories
        .filter(cat => cat.children && cat.children.length > 0 && cat.children.length <= 3)
        .map((category) => (
          <section className="fumed-ref section" key={`section-${category.id}`}>
            <div className="section-content relative">
              <div className="_1nvi">
                <Row gutter={30}>
                  <Col span={24} className="_5xem">
                    <p className="_5bmu">Our products</p>
                    <h3 className="_7kra">{category.categoryName}</h3>
                  </Col>
                </Row>
              </div>
              <div className="_5tcj">
                {category.children.map((child) => (
                  <div className="_6npx" key={child.id}>
                    <div className="_2jjl">
                      <div className="_8ghs">
                        <Link to={`/category/${child.link}`} className="block">
                          <img 
                            src={getImageUrlWithFallback(child.thumb)} 
                            className="_9rtu" 
                            alt={child.categoryName || "Category"}
                            onError={(e) => {
                              e.target.src = "/images/defaultImage.png";
                            }}
                          />
                        </Link>
                      </div>
                      <div className="_0cac">
                        <div className="_9not">
                          <div className="_2pzh">
                            <Link to={`/category/${child.link}`}>{child.categoryName}</Link>
                          </div>
                          <div className="_8ynm textLine-5">
                            {child.shortDesc || child.description || ""}
                          </div>
                        </div>
                        <div className="_3qdw">
                          <Link to={`/category/${child.link}`} className="button button-outline-green">
                            <span>View products</span>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

      {/* Dynamic sections for Consumer Goods & Engineering Plastics (4+ children - vertical cards) */}
      {!loading && categories
        .filter(cat => cat.children && cat.children.length > 3)
        .map((category) => (
          <section className="zeros-vug section" key={`section-${category.id}`}>
            <div className="section-content relative">
              <div className="_1nvi">
                <Row gutter={30}>
                  <Col span={24} className="_5xem">
                    <p className="_5bmu">Our products</p>
                    <h3 className="_7kra">{category.categoryName}</h3>
                  </Col>
                </Row>
              </div>
              <div className="_5msj">
                {category.children.map((child) => (
                  <div className="_4euo" key={child.id}>
                    <div className="_8aey">
                      <Link to={`/category/${child.link}`} className="block">
                        <img
                          src={getImageUrlWithFallback(child.thumb)}
                          className="_1qlp"
                          alt={child.categoryName || "Category"}
                          onError={(e) => {
                            e.target.src = "/images/defaultImage.png";
                          }}
                        />
                      </Link>
                    </div>
                    <div className="_3pxh">
                      <div className="_0cvj">
                        <Link to={`/category/${child.link}`} className="textLine-1">
                          {child.categoryName}
                        </Link>
                      </div>
                      <div className="_8gbl textLine-2">
                        {child.shortDesc || child.description || ""}
                      </div>
                      <Link to={`/category/${child.link}`} className="_4jqn">
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

      <section className="pitched-nap section">
        <div className="section-content relative">
          <div className="_4zut">
            <Row gutter={30}>
              <Col span={24} className="_9msw">
                <h2 className="title-home">
                  Explore Our Comprehensive Catalogs
                </h2>
              </Col>
            </Row>
          </div>
          <div className="_7tfg">
            <Row gutter={30}>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_1.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 01</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_2.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 02</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_3.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 03</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_4.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 04</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_5.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 05</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_6.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 06</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllProduct;
