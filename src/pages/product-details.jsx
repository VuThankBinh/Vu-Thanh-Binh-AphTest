import "swiper/css";
import "swiper/css/pagination";
import { Breadcrumb, Button, Col, Image, Row, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Pagination, Thumbs } from "swiper/modules";
import defaultImage from "../assets/images/defaultImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import productService from "../services/productService";
import { getImageUrlWithFallback } from "../utils/imageUtils";
function ProductDetail() {
  const { url } = useParams();

  const swiperRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [direction, setDirection] = useState("vertical");
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateDirection = () => {
    setDirection(window.innerWidth < 768 ? "horizontal" : "vertical");
  };

  useEffect(() => {
    updateDirection();
    window.addEventListener("resize", updateDirection);
    return () => {
      window.removeEventListener("resize", updateDirection);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    
    if (url) {
      fetchProductData();
    }
  }, [url]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const productData = await productService.getProductByUrl(url, "en");
      setProduct(productData);
      
      // Fetch related products
      const related = await productService.getRelatedProducts(productData.id, "en");
      setRelatedProducts(related);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get category name from categoryId
  const getCategoryName = () => {
    if (!product || !product.categoryId) return null;
    
    // This is a simple mapping - in real scenario, you might fetch from API
    const categoryMap = {
      11: { name: "Consumer Packaging", link: "consumer-packaging", parent: "Packaging" },
      12: { name: "Industrial Packaging", link: "industrial-packaging", parent: "Packaging" },
      21: { name: "Cutlery/Straws", link: "cutlery-straws", parent: "Consumer Goods" },
      22: { name: "Cups/Lids", link: "cups-lids", parent: "Consumer Goods" },
      23: { name: "Food Containers", link: "food-containers", parent: "Consumer Goods" },
      24: { name: "Gloves", link: "gloves", parent: "Consumer Goods" },
    };
    
    return categoryMap[product.categoryId] || null;
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  if (loading || !product) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div id="content" className="content-area">
      <section className="coach-pug section">
        <div className="section-content relative">
          <div className="_0vqs">
            <Row gutter={30}>
              <Col span={24}>
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
                        <Link to="/all-product" className="item-bread">
                          All Products
                        </Link>
                      ),
                    },
                    ...(getCategoryName() ? [
                      {
                        title: (
                          <Link to={`/category/${getCategoryName().link}`} className="item-bread">
                            {getCategoryName().name}
                          </Link>
                        ),
                      }
                    ] : []),
                    {
                      title: <span className="active-bread">{product.prodName}</span>,
                    },
                  ]}
                  id="breadcrumb"
                />
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="snouting-daw section">
        <div className="section-content relative">
          <div className="_1ghu">
            <div className="_6tdv">
              <div className="product-vertical-thumbnails">
                <Swiper
                  modules={[Mousewheel, Pagination, Thumbs]}
                  direction={direction}
                  slidesPerView="auto"
                  spaceBetween={20}
                  mousewheel={true}
                  pagination={{
                    clickable: true,
                  }}
                  watchSlidesProgress={true}
                  onSwiper={setThumbsSwiper}
                  className="ThumbGallery GalleryArea"
                >
                  {product.media && product.media.length > 0 ? (
                    product.media.map((img, index) => {
                      // media có thể là object với path hoặc string
                      const imageUrl = typeof img === "string" ? img : (img?.path || img?.fileName || img);
                      return (
                        <SwiperSlide key={index}>
                          <Image
                            src={getImageUrlWithFallback(imageUrl)}
                            alt={img?.altText || `${product.prodName} ${index + 1}`}
                            fallback={defaultImage}
                            preview={false}
                          />
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <SwiperSlide>
                      <Image
                        src={getImageUrlWithFallback(product.thumb)}
                        alt={product.prodName}
                        fallback={defaultImage}
                        preview={false}
                      />
                    </SwiperSlide>
                  )}
                </Swiper>
                <Image.PreviewGroup>
                  <Swiper
                    modules={[Thumbs]}
                    thumbs={{ swiper: thumbsSwiper }}
                    className="ProductGallery GalleryArea"
                  >
                    {product.media && product.media.length > 0 ? (
                      product.media.map((img, index) => {
                        // media có thể là object với path hoặc string
                        const imageUrl = typeof img === "string" ? img : (img?.path || img?.fileName || img);
                        return (
                          <SwiperSlide key={index}>
                            <Image
                              src={getImageUrlWithFallback(imageUrl)}
                              alt={img?.altText || `${product.prodName} ${index + 1}`}
                              fallback={defaultImage}
                            />
                          </SwiperSlide>
                        );
                      })
                    ) : (
                      <SwiperSlide>
                        <Image
                          src={getImageUrlWithFallback(product.thumb)}
                          alt={product.prodName}
                          fallback={defaultImage}
                        />
                      </SwiperSlide>
                    )}
                  </Swiper>
                </Image.PreviewGroup>
              </div>

              {product.dataSheet && (
                <div className="_6hoq">
                  <Button
                    style={{ textTransform: "none" }}
                    type="link"
                    className="_7lpb"
                    href={getImageUrlWithFallback(product.dataSheet)}
                    target="_blank"
                  >
                    <span>Download data sheet</span>
                    <i className="fa-regular fa-arrow-right"></i>
                  </Button>
                </div>
              )}
            </div>
            <div className="_5enz">
              <div className="product-info">
                <h1 className="product-title product_title entry-title">
                  {product.prodName}
                </h1>
                <div className="sku">
                  <strong>SKU: </strong>
                  <span>{product.sku}</span>
                </div>
                <div className="description">
                  {product.shortDesc }
                </div>
                
                <div className="_6zrw">
                  <Link style={{textDecoration: "none"}} to="/contact-us" className="button button-gradient">
                    <span>Request Quote</span>
                  </Link>
                  <a style={{textDecoration: "none"}} href="#" className="button button-outline-green">
                    <span>Add to Basket</span>
                  </a>
                </div>
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                {product.specification && (
                  <div className="contents widget-content">
                    <h4 className="_9cfu">Performance Features:</h4>
                    <div className="inner-content">
                      {Array.isArray(product.specification) ? (
                        <ul>
                          {product.specification.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{product.specification}</p>
                      )}
                    </div>
                  </div>
                )}

                {product.productInfo && (
                  <div className="contents widget-content">
                    <h4 className="_9cfu">Product Information:</h4>
                    <div className="inner-content">
                      <table className="product-info-table">
                        <tbody>
                          {product.productInfo.alternativeReference && (
                            <tr>
                              <td><strong>Alternative Reference</strong></td>
                              <td>{product.productInfo.alternativeReference}</td>
                            </tr>
                          )}
                          {product.productInfo.width && (
                            <tr>
                              <td><strong>Width</strong></td>
                              <td>{product.productInfo.width}</td>
                            </tr>
                          )}
                          {product.productInfo.length && (
                            <tr>
                              <td><strong>Length</strong></td>
                              <td>{product.productInfo.length}</td>
                            </tr>
                          )}
                          {product.productInfo.maximumWeight && (
                            <tr>
                              <td><strong>Maximum Weight</strong></td>
                              <td>{product.productInfo.maximumWeight}</td>
                            </tr>
                          )}
                          {product.productInfo.color && (
                            <tr>
                              <td><strong>Color(s)</strong></td>
                              <td>{product.productInfo.color}</td>
                            </tr>
                          )}
                          {product.productInfo.material && (
                            <tr>
                              <td><strong>Material</strong></td>
                              <td>{product.productInfo.material}</td>
                            </tr>
                          )}
                          {product.productInfo.recycle && (
                            <tr>
                              <td><strong>Recycle</strong></td>
                              <td>{product.productInfo.recycle}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="xylomas-goad section">
        <div className="section-content relative">
          <div className="_0qkm">
            <Row gutter={30}>
              <Col span={24}>
                <div className="blocks_title_nav">
                  <h2 className="title_prj">Frequently Bought Together</h2>
                  <div className="nav_swpier_prj">
                    <div className="swpier_prj-prev" onClick={handlePrev}>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                    </div>
                    <div className="swpier_prj-next" onClick={handleNext}>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="_8sxd">
            <Row gutter={20}>
              <Col span={24} className="_0lfn">
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper; // Gắn instance của Swiper vào ref
                  }}
                  modules={[Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  loop={true}
                  className="SliderProduct"
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 12,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 12,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                >
                  {relatedProducts.length > 0 ? (
                    relatedProducts.map((relatedProduct) => (
                      <SwiperSlide key={relatedProduct.id}>
                        <Link 
                          className="box_project block has-hover" 
                          to={`/product/${relatedProduct.slug}`}
                        >
                          <div className="media_prj image-zoom">
                            <Image
                              src={getImageUrlWithFallback(relatedProduct.thumb)}
                              alt={relatedProduct.prodName}
                              fallback={defaultImage}
                              preview={false}
                              className="_7omy"
                            />
                          </div>
                          <div className="text_prj">
                            <h4 className="textLine-2">{relatedProduct.prodName}</h4>
                            <div className="_7yax">
                              <strong>SKU&nbsp;</strong>
                              <span>{relatedProduct.sku}</span>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))
                  ) : (
                    <div style={{ padding: "20px", textAlign: "center", width: "100%" }}>
                      <p>Không có sản phẩm liên quan</p>
                    </div>
                  )}
                </Swiper>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
