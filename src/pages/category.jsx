import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Slider,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../services/productService";

function Category() {
  const { url } = useParams();
  const [form] = Form.useForm();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState();
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    if (url) {
      fetchCategoryData();
    }
  }, [url]);

  useEffect(() => {
    if (category) {
      fetchProducts(currentPage);
    }
  }, [category, currentPage]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const data = await productService.getCategoryByUrl(url, "en");
      setCategory(data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      // Lấy tất cả category IDs (bao gồm cả children)
      const categoryIds = [category.id];
      if (category.children && category.children.length > 0) {
        categoryIds.push(...category.children.map(c => c.id));
      }
      
      const data = await productService.getProductByCategory(categoryIds, page, "en");
      setProducts(data.items);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onValuesChange = (changedValues, allValues) => {
    const hasValue = Object.values(allValues).some((value) => value);
    setSubmitDisabled(!hasValue);
  };

  /*  Hàm nối children và filterList được trả về từ API GetCategoryByUrl phục vụ cho chức năng lọc.
      Hãy bỏ comment nếu bạn sử dụng.
  */
  // const mergeFilterLists = (tree) => {
  //   // Lấy FilterList của node hiện tại
  //   let mergedList = [...(tree.filterList || [])];

  //   // Duyệt qua từng Children và hợp nhất FilterList
  //   if (tree.children && tree.children.length > 0) {
  //     tree.children.forEach((child) => {
  //       mergedList = mergedList.concat(mergeFilterLists(child));
  //     });
  //   }

  //   return mergedList;
  // };

  const onFilter = async (values) => {
    const hasValue = Object.values(values).some((value) => value);
    if (!hasValue) {
      return;
    }

    let filters;
    Object.keys(values).forEach((key) => {
      if (
        values[key] &&
        values[key].length > 0 &&
        key !== "categories" &&
        key !== "textSearch"
      ) {
        filters = { ...filters, [key]: values[key] };
      }
    });

    /* VIẾT CODE CỦA BẠN VÀO ĐÂY */
  };

  const clearFilters = () => {
    form.resetFields();
    setFilterData();
    setSubmitDisabled(true);
  };

  if (!category) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div id="content" className="content-area">
      <section className="heath-lek section">
        <div className="section-bg fill">
          <div className="video-overlay no-click fill"></div>
          <video
            className="video-bg fill"
            preload="true"
            playsInline
            autoPlay
            muted
            loop
          >
            <source
              src="/images/website/video_category_product.mp4"
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
                          <Link to="/all-product" className="item-bread">
                            All Products
                          </Link>
                        ),
                      },
                      {
                        title: <span className="active-bread">{category.categoryName}</span>,
                      },
                    ]}
                    id="breadcrumb"
                  />

                  <h2 className="_5xfq _1kly">{category.categoryName}</h2>
                  <div className="_7vyg">
                    <p>{category.description || category.shortDesc}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="penury-gym section">
        <div className="section-content relative">
          <div className="category-page-row">
            <Row gutter={30}>
              <Col span={6}>
                <div className="product_sidebar_cate">
                  <Form
                    layout="vertical"
                    form={form}
                    onValuesChange={onValuesChange}
                    onFinish={onFilter}
                  >
                    <div className="_4get">
                      <div className="_4yee">
                        <div className="_5tyu">Filters</div>
                        <div className="_2wzq">
                          <Button
                            type="link"
                            size="small"
                            id="clear-filter"
                            onClick={clearFilters}
                            disabled={!filterData}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </div>
                      <Form.Item name="textSearch" className="_7pia">
                        <Input
                          placeholder="Search Products"
                          className="_8jji"
                          suffix={<SearchOutlined />}
                        />
                      </Form.Item>
                    </div>

                    {category.children && category.children.length > 0 && (
                      <Form.Item
                        label="Categories"
                        name="categories"
                        className="widget_product_categories"
                      >
                        <Checkbox.Group className="form-group">
                          {category.children.map((child) => (
                            <Checkbox key={child.id} value={child.id}>
                              {child.categoryName}
                            </Checkbox>
                          ))}
                        </Checkbox.Group>
                      </Form.Item>
                    )}

                    <Form.Item
                      label="Type of"
                      className="widget_product_categories"
                    >
                      <Checkbox.Group className="form-group">
                        <Checkbox value={3}>Food Storage</Checkbox>
                        <Checkbox value={4}>Trash Bags</Checkbox>
                        <Checkbox value={5}>
                          Knife – Case – Storage Box
                        </Checkbox>
                        <Checkbox value={6}>Containers</Checkbox>
                        <Checkbox value={7}>Gloves</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                      label="Width (cm)"
                      className="widget_product_categories"
                    >
                      <Slider min={10} max={60} range />
                    </Form.Item>

                    <Form.Item
                      label="Length (cm)"
                      className="widget_product_categories"
                    >
                      <Slider min={20} max={120} range />
                    </Form.Item>

                    <Form.Item
                      label="Recycle"
                      className="widget_product_categories"
                    >
                      <Checkbox.Group className="form-group">
                        <Checkbox value="Yes">Yes</Checkbox>
                        <Checkbox value="No">No</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>

                    {!isSubmitDisabled && (
                      <Button type="link" htmlType="submit" className="filter">
                        Filter
                      </Button>
                    )}
                  </Form>
                </div>
              </Col>

              <Col span={18}>
                <div className="_7mkr">
                  <h2 className="_3rac">{category.categoryName}</h2>
                </div>
                
                {loading ? (
                  <div style={{ textAlign: "center", padding: "50px" }}>
                    <Spin size="large" />
                  </div>
                ) : products.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "50px" }}>
                    <p>Không tìm thấy sản phẩm nào trong danh mục này.</p>
                  </div>
                ) : (
                  <>
                    <div className="products">
                      {products.map((product) => (
                        <div className="col has-hover product" key={product.id}>
                          <div className="col-inner">
                            <div className="box-product has-hover">
                              <div className="box-image customer-box-image-product">
                                <Link to={`/product/${product.slug}`} className="_1gqs block image-zoom">
                                  <img
                                    src={product.thumb}
                                    className="_8wjh"
                                    alt={product.prodName}
                                  />
                                </Link>
                              </div>
                              <div className="box-text box-text-products text-left">
                                <div className="title-wrapper">
                                  <h4 className="product-title">
                                    <Link to={`/product/${product.slug}`} className="product_link">
                                      {product.prodName}
                                    </Link>
                                  </h4>
                                  <p className="sku">
                                    SKU: <span>{product.sku}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Pagination
                      current={currentPage}
                      total={totalCount}
                      pageSize={9}
                      onChange={handlePageChange}
                      className="pagination-cntt"
                      showSizeChanger={false}
                    />
                  </>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section className="lichen-gel section">
        <div className="section-content relative">
          <div className="_2gia">
            <Row gutter={60}>
              <Col span={12}>
                <div className="text-box_image">
                  <p className="_0kce">Our catalog</p>
                  <h3 className="_8mak">Explore Our Catalogs</h3>
                  <p className="_8fet">
                    Through a journey of establishment and continuous
                    development, An Phat Holdings has emerged as the leading
                    high-tech, environmentally friendly plastics group in
                    Southeast Asia. With over 20 years of experience, we are
                    dedicated to delivering high-quality, sustainable products
                    across a wide range of industries. As the region’s foremost
                    innovator in eco-friendly plastic solutions, we have built a
                    strong reputation and successfully expanded our presence
                    into key global markets, including Europe, the Americas, the
                    UAE, Japan, Korea, Singapore, Taiwan, and the Philippines.
                    Driven by ongoing research, innovation, and creativity, we
                    are committed to creating enduring value for our customers,
                    investors, and employees.
                  </p>
                  <div className="_3qdw">
                    <a className="button button-outline-green" href="/catalog">
                      <span>Our Catalogs</span>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="image-box_image">
                  <img src="/images/website/explore.png" className="_6ikc" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Category;
