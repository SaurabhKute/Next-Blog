const Users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Saurabh Kute',
    email: 'user@testmail.com',
    password: 'Test@123',
  },
  {
    id: '530544c3-4002-4272-9856-fec4b6a6442b',
    name: 'Jane Smith',
    email: 'jane.smith@mail.com',
    password: 'SecurePass@2023',
  },
  {
    id: '630544d4-4003-4273-9857-fec4b6a6442c',
    name: 'David Johnson',
    email: 'david.johnson@mail.com',
    password: 'David@789',
  },
  {
    id: '730544e5-4004-4274-9858-fec4b6a6442d',
    name: 'Alice Cooper',
    email: 'alice.cooper@mail.com',
    password: 'Alice#567',
  },
];

const Posts = [
  {
    title: "Understanding the Basics of React.js",
    content: `
      <p>React.js is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components.</p>
      <p>One of the core features of React is the use of a virtual DOM, which improves performance by minimizing direct interactions with the actual DOM.</p>
      <h2>Why React?</h2>
      <p>React offers several advantages:</p>
      <ul>
        <li>Reusable components</li>
        <li>Virtual DOM for better performance</li>
        <li>Rich ecosystem with tools like Redux and Next.js</li>
      </ul>
      <img src="https://dummyjson.com/image/400x200/008080/ffffff?text=Web+Development" alt="React Example" />
      <p>In conclusion, React is a versatile and efficient library for modern web development.</p>
    `,
    image: "https://dummyjson.com/image/400x200/008080/ffffff?text=Web+Development",
    author: "John Doe",
    tags: ["React", "JavaScript", "Web Development", "UI/UX"],
    category: "Technology",
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(), 
  },
  {
    title: "Exploring Node.js for Backend Development",
    content: `
      <p>Node.js is a runtime environment for executing JavaScript code on the server side.</p>
      <p>Its asynchronous and event-driven architecture makes it ideal for scalable network applications.</p>
      <h2>Key Features</h2>
      <ul>
        <li>Non-blocking I/O</li>
        <li>Large ecosystem of packages via npm</li>
        <li>Efficient for real-time applications</li>
      </ul>
      <img src="https://dummyjson.com/image/400x200/FF5733/ffffff?text=Backend+Development" alt="Node.js Example" />
      <p>In short, Node.js is a powerful tool for building high-performance backend systems.</p>
    `,
    image: "https://dummyjson.com/image/400x200/FF5733/ffffff?text=Backend+Development",
    author: "Jane Smith",
    tags: ["Node.js", "Backend", "JavaScript", "Programming"],
    category: "Education",
    user_id: '530544c3-4002-4272-9856-fec4b6a6442b',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    title: "The Future of Artificial Intelligence",
    content: `
      <p>Artificial Intelligence (AI) is transforming industries with advancements in machine learning, robotics, and data analytics.</p>
      <h2>Applications of AI</h2>
      <ul>
        <li>Healthcare diagnostics</li>
        <li>Autonomous vehicles</li>
        <li>Customer service chatbots</li>
      </ul>
      <img src="https://dummyjson.com/image/400x200/6A0DAD/ffffff?text=Artificial+Intelligence" alt="AI Example" />
      <p>The potential of AI is vast, making it a critical area of focus for businesses and researchers alike.</p>
    `,
    image: "https://dummyjson.com/image/400x200/6A0DAD/ffffff?text=Artificial+Intelligence",
    author: "David Johnson",
    tags: ["AI", "Machine Learning", "Technology"],
    category: "Education",
    user_id: '630544d4-4003-4273-9857-fec4b6a6442c',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    title: "10 Tips for Effective UI/UX Design",
    content: `
      <p>Designing user interfaces that are intuitive and user-friendly is an art and a science.</p>
      <h2>Key Tips</h2>
      <ul>
        <li>Keep it simple</li>
        <li>Ensure consistency</li>
        <li>Use feedback mechanisms</li>
      </ul>
      <img src="https://dummyjson.com/image/400x200/2980B9/ffffff?text=UI+UX+Design" alt="UI/UX Example" />
      <p>By following these principles, designers can create experiences that delight users.</p>
    `,
    image: "https://dummyjson.com/image/400x200/2980B9/ffffff?text=UI+UX+Design",
    author: "Alice Cooper",
    tags: ["UI/UX", "Design", "User Experience"],
    category: "Technology",
    user_id: '730544e5-4004-4274-9858-fec4b6a6442d',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];


  // const Categories = [
  //   'Technology',
  //   'Health',
  //   'Travel',
  //   'Education',
  //   'Food',
  //   'Lifestyle',
  //   'Business',
  //   'Finance',
  //   'Entertainment',
  //   'Sports',
  //   'Science',
  //   'Fashion',
  //   'Environment',
  //   'Politics',
  //   'Gaming',
  //   'Parenting',
  //   'Photography',
  //   'Art & Design',
  //   'Automobile',
  //   'Real Estate',
  //   'Personal Development',
  //   'DIY & Crafts',
  //   'Fitness',
  //   'Music',
  //   'Movies & TV',
  //   'Books & Literature',
  //   'Relationships',
  //   'History',
  //   'Culture',
  //   'Nature',
  //   'Startups',
  // ];
  

  const Categories = [
    "Technology",
    "Health",
    "Travel",
    "Food",
    "Lifestyle",
    "Business"
  ];
  

  export { Users, Posts, Categories};
