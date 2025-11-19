

export const mockCategories = [
  {
    id: 1,
    thumb: "/images/website/market_1.png",
    categoryName: "Packaging",
    link: "packaging",
    shortDesc: "Eco-friendly packaging solutions",
    description: "All our products are under absolute supervision, from raw materials to finished products. We apply an international quality management system to all of our products.",
    parentId: 0,
    children: [
      {
        id: 11,
        thumb: "/images/website/image_box_1.png",
        categoryName: "Consumer Packaging",
        link: "consumer-packaging",
        shortDesc: "Packaging for consumer goods",
        description: "High-quality packaging for consumer products",
        parentId: 1,
        children: []
      },
      {
        id: 12,
        thumb: "/images/website/image_box_1.png",
        categoryName: "Industrial Packaging",
        link: "industrial-packaging",
        shortDesc: "Industrial grade packaging",
        description: "Durable packaging solutions for industrial use",
        parentId: 1,
        children: []
      }
    ]
  },
  {
    id: 2,
    thumb: "/images/website/market_2.png",
    categoryName: "Consumer Goods",
    link: "consumer-goods",
    shortDesc: "Daily consumer plastic products",
    description: "Quality plastic products for everyday use",
    parentId: 0,
    children: [
      {
        id: 21,
        thumb: "/images/website/consummer_1.png",
        categoryName: "Cutlery/Straws",
        link: "cutlery-straws",
        shortDesc: "Eco-friendly utensils",
        description: "Biodegradable cutlery and straws",
        parentId: 2,
        children: []
      },
      {
        id: 22,
        thumb: "/images/website/consummer_2.png",
        categoryName: "Cups/Lids",
        link: "cups-lids",
        shortDesc: "Beverage containers",
        description: "Various cups and lids for beverages",
        parentId: 2,
        children: []
      },
      {
        id: 23,
        thumb: "/images/website/consummer_3.png",
        categoryName: "Food Containers",
        link: "food-containers",
        shortDesc: "Food storage solutions",
        description: "Safe and durable food containers",
        parentId: 2,
        children: []
      },
      {
        id: 24,
        thumb: "/images/website/consummer_4.png",
        categoryName: "Gloves",
        link: "gloves",
        shortDesc: "Protective gloves",
        description: "Disposable and reusable gloves",
        parentId: 2,
        children: []
      }
    ]
  },
  {
    id: 3,
    thumb: "/images/website/market_3.png",
    categoryName: "",
    link: "engineering-plastics",
    shortDesc: "High-performance plastic solutions",
    description: "Advanced plastic materials for engineering applications",
    parentId: 0,
    
  },
  {
    id: 4,
    thumb: "/images/website/market_4.png",
    categoryName: "",
    link: "building-materials",
    shortDesc: "Construction plastic materials",
    description: "Durable materials for construction industry",
    parentId: 0,
   
  },
  {
    id: 5,
    thumb: "/images/website/market_5.png",
    categoryName: "",
    link: "building-materials",
    shortDesc: "Construction plastic materials",
    description: "Durable materials for construction industry",
    parentId: 0,
   
  },
  {
    id: 6,
    thumb: "/images/website/market_6.png",
    categoryName: "",
    link: "raw-materials",
    shortDesc: "Plastic raw materials",
    description: "High-quality plastic resins and compounds",
    parentId: 0,
    
  }
];

