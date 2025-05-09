// Mock users
export const MOCK_USERS = [
  {
    id: "user1",
    name: "Ramon",
    username: "Ramon",
    email: "ramon@example.com",
    // avatar:
    //   "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    password: "123456",
    //RAMON ES ADMIN
  },
  {
    id: "user2",
    name: "useradmin",
    email: "useradmin@example.com",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    password: "123456",
    //ADMIN ES USUARIO
  },
  {
    id: "user3",
    name: "menoredad",
    email: "menoredad@gmail.com",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    password: "menoredad",
  },
  {
    id: "asd",
    name: "notengopermiso",
    email: "notengopermiso@gmail.com",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
    password: "notengopermiso",
  },
];

// Mock product listings
export const MOCK_PRODUCTS = [
  {
    id: "product1",
    title: "Vintage Record Player",
    description:
      "Fully functional vintage record player from the 1970s. Great condition with minor wear.",
    price: 120,
    location: "Brooklyn, NY",
    category: "Electronics",
    images: [
      "https://images.pexels.com/photos/963586/pexels-photo-963586.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    seller: "user2",
    createdAt: "2023-10-15T14:30:00Z",
    condition: "Used - Good",
  },
  {
    id: "product2",
    title: "Leather Sofa - Like New",
    description:
      "Brown leather sofa in excellent condition. Only 6 months old. Moving and need to sell quickly.",
    price: 450,
    location: "Austin, TX",
    category: "Furniture",
    images: [
      "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    seller: "user3",
    createdAt: "2023-10-20T09:15:00Z",
    condition: "Used - Like New",
  },
  {
    id: "product3",
    title: "Mountain Bike - Trek",
    description:
      "Trek mountain bike in good condition. Recently tuned up with new brakes and tires.",
    price: 350,
    location: "Denver, CO",
    category: "Sports & Outdoors",
    images: [
      "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    seller: "user4",
    createdAt: "2023-10-18T11:45:00Z",
    condition: "Used - Good",
  },
  {
    id: "product4",
    title: "iPhone 13 Pro - 256GB",
    description:
      "iPhone 13 Pro in excellent condition. Includes original box, charger, and case.",
    price: 800,
    location: "San Francisco, CA",
    category: "Electronics",
    images: [
      "https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    seller: "user1",
    createdAt: "2023-10-19T16:20:00Z",
    condition: "Used - Excellent",
  },
  {
    id: "product5",
    title: "Dining Table with 4 Chairs",
    description:
      "Solid wood dining table with 4 matching chairs. Perfect for a small apartment.",
    price: 280,
    location: "Chicago, IL",
    category: "Furniture",
    images: [
      "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    seller: "user2",
    createdAt: "2023-10-17T10:30:00Z",
    condition: "Used - Good",
  },
  {
    id: "product6",
    title: "Canon EOS 5D Mark IV",
    description:
      "Professional DSLR camera in excellent condition. Includes 24-70mm lens and carrying case.",
    price: 1200,
    location: "Los Angeles, CA",
    category: "Electronics",
    images: [
      "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    seller: "user4",
    createdAt: "2023-10-16T14:45:00Z",
    condition: "Used - Excellent",
  },
  {
    id: "product7",
    title: "Acoustic Guitar - Taylor",
    description:
      "Taylor acoustic guitar with hardshell case. Beautiful sound and well maintained.",
    price: 650,
    location: "Nashville, TN",
    category: "Musical Instruments",
    images: [
      "https://images.pexels.com/photos/1656066/pexels-photo-1656066.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    seller: "user3",
    createdAt: "2023-10-14T12:10:00Z",
    condition: "Used - Excellent",
  },
  {
    id: "product8",
    title: "Antique Writing Desk",
    description:
      "Beautiful antique writing desk from the 1920s. Solid oak with intricate detailing.",
    price: 300,
    location: "Portland, OR",
    category: "Antiques",
    images: [
      "https://images.pexels.com/photos/5705090/pexels-photo-5705090.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    seller: "user1",
    createdAt: "2023-10-13T15:30:00Z",
    condition: "Used - Good",
  },
];

  // Mock message conversations
  export const MOCK_MESSAGES = [
    {
      id: "conv1",
      participants: ["user1", "user2"],
      messages: [
        {
          id: "msg1",
          sender: "user1",
          content: "Hi, is the record player still available?",
          timestamp: "2023-10-16T13:30:00Z",
          productId: "product1",
        },
        {
          id: "msg2",
          sender: "user2",
          content: "Yes, it is! Are you interested in seeing it?",
          timestamp: "2023-10-16T13:45:00Z",
          productId: "product1",
        },
        {
          id: "msg3",
          sender: "user1",
          content: "Definitely. Does it have any issues I should know about?",
          timestamp: "2023-10-16T14:00:00Z",
          productId: "product1",
        },
        {
          id: "msg4",
          sender: "user2",
          content: "It works perfectly. Just minor cosmetic wear on the case.",
          timestamp: "2023-10-16T14:15:00Z",
          productId: "product1",
        },
      ],
      lastUpdated: "2023-10-16T14:15:00Z",
    },
    {
      id: "conv2",
      participants: ["user1", "user3"],
      messages: [
        {
          id: "msg5",
          sender: "user1",
          content: "Is the sofa still for sale?",
          timestamp: "2023-10-21T09:30:00Z",
          productId: "product2",
        },
        {
          id: "msg6",
          sender: "user3",
          content: "Yes it is! When would you like to come see it?",
          timestamp: "2023-10-21T10:45:00Z",
          productId: "product2",
        },
        {
          id: "msg7",
          sender: "user1",
          content: "Would tomorrow afternoon work?",
          timestamp: "2023-10-21T11:00:00Z",
          productId: "product2",
        },
      ],
      lastUpdated: "2023-10-21T11:00:00Z",
    },
  ];

// Mock categories
export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Sports & Outdoors",
  "Vehicles",
  "Musical Instruments",
  "Antiques",
  "Books",
  "Toys & Games",
  "Jewelry",
  "Home & Garden",
];

// Function to get a seller by ID
export const getSellerById = (sellerId) => {
  return MOCK_USERS.find((user) => user.id === sellerId);
};

// Function to format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};
