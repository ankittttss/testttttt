import React, {useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [check,Setcheck] = useState(false);
  const [data,setData] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password:''
  });

  const url = "http://localhost:8000/user"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8000/form",formData);
    console.log('Form data submitted successfully:', response.data);
    Setcheck(true);
  } catch (error) {
    console.error('Error submitting form data:', error);
  }
  };

  const fetchInfo = () =>{
    return axios.get(url).then((res)=>setData(res.data));
   
  }

  useEffect(()=>{
    fetchInfo();
  },[])


  if(check === true){
    console.log(data);
    return (
      <div>
        {data.map((item)=>{
          return <h1 key={Math.random()}>username:{item.username},name:{item.name},password:{item.password},email:{item.email}</h1>
        })}
      </div>
    )
  }

  else{
  return (
    <form onSubmit={handleSubmit}>
      <label> name
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
      />
      </label>
      <label>
        email
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />
      </label>
      <label> username
      <input
      type="name"
      name="username"
      value={formData.username}
      onChange={handleChange}
      />
 </label>
 <label> password
<input
      type="name"
      name="password"
      value={formData.password}
      onChange={handleChange}
      />
       </label>
      <button type="submit">Submit</button>
    </form>
  );
}
};

export default Home;