export const mockProducts = [
  {
    id: 1,
    thumb: "/images/website/product-list_1.png",
    prodName: "Food Wrap",
    slug: "food-wrap",
    sku: "036897488221-2",
    categoryId: 11,
    shortDesc: "100% compostable food wrap",
    description: "100% compostable: made from PBAT compostable material, AnEco food wrap is capable of completely decomposing within 6-12 months into humus, water, Co2.",
    specification: [
      "With outstanding features to other products on the market, AnEco compostable cling wrap is transparent, flexible with a sharp cutting bar, easy for consumers in food preservation.",
      "Convenient thumb opening allows for a safe, easy grasp on the film",
      "FDA Compliant",
      "CFIA Compliant",
      "Kosher Compliant"
    ],
    productInfo: {
      alternativeReference: "3061110050",
      width: "30cm",
      length: "200m",
      maximumWeight: "1kg",
      color: "Clear",
      material: "PBAT",
      recycle: "Yes"
    },
    dataSheet: "/pdf/food-wrap-datasheet.pdf",
    media: [
      "/images/website/product_1.png",
      "/images/website/product_2.png",
      "/images/website/product_3.png"
    ]
  },
  {
    id: 2,
    thumb: "/images/website/product-list_2.png",
    prodName: "Overlock Jumbo Bag",
    slug: "overlock-jumbo-bag",
    sku: "036897488221-3",
    categoryId: 11,
    shortDesc: "Heavy-duty jumbo bags",
    description: "High-quality overlock jumbo bags for industrial packaging needs. Durable and reliable for heavy loads.",
    specification: [
      "Made from premium HDPE material",
      "Handle up to 1000kg loads with reinforced stitching",
      "UV resistant for outdoor storage",
      "Food-grade safe material"
    ],
    productInfo: {
      alternativeReference: "3061110051",
      width: "90cm",
      length: "90cm",
      maximumWeight: "1000kg",
      color: "White",
      material: "HDPE",
      recycle: "Yes"
    },
    dataSheet: "/pdf/jumbo-bag-datasheet.pdf",
    media: [
      "/images/website/product-list_2.png"
    ]
  },
  {
    id: 3,
    thumb: "/images/website/product-list_3.png",
    prodName: "Zipper Bag",
    slug: "zipper-bag",
    sku: "036897488221-4",
    categoryId: 11,
    shortDesc: "Resealable zipper bags",
    description: "Convenient resealable zipper bags for food storage and organization.",
    specification: "BPA-free, food-safe material with strong zipper closure mechanism.",
    dataSheet: "/pdf/zipper-bag-datasheet.pdf",
    media: [
      "/images/website/product-list_3.png"
    ]
  },
  {
    id: 4,
    thumb: "/images/website/product-list_4.png",
    prodName: "Trash Bags",
    slug: "trash-bags",
    sku: "036897488221-5",
    categoryId: 12,
    shortDesc: "Heavy-duty trash bags",
    description: "Strong and durable trash bags for industrial and household use.",
    specification: "Puncture-resistant material with reinforced bottom seal.",
    dataSheet: "/pdf/trash-bags-datasheet.pdf",
    media: [
      "/images/website/product-list_4.png"
    ]
  },
  {
    id: 5,
    thumb: "/images/website/product-list_5.png",
    prodName: "Pallet Wrap",
    slug: "pallet-wrap",
    sku: "036897488221-6",
    categoryId: 12,
    shortDesc: "Industrial stretch wrap",
    description: "Professional-grade pallet wrap for securing shipments.",
    specification: "High stretch ratio with excellent puncture resistance.",
    dataSheet: "/pdf/pallet-wrap-datasheet.pdf",
    media: [
      "/images/website/product-list_5.png"
    ]
  },
  {
    id: 6,
    thumb: "/images/website/product-list_6.png",
    prodName: "Bubble Wrap",
    slug: "bubble-wrap",
    sku: "036897488221-7",
    categoryId: 12,
    shortDesc: "Protective bubble wrap",
    description: "Cushioning material for protecting fragile items during shipping.",
    specification: "Air-filled bubbles provide excellent shock absorption.",
    dataSheet: "/pdf/bubble-wrap-datasheet.pdf",
    media: [
      "/images/website/product-list_6.png"
    ]
  },
  {
    id: 7,
    thumb: "/images/website/product-list_7.png",
    prodName: "Eco Straws",
    slug: "eco-straws",
    sku: "036897488221-8",
    categoryId: 21,
    shortDesc: "Biodegradable straws",
    description: "Environmentally friendly straws made from plant-based materials.",
    specification: "100% biodegradable within 90 days in composting conditions.",
    dataSheet: "/pdf/eco-straws-datasheet.pdf",
    media: [
      "/images/website/product-list_7.png"
    ]
  },
  {
    id: 8,
    thumb: "/images/website/product-list_8.png",
    prodName: "Disposable Spoons",
    slug: "disposable-spoons",
    sku: "036897488221-9",
    categoryId: 21,
    shortDesc: "Eco-friendly cutlery",
    description: "Compostable disposable spoons for food service industry.",
    specification: "Heat-resistant up to 80°C, made from renewable resources.",
    dataSheet: "/pdf/spoons-datasheet.pdf",
    media: [
      "/images/website/product-list_8.png"
    ]
  },
  {
    id: 9,
    thumb: "/images/website/product-list_9.png",
    prodName: "Coffee Cups",
    slug: "coffee-cups",
    sku: "036897488221-10",
    categoryId: 22,
    shortDesc: "Insulated beverage cups",
    description: "Double-wall insulated cups for hot beverages.",
    specification: "Leak-proof design with heat-insulating properties.",
    dataSheet: "/pdf/coffee-cups-datasheet.pdf",
    media: [
      "/images/website/product-list_9.png"
    ]
  }
];

export const mockFilterList = [
  {
    filterName: "Width (cm)",
    filterType: "range",
    filterKey: "width",
    values: [10, 60]
  },
  {
    filterName: "Length (cm)",
    filterType: "range",
    filterKey: "length",
    values: [20, 120]
  },
  {
    filterName: "Recycle",
    filterType: "checkbox",
    filterKey: "recycle",
    values: ["Yes", "No"]
  }
];

