let userData = {};

//create a function to help us check our local storage

function checkToken() {
  let result = false;
  let lsData = localStorage.getItem("Token");
  if (lsData && lsData != null) {
    result = true;
  }
  return result;
}

//one function to rule them all DRY (dont repear yourself)
const sendData = async (endpoint, passedInData) => {
  let result = await fetch(`http://localhost:5246/user/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passedInData),
  });
  if (!result.ok) {
    const message = `Error check your code! ${result.status}`;
    throw new Error(message);
  }

  let data = await result.json();
  return data;
};

//we are going to use async and await funtion
//help us resoleve a promise

const createAccount = async (createdUser) => {
  let result = await fetch("http://localhost:5246/user/Addusers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdUser),
  });
  if (!result.ok) {
    const message = `Error check your code! ${result.status}`;
    throw new Error(message);
  }

  let data = await result.json();
  return data;
};

const login = async (loginUser) => {
  let result = await fetch("http://localhost:5246/user/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginUser),
  });
  if (!result.ok) {
    const message = `Error check your code! ${result.status}`;
    throw new Error(message);
  }

  let data = await result.json();

  // if(data.token != null)
  // {
  //     localStorage.setItem("Token",data.token)
  // }
  console.log(data);
  return data;
};

const GetLoggedInuser = async (username) => {
  let result = await fetch(
    `http://localhost:5246/user/userbyusername/${username}`
  );
  userData = await result.json();
  console.log(userData);
};

const LoggedInData = () => {
  return userData;
};

const AddBlogItems = async (blogItems) => {
  let result = await fetch("http://localhost:5246/blog/AddBlogItems", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogItems),
  });
  if (!result.ok) {
    const message = `Error check your code! ${result.status}`;
    throw new Error(message);
  }

  let data = await result.json();
  return data;
};

const getBlogItems = async () => {
  let result = await fetch("http://localhost:5246/blog/GetBlogItems");
  let data = await result.json();
  return data;
};

const getBlogItemsByUserId = async (UserId) => {
  let result = await fetch(
    `http://localhost:5246/blog/GetItemsByUserId/${UserId}`
  );
  let data = await result.json();
  return data;
};

const updateBlogItems = async (blogItems) => {
  let result = await fetch("http://localhost:5246/blog/UpdateBlogItems", {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(blogItems)
  });
  if (!result.ok) {
    const message = `An error has taken place ${result.status}`;
    throw new Error(message);
  }
  let data = await result.json();
  console.log(data);
  return data;
}

const getPublishedBlogItems = async () => 
{
  let result = await fetch("http://localhost:5246/blog/GetPublishedItems");
  let data = await result.json();
  return data;
}

export {
  checkToken,
  createAccount,
  login,
  GetLoggedInuser,
  LoggedInData,
  AddBlogItems,
  sendData,
  getBlogItems,
  getBlogItemsByUserId,
  updateBlogItems,
  getPublishedBlogItems,
};
